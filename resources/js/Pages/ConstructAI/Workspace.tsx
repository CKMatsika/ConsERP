import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function Workspace({ conversations }: any) {
    const [selectedConv, setSelectedConv] = useState<any>(conversations[0] || null);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post(route('construct-ai.chat'), {
                conversation_id: selectedConv?.id,
                message: currentInput,
            });

            setSelectedConv({ id: res.data.conversation_id });
            setMessages(prev => [...prev, res.data.message]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'ConstructAI is currently unavailable. You can continue using the standard ERP.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">ConstructAI Intelligence Workspace</h2>}
        >
            <Head title="ConstructAI Workspace" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex h-[75vh]">
                        
                        {/* Sidebar conversations */}
                        <div className="w-1/4 border-r bg-gray-50 p-4 overflow-y-auto">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Conversations</h3>
                            <div className="space-y-2">
                                {conversations.map((c: any) => (
                                    <button
                                        key={c.id}
                                        onClick={() => setSelectedConv(c)}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm truncate transition ${
                                            selectedConv?.id === c.id ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {c.title || `Conversation #${c.id}`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chat area */}
                        <div className="w-3/4 flex flex-col justify-between p-6">
                            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-4">
                                {messages.length === 0 && (
                                    <div className="text-center text-gray-400 mt-20">
                                        <p className="text-lg font-medium">How can ConstructAI assist your construction operations today?</p>
                                        <p className="text-sm mt-1">Ask questions about projects, BOQs, inventory, or finances.</p>
                                    </div>
                                )}
                                {messages.map((m, idx) => (
                                    <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xl rounded-lg px-4 py-3 text-sm ${
                                            m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-900 border'
                                        }`}>
                                            {m.content}
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 border rounded-lg px-4 py-3 text-sm text-gray-500 animate-pulse">
                                            ConstructAI is thinking...
                                        </div>
                                    </div>
                                )}
                            </div>

                            <form onSubmit={sendMessage} className="flex gap-3 pt-4 border-t">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    placeholder="Ask ConstructAI anything about the ERP..."
                                    className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50"
                                >
                                    Send
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
