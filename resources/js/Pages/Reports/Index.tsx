import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ stats }: any) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Reports & Analytics</h2>}
        >
            <Head title="Reports" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 shadow-sm rounded-lg border">
                            <h4 className="text-sm font-medium text-gray-500">Total Projects</h4>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.projects_count}</p>
                        </div>
                        <div className="bg-white p-6 shadow-sm rounded-lg border">
                            <h4 className="text-sm font-medium text-gray-500">Total Employees</h4>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.employees_count}</p>
                        </div>
                        <div className="bg-white p-6 shadow-sm rounded-lg border">
                            <h4 className="text-sm font-medium text-gray-500">Active Customers</h4>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.customers_count}</p>
                        </div>
                        <div className="bg-white p-6 shadow-sm rounded-lg border">
                            <h4 className="text-sm font-medium text-gray-500">Active Suppliers</h4>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.suppliers_count}</p>
                        </div>
                        <div className="bg-white p-6 shadow-sm rounded-lg border md:col-span-2">
                            <h4 className="text-sm font-medium text-gray-500">Total Purchase Orders Value</h4>
                            <p className="text-3xl font-bold text-indigo-600 mt-2">${Number(stats.total_po_value).toLocaleString()}</p>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
