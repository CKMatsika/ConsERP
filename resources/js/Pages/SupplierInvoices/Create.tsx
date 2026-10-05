import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ suppliers, purchaseOrders }: any) {
    const { data, setData, post, processing, errors } = useForm({
        supplier_id: '',
        purchase_order_id: '',
        invoice_number: 'SUP-INV-' + Math.floor(1000 + Math.random() * 9000),
        issue_date: new Date().toISOString().split('T')[0],
        due_date: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
        status: 'received',
        subtotal: '',
        tax_amount: '',
        total_amount: '',
        notes: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('supplier-invoices.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Receive Supplier Invoice</h2>}
        >
            <Head title="Receive Bill" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="invoice_number" className="block text-sm font-medium text-gray-700">Invoice Number *</label>
                                        <input
                                            id="invoice_number"
                                            type="text"
                                            value={data.invoice_number}
                                            onChange={e => setData('invoice_number', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                        {errors.invoice_number && <div className="text-red-500 text-xs mt-1">{errors.invoice_number}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="supplier_id" className="block text-sm font-medium text-gray-700">Supplier *</label>
                                        <select
                                            id="supplier_id"
                                            value={data.supplier_id}
                                            onChange={e => setData('supplier_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        >
                                            <option value="">Select Supplier</option>
                                            {suppliers.map((s: any) => (
                                                <option key={s.id} value={s.id}>{s.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="purchase_order_id" className="block text-sm font-medium text-gray-700">Purchase Order</label>
                                    <select
                                        id="purchase_order_id"
                                        value={data.purchase_order_id}
                                        onChange={e => setData('purchase_order_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="">Select Purchase Order (Optional)</option>
                                        {purchaseOrders.map((po: any) => (
                                            <option key={po.id} value={po.id}>{po.po_number} (${Number(po.total_amount).toLocaleString()})</option>
                                        ))}
                                    </select>
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

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
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
                                        <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">Due Date *</label>
                                        <input
                                            id="due_date"
                                            type="date"
                                            value={data.due_date}
                                            onChange={e => setData('due_date', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
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
                                            <option value="received">Received</option>
                                            <option value="approved">Approved</option>
                                            <option value="paid">Paid</option>
                                            <option value="overdue">Overdue</option>
                                        </select>
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
                                        href={route('supplier-invoices.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Bill'}
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
