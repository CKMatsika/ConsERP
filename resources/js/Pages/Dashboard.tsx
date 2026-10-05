import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ metrics, recentProjects, recentSiteLogs }: any) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Executive Operations Dashboard
                    </h2>
                    <div className="flex gap-2">
                        <Link
                            href={route('construct-ai.index')}
                            className="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-md text-xs font-semibold hover:bg-indigo-700 transition"
                        >
                            ✨ Ask ConstructAI
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6 space-y-6">
                
                {/* KPI Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Projects</span>
                            <div className="text-2xl font-bold text-gray-900 mt-1">
                                {metrics?.active_projects || 0} <span className="text-xs font-normal text-gray-500">/ {metrics?.total_projects || 0} total</span>
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-indigo-600 font-medium">
                            <Link href={route('projects.index')} className="hover:underline">View all projects →</Link>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Contract Value</span>
                            <div className="text-2xl font-bold text-gray-900 mt-1">
                                ${Number(metrics?.total_contract_value || 0).toLocaleString()}
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-indigo-600 font-medium">
                            <Link href={route('job-costing.index')} className="hover:underline">Job costing analysis →</Link>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Workforce</span>
                            <div className="text-2xl font-bold text-gray-900 mt-1">
                                {metrics?.total_employees || 0} <span className="text-xs font-normal text-gray-500">employees</span>
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-indigo-600 font-medium">
                            <Link href={route('employees.index')} className="hover:underline">HR directory →</Link>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Open SHEQ Incidents</span>
                            <div className={`text-2xl font-bold mt-1 ${(metrics?.open_incidents || 0) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {metrics?.open_incidents || 0}
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-indigo-600 font-medium">
                            <Link href={route('sheq-incidents.index')} className="hover:underline">Safety register →</Link>
                        </div>
                    </div>

                </div>

                {/* Quick Actions Toolbar */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm font-medium text-gray-700">Quick Actions:</span>
                    <div className="flex flex-wrap gap-2">
                        <Link href={route('projects.create')} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-xs font-medium transition">
                            + New Project
                        </Link>
                        <Link href={route('site-logs.create')} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-xs font-medium transition">
                            + Record Site Log
                        </Link>
                        <Link href={route('purchase-orders.create')} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-xs font-medium transition">
                            + Create Purchase Order
                        </Link>
                        <Link href={route('sales-invoices.create')} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-xs font-medium transition">
                            + Create Invoice
                        </Link>
                        <Link href={route('customer-payments.create')} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-xs font-medium transition">
                            + Record Payment
                        </Link>
                        <Link href={route('journals.create')} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-xs font-medium transition">
                            + Post Journal Entry
                        </Link>
                        <Link href={route('documents.create')} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-xs font-medium transition">
                            + Upload Document
                        </Link>
                    </div>
                </div>

                {/* Recent Operations Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Recent Projects */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                            <h3 className="font-semibold text-gray-900 text-sm">Recent Projects</h3>
                            <Link href={route('projects.index')} className="text-xs font-medium text-indigo-600 hover:underline">View all</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-medium">Code & Name</th>
                                        <th className="px-6 py-3 text-left font-medium">Customer</th>
                                        <th className="px-6 py-3 text-right font-medium">Contract Value</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentProjects && recentProjects.length > 0 ? (
                                        recentProjects.map((p: any) => (
                                            <tr key={p.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-3 whitespace-nowrap font-medium text-gray-900">
                                                    {p.code} - {p.name}
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-gray-500">
                                                    {p.customer?.name || '-'}
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-right text-gray-900 font-semibold">
                                                    ${Number(p.contract_value || 0).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-4 text-center text-gray-500">No projects found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Site Logs */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                            <h3 className="font-semibold text-gray-900 text-sm">Recent Site Logs</h3>
                            <Link href={route('site-logs.index')} className="text-xs font-medium text-indigo-600 hover:underline">View all</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-medium">Date</th>
                                        <th className="px-6 py-3 text-left font-medium">Project</th>
                                        <th className="px-6 py-3 text-left font-medium">Weather & Work</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentSiteLogs && recentSiteLogs.length > 0 ? (
                                        recentSiteLogs.map((log: any) => (
                                            <tr key={log.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-3 whitespace-nowrap font-medium text-gray-900">
                                                    {log.log_date}
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-gray-500">
                                                    {log.project?.name || '-'}
                                                </td>
                                                <td className="px-6 py-3 text-gray-500 truncate max-w-xs">
                                                    <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-700 mr-2">{log.weather || 'N/A'}</span>
                                                    {log.work_performed}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-4 text-center text-gray-500">No site logs recorded.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}
