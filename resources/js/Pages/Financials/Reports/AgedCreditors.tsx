import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AgedCreditors({ bills, totalAp }: any) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Aged Creditors (AP Ageing)</h2>}
        >
            <Head title="Aged Creditors" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex justify-between items-center">
                        <span className="font-medium text-red-900">Total Outstanding AP (Bills Due)</span>
                        <span className="text-2xl font-bold text-red-700">${Number(totalAp).toLocaleString()}</span>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 text-left">Supplier</th>
                                    <th className="px-6 py-3 text-left">Bill #</th>
                                    <th className="px-6 py-3 text-left">Due Date</th>
                                    <th className="px-6 py-3 text-right">Total Amount</th>
                                    <th className="px-6 py-3 text-right">Amount Due</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bills && bills.length > 0 ? (
                                    bills.map((b: any) => {
                                        const due = Number(b.total_amount) - Number(b.amount_paid);
                                        return (
                                            <tr key={b.id}>
                                                <td className="px-6 py-3 font-medium text-gray-900">{b.supplier?.name || '-'}</td>
                                                <td className="px-6 py-3 text-gray-900">{b.invoice_number}</td>
                                                <td className="px-6 py-3 text-gray-500">{b.due_date}</td>
                                                <td className="px-6 py-3 text-right text-gray-500">${Number(b.total_amount).toLocaleString()}</td>
                                                <td className="px-6 py-3 text-right font-semibold text-red-600">${due.toLocaleString()}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No outstanding bills.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
