import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ purchaseOrder, suppliers, projects, requisitions }: any) {
    const { data, setData, put, processing, errors } = useForm({
        purchase_requisition_id: purchaseOrder.purchase_requisition_id || '',
        supplier_id: purchaseOrder.supplier_id || '',
        project_id: purchaseOrder.project_id || '',
        po_number: purchaseOrder.po_number || '',
        order_date: purchaseOrder.order_date || '',
        delivery_date: purchaseOrder.delivery_date || '',
        status: purchaseOrder.status || 'draft',
        subtotal: purchaseOrder.subtotal || '',
        tax_amount: purchaseOrder.tax_amount || '',
        total_amount: purchaseOrder.total_amount || '',
        notes: purchaseOrder.notes || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('purchase-orders.update', purchaseOrder.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Purchase Order</h2>}
        >
            <Head title="Edit Purchase Order" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="po_number" className="block text-sm font-medium text-gray-700">PO Number *</label>
                                        <input
                                            id="po_number"
                                            type="text"
                                            value={data.po_number}
                                            onChange={e => setData('po_number', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                        {errors.po_number && <div className="text-red-500 text-xs mt-1">{errors.po_number}</div>}
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
                                        {errors.supplier_id && <div className="text-red-500 text-xs mt-1">{errors.supplier_id}</div>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                                        <label htmlFor="purchase_requisition_id" className="block text-sm font-medium text-gray-700">Source Requisition</label>
                                        <select
                                            id="purchase_requisition_id"
                                            value={data.purchase_requisition_id}
                                            onChange={e => setData('purchase_requisition_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select Requisition (Optional)</option>
                                            {requisitions.map((req: any) => (
                                                <option key={req.id} value={req.id}>{req.requisition_number} - {req.title}</option>
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
                                            <option value="sent">Sent</option>
                                            <option value="acknowledged">Acknowledged</option>
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
                                        href={route('purchase-orders.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Update Purchase Order'}
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
