import asyncio
import os
from dotenv import load_dotenv
from autogen_agentchat.teams import SelectorGroupChat
from autogen_agentchat.conditions import TextMentionTermination
from autogen_core.tools import FunctionTool
from tools.custom_gemini_client import CustomGeminiClient
from agents.research_agents import create_research_agents
from agents.user_proxy import create_user_proxy
from tools.arxiv_search import search_arxiv
from tools.user_interaction import approve_papers

# Load env variables
load_dotenv()

async def run_workflow():
    # Load config from env
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY not found in environment variables.")
        return

    # Initialize Model Client using CustomGeminiClient
    model_client = CustomGeminiClient(
        api_key=api_key,
        model="gemini-2.0-flash"
    )

    # Prepare Tools
    # search_arxiv needs to be a Tool
    paper_search_tool = FunctionTool(
        search_arxiv, 
        description="Search arXiv for papers based on a query."
    )
    
    # Create Agents
    # Pass tools to create_research_agents so they can be assigned to Paper_Discovery_Agent
    agents_dict = create_research_agents(model_client, paper_discovery_tools=[paper_search_tool])
    user_proxy = create_user_proxy()

    # Define the Team
    # We use SelectorGroupChat for intelligent routing and HITL
    termination = TextMentionTermination(text="TERMINATE")
    
    selector_prompt = """You are the workflow orchestrator. Given the conversation history, select the next agent to speak.
    
Available Agents:
- 'Topic_Refinement_Agent'
- 'Paper_Discovery_Agent'
- 'User_Proxy'
- 'Insight_Synthesizer_Agent'
- 'Report_Compiler_Agent'
- 'Gap_Analysis_Agent'

Rules:
1. If the last message is from 'user' (initial request), select 'Topic_Refinement_Agent'.
2. If the last message is from 'Topic_Refinement_Agent', select 'Paper_Discovery_Agent'.
3. If the last message is from 'Paper_Discovery_Agent', select 'User_Proxy'.
4. If the last message is from 'User_Proxy', select 'Insight_Synthesizer_Agent'.
5. If the last message is from 'Insight_Synthesizer_Agent', select 'Report_Compiler_Agent'.
6. If the last message is from 'Report_Compiler_Agent', select 'Gap_Analysis_Agent'.
7. If the last message is from 'Gap_Analysis_Agent', return 'TERMINATE'.

Output ONLY the name of the next agent.
"""

    team = SelectorGroupChat(
        participants=[
            user_proxy,
            agents_dict["topic_refinement_agent"],
            agents_dict["paper_discovery_agent"],
            agents_dict["insight_agent"],
            agents_dict["report_agent"],
            agents_dict["gap_agent"]
        ],
        model_client=model_client, # Use the Gemini client for selection too
        selector_prompt=selector_prompt,
        termination_condition=termination,
        allow_repeated_speaker=False # Prevent loops
    )

    # Run the workflow
    print("Initiating Research Assistant (AutoGen 0.4)...")
    initial_message = """I want to research "Multi-Agent Systems for Autonomous Driving". 
Please refine this topic, find relevant papers, synthesize insights, compile a report, and identify research gaps.
"""
    
    # Run with streaming to see progress
    stream = team.run_stream(task=initial_message)
    async for msg in stream:
        print(f"DEBUG: Msg type: {type(msg)}")
        if hasattr(msg, 'source'):
            print(f"DEBUG: Source: {msg.source}")
        if hasattr(msg, 'content'):
            print(f"[{msg.source}]: {msg.content}")
        elif hasattr(msg, 'delta'): # ModelToken
            print(msg.delta, end="", flush=True)
        else:
            print(f"DEBUG: Unhandled msg: {msg}")

def main():
    asyncio.run(run_workflow())

if __name__ == "__main__":
    main()
