import os
import json
import httpx
from typing import Mapping, Any, Sequence, AsyncGenerator, Union
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
import asyncio
import requests

class CustomGeminiClient(ChatCompletionClient):
    def __init__(self, api_key: str, model: str = "models/gemini-2.5-flash"):
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
        
        # Native Gemini API URL
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent"
        
        # Conversion Logic: AutoGen -> Gemini Native
        contents = []
        system_prompt_text = ""
        
        for msg in messages:
            role = "user" # Default
            parts = []
            
            if isinstance(msg, SystemMessage):
                # Accumulate system prompt to prepend to first user message
                system_prompt_text += msg.content + "\n\n"
                continue
                
            elif isinstance(msg, UserMessage):
                role = "user"
                parts = [{"text": msg.content}]
                
            elif isinstance(msg, AssistantMessage):
                # Assistant --> Model
                role = "model" 
                if isinstance(msg.content, str):
                    source_name = getattr(msg, 'source', 'Assistant')
                    prefix = f"[{source_name}]:"
                    content_str = msg.content
                    # Avoid double prefixing
                    if not content_str.strip().startswith(prefix):
                        parts = [{"text": f"{prefix} {content_str}"}]
                    else:
                        parts = [{"text": content_str}]
                elif isinstance(msg.content, list):
                    # Handle Tool Calls
                    for fc in msg.content:
                        if isinstance(fc, FunctionCall):
                            parts.append({
                                "functionCall": {
                                    "name": fc.name,
                                    "args": json.loads(fc.arguments) if isinstance(fc.arguments, str) else fc.arguments
                                }
                            })
            
            else:
                # Fallback for generic messages
                role = "user"
                if hasattr(msg, 'content'):
                     parts = [{"text": str(msg.content)}]
                else:
                     continue # Skip empty/unknown messages
            
            if not parts:
                continue

            # Strict Merging Logic
            if contents and contents[-1]['role'] == role:
                # Same role -> Merge
                contents[-1]['parts'].extend(parts)
            else:
                contents.append({"role": role, "parts": parts})

        # Inject System Prompt into the FIRST User message
        if system_prompt_text:
            if contents and contents[0]['role'] == 'user':
                existing_parts = contents[0]['parts']
                # Prepend to the first text part if exists
                if existing_parts and "text" in existing_parts[0]:
                    existing_parts[0]['text'] = f"System Instruction:\n{system_prompt_text}\n{existing_parts[0]['text']}"
                else:
                    # Insert as new part at beginning
                    existing_parts.insert(0, {"text": f"System Instruction:\n{system_prompt_text}"})
            else:
                # If valid history starts with model, prepend new User message
                contents.insert(0, {"role": "user", "parts": [{"text": f"System Instruction:\n{system_prompt_text}"}]})

        # Ensure conversation ends with User (Gemini Requirement)
        if contents and contents[-1]['role'] == 'model':
            # Append synthetic user continuation
            contents.append({"role": "user", "parts": [{"text": "Please continue based on the above context."}]})
            
        # If conversation is empty (only system prompt?), ensure at least one user message
        if not contents:
             contents.append({"role": "user", "parts": [{"text": f"System Instruction:\n{system_prompt_text}\nPlease start."}]})

        # Prepare Tools
        google_tools = []
        if tools:
            function_declarations = []
            for tool in tools:
                if isinstance(tool, dict):
                    # Raw dict
                    function_declarations.append({
                        "name": tool["name"],
                        "description": tool.get("description", ""),
                        "parameters": tool.get("parameters", tool.get("schema", {}))
                    })
                else:
                    # Tool object
                    function_declarations.append({
                        "name": tool.name,
                        "description": tool.description,
                        "parameters": tool.schema["parameters"] if "parameters" in tool.schema else tool.schema
                    })
            if function_declarations:
                google_tools.append({"function_declarations": function_declarations})

        # Construct Payload
        payload = {
            "contents": contents,
            "safetySettings": [
                {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
                {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
                {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
                {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"}
            ],
            "generationConfig": {
                "temperature": 0.7, 
                "maxOutputTokens": 2048
            }
        }
            
        if google_tools:
            payload["tools"] = google_tools

        headers = {
            "Content-Type": "application/json",
            "x-goog-api-key": self.api_key
        }
        
        # Ensure session exists (Robustness)
        if not hasattr(self, 'session'):
            from requests.adapters import HTTPAdapter
            from urllib3.util.retry import Retry
            self.session = requests.Session()
            retry_strategy = Retry(
                total=5,backoff_factor=1,status_forcelist=[429, 500, 503],
                allowed_methods=["POST"]
            )
            adapter = HTTPAdapter(max_retries=retry_strategy)
            self.session.mount("https://", adapter)

        # Execute Request
        def _make_request():
            try:
                return self.session.post(url, headers=headers, json=payload, timeout=60.0)
            except Exception as e:
                raise RuntimeError(f"Connection failed: {e}")

        response = await asyncio.to_thread(_make_request)
        
        if response.status_code != 200:
             # Attempt to dump payload on error for debugging
             try:
                 with open("debug_gemini_payload_error.json", "w", encoding="utf-8") as f:
                     json.dump(payload, f, indent=2)
                 print("DEBUG: Payload dumped to debug_gemini_payload_error.json")
             except Exception as e:
                 print(f"DEBUG: Failed to dump payload: {e}")
                 
             raise RuntimeError(f"Gemini Native API Error {response.status_code}: {response.text}")

        data = response.json()
        
        if "candidates" not in data or not data["candidates"]:
             try:
                 with open("debug_gemini_payload_error.json", "w", encoding="utf-8") as f:
                     json.dump(payload, f, indent=2)
                 print("DEBUG: Payload dumped to debug_gemini_payload_error.json")
             except Exception as e:
                 print(f"DEBUG: Failed to dump payload: {e}")
                 
             error_msg = f"Gemini returned no candidates.\nResponse: {json.dumps(data, indent=2)}\nPayload dumped to debug_gemini_payload_error.json"
             raise RuntimeError(error_msg)
             
        candidate = data["candidates"][0]
        parts = candidate.get("content", {}).get("parts", [])
        
        # Extract Text and Function Calls
        text_content = ""
        tool_calls = []
        
        for part in parts:
            if "text" in part:
                text_content += part["text"]
            if "functionCall" in part:
                fc = part["functionCall"]
                tool_calls.append(FunctionCall(
                    id="call_" + fc["name"], 
                    name=fc["name"],
                    arguments=json.dumps(fc["args"]) 
                ))
        
        finish_reason = candidate.get("finishReason", "STOP").lower()
        if finish_reason == "stop": finish_reason = "stop"
        else: finish_reason = "stop" 
        
        usage_meta = data.get("usageMetadata", {})
        
        return CreateResult(
            content=tool_calls if tool_calls else text_content,
            usage=RequestUsage(
                prompt_tokens=usage_meta.get("promptTokenCount", 0),
                completion_tokens=usage_meta.get("candidatesTokenCount", 0)
            ),
            finish_reason=finish_reason,
            cached=False
        )
