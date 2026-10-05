import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ projects }: any) {
    const { data, setData, post, processing, errors } = useForm({
        project_id: '',
        title: '',
        file_path: '',
        file_type: 'pdf',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('documents.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Upload Document</h2>}
        >
            <Head title="Upload Document" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div>
                                    <label htmlFor="project_id" className="block text-sm font-medium text-gray-700">Project</label>
                                    <select
                                        id="project_id"
                                        value={data.project_id}
                                        onChange={e => setData('project_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="">Select Project (Optional)</option>
                                        {projects.map((p: any) => (
                                            <option key={p.id} value={p.id}>{p.code} - {p.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Document Title *</label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                    {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="file_path" className="block text-sm font-medium text-gray-700">File Path / URL *</label>
                                        <input
                                            id="file_path"
                                            type="text"
                                            value={data.file_path}
                                            onChange={e => setData('file_path', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="/storage/docs/sample.pdf"
                                            required
                                        />
                                        {errors.file_path && <div className="text-red-500 text-xs mt-1">{errors.file_path}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="file_type" className="block text-sm font-medium text-gray-700">File Type</label>
                                        <input
                                            id="file_type"
                                            type="text"
                                            value={data.file_type}
                                            onChange={e => setData('file_type', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mt-6 border-t pt-4">
                                    <Link 
                                        href={route('documents.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Upload'}
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
