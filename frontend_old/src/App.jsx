import React from 'react';
import { AgentStatusSidebar } from './components/AgentStatusSidebar';
import { ChatInterface } from './components/ChatInterface';
import { useResearchStream } from './hooks/useResearchStream';

function App() {
  const { messages, status, activeAgent, isLoading, startResearch } = useResearchStream();
  const [userMessages, setUserMessages] = React.useState([]);

  const allMessages = [
    ...userMessages.map(m => ({ ...m, type: 'user' })),
    ...messages
  ].sort((a, b) => a.timestamp - b.timestamp); // Simple merge (conceptual)

  // Actually, we can just maintain a single list in the hook or merge here properly
  // For simplicity, let's just append user message to the hook's messages logic or manage state there.
  // Updated approach: Passing user input to hook or handling it here.

  const handleSend = (topic) => {
    startResearch(topic);
    // Note: Ideally we add the user message to the UI state here immediately
  };

  // Merging logic for display
  // We'll pass the messages from the hook, which contains agent responses.
  // We'll insert the User message at the top if we had a state for it.
  // Letting ChatInterface handle it.

  return (
    <div className="flex h-screen bg-white font-sans text-slate-900">
      <AgentStatusSidebar status={status} activeAgent={activeAgent} />
      <div className="flex-1 flex flex-col h-full relative">
        <header className="h-14 border-b border-gray-200 flex items-center px-6 bg-white justify-between">
          <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ResearchAgent Pro
          </h1>
          <div className="text-sm text-gray-500">
            Powered by CrewAI & LangGraph
          </div>
        </header>
        <ChatInterface
          messages={displayMessages}
          isLoading={isLoading}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}

export default App;
