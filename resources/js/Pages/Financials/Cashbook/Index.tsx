import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function CashbookIndex({ bankAccounts, entries, selectedBankId }: any) {
    const handleBankChange = (e: any) => {
        const bankId = e.target.value;
        router.get(route('financials.cashbook'), { bank_account_id: bankId }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cashbook & Bank Transactions</h2>}
        >
            <Head title="Cashbook" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white p-4 shadow-sm rounded-lg border flex items-center gap-4">
                        <label className="text-sm font-medium text-gray-700">Filter by Bank Account:</label>
                        <select
                            value={selectedBankId || ''}
                            onChange={handleBankChange}
                            className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">All Bank & Cash Transactions</option>
                            {bankAccounts.map((b: any) => (
                                <option key={b.id} value={b.id}>{b.bank_name} ({b.account_number})</option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 text-left">Journal Ref</th>
                                    <th className="px-6 py-3 text-left">Account</th>
                                    <th className="px-6 py-3 text-left">Description</th>
                                    <th className="px-6 py-3 text-right">Debit ($)</th>
                                    <th className="px-6 py-3 text-right">Credit ($)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {entries.data && entries.data.length > 0 ? (
                                    entries.data.map((en: any) => (
                                        <tr key={en.id}>
                                            <td className="px-6 py-3 font-medium text-gray-900">{en.journal?.reference || '-'}</td>
                                            <td className="px-6 py-3 text-gray-500">{en.account?.code} - {en.account?.name}</td>
                                            <td className="px-6 py-3 text-gray-500">{en.journal?.description || '-'}</td>
                                            <td className="px-6 py-3 text-right text-gray-900">{Number(en.debit) > 0 ? Number(en.debit).toLocaleString() : '-'}</td>
                                            <td className="px-6 py-3 text-right text-gray-900">{Number(en.credit) > 0 ? Number(en.credit).toLocaleString() : '-'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No cashbook entries found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
