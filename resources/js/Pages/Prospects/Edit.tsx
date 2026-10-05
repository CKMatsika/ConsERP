import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ prospect, leads, customers }: any) {
    const { data, setData, put, processing, errors } = useForm({
        lead_id: prospect.lead_id || '',
        customer_id: prospect.customer_id || '',
        name: prospect.name || '',
        probability: prospect.probability ?? '',
        expected_close_date: prospect.expected_close_date || '',
        stage: prospect.stage || 'prospecting',
        value: prospect.value || '',
        notes: prospect.notes || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('prospects.update', prospect.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Prospect</h2>}
        >
            <Head title="Edit Prospect" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Prospect Name *</label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="lead_id" className="block text-sm font-medium text-gray-700">Source Lead</label>
                                        <select
                                            id="lead_id"
                                            value={data.lead_id}
                                            onChange={e => setData('lead_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select Lead (Optional)</option>
                                            {leads.map((lead: any) => (
                                                <option key={lead.id} value={lead.id}>{lead.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700">Customer</label>
                                        <select
                                            id="customer_id"
                                            value={data.customer_id}
                                            onChange={e => setData('customer_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select Customer (Optional)</option>
                                            {customers.map((customer: any) => (
                                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="stage" className="block text-sm font-medium text-gray-700">Stage *</label>
                                        <select
                                            id="stage"
                                            value={data.stage}
                                            onChange={e => setData('stage', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="prospecting">Prospecting</option>
                                            <option value="qualification">Qualification</option>
                                            <option value="proposal">Proposal</option>
                                            <option value="negotiation">Negotiation</option>
                                            <option value="closed_won">Closed Won</option>
                                            <option value="closed_lost">Closed Lost</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="probability" className="block text-sm font-medium text-gray-700">Probability (%)</label>
                                        <input
                                            id="probability"
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={data.probability}
                                            onChange={e => setData('probability', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="value" className="block text-sm font-medium text-gray-700">Value</label>
                                        <input
                                            id="value"
                                            type="number"
                                            step="0.0001"
                                            value={data.value}
                                            onChange={e => setData('value', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="expected_close_date" className="block text-sm font-medium text-gray-700">Expected Close Date</label>
                                        <input
                                            id="expected_close_date"
                                            type="date"
                                            value={data.expected_close_date}
                                            onChange={e => setData('expected_close_date', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
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
                                        href={route('prospects.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Update Prospect'}
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
