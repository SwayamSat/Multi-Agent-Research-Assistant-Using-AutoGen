import os
import json
import httpx
from typing import Mapping, Any, Sequence
from autogen_core.models import (
    ChatCompletionClient,
    CreateResult,
    LLMMessage,
    SystemMessage,
    UserMessage,
    AssistantMessage,
    ModelCapabilities,
    RequestUsage
)
from autogen_core.models import (
    ChatCompletionClient,
    CreateResult,
    LLMMessage,
    SystemMessage,
    UserMessage,
    AssistantMessage,
    ModelCapabilities,
    RequestUsage,
    ModelInfo
)
from autogen_core.tools import Tool
from autogen_core._types import FunctionCall
from typing import AsyncGenerator, Union
import asyncio
import requests

class CustomGeminiClient(ChatCompletionClient):
    def __init__(self, api_key: str, model: str = "gemini-2.0-flash"):
        self.api_key = api_key
        self.model = model
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"
        self._model_capabilities = ModelCapabilities(
            vision=False,
            function_calling=True,
            json_output=False
        )
        self._total_usage = RequestUsage(prompt_tokens=0, completion_tokens=0)

    @property
    def capabilities(self) -> ModelCapabilities:
        return self._model_capabilities

    @property
    def model_capabilities(self) -> ModelCapabilities:
        return self._model_capabilities
    
    @property
    def model_info(self) -> ModelInfo:
        return ModelInfo(
            vision=False,
            function_calling=True,
            json_output=False,
            family="gemini"
        )
        
    def remaining_tokens(self) -> Union[int, float]:
        return float("inf")
        
    def actual_usage(self) -> RequestUsage:
        return self._total_usage

    def total_usage(self) -> RequestUsage:
        return self._total_usage
        
    def close(self) -> None:
        pass
        
    def count_tokens(self, messages: Sequence[LLMMessage], tools: Sequence[Tool] = []) -> int:
        # Mock implementation
        return sum(len(m.content) for m in messages if isinstance(m.content, str)) // 4

    async def create_stream(
        self,
        messages: Sequence[LLMMessage],
        tools: Sequence[Tool] = [],
        json_output: bool = False,
        extra_create_args: Mapping[str, Any] = {},
        cancellation_token: Any = None,
    ) -> AsyncGenerator[Union[str, CreateResult], None]:
        # Simple non-streaming wrapper for now
        result = await self.create(messages, tools, json_output, extra_create_args, cancellation_token)
        yield result.content if isinstance(result.content, str) else "" 
        yield result

    async def create(
        self,
        messages: Sequence[LLMMessage],
        tools: Sequence[Tool] = [],
        json_output: bool = False,
        extra_create_args: Mapping[str, Any] = {},
        cancellation_token: Any = None,
    ) -> CreateResult:
        
        # Convert AutoGen messages to OpenAI format
        openai_messages = []
        for msg in messages:
            if isinstance(msg, SystemMessage):
                openai_messages.append({"role": "system", "content": msg.content})
            elif isinstance(msg, UserMessage):
                openai_messages.append({"role": "user", "content": msg.content})
            elif isinstance(msg, AssistantMessage):
                if isinstance(msg.content, str):
                    openai_messages.append({"role": "assistant", "content": msg.content})
                elif isinstance(msg.content, list):
                     # Handle previous tool calls if re-sending history?
                     # AutoGen mostly handles conversation state, but we need to serialize FunctionCall back to JSON if needed
                     # For now assuming string content most of the time or simple turn
                     # If msg.content is list of FunctionCalls, we should format as tool_calls
                     # OpenAI expects 'tool_calls' field, not content
                     tool_calls_payload = []
                     for fc in msg.content:
                         if isinstance(fc, FunctionCall):
                             tool_calls_payload.append({
                                 "id": fc.id,
                                 "type": "function",
                                 "function": {
                                     "name": fc.name,
                                     "arguments": fc.arguments
                                 }
                             })
                     openai_messages.append({"role": "assistant", "content": None, "tool_calls": tool_calls_payload})

            # Handle FunctionExecutionResult?
            # If there are tool outputs, they come as FunctionExecutionResult?
            # AutoGen 0.4 handles this. We need to check if msg is FunctionExecutionResult?
            # LLMMessage is Union[...]
            # Let's check imports for FunctionExecutionResult logic if needed.
            # But the 'messages' argument is Sequence[LLMMessage].
            # Provide simple support first.

        # Prepare tools if any
        tools_payload = []
        if tools:
            # print(f"DEBUG: tools type: {type(tools)}")
            # if len(tools) > 0:
            #     print(f"DEBUG: first tool type: {type(tools[0])}")
            #     print(f"DEBUG: first tool: {tools[0]}")
            for tool in tools:
                if isinstance(tool, dict):
                     tools_payload.append({
                        "type": "function",
                        "function": {
                            "name": tool["name"],
                            "description": tool.get("description"),
                            "parameters": tool.get("parameters", tool.get("schema", {}))
                        }
                    })
                else:
                    tools_payload.append({
                        "type": "function",
                        "function": {
                            "name": tool.name,
                            "description": tool.description,
                            "parameters": tool.schema["parameters"] if "parameters" in tool.schema else tool.schema
                        }
                    })

        payload = {
            "model": self.model,
            "messages": openai_messages,
        }
        
        if tools_payload:
            payload["tools"] = tools_payload

        # DEBUG PRINT
        # print(f"DEBUG: URL={self.base_url}")
        # try:
        #     with open("debug_payload.json", "w") as f:
        #         json.dump(payload, f, indent=2)
        # except Exception as e:
        #     print(f"DEBUG: Failed to write payload: {e}")
            
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }

        if not hasattr(self, 'session'):
            from requests.adapters import HTTPAdapter
            from urllib3.util.retry import Retry
            
            self.session = requests.Session()
            retry_strategy = Retry(
                total=5,
                backoff_factor=1,
                status_forcelist=[429, 500, 502, 503, 504],
                allowed_methods=["HEAD", "GET", "OPTIONS", "POST"],
                # SSLEOFError is a connection error. urllib3 might handle it if we retry connection errors.
            )
            adapter = HTTPAdapter(max_retries=retry_strategy)
            self.session.mount("https://", adapter)
            self.session.mount("http://", adapter)

        # Use requests via asyncio.to_thread
        def _make_request():
            try:
                return self.session.post(self.base_url, headers=headers, json=payload, timeout=60.0)
            except Exception as e:
                # Catch SSLEOFError specifically if requests doesn't handle it
                raise RuntimeError(f"Connection failed after retries: {e}")

        response = await asyncio.to_thread(_make_request)
            
        if response.status_code != 200:
            raise RuntimeError(f"Gemini API Error {response.status_code}: {response.text}")

        data = response.json()
        choice = data["choices"][0]
        message = choice["message"]
        content = message.get("content", "")
        
        # Handle Tool Calls response
        tool_calls = []
        if "tool_calls" in message:
            for tc in message["tool_calls"]:
                tool_calls.append(FunctionCall(
                    id=tc["id"], 
                    arguments=tc["function"]["arguments"], 
                    name=tc["function"]["name"]
                ))
            
            result_content = tool_calls
        else:
            result_content = content

        usage = data.get("usage", {})
        
        return CreateResult(
            content=result_content,
            usage=RequestUsage(
                prompt_tokens=usage.get("prompt_tokens", 0),
                completion_tokens=usage.get("completion_tokens", 0)
            ),
            finish_reason="stop",
            cached=False
        )
