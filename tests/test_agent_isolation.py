import asyncio
import os
from dotenv import load_dotenv
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.messages import TextMessage
from tools.custom_gemini_client import CustomGeminiClient

load_dotenv()

async def test_agent():
    api_key = os.getenv("GEMINI_API_KEY")
    client = CustomGeminiClient(api_key=api_key, model="gemini-2.0-flash")
    
    agent = AssistantAgent(
        name="TestAgent",
        model_client=client,
        system_message="You are a helpful assistant."
    )
    
    print("Sending message to agent...")
    try:
        response = await agent.on_messages(
            [TextMessage(content="Hello", source="user")],
            cancellation_token=None
        )
        print("Response received:")
        print(response)
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_agent())
