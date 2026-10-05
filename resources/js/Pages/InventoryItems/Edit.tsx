import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ inventoryItem }: any) {
    const { data, setData, put, processing, errors } = useForm({
        sku: inventoryItem.sku || '',
        name: inventoryItem.name || '',
        unit: inventoryItem.unit || '',
        unit_cost: inventoryItem.unit_cost || '',
        reorder_level: inventoryItem.reorder_level ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('inventory-items.update', inventoryItem.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Inventory Item</h2>}
        >
            <Head title="Edit Inventory Item" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU *</label>
                                        <input
                                            id="sku"
                                            type="text"
                                            value={data.sku}
                                            onChange={e => setData('sku', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                        {errors.sku && <div className="text-red-500 text-xs mt-1">{errors.sku}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Item Name *</label>
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
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div>
                                        <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Unit *</label>
                                        <input
                                            id="unit"
                                            type="text"
                                            value={data.unit}
                                            onChange={e => setData('unit', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="unit_cost" className="block text-sm font-medium text-gray-700">Unit Cost *</label>
                                        <input
                                            id="unit_cost"
                                            type="number"
                                            step="0.0001"
                                            value={data.unit_cost}
                                            onChange={e => setData('unit_cost', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="reorder_level" className="block text-sm font-medium text-gray-700">Reorder Level</label>
                                        <input
                                            id="reorder_level"
                                            type="number"
                                            step="0.0001"
                                            value={data.reorder_level}
                                            onChange={e => setData('reorder_level', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mt-6 border-t pt-4">
                                    <Link 
                                        href={route('inventory-items.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Update Item'}
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
