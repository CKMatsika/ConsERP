import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ products }: any) {
    const { data, setData, post, processing, errors } = useForm({
        prefab_product_id: '',
        order_number: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
        quantity: 1,
        status: 'planned',
        due_date: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('production-orders.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Production Order</h2>}
        >
            <Head title="Create Production Order" />

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
                                        <label htmlFor="prefab_product_id" className="block text-sm font-medium text-gray-700">Prefab Product *</label>
                                        <select
                                            id="prefab_product_id"
                                            value={data.prefab_product_id}
                                            onChange={e => setData('prefab_product_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        >
                                            <option value="">Select Product</option>
                                            {products.map((p: any) => (
                                                <option key={p.id} value={p.id}>{p.sku} - {p.name}</option>
                                            ))}
                                        </select>
                                        {errors.prefab_product_id && <div className="text-red-500 text-xs mt-1">{errors.prefab_product_id}</div>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div>
                                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity *</label>
                                        <input
                                            id="quantity"
                                            type="number"
                                            step="0.0001"
                                            value={data.quantity}
                                            onChange={e => setData('quantity', Number(e.target.value))}
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
                                            <option value="planned">Planned</option>
                                            <option value="in_production">In Production</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">Due Date</label>
                                        <input
                                            id="due_date"
                                            type="date"
                                            value={data.due_date}
                                            onChange={e => setData('due_date', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mt-6 border-t pt-4">
                                    <Link 
                                        href={route('production-orders.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Order'}
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
