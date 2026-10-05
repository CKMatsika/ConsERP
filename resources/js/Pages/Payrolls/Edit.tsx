import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ payroll, employees }: any) {
    const { data, setData, put, processing, errors } = useForm({
        employee_id: payroll.employee_id || '',
        pay_period_start: payroll.pay_period_start || '',
        pay_period_end: payroll.pay_period_end || '',
        gross_pay: payroll.gross_pay || '',
        deductions: payroll.deductions || '',
        net_pay: payroll.net_pay || '',
        status: payroll.status || 'draft',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('payrolls.update', payroll.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Payroll Record</h2>}
        >
            <Head title="Edit Payroll Record" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div>
                                    <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700">Employee *</label>
                                    <select
                                        id="employee_id"
                                        value={data.employee_id}
                                        onChange={e => setData('employee_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    >
                                        <option value="">Select Employee</option>
                                        {employees.map((emp: any) => (
                                            <option key={emp.id} value={emp.id}>{emp.first_name} {emp.last_name}</option>
                                        ))}
                                    </select>
                                    {errors.employee_id && <div className="text-red-500 text-xs mt-1">{errors.employee_id}</div>}
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="pay_period_start" className="block text-sm font-medium text-gray-700">Period Start *</label>
                                        <input
                                            id="pay_period_start"
                                            type="date"
                                            value={data.pay_period_start}
                                            onChange={e => setData('pay_period_start', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="pay_period_end" className="block text-sm font-medium text-gray-700">Period End *</label>
                                        <input
                                            id="pay_period_end"
                                            type="date"
                                            value={data.pay_period_end}
                                            onChange={e => setData('pay_period_end', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div>
                                        <label htmlFor="gross_pay" className="block text-sm font-medium text-gray-700">Gross Pay *</label>
                                        <input
                                            id="gross_pay"
                                            type="number"
                                            step="0.0001"
                                            value={data.gross_pay}
                                            onChange={e => setData('gross_pay', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="deductions" className="block text-sm font-medium text-gray-700">Deductions *</label>
                                        <input
                                            id="deductions"
                                            type="number"
                                            step="0.0001"
                                            value={data.deductions}
                                            onChange={e => setData('deductions', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="net_pay" className="block text-sm font-medium text-gray-700">Net Pay *</label>
                                        <input
                                            id="net_pay"
                                            type="number"
                                            step="0.0001"
                                            value={data.net_pay}
                                            onChange={e => setData('net_pay', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status *</label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="approved">Approved</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                </div>

                                <div className="flex justify-end gap-4 mt-6 border-t pt-4">
                                    <Link 
                                        href={route('payrolls.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Update Payroll'}
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
