import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ metrics, recentJournals }: any) {
    const isBalanced = Number(metrics.total_debits) === Number(metrics.total_credits);

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Financials & Accounting Dashboard</h2>}
        >
            <Head title="Financials Dashboard" />

            <div className="py-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Chart of Accounts</span>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.accounts_count}</p>
                        <Link href={route('accounts.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Accounts →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Accounts Receivable (AR)</span>
                        <p className="text-2xl font-bold text-indigo-600 mt-1">${Number(metrics.total_ar).toLocaleString()}</p>
                        <Link href={route('sales-invoices.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Invoices →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Accounts Payable (AP)</span>
                        <p className="text-2xl font-bold text-red-600 mt-1">${Number(metrics.total_ap).toLocaleString()}</p>
                        <Link href={route('supplier-invoices.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Bills →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Trial Balance Status</span>
                        <p className={`text-xl font-bold mt-1 ${isBalanced ? 'text-green-600' : 'text-red-600'}`}>
                            {isBalanced ? 'Balanced ✓' : 'Unbalanced ✗'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Dr: ${Number(metrics.total_debits).toLocaleString()} | Cr: ${Number(metrics.total_credits).toLocaleString()}</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-wrap gap-2 items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Financial Actions:</span>
                    <div className="flex gap-2">
                        <Link href={route('accounts.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Create Account</Link>
                        <Link href={route('journals.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Post Journal Entry</Link>
                        <Link href={route('customer-payments.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Record Customer Payment (AR)</Link>
                        <Link href={route('supplier-payments.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Record Supplier Payment (AP)</Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 text-sm">Recent Journals</h3>
                        <Link href={route('journals.index')} className="text-xs text-indigo-600 hover:underline">View all</Link>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3 text-left">Ref #</th>
                                <th className="px-6 py-3 text-left">Date</th>
                                <th className="px-6 py-3 text-left">Description</th>
                                <th className="px-6 py-3 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentJournals && recentJournals.length > 0 ? (
                                recentJournals.map((j: any) => (
                                    <tr key={j.id}>
                                        <td className="px-6 py-3 font-medium text-gray-900">{j.reference}</td>
                                        <td className="px-6 py-3 text-gray-500">{j.date}</td>
                                        <td className="px-6 py-3 text-gray-500 truncate max-w-xs">{j.description || '-'}</td>
                                        <td className="px-6 py-3 text-right"><span className={`px-2 py-0.5 rounded text-xs font-semibold ${j.status === 'posted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{j.status}</span></td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No journals found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
