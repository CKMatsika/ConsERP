import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ metrics, recentQuotations }: any) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Sales & CRM Dashboard</h2>}
        >
            <Head title="Sales & CRM Dashboard" />

            <div className="py-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Leads</span>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.leads_count}</p>
                        <Link href={route('leads.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Leads →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Prospects</span>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.prospects_count}</p>
                        <Link href={route('prospects.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Prospects →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Quotations</span>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.quotations_count}</p>
                        <Link href={route('quotations.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Quotations →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Sales Orders Value</span>
                        <p className="text-2xl font-bold text-indigo-600 mt-1">${Number(metrics.sales_orders_value).toLocaleString()}</p>
                        <Link href={route('sales-orders.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Orders →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Unpaid Invoices</span>
                        <p className="text-2xl font-bold text-red-600 mt-1">${Number(metrics.unpaid_invoices_value).toLocaleString()}</p>
                        <Link href={route('sales-invoices.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Invoices →</Link>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-wrap gap-2 items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Quick Actions:</span>
                    <div className="flex gap-2">
                        <Link href={route('leads.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ New Lead</Link>
                        <Link href={route('quotations.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ New Quotation</Link>
                        <Link href={route('sales-orders.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ New Sales Order</Link>
                        <Link href={route('sales-invoices.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Create Invoice</Link>
                        <Link href={route('customer-payments.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Record Payment</Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 text-sm">Recent Quotations</h3>
                        <Link href={route('quotations.index')} className="text-xs text-indigo-600 hover:underline">View all</Link>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3 text-left">Ref #</th>
                                <th className="px-6 py-3 text-left">Title</th>
                                <th className="px-6 py-3 text-left">Customer</th>
                                <th className="px-6 py-3 text-right">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentQuotations && recentQuotations.length > 0 ? (
                                recentQuotations.map((q: any) => (
                                    <tr key={q.id}>
                                        <td className="px-6 py-3 font-medium text-gray-900">{q.reference_number}</td>
                                        <td className="px-6 py-3 text-gray-900">{q.title}</td>
                                        <td className="px-6 py-3 text-gray-500">{q.customer?.name || '-'}</td>
                                        <td className="px-6 py-3 text-right font-semibold">${Number(q.total_amount).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No recent quotations.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
