import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ salesOrder, customers, quotations }: any) {
    const { data, setData, put, processing, errors } = useForm({
        customer_id: salesOrder.customer_id || '',
        quotation_id: salesOrder.quotation_id || '',
        order_number: salesOrder.order_number || '',
        title: salesOrder.title || '',
        order_date: salesOrder.order_date || '',
        delivery_date: salesOrder.delivery_date || '',
        status: salesOrder.status || 'draft',
        subtotal: salesOrder.subtotal || '',
        tax_amount: salesOrder.tax_amount || '',
        total_amount: salesOrder.total_amount || '',
        notes: salesOrder.notes || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('sales-orders.update', salesOrder.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Sales Order</h2>}
        >
            <Head title="Edit Sales Order" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="order_number" className="block text-sm font-medium text-gray-700">Order Number *</label>
                                        <input
                                            id="order_number"
                                            type="text"
                                            value={data.order_number}
                                            onChange={e => setData('order_number', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                        {errors.order_number && <div className="text-red-500 text-xs mt-1">{errors.order_number}</div>}
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
                                            {customers.map((c: any) => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="quotation_id" className="block text-sm font-medium text-gray-700">Source Quotation</label>
                                        <select
                                            id="quotation_id"
                                            value={data.quotation_id}
                                            onChange={e => setData('quotation_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select Quotation (Optional)</option>
                                            {quotations.map((q: any) => (
                                                <option key={q.id} value={q.id}>{q.reference_number} - {q.title}</option>
                                            ))}
                                        </select>
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

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div>
                                        <label htmlFor="order_date" className="block text-sm font-medium text-gray-700">Order Date *</label>
                                        <input
                                            id="order_date"
                                            type="date"
                                            value={data.order_date}
                                            onChange={e => setData('order_date', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="delivery_date" className="block text-sm font-medium text-gray-700">Delivery Date</label>
                                        <input
                                            id="delivery_date"
                                            type="date"
                                            value={data.delivery_date}
                                            onChange={e => setData('delivery_date', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                            <option value="confirmed">Confirmed</option>
                                            <option value="fulfilled">Fulfilled</option>
                                            <option value="cancelled">Cancelled</option>
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
                                        href={route('sales-orders.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Update Sales Order'}
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
