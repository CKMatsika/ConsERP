import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ProfitLoss({ revenues, expenses, totalRevenue, totalExpense, netProfit }: any) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profit & Loss Statement (Income Statement)</h2>}
        >
            <Head title="Profit & Loss" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white p-6 shadow-sm rounded-lg border space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-3">Revenues</h3>
                            <div className="space-y-2">
                                {revenues.map((rev: any, idx: number) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span>{rev.code} - {rev.name}</span>
                                        <span className="font-semibold">${Number(rev.amount).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between font-bold text-sm border-t mt-3 pt-2">
                                <span>Total Revenue</span>
                                <span>${Number(totalRevenue).toLocaleString()}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-3">Expenses</h3>
                            <div className="space-y-2">
                                {expenses.map((exp: any, idx: number) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span>{exp.code} - {exp.name}</span>
                                        <span className="font-semibold">${Number(exp.amount).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between font-bold text-sm border-t mt-3 pt-2">
                                <span>Total Expenses</span>
                                <span>${Number(totalExpense).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className={`p-4 rounded-lg flex justify-between items-center font-bold text-lg ${netProfit >= 0 ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                            <span>Net Profit / (Loss)</span>
                            <span>${Number(netProfit).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
