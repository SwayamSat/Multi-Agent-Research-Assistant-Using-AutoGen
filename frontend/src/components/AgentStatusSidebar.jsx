import { Terminal, Search, FileText, CheckCircle, Loader2, Brain, AlertCircle } from 'lucide-react';

const agents = [
    { id: 'Supervisor', name: 'Supervisor', icon: Brain },
    { id: 'Topic_Refiner', name: 'Topic Refiner', icon: Terminal },
    { id: 'Paper_Discoverer', name: 'Paper Discoverer', icon: Search },
    { id: 'Insight_Synthesizer', name: 'Insight Synthesizer', icon: FileText },
    { id: 'Report_Compiler', name: 'Report Compiler', icon: FileText },
    { id: 'Gap_Analyst', name: 'Gap Analyst', icon: AlertCircle },
];

export function AgentStatusSidebar({ status, activeAgent }) {
    return (
        <div className="w-64 bg-white border-r border-gray-200 h-full p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Research Team</h2>
            <div className="space-y-3">
                {agents.map((agent) => {
                    const AgentIcon = agent.icon;
                    const isWorking = activeAgent === agent.id;
                    const isCompleted = status[agent.id] === 'completed' || status[agent.id] === 'finished';

                    return (
                        <div
                            key={agent.id}
                            className={`flex items-center p-2 rounded-lg transition-colors ${isWorking ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                                }`}
                        >
                            <div className={`p-2 rounded-md mr-3 ${isWorking ? 'bg-blue-100 text-blue-600' :
                                isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                                }`}>
                                <AgentIcon size={18} />
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${isWorking ? 'text-blue-700' : 'text-gray-700'}`}>
                                    {agent.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {isWorking ? 'Working...' : isCompleted ? 'Completed' : 'Idle'}
                                </p>
                            </div>
                            {isWorking && <Loader2 size={14} className="animate-spin text-blue-500" />}
                            {isCompleted && <CheckCircle size={14} className="text-green-500" />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
