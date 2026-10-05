import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';

export default function Reconciliation({ bankAccounts, statementLines, selectedBankId }: any) {
    const { data, setData, post, processing, reset } = useForm({
        bank_account_id: selectedBankId || '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        amount: '',
    });

    const handleBankChange = (e: any) => {
        const bankId = e.target.value;
        setData('bank_account_id', bankId);
        router.get(route('financials.bank-reconciliation'), { bank_account_id: bankId }, { preserveState: true });
    };

    const submitLine = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('financials.bank-statement-line.store'), {
            onSuccess: () => reset('description', 'amount'),
        });
    };

    const toggleReconcile = (lineId: number) => {
        router.post(route('financials.bank-reconciliation.toggle', lineId), {}, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bank Reconciliation</h2>}
        >
            <Head title="Bank Reconciliation" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white p-4 shadow-sm rounded-lg border flex items-center gap-4">
                        <label className="text-sm font-medium text-gray-700">Select Bank Account:</label>
                        <select
                            value={selectedBankId || ''}
                            onChange={handleBankChange}
                            className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Bank Account</option>
                            {bankAccounts.map((b: any) => (
                                <option key={b.id} value={b.id}>{b.bank_name} ({b.account_number})</option>
                            ))}
                        </select>
                    </div>

                    {selectedBankId && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Import statement line */}
                            <div className="bg-white p-6 shadow-sm rounded-lg border h-fit">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Add Statement Line</h3>
                                <form onSubmit={submitLine} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                                        <input
                                            type="date"
                                            value={data.date}
                                            onChange={e => setData('date', e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                                        <input
                                            type="text"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                            placeholder="e.g., Customer Wire / Supplier Payment"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Amount (+/-)</label>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            value={data.amount}
                                            onChange={e => setData('amount', e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition"
                                    >
                                        Add Line
                                    </button>
                                </form>
                            </div>

                            {/* Statement lines list for reconciliation */}
                            <div className="lg:col-span-2 bg-white shadow-sm rounded-lg border p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Statement Lines & Reconciliation</h3>
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                        <tr>
                                            <th className="px-4 py-3 text-left">Date</th>
                                            <th className="px-4 py-3 text-left">Description</th>
                                            <th className="px-4 py-3 text-right">Amount</th>
                                            <th className="px-4 py-3 text-center">Status</th>
                                            <th className="px-4 py-3 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {statementLines && statementLines.length > 0 ? (
                                            statementLines.map((line: any) => (
                                                <tr key={line.id}>
                                                    <td className="px-4 py-3 text-gray-500">{line.date}</td>
                                                    <td className="px-4 py-3 text-gray-900 font-medium">{line.description}</td>
                                                    <td className="px-4 py-3 text-right font-semibold">${Number(line.amount).toLocaleString()}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${line.is_reconciled ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                            {line.is_reconciled ? 'Reconciled ✓' : 'Unreconciled'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <button
                                                            onClick={() => toggleReconcile(line.id)}
                                                            className={`px-3 py-1 rounded text-xs font-medium transition ${
                                                                line.is_reconciled ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                                            }`}
                                                        >
                                                            {line.is_reconciled ? 'Unreconcile' : 'Reconcile'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No statement lines found for this bank account.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
