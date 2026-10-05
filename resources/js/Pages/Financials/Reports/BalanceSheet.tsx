import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function BalanceSheet({ assets, liabilities, equity, totalAssets, totalLiabilities, totalEquity }: any) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Balance Sheet Statement</h2>}
        >
            <Head title="Balance Sheet" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white p-6 shadow-sm rounded-lg border space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-3">Assets</h3>
                            <div className="space-y-2">
                                {assets.map((a: any, idx: number) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span>{a.code} - {a.name}</span>
                                        <span className="font-semibold">${Number(a.balance).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between font-bold text-sm border-t mt-3 pt-2">
                                <span>Total Assets</span>
                                <span>${Number(totalAssets).toLocaleString()}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-3">Liabilities</h3>
                            <div className="space-y-2">
                                {liabilities.map((l: any, idx: number) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span>{l.code} - {l.name}</span>
                                        <span className="font-semibold">${Number(l.balance).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between font-bold text-sm border-t mt-3 pt-2">
                                <span>Total Liabilities</span>
                                <span>${Number(totalLiabilities).toLocaleString()}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-3">Equity</h3>
                            <div className="space-y-2">
                                {equity.map((eq: any, idx: number) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span>{eq.code} - {eq.name}</span>
                                        <span className="font-semibold">${Number(eq.balance).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between font-bold text-sm border-t mt-3 pt-2">
                                <span>Total Equity</span>
                                <span>${Number(totalEquity).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
