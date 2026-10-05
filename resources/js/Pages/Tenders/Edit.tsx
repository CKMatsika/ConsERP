import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ tender }: any) {
    const { data, setData, put, processing, errors } = useForm({
        title: tender.title || '',
        client_name: tender.client_name || '',
        submission_deadline: tender.submission_deadline ? tender.submission_deadline.substring(0, 16) : '',
        estimated_value: tender.estimated_value || '',
        status: tender.status || 'preparing',
        notes: tender.notes || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('tenders.update', tender.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Tender</h2>}
        >
            <Head title="Edit Tender" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tender Title *</label>
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

                                <div>
                                    <label htmlFor="client_name" className="block text-sm font-medium text-gray-700">Client Name *</label>
                                    <input
                                        id="client_name"
                                        type="text"
                                        value={data.client_name}
                                        onChange={e => setData('client_name', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                    {errors.client_name && <div className="text-red-500 text-xs mt-1">{errors.client_name}</div>}
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="submission_deadline" className="block text-sm font-medium text-gray-700">Submission Deadline</label>
                                        <input
                                            id="submission_deadline"
                                            type="datetime-local"
                                            value={data.submission_deadline}
                                            onChange={e => setData('submission_deadline', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="estimated_value" className="block text-sm font-medium text-gray-700">Estimated Value</label>
                                        <input
                                            id="estimated_value"
                                            type="number"
                                            step="0.0001"
                                            value={data.estimated_value}
                                            onChange={e => setData('estimated_value', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status *</label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="preparing">Preparing</option>
                                        <option value="submitted">Submitted</option>
                                        <option value="awarded">Awarded</option>
                                        <option value="lost">Lost</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                                    <textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        rows={3}
                                    />
                                </div>

                                <div className="flex justify-end gap-4 mt-6 border-t pt-4">
                                    <Link 
                                        href={route('tenders.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Update Tender'}
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
