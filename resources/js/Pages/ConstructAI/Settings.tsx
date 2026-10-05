import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Settings({ organisation }: any) {
    const settings = organisation?.construct_ai_settings || {};
    const { data, setData, put, processing, errors } = useForm({
        construct_ai_enabled: !!organisation?.construct_ai_enabled,
        provider: settings.provider || 'gemini',
        model: settings.model || 'gemini-1.5-pro',
        api_key: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('construct-ai.settings.update'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">ConstructAI Settings & Module Control</h2>}
        >
            <Head title="ConstructAI Settings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 max-w-2xl">
                        
                        <form onSubmit={submit} className="space-y-6">
                            
                            <div className="flex items-center justify-between border-b pb-4">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Enable ConstructAI Module</h3>
                                    <p className="text-sm text-gray-500">Turn on or off the agentic AI assistant for this organisation.</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={data.construct_ai_enabled}
                                    onChange={e => setData('construct_ai_enabled', e.target.checked)}
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="provider" className="block text-sm font-medium text-gray-700">AI Provider</label>
                                    <select
                                        id="provider"
                                        value={data.provider}
                                        onChange={e => setData('provider', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="gemini">Google Gemini</option>
                                        <option value="openai">OpenAI GPT</option>
                                        <option value="anthropic">Anthropic Claude</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model Name</label>
                                    <input
                                        id="model"
                                        type="text"
                                        value={data.model}
                                        onChange={e => setData('model', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="api_key" className="block text-sm font-medium text-gray-700">API Key (Leave blank to keep existing)</label>
                                <input
                                    id="api_key"
                                    type="password"
                                    value={data.api_key}
                                    onChange={e => setData('api_key', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="sk-..."
                                />
                            </div>

                            <div className="flex justify-end pt-4 border-t">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save Settings'}
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
