import asyncio
from langchain_core.messages import HumanMessage, AIMessage
from crew.agents import ResearchAgents
from crew.tasks import ResearchTasks
from crewai import Crew, Process
from graph.state import AgentState

# Initialize Agents and Tasks instances globally to avoid recreation
_agents = ResearchAgents()
_tasks = ResearchTasks()

async def _run_task_async(agent, task_func, state: AgentState):
    """
    Helper to run a single task with a single agent asynchronously.
    """
    messages = state["messages"]
    last_message = messages[-1].content
    
    # Create the task
    # Note: Task creation is fast/local, so it can remain sync or be wrapped if needed.
    # Assuming task creation doesn't block significantly.
    task = task_func(agent, last_message if "Refinement" in agent.role else state)

    # Note: CrewAI is designed for teams, but we can run a crew of 1 for granular control
    crew = Crew(
        agents=[agent],
        tasks=[task],
        process=Process.sequential,
        verbose=True
    )
    
    # Run kickoff in a separate thread to avoid blocking the event loop
    result = await asyncio.to_thread(crew.kickoff)
    return {"messages": [AIMessage(content=str(result))]}

async def topic_refiner_node(state: AgentState):
    agent = _agents.topic_refiner()
    messages = state["messages"]
    topic = messages[-1].content
    task = _tasks.refine_task(agent, topic)
    crew = Crew(agents=[agent], tasks=[task], verbose=True)
    result = await asyncio.to_thread(crew.kickoff)
    return {"messages": [AIMessage(content=f"Refinement_Agent: {result}")]}

async def paper_discoverer_node(state: AgentState):
    agent = _agents.paper_discoverer()
    messages = state["messages"]
    refined_topic = messages[-1].content
    task = _tasks.discovery_task(agent, refined_topic)
    crew = Crew(agents=[agent], tasks=[task], verbose=True)
    result = await asyncio.to_thread(crew.kickoff)
    return {"messages": [AIMessage(content=f"Discovery_Agent: {result}")]}

async def insight_synthesizer_node(state: AgentState):
    agent = _agents.insight_synthesizer()
    messages = state["messages"]
    papers = messages[-1].content
    task = _tasks.synthesis_task(agent, papers)
    crew = Crew(agents=[agent], tasks=[task], verbose=True)
    result = await asyncio.to_thread(crew.kickoff)
    return {"messages": [AIMessage(content=f"Insight_Agent: {result}")]}

async def report_compiler_node(state: AgentState):
    agent = _agents.report_compiler()
    messages = state["messages"]
    insights = messages[-1].content
    task = _tasks.report_task(agent, insights)
    crew = Crew(agents=[agent], tasks=[task], verbose=True)
    result = await asyncio.to_thread(crew.kickoff)
    return {"messages": [AIMessage(content=f"Report_Agent: {result}")]}

async def gap_analyst_node(state: AgentState):
    agent = _agents.gap_analyst()
    messages = state["messages"]
    report = messages[-1].content
    task = _tasks.gap_analysis_task(agent, report)
    crew = Crew(agents=[agent], tasks=[task], verbose=True)
    result = await asyncio.to_thread(crew.kickoff)
    return {"messages": [AIMessage(content=f"Gap_Agent: {result}")]}
