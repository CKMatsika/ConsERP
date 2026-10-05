import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ valuation, projects, subcontractors }: any) {
    const { data, setData, put, processing, errors } = useForm({
        project_id: valuation.project_id || '',
        supplier_id: valuation.supplier_id || '',
        valuation_number: valuation.valuation_number || '',
        valuation_date: valuation.valuation_date || '',
        certified_amount: valuation.certified_amount || '',
        status: valuation.status || 'submitted',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('subcontractor-valuations.update', valuation.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Valuation</h2>}
        >
            <Head title="Edit Valuation" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                                    <div>
                                        <label htmlFor="supplier_id" className="block text-sm font-medium text-gray-700">Subcontractor *</label>
                                        <select
                                            id="supplier_id"
                                            value={data.supplier_id}
                                            onChange={e => setData('supplier_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        >
                                            <option value="">Select Subcontractor</option>
                                            {subcontractors.map((sub: any) => (
                                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                                            ))}
                                        </select>
                                        {errors.supplier_id && <div className="text-red-500 text-xs mt-1">{errors.supplier_id}</div>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div>
                                        <label htmlFor="valuation_number" className="block text-sm font-medium text-gray-700">Valuation # *</label>
                                        <input
                                            id="valuation_number"
                                            type="text"
                                            value={data.valuation_number}
                                            onChange={e => setData('valuation_number', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="valuation_date" className="block text-sm font-medium text-gray-700">Date *</label>
                                        <input
                                            id="valuation_date"
                                            type="date"
                                            value={data.valuation_date}
                                            onChange={e => setData('valuation_date', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="certified_amount" className="block text-sm font-medium text-gray-700">Certified Amount *</label>
                                        <input
                                            id="certified_amount"
                                            type="number"
                                            step="0.0001"
                                            value={data.certified_amount}
                                            onChange={e => setData('certified_amount', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
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
                                        <option value="submitted">Submitted</option>
                                        <option value="certified">Certified</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                </div>

                                <div className="flex justify-end gap-4 mt-6 border-t pt-4">
                                    <Link 
                                        href={route('subcontractor-valuations.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Update Valuation'}
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
