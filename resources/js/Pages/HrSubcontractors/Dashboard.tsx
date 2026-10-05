import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ metrics, recentEmployees }: any) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">HR & Subcontractors Dashboard</h2>}
        >
            <Head title="HR & Subcontractors Dashboard" />

            <div className="py-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Employees</span>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.employees_count}</p>
                        <Link href={route('employees.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Employees →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Pending Timesheets</span>
                        <p className="text-2xl font-bold text-yellow-600 mt-1">{metrics.pending_timesheets}</p>
                        <Link href={route('timesheets.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Timesheets →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Open Incidents (SHEQ)</span>
                        <p className="text-2xl font-bold text-red-600 mt-1">{metrics.open_incidents}</p>
                        <Link href={route('sheq-incidents.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Incidents →</Link>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Sub. Valuations Certified</span>
                        <p className="text-2xl font-bold text-indigo-600 mt-1">${Number(metrics.sub_valuations_certified).toLocaleString()}</p>
                        <Link href={route('subcontractor-valuations.index')} className="text-xs text-indigo-600 mt-3 inline-block hover:underline">View Valuations →</Link>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-wrap gap-2 items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Quick Actions:</span>
                    <div className="flex gap-2">
                        <Link href={route('employees.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Add Employee</Link>
                        <Link href={route('timesheets.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Log Timesheet</Link>
                        <Link href={route('payrolls.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Run Payroll</Link>
                        <Link href={route('sheq-incidents.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Report Incident</Link>
                        <Link href={route('subcontractor-valuations.create')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100">+ Sub. Valuation</Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 text-sm">Recent Employees</h3>
                        <Link href={route('employees.index')} className="text-xs text-indigo-600 hover:underline">View all</Link>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Position</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-right">Hire Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentEmployees && recentEmployees.length > 0 ? (
                                recentEmployees.map((emp: any) => (
                                    <tr key={emp.id}>
                                        <td className="px-6 py-3 font-medium text-gray-900">{emp.first_name} {emp.last_name}</td>
                                        <td className="px-6 py-3 text-gray-500">{emp.position || '-'}</td>
                                        <td className="px-6 py-3"><span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-semibold">{emp.employment_status}</span></td>
                                        <td className="px-6 py-3 text-right text-gray-500">{emp.hire_date || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No employees found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
