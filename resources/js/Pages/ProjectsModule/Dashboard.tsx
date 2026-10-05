import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ metrics, recentProjects }: any) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects & Site Dashboard</h2>}
        >
            <Head title="Projects Dashboard" />

            <div className="py-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Total Projects</span>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.projects_count}</p>
                        <Link href={route('projects.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Projects →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Active Projects</span>
                        <p className="text-2xl font-bold text-green-600 mt-1">{metrics.active_projects}</p>
                        <Link href={route('projects.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Active →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Contracts Value</span>
                        <p className="text-2xl font-bold text-indigo-600 mt-1">${Number(metrics.contracts_value).toLocaleString()}</p>
                        <Link href={route('contracts.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Contracts →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Open WBS Tasks</span>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.open_tasks_count}</p>
                        <Link href={route('wbs-tasks.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View WBS →</Link>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-wrap gap-2 items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Quick Actions:</span>
                    <div className="flex gap-2">
                        <Link href={route('projects.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ New Project</Link>
                        <Link href={route('contracts.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ New Contract</Link>
                        <Link href={route('wbs-tasks.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Add WBS Task</Link>
                        <Link href={route('site-logs.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Record Site Log</Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 text-sm">Recent Projects</h3>
                        <Link href={route('projects.index')} className="text-xs text-indigo-600 hover:underline">View all</Link>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3 text-left">Code & Name</th>
                                <th className="px-6 py-3 text-left">Customer</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-right">Contract Value</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentProjects && recentProjects.length > 0 ? (
                                recentProjects.map((p: any) => (
                                    <tr key={p.id}>
                                        <td className="px-6 py-3 font-medium text-gray-900">{p.code} - {p.name}</td>
                                        <td className="px-6 py-3 text-gray-500">{p.customer?.name || '-'}</td>
                                        <td className="px-6 py-3"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-semibold">{p.status}</span></td>
                                        <td className="px-6 py-3 text-right font-semibold">${Number(p.contract_value).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No projects found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
