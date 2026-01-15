from autogen_agentchat.agents import UserProxyAgent
from autogen_agentchat.messages import TextMessage
from autogen_core import CancellationToken
from autogen_agentchat.base import Response
import asyncio

class InteractiveUserProxyAgent(UserProxyAgent):
    def __init__(self, name: str = "User_Proxy", description: str = "A human user."):
        super().__init__(name=name, description=description)

    async def on_messages(self, messages, cancellation_token: CancellationToken) -> Response:
        # We don't print here because the orchestration loop prints.
        # But we MUST block for input.
        print(f"\n[User_Proxy]: Requesting input...")
        user_input = await asyncio.to_thread(input, "Enter your response: ")
        return Response(chat_message=TextMessage(content=user_input, source=self.name))

def create_user_proxy() -> UserProxyAgent:
    return InteractiveUserProxyAgent()
