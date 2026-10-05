import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ customers, invoices }: any) {
    const { data, setData, post, processing, errors } = useForm({
        customer_id: '',
        sales_invoice_id: '',
        credit_note_number: 'CN-' + Math.floor(1000 + Math.random() * 9000),
        issue_date: new Date().toISOString().split('T')[0],
        amount: '',
        reason: '',
        status: 'draft',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('credit-notes.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Issue Credit Note</h2>}
        >
            <Head title="Issue Credit Note" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="credit_note_number" className="block text-sm font-medium text-gray-700">Credit Note # *</label>
                                        <input
                                            id="credit_note_number"
                                            type="text"
                                            value={data.credit_note_number}
                                            onChange={e => setData('credit_note_number', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                        {errors.credit_note_number && <div className="text-red-500 text-xs mt-1">{errors.credit_note_number}</div>}
                                    </div>
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
                                            {customers.map((c: any) => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div>
                                        <label htmlFor="sales_invoice_id" className="block text-sm font-medium text-gray-700">Invoice Ref</label>
                                        <select
                                            id="sales_invoice_id"
                                            value={data.sales_invoice_id}
                                            onChange={e => setData('sales_invoice_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select Invoice (Optional)</option>
                                            {invoices.map((inv: any) => (
                                                <option key={inv.id} value={inv.id}>{inv.invoice_number} (${Number(inv.total_amount).toLocaleString()})</option>
                                            ))}
                                        </select>
                                    </div>
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
                                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount *</label>
                                        <input
                                            id="amount"
                                            type="number"
                                            step="0.0001"
                                            value={data.amount}
                                            onChange={e => setData('amount', e.target.value)}
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
                                        <option value="approved">Approved</option>
                                        <option value="applied">Applied</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
                                    <textarea
                                        id="reason"
                                        value={data.reason}
                                        onChange={e => setData('reason', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        rows={3}
                                    />
                                </div>

                                <div className="flex justify-end gap-4 mt-6 border-t pt-4">
                                    <Link 
                                        href={route('credit-notes.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Credit Note'}
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
