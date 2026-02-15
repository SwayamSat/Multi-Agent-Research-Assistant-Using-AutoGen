# Multi-Agent Research Assistant

A powerful AI-powered research assistant that leverages multiple specialized agents to conduct comprehensive research on any topic. Built with **LangGraph**, **CrewAI**, **Google Gemini**, and **Next.js**.

![Research Agent](https://img.shields.io/badge/AI-Research%20Assistant-blue)
![Python](https://img.shields.io/badge/Python-3.11-green)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-teal)

## 🌟 Features

- **Multi-Agent Collaboration**: Specialized AI agents work together to refine topics, discover papers, synthesize information, and generate comprehensive reports
- **Real-Time Streaming**: Watch the research process unfold in real-time with Server-Sent Events (SSE)
- **Intelligent Workflow**: LangGraph orchestrates agent interactions with a supervisor pattern
- **Modern UI**: Beautiful, responsive interface built with Next.js 15 and Tailwind CSS
- **Dark Mode**: Seamless light/dark theme switching
- **ArXiv Integration**: Automatic discovery of relevant research papers
- **Comprehensive Reports**: AI-generated research reports with citations and structured insights

## 🏗️ Architecture

### Backend (Python + FastAPI + LangGraph)
- **LangGraph Workflow**: Orchestrates multi-agent collaboration
- **CrewAI Agents**: Specialized agents for different research tasks
  - Topic Refiner
  - Paper Discovery Agent
  - Synthesis Agent
  - Report Writer
  - Gap Analyzer
- **Google Gemini**: Powers all AI agents with advanced language understanding
- **FastAPI**: High-performance API with SSE streaming support

### Frontend (Next.js 15)
- **Server Components**: Optimized rendering with React Server Components
- **Real-Time Updates**: SSE client for live research progress
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Theme Support**: Light and dark mode with smooth transitions

## 📋 Prerequisites

- **Python 3.11+**
- **Node.js 20+**
- **Docker** (optional, for containerized deployment)
- **Google API Key** (for Gemini)

## 🚀 Quick Start

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/SwayamSat/A-Multi-Agent-Research-Assistant-Using-AutoGen.git
cd A-Multi-Agent-Research-Assistant-Using-AutoGen
\`\`\`

### 2. Backend Setup

\`\`\`bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\\Scripts\\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "GOOGLE_API_KEY=your_google_api_key_here" > .env

# Run backend
uvicorn main:app --reload
\`\`\`

The backend will start at `http://localhost:8000`

### 3. Frontend Setup

\`\`\`bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run development server
npm run dev
```

The frontend will start at `http://localhost:3000`

## 🐳 Docker Deployment

> **Note**: This project is fully containerized! You can run the backend and frontend separately using Docker.

### Option 1: Use Pre-built Images (Fastest)

Pull the pre-built images from Docker Hub:

**Backend:**
```bash
docker pull swayam619/multi-agent-research-assistant-backend:v1.0
docker run -p 8000:8000 -e GOOGLE_API_KEY=your_api_key_here swayam619/multi-agent-research-assistant-backend:v1.0
```

**Frontend:**
```bash
docker pull swayam619/multi-agent-research-assistant-frontend:v1.0
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:8000 swayam619/multi-agent-research-assistant-frontend:v1.0
```

### Option 2: Using Docker Compose (Recommended for Local Development)

```bash
# Build and run both services
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

### Option 3: Manual Docker Build

**Backend:**
```bash
docker build -f Dockerfile.backend -t research-assistant-backend .
docker run -p 8000:8000 --env-file .env research-assistant-backend
```

**Frontend:**
```bash
cd frontend
docker build -t research-assistant-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:8000 research-assistant-frontend
```

## ☁️ Cloud Deployment

### Deploy Backend to Render

1. Go to [render.com](https://render.com) and create a new **Web Service**
2. Select "Deploy an existing image from a registry"
3. Enter image URL: `swayam619/multi-agent-research-assistant-backend:v1.0`
4. Configure environment variables:
   - `GOOGLE_API_KEY`: Your Google API key
5. Deploy and copy the service URL (e.g., `https://your-app.onrender.com`)

### Deploy Frontend to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL (no trailing slash)
5. Deploy

## 🔧 Configuration

### Environment Variables

**Backend (`.env`):**
```env
GOOGLE_API_KEY=your_google_api_key_here
```

**Frontend (`.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, update `NEXT_PUBLIC_API_URL` to your deployed backend URL.

## 📖 Usage

1. **Start the Application**: Run both backend and frontend
2. **Enter Research Topic**: Type your research question in the input field
3. **Watch the Magic**: Observe as multiple AI agents collaborate:
   - Topic Refiner clarifies and structures your query
   - Paper Discovery finds relevant research papers
   - Synthesis Agent analyzes and combines information
   - Report Writer generates a comprehensive report
   - Gap Analyzer identifies areas for further research
4. **Review Results**: Read the generated research report with citations

### Example Topics

- "Latest advances in quantum computing"
- "Impact of climate change on marine ecosystems"
- "Applications of transformer models in NLP"
- "Ethical considerations in AI development"

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework
- **LangGraph**: Agent orchestration and workflow management
- **CrewAI**: Multi-agent framework
- **Google Gemini**: Large language model
- **ArXiv API**: Research paper discovery
- **Python 3.11**: Core language

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **Tailwind CSS**: Utility-first styling
- **Lucide Icons**: Beautiful icon set
- **Server-Sent Events**: Real-time streaming

## 📁 Project Structure

```
.
├── crew/                      # CrewAI agent definitions
│   ├── agents.py              # Multi-agent definitions
│   └── tools.py               # ArXiv search tools
├── graph/                     # LangGraph workflow
│   ├── nodes.py               # Graph node functions
│   ├── state.py               # State management
│   └── workflow.py            # Workflow orchestration
├── frontend/                  # Next.js frontend
│   ├── src/
│   │   ├── app/               # Next.js app directory
│   │   │   ├── page.js        # Landing page
│   │   │   ├── research/      # Research page
│   │   │   ├── how-it-works/  # Info pages
│   │   │   ├── privacy/       # Privacy policy
│   │   │   └── terms/         # Terms of service
│   │   ├── components/        # React components
│   │   │   ├── Header.jsx     # Navigation header
│   │   │   ├── Footer.jsx     # Footer component
│   │   │   ├── ChatInterface.jsx  # Chat UI
│   │   │   └── ThemeToggle.jsx    # Dark mode toggle
│   │   └── hooks/             # Custom React hooks
│   │       └── useResearchStream.js  # SSE streaming
│   ├── package.json           # Node dependencies
│   └── Dockerfile             # Frontend Docker config
├── main.py                    # FastAPI application
├── requirements.txt           # Python dependencies
├── Dockerfile.backend         # Backend Docker config
├── docker-compose.yml         # Docker Compose config
├── .env.example               # Environment template
└── README.md                  # This file
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Google Gemini** for powering the AI agents
- **LangGraph** for workflow orchestration
- **CrewAI** for multi-agent framework
- **ArXiv** for research paper access
- **Next.js** team for the amazing framework

## 📧 Contact

For questions or support, please open an issue on GitHub or contact the maintainer.

---

**Built with ❤️ using AI and modern web technologies**
