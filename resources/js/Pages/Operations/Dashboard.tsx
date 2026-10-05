import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ metrics, recentItems }: any) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Operations & Assets Dashboard</h2>}
        >
            <Head title="Operations Dashboard" />

            <div className="py-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Warehouses</span>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.warehouses_count}</p>
                        <Link href={route('warehouses.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Warehouses →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Inventory Items</span>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.inventory_items_count}</p>
                        <Link href={route('inventory-items.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Items →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Prefab Products</span>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.prefab_products_count}</p>
                        <Link href={route('prefab-products.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Products →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Equipment & Fleet</span>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.equipment_count}</p>
                        <Link href={route('equipment.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Equipment →</Link>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-wrap gap-2 items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Quick Actions:</span>
                    <div className="flex gap-2">
                        <Link href={route('warehouses.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Add Warehouse</Link>
                        <Link href={route('inventory-items.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Add Item</Link>
                        <Link href={route('stock-movements.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Record Movement</Link>
                        <Link href={route('prefab-products.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Add Prefab Product</Link>
                        <Link href={route('equipment.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Add Equipment</Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 text-sm">Recent Inventory Items</h3>
                        <Link href={route('inventory-items.index')} className="text-xs text-indigo-600 hover:underline">View all</Link>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3 text-left">SKU</th>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Unit</th>
                                <th className="px-6 py-3 text-right">Unit Cost</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentItems && recentItems.length > 0 ? (
                                recentItems.map((item: any) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-3 font-medium text-gray-900">{item.sku}</td>
                                        <td className="px-6 py-3 text-gray-900">{item.name}</td>
                                        <td className="px-6 py-3 text-gray-500">{item.unit}</td>
                                        <td className="px-6 py-3 text-right font-semibold">${Number(item.unit_cost).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No inventory items found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
