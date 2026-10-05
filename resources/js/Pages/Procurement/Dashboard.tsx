import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ metrics, recentPOs }: any) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Procurement Dashboard</h2>}
        >
            <Head title="Procurement Dashboard" />

            <div className="py-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Requisitions</span>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.requisitions_count}</p>
                        <Link href={route('purchase-requisitions.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Req →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Draft POs</span>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.pending_pos_count}</p>
                        <Link href={route('purchase-orders.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View POs →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Total PO Value</span>
                        <p className="text-2xl font-bold text-indigo-600 mt-1">${Number(metrics.total_po_value).toLocaleString()}</p>
                        <Link href={route('purchase-orders.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View POs →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Pending GRNs</span>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.pending_grns_count}</p>
                        <Link href={route('goods-receipt-notes.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View GRNs →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Unpaid Bills</span>
                        <p className="text-2xl font-bold text-red-600 mt-1">${Number(metrics.unpaid_bills_value).toLocaleString()}</p>
                        <Link href={route('supplier-invoices.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Bills →</Link>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-wrap gap-2 items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Quick Actions:</span>
                    <div className="flex gap-2">
                        <Link href={route('purchase-requisitions.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ New Requisition</Link>
                        <Link href={route('purchase-orders.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Create PO</Link>
                        <Link href={route('goods-receipt-notes.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Record GRN</Link>
                        <Link href={route('supplier-invoices.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Receive Bill</Link>
                        <Link href={route('supplier-payments.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Record Payment</Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 text-sm">Recent Purchase Orders</h3>
                        <Link href={route('purchase-orders.index')} className="text-xs text-indigo-600 hover:underline">View all</Link>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3 text-left">PO #</th>
                                <th className="px-6 py-3 text-left">Supplier</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-right">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentPOs && recentPOs.length > 0 ? (
                                recentPOs.map((po: any) => (
                                    <tr key={po.id}>
                                        <td className="px-6 py-3 font-medium text-gray-900">{po.po_number}</td>
                                        <td className="px-6 py-3 text-gray-500">{po.supplier?.name || '-'}</td>
                                        <td className="px-6 py-3"><span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-semibold">{po.status}</span></td>
                                        <td className="px-6 py-3 text-right font-semibold">${Number(po.total_amount).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No recent purchase orders.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
