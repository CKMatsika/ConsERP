import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ valuations }: any) {
    const { data, setData, post, processing, errors } = useForm({
        subcontractor_valuation_id: '',
        certificate_number: 'CERT-' + Math.floor(1000 + Math.random() * 9000),
        issue_date: new Date().toISOString().split('T')[0],
        amount: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('subcontractor-certificates.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Issue Certificate</h2>}
        >
            <Head title="Issue Certificate" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div>
                                    <label htmlFor="subcontractor_valuation_id" className="block text-sm font-medium text-gray-700">Valuation *</label>
                                    <select
                                        id="subcontractor_valuation_id"
                                        value={data.subcontractor_valuation_id}
                                        onChange={e => setData('subcontractor_valuation_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    >
                                        <option value="">Select Valuation</option>
                                        {valuations.map((val: any) => (
                                            <option key={val.id} value={val.id}>{val.valuation_number} (${Number(val.certified_amount).toLocaleString()})</option>
                                        ))}
                                    </select>
                                    {errors.subcontractor_valuation_id && <div className="text-red-500 text-xs mt-1">{errors.subcontractor_valuation_id}</div>}
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div>
                                        <label htmlFor="certificate_number" className="block text-sm font-medium text-gray-700">Certificate # *</label>
                                        <input
                                            id="certificate_number"
                                            type="text"
                                            value={data.certificate_number}
                                            onChange={e => setData('certificate_number', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="issue_date" className="block text-sm font-medium text-gray-700">Issue Date *</label>
                                        <input
                                            id="issue_date"
                                            type="date"
                                            value={data.issue_date}
                                            onChange={e => setData('issue_date', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount *</label>
                                        <input
                                            id="amount"
                                            type="number"
                                            step="0.0001"
                                            value={data.amount}
                                            onChange={e => setData('amount', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mt-6 border-t pt-4">
                                    <Link 
                                        href={route('subcontractor-certificates.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Issue Certificate'}
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
