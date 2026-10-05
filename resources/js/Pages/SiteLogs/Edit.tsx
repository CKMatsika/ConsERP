import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ siteLog, projects }: any) {
    const { data, setData, put, processing, errors } = useForm({
        project_id: siteLog.project_id || '',
        log_date: siteLog.log_date || '',
        weather: siteLog.weather || '',
        work_performed: siteLog.work_performed || '',
        issues: siteLog.issues || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('site-logs.update', siteLog.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Site Log</h2>}
        >
            <Head title="Edit Site Log" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div>
                                    <label htmlFor="project_id" className="block text-sm font-medium text-gray-700">Project *</label>
                                    <select
                                        id="project_id"
                                        value={data.project_id}
                                        onChange={e => setData('project_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    >
                                        <option value="">Select Project</option>
                                        {projects.map((p: any) => (
                                            <option key={p.id} value={p.id}>{p.code} - {p.name}</option>
                                        ))}
                                    </select>
                                    {errors.project_id && <div className="text-red-500 text-xs mt-1">{errors.project_id}</div>}
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="log_date" className="block text-sm font-medium text-gray-700">Log Date *</label>
                                        <input
                                            id="log_date"
                                            type="date"
                                            value={data.log_date}
                                            onChange={e => setData('log_date', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="weather" className="block text-sm font-medium text-gray-700">Weather</label>
                                        <input
                                            id="weather"
                                            type="text"
                                            value={data.weather}
                                            onChange={e => setData('weather', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="work_performed" className="block text-sm font-medium text-gray-700">Work Performed *</label>
                                    <textarea
                                        id="work_performed"
                                        value={data.work_performed}
                                        onChange={e => setData('work_performed', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        rows={4}
                                        required
                                    />
                                    {errors.work_performed && <div className="text-red-500 text-xs mt-1">{errors.work_performed}</div>}
                                </div>

                                <div>
                                    <label htmlFor="issues" className="block text-sm font-medium text-gray-700">Issues / Delays</label>
                                    <textarea
                                        id="issues"
                                        value={data.issues}
                                        onChange={e => setData('issues', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        rows={3}
                                    />
                                </div>

                                <div className="flex justify-end gap-4 mt-6 border-t pt-4">
                                    <Link 
                                        href={route('site-logs.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Update Site Log'}
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
