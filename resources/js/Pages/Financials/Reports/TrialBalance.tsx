import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function TrialBalance({ accounts, totalDebit, totalCredit }: any) {
    const isBalanced = Number(totalDebit) === Number(totalCredit);

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Trial Balance Report</h2>}
        >
            <Head title="Trial Balance" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white p-4 shadow-sm rounded-lg border flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Balance Verification:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isBalanced ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {isBalanced ? 'Balanced ✓' : 'Unbalanced ✗'}
                        </span>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 text-left">Code</th>
                                    <th className="px-6 py-3 text-left">Account Name</th>
                                    <th className="px-6 py-3 text-left">Type</th>
                                    <th className="px-6 py-3 text-right">Debit ($)</th>
                                    <th className="px-6 py-3 text-right">Credit ($)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {accounts && accounts.length > 0 ? (
                                    accounts.map((acc: any) => (
                                        <tr key={acc.id}>
                                            <td className="px-6 py-3 font-medium text-gray-900">{acc.code}</td>
                                            <td className="px-6 py-3 text-gray-900">{acc.name}</td>
                                            <td className="px-6 py-3 uppercase text-xs text-gray-500">{acc.type}</td>
                                            <td className="px-6 py-3 text-right text-gray-900">{Number(acc.debit) > 0 ? Number(acc.debit).toLocaleString() : '-'}</td>
                                            <td className="px-6 py-3 text-right text-gray-900">{Number(acc.credit) > 0 ? Number(acc.credit).toLocaleString() : '-'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No accounts found.</td></tr>
                                )}
                            </tbody>
                            <tfoot className="bg-gray-50 font-bold">
                                <tr>
                                    <td colSpan={3} className="px-6 py-3 text-gray-900">Total</td>
                                    <td className="px-6 py-3 text-right text-gray-900">${Number(totalDebit).toLocaleString()}</td>
                                    <td className="px-6 py-3 text-right text-gray-900">${Number(totalCredit).toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
