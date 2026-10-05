import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ metrics, recentBoqs, recentRateBuildUps }: any) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Estimating & Quantity Surveying Dashboard</h2>}
        >
            <Head title="Estimating & QS Dashboard" />

            <div className="py-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Cost Codes</span>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.cost_codes_count}</p>
                        <Link href={route('cost-codes.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Cost Codes →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Bill of Quantities (BOQs)</span>
                        <p className="text-2xl font-bold text-indigo-600 mt-1">{metrics.boqs_count}</p>
                        <Link href={route('boqs.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View BOQs →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Rate Build-Ups</span>
                        <p className="text-2xl font-bold text-green-600 mt-1">{metrics.rate_build_ups_count}</p>
                        <Link href={route('rate-build-ups.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Rates →</Link>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-wrap gap-2 items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Quick Actions:</span>
                    <div className="flex gap-2">
                        <Link href={route('cost-codes.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ New Cost Code</Link>
                        <Link href={route('boqs.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Create BOQ</Link>
                        <Link href={route('rate-build-ups.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ New Rate Build-Up</Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                        <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900 text-sm">Recent BOQs</h3>
                            <Link href={route('boqs.index')} className="text-xs text-indigo-600 hover:underline">View all</Link>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 text-left">Ref #</th>
                                    <th className="px-6 py-3 text-left">Title</th>
                                    <th className="px-6 py-3 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentBoqs && recentBoqs.length > 0 ? (
                                    recentBoqs.map((boq: any) => (
                                        <tr key={boq.id}>
                                            <td className="px-6 py-3 font-medium text-gray-900">{boq.reference_number}</td>
                                            <td className="px-6 py-3 text-gray-900">{boq.title}</td>
                                            <td className="px-6 py-3 text-right"><span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-semibold">{boq.status}</span></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan={3} className="px-6 py-4 text-center text-gray-500">No BOQs found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                        <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900 text-sm">Recent Rate Build-Ups</h3>
                            <Link href={route('rate-build-ups.index')} className="text-xs text-indigo-600 hover:underline">View all</Link>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 text-left">Item Name</th>
                                    <th className="px-6 py-3 text-left">Unit</th>
                                    <th className="px-6 py-3 text-right">Unit Rate</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentRateBuildUps && recentRateBuildUps.length > 0 ? (
                                    recentRateBuildUps.map((rbu: any) => (
                                        <tr key={rbu.id}>
                                            <td className="px-6 py-3 font-medium text-gray-900">{rbu.item_name}</td>
                                            <td className="px-6 py-3 text-gray-500">{rbu.unit}</td>
                                            <td className="px-6 py-3 text-right font-semibold">${Number(rbu.unit_rate).toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan={3} className="px-6 py-4 text-center text-gray-500">No rate build-ups found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
