import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ stockMovement, items, warehouses }: any) {
    const { data, setData, put, processing, errors } = useForm({
        inventory_item_id: stockMovement.inventory_item_id || '',
        warehouse_id: stockMovement.warehouse_id || '',
        movement_type: stockMovement.movement_type || 'in',
        quantity: stockMovement.quantity || '',
        reference: stockMovement.reference || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('stock-movements.update', stockMovement.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Stock Movement</h2>}
        >
            <Head title="Edit Stock Movement" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="inventory_item_id" className="block text-sm font-medium text-gray-700">Inventory Item *</label>
                                        <select
                                            id="inventory_item_id"
                                            value={data.inventory_item_id}
                                            onChange={e => setData('inventory_item_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        >
                                            <option value="">Select Item</option>
                                            {items.map((item: any) => (
                                                <option key={item.id} value={item.id}>{item.sku} - {item.name}</option>
                                            ))}
                                        </select>
                                        {errors.inventory_item_id && <div className="text-red-500 text-xs mt-1">{errors.inventory_item_id}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="warehouse_id" className="block text-sm font-medium text-gray-700">Warehouse *</label>
                                        <select
                                            id="warehouse_id"
                                            value={data.warehouse_id}
                                            onChange={e => setData('warehouse_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        >
                                            <option value="">Select Warehouse</option>
                                            {warehouses.map((wh: any) => (
                                                <option key={wh.id} value={wh.id}>{wh.name}</option>
                                            ))}
                                        </select>
                                        {errors.warehouse_id && <div className="text-red-500 text-xs mt-1">{errors.warehouse_id}</div>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div>
                                        <label htmlFor="movement_type" className="block text-sm font-medium text-gray-700">Type *</label>
                                        <select
                                            id="movement_type"
                                            value={data.movement_type}
                                            onChange={e => setData('movement_type', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="in">In</option>
                                            <option value="out">Out</option>
                                            <option value="transfer">Transfer</option>
                                            <option value="adjustment">Adjustment</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity *</label>
                                        <input
                                            id="quantity"
                                            type="number"
                                            step="0.0001"
                                            value={data.quantity}
                                            onChange={e => setData('quantity', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="reference" className="block text-sm font-medium text-gray-700">Reference</label>
                                        <input
                                            id="reference"
                                            type="text"
                                            value={data.reference}
                                            onChange={e => setData('reference', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mt-6 border-t pt-4">
                                    <Link 
                                        href={route('stock-movements.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Update Movement'}
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
