# 🤖 Multi-Agent Research Assistant

A powerful autonomous research platform powered by **LangGraph**, **CrewAI**, and **Next.js** that deploys specialized AI agents to conduct deep research, analyze documents, and generate comprehensive reports in minutes.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.11+-blue.svg)
![Next.js](https://img.shields.io/badge/next.js-16.1.6-black.svg)

## ✨ Features

- **🧠 Multi-Agent Orchestration**: Specialized agents collaborate autonomously using LangGraph workflows
- **📊 Real-time Streaming**: Watch agents work in real-time with Server-Sent Events (SSE)
- **🎯 Intelligent Routing**: Supervisor agent dynamically routes tasks to specialized workers
- **🌐 Deep Web Search**: Discovers and analyzes the latest research papers and documentation
- **📝 Structured Reports**: Generates comprehensive markdown reports with citations
- **🎨 Modern UI**: Clean, minimal interface with dark mode support
- **⚡ Instant Cancellation**: Stop research tasks immediately with proper backend cleanup

## 🏗️ Architecture

### Backend (Python + FastAPI + LangGraph)
```
├── main.py                 # FastAPI server with streaming endpoints
├── graph/
│   ├── workflow.py        # LangGraph workflow definition
│   ├── nodes.py           # Agent execution nodes
│   ├── supervisor.py      # Supervisor routing logic
│   └── state.py           # Shared state schema
├── crew/
│   ├── agents.py          # CrewAI agent definitions
│   └── tasks.py           # Task definitions for each agent
└── agents/                # Legacy AutoGen agents (deprecated)
```

### Frontend (Next.js + React)
```
frontend/
├── src/
│   ├── app/
│   │   ├── page.js              # Landing page
│   │   ├── research/page.js     # Research interface
│   │   └── layout.js            # Root layout with theme
│   ├── components/
│   │   ├── ChatInterface.jsx    # Main chat UI
│   │   ├── Footer.jsx           # Footer component
│   │   └── ThemeToggle.jsx      # Dark mode toggle
│   └── hooks/
│       └── useResearchStream.js # SSE streaming hook
└── public/                      # Static assets
```

## 🚀 Getting Started

### Prerequisites

- **Python 3.11+**
- **Node.js 18+**
- **npm or yarn**
- **API Keys**:
  - Google Gemini API key
  - Serper API key (for web search)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/multi-agent-research-assistant.git
cd multi-agent-research-assistant
```

#### 2. Backend Setup
```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and add your API keys:
# GOOGLE_API_KEY=your_gemini_api_key
# SERPER_API_KEY=your_serper_api_key
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
```

### Running the Application

#### Start Backend (Terminal 1)
```bash
# From project root
python main.py
# Backend runs on http://localhost:8000
```

#### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

#### Access the Application
- **Landing Page**: http://localhost:3000
- **Research Interface**: http://localhost:3000/research
- **API Docs**: http://localhost:8000/docs

## 🎯 How It Works

### Agent Workflow

1. **Topic Refiner** 📋
   - Analyzes and refines the research topic
   - Identifies key areas and scope

2. **Paper Discoverer** 🔍
   - Searches for relevant papers and articles
   - Uses Serper API for web search

3. **Insight Synthesizer** 💡
   - Analyzes and synthesizes findings
   - Identifies patterns and connections

4. **Report Compiler** 📄
   - Generates structured markdown reports
   - Includes citations and references

5. **Gap Analyst** 🎯
   - Identifies research gaps
   - Suggests future directions

6. **Supervisor** 🧭
   - Routes tasks to appropriate agents
   - Decides workflow progression
   - Determines completion

### Real-time Streaming

The application uses Server-Sent Events (SSE) to stream agent outputs in real-time:

```javascript
// Frontend receives updates as they happen
{
  type: 'status',
  agent: 'Paper_Discoverer',
  status: 'working'
}

{
  type: 'message',
  agent: 'Paper_Discoverer',
  content: 'Found 15 relevant papers...'
}
```

## 🛠️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Required
GOOGLE_API_KEY=your_gemini_api_key_here
SERPER_API_KEY=your_serper_api_key_here

# Optional
LANGCHAIN_TRACING_V2=false
LANGCHAIN_API_KEY=your_langsmith_key_here
```

### Agent Configuration

Modify `crew/agents.py` to customize agent behavior:

```python
def topic_refiner(self):
    return Agent(
        role="Research Topic Refinement Specialist",
        goal="Refine and clarify research topics",
        backstory="Expert at identifying key research areas...",
        llm=self.gemini_llm,
        verbose=True
    )
```

## 📡 API Endpoints

### POST `/research-stream`
Streams research progress in real-time.

**Request:**
```json
{
  "topic": "Latest advances in quantum computing"
}
```

**Response:** Server-Sent Events stream
```
data: {"type":"status","agent":"Supervisor","status":"planning"}

data: {"type":"message","agent":"Topic_Refiner","content":"..."}

data: {"type":"status","agent":"System","status":"finished"}
```

### POST `/researchagents` (Legacy)
Synchronous endpoint that returns complete results.

## 🎨 UI Features

- **Minimal Modern Design**: Clean black/white aesthetic with smooth animations
- **Dark Mode**: Automatic theme switching with system preference detection
- **Real-time Updates**: See agent progress as it happens
- **Thinking Indicators**: Visual feedback showing which agent is working
- **Instant Cancellation**: Stop button to halt research immediately
- **Responsive Layout**: Works on desktop, tablet, and mobile

## 🧪 Development

### Project Structure
```
.
├── main.py                 # FastAPI backend
├── graph/                  # LangGraph workflow
├── crew/                   # CrewAI agents & tasks
├── frontend/               # Next.js frontend
├── requirements.txt        # Python dependencies
├── .env                    # Environment variables
└── README.md              # This file
```

### Adding New Agents

1. Define agent in `crew/agents.py`
2. Create task in `crew/tasks.py`
3. Add node in `graph/nodes.py`
4. Register in `graph/workflow.py`
5. Update supervisor routing logic

### Debugging

Enable verbose logging:
```python
# In crew/agents.py
Agent(..., verbose=True)

# In graph/nodes.py
Crew(..., verbose=True)
```

Check backend logs for detailed execution traces.

## 🚧 Known Issues & Limitations

- **Cancellation**: Backend cancellation requires async node execution (work in progress)
- **Rate Limits**: Serper API has rate limits on free tier
- **Long Tasks**: Very long research tasks may timeout

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **LangGraph** - For the powerful graph-based agent orchestration
- **CrewAI** - For the multi-agent framework
- **Google Gemini** - For the LLM capabilities
- **Serper** - For web search functionality
- **Next.js** - For the modern React framework

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using LangGraph, CrewAI, and Next.js**
