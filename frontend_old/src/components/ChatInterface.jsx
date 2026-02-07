import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useEffect, useRef } from 'react';

export function ChatInterface({ messages, isLoading, onSend }) {
    const [input, setInput] = React.useState('');
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSend(input);
            setInput('');
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-gray-50">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <p className="text-lg">Enter a research topic to begin.</p>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-3xl rounded-lg p-4 shadow-sm ${msg.agent === 'Report_Compiler' ? 'bg-white border-2 border-purple-100 w-full' :
                                msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'
                            }`}>
                            {msg.agent && (
                                <div className="text-xs font-bold uppercase tracking-wider mb-1 text-gray-500">
                                    {msg.agent}
                                </div>
                            )}
                            <div className={`prose prose-sm ${msg.type === 'user' ? 'prose-invert' : ''} max-w-none`}>
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={endRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                        placeholder="What would you like to research?"
                        className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}
