import asyncio
from autogen_agentchat.agents import UserProxyAgent
from autogen_agentchat.messages import TextMessage

async def test_user_proxy():
    print("Testing UserProxyAgent...")
    agent = UserProxyAgent(name="User", description="A human.")
    # In 0.4, UserProxyAgent might need input_func explicitly if it's not default?
    # Or maybe it just returns the input?
    
    print("Sending message to user proxy. Expectations: Should prompt for input.")
    response = await agent.on_messages(
        [TextMessage(content="Hello user, please respond.", source="Assistant")],
        cancellation_token=None
    )
    print("Response received:")
    print(response)

if __name__ == "__main__":
    asyncio.run(test_user_proxy())
