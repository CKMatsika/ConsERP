import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ quotation, customers, prospects }: any) {
    const { data, setData, put, processing, errors } = useForm({
        customer_id: quotation.customer_id || '',
        prospect_id: quotation.prospect_id || '',
        reference_number: quotation.reference_number || '',
        title: quotation.title || '',
        status: quotation.status || 'draft',
        issue_date: quotation.issue_date || '',
        valid_until: quotation.valid_until || '',
        subtotal: quotation.subtotal || '',
        tax_amount: quotation.tax_amount || '',
        total_amount: quotation.total_amount || '',
        notes: quotation.notes || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('quotations.update', quotation.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Quotation</h2>}
        >
            <Head title="Edit Quotation" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="reference_number" className="block text-sm font-medium text-gray-700">Reference Number *</label>
                                        <input
                                            id="reference_number"
                                            type="text"
                                            value={data.reference_number}
                                            onChange={e => setData('reference_number', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                        {errors.reference_number && <div className="text-red-500 text-xs mt-1">{errors.reference_number}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title *</label>
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
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700">Customer *</label>
                                        <select
                                            id="customer_id"
                                            value={data.customer_id}
                                            onChange={e => setData('customer_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        >
                                            <option value="">Select Customer</option>
                                            {customers.map((customer: any) => (
                                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                                            ))}
                                        </select>
                                        {errors.customer_id && <div className="text-red-500 text-xs mt-1">{errors.customer_id}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="prospect_id" className="block text-sm font-medium text-gray-700">Prospect / Opportunity</label>
                                        <select
                                            id="prospect_id"
                                            value={data.prospect_id}
                                            onChange={e => setData('prospect_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select Prospect (Optional)</option>
                                            {prospects.map((prospect: any) => (
                                                <option key={prospect.id} value={prospect.id}>{prospect.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="issue_date" className="block text-sm font-medium text-gray-700">Issue Date *</label>
                                        <input
                                            id="issue_date"
                                            type="date"
                                            value={data.issue_date}
                                            onChange={e => setData('issue_date', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="valid_until" className="block text-sm font-medium text-gray-700">Valid Until</label>
                                        <input
                                            id="valid_until"
                                            type="date"
                                            value={data.valid_until}
                                            onChange={e => setData('valid_until', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div>
                                        <label htmlFor="subtotal" className="block text-sm font-medium text-gray-700">Subtotal *</label>
                                        <input
                                            id="subtotal"
                                            type="number"
                                            step="0.0001"
                                            value={data.subtotal}
                                            onChange={e => setData('subtotal', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="tax_amount" className="block text-sm font-medium text-gray-700">Tax Amount *</label>
                                        <input
                                            id="tax_amount"
                                            type="number"
                                            step="0.0001"
                                            value={data.tax_amount}
                                            onChange={e => setData('tax_amount', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="total_amount" className="block text-sm font-medium text-gray-700">Total Amount *</label>
                                        <input
                                            id="total_amount"
                                            type="number"
                                            step="0.0001"
                                            value={data.total_amount}
                                            onChange={e => setData('total_amount', e.target.value)}
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
                                        <option value="draft">Draft</option>
                                        <option value="sent">Sent</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="revised">Revised</option>
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
                                        href={route('quotations.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Update Quotation'}
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
