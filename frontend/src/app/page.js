'use client';

import React, { useState } from 'react';
import { AgentStatusSidebar } from '@/components/AgentStatusSidebar';
import { ChatInterface } from '@/components/ChatInterface';
import { useResearchStream } from '@/hooks/useResearchStream';

export default function Home() {
  const { messages, status, activeAgent, isLoading, startResearch } = useResearchStream();
  const [userMessages, setUserMessages] = useState([]);

  const handleSend = (topic) => {
    // Add user message immediately
    const userMessage = {
      type: 'user',
      content: topic,
      timestamp: Date.now()
    };
    setUserMessages(prev => [...prev, userMessage]);

    // Start streaming
    startResearch(topic);
  };

  // Combine and sort messages by timestamp
  const displayMessages = [
    ...userMessages,
    ...messages
  ].sort((a, b) => a.timestamp - b.timestamp);

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
