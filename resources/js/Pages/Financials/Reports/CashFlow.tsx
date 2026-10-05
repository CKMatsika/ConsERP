import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function CashFlow({ bankAccounts, totalCash }: any) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cash Flow & Bank Summary</h2>}
        >
            <Head title="Cash Flow" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white p-6 shadow-sm rounded-lg border space-y-6">
                        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg flex justify-between items-center">
                            <span className="font-medium text-indigo-900">Total Liquidity / Cash Position</span>
                            <span className="text-2xl font-bold text-indigo-700">${Number(totalCash).toLocaleString()}</span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Registered Bank Accounts</h3>
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 text-left">Bank Name</th>
                                    <th className="px-6 py-3 text-left">Account Number</th>
                                    <th className="px-6 py-3 text-left">Currency</th>
                                    <th className="px-6 py-3 text-right">Balance</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bankAccounts && bankAccounts.length > 0 ? (
                                    bankAccounts.map((b: any) => (
                                        <tr key={b.id}>
                                            <td className="px-6 py-3 font-medium text-gray-900">{b.bank_name}</td>
                                            <td className="px-6 py-3 text-gray-500">{b.account_number}</td>
                                            <td className="px-6 py-3 text-gray-500">{b.currency}</td>
                                            <td className="px-6 py-3 text-right font-semibold">${Number(b.balance).toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No bank accounts found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
