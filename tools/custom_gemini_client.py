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
from autogen_core.tools import Tool

class CustomGeminiClient(ChatCompletionClient):
    def __init__(self, api_key: str, model: str = "gemini-1.5-flash"):
        self.api_key = api_key
        self.model = model
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"
        self._model_capabilities = ModelCapabilities(
            vision=False,
            function_calling=True,
            json_output=False
        )

    @property
    def model_capabilities(self) -> ModelCapabilities:
        return self._model_capabilities

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
                openai_messages.append({"role": "assistant", "content": msg.content})
            # Handle tool calls/results if needed, keeping it simple for now
        
        # Prepare tools if any
        tools_payload = []
        if tools:
            for tool in tools:
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

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(self.base_url, headers=headers, json=payload, timeout=60.0)
            
            if response.status_code != 200:
                raise RuntimeError(f"Gemini API Error {response.status_code}: {response.text}")

            data = response.json()
            choice = data["choices"][0]
            content = choice["message"].get("content", "")
            
            # Handle Function Calling
            # If tool_calls are present
            # Note: AutoGen expects CreateResult to contain info
            
            usage = data.get("usage", {})
            
            return CreateResult(
                content=content,
                usage=RequestUsage(
                    prompt_tokens=usage.get("prompt_tokens", 0),
                    completion_tokens=usage.get("completion_tokens", 0)
                ),
                finish_reason="stop" # Simplified
            )
