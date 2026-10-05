import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ glAccounts }: any) {
    const { data, setData, post, processing, errors } = useForm({
        account_id: '',
        bank_name: '',
        account_number: '',
        currency: 'USD',
        balance: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('bank-accounts.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Register Bank Account</h2>}
        >
            <Head title="Register Bank" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700">Bank Name *</label>
                                        <input
                                            id="bank_name"
                                            type="text"
                                            value={data.bank_name}
                                            onChange={e => setData('bank_name', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                        {errors.bank_name && <div className="text-red-500 text-xs mt-1">{errors.bank_name}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="account_number" className="block text-sm font-medium text-gray-700">Account Number *</label>
                                        <input
                                            id="account_number"
                                            type="text"
                                            value={data.account_number}
                                            onChange={e => setData('account_number', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                        {errors.account_number && <div className="text-red-500 text-xs mt-1">{errors.account_number}</div>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div>
                                        <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency *</label>
                                        <input
                                            id="currency"
                                            type="text"
                                            maxLength={3}
                                            value={data.currency}
                                            onChange={e => setData('currency', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="balance" className="block text-sm font-medium text-gray-700">Opening Balance *</label>
                                        <input
                                            id="balance"
                                            type="number"
                                            step="0.0001"
                                            value={data.balance}
                                            onChange={e => setData('balance', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="account_id" className="block text-sm font-medium text-gray-700">GL Asset Account</label>
                                        <select
                                            id="account_id"
                                            value={data.account_id}
                                            onChange={e => setData('account_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select GL Account (Optional)</option>
                                            {glAccounts.map((acc: any) => (
                                                <option key={acc.id} value={acc.id}>{acc.code} - {acc.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mt-6 border-t pt-4">
                                    <Link 
                                        href={route('bank-accounts.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Register Bank'}
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
