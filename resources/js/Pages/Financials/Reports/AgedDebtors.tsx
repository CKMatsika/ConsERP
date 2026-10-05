import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AgedDebtors({ invoices, totalAr }: any) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Aged Debtors (AR Ageing)</h2>}
        >
            <Head title="Aged Debtors" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg flex justify-between items-center">
                        <span className="font-medium text-indigo-900">Total Outstanding AR</span>
                        <span className="text-2xl font-bold text-indigo-700">${Number(totalAr).toLocaleString()}</span>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 text-left">Customer</th>
                                    <th className="px-6 py-3 text-left">Invoice #</th>
                                    <th className="px-6 py-3 text-left">Due Date</th>
                                    <th className="px-6 py-3 text-right">Total Amount</th>
                                    <th className="px-6 py-3 text-right">Amount Due</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {invoices && invoices.length > 0 ? (
                                    invoices.map((inv: any) => {
                                        const due = Number(inv.total_amount) - Number(inv.amount_paid);
                                        return (
                                            <tr key={inv.id}>
                                                <td className="px-6 py-3 font-medium text-gray-900">{inv.customer?.name || '-'}</td>
                                                <td className="px-6 py-3 text-gray-900">{inv.invoice_number}</td>
                                                <td className="px-6 py-3 text-gray-500">{inv.due_date}</td>
                                                <td className="px-6 py-3 text-right text-gray-500">${Number(inv.total_amount).toLocaleString()}</td>
                                                <td className="px-6 py-3 text-right font-semibold text-red-600">${due.toLocaleString()}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No outstanding invoices.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
