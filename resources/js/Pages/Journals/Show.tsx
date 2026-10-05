import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ journal }: any) {
    const totalDebit = journal.entries.reduce((sum: number, e: any) => sum + Number(e.debit), 0);
    const totalCredit = journal.entries.reduce((sum: number, e: any) => sum + Number(e.credit), 0);

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Journal #{journal.reference}</h2>}
        >
            <Head title={`Journal ${journal.reference}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 space-y-6">
                        
                        <div className="flex justify-between items-center border-b pb-4">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{journal.reference}</h3>
                                <p className="text-sm text-gray-500">Date: {journal.date}</p>
                            </div>
                            <div>
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${journal.status === 'posted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {journal.status.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {journal.description && (
                            <div>
                                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Description</h4>
                                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{journal.description}</p>
                            </div>
                        )}

                        <div>
                            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Double-Entry Lines</h4>
                            <table className="min-w-full divide-y divide-gray-200 border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {journal.entries.map((entry: any) => (
                                        <tr key={entry.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {entry.account ? `${entry.account.code} - ${entry.account.name}` : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                                                {Number(entry.debit) > 0 ? `$${Number(entry.debit).toLocaleString()}` : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                                                {Number(entry.credit) > 0 ? `$${Number(entry.credit).toLocaleString()}` : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-gray-50 font-medium">
                                    <tr>
                                        <td className="px-6 py-3 text-sm text-gray-900">Total</td>
                                        <td className="px-6 py-3 text-sm text-right text-gray-900">${totalDebit.toLocaleString()}</td>
                                        <td className="px-6 py-3 text-sm text-right text-gray-900">${totalCredit.toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className="flex justify-end pt-4 border-t">
                            <Link
                                href={route('journals.index')}
                                className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition"
                            >
                                Back to Journals
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
