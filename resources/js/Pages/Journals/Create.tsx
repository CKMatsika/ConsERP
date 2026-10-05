import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ accounts }: any) {
    const { data, setData, post, processing, errors } = useForm({
        reference: 'JRN-' + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toISOString().split('T')[0],
        description: '',
        status: 'draft',
        entries: [
            { account_id: '', debit: '', credit: '' },
            { account_id: '', debit: '', credit: '' },
        ],
    });

    const addEntry = () => {
        setData('entries', [...data.entries, { account_id: '', debit: '', credit: '' }]);
    };

    const removeEntry = (index: number) => {
        if (data.entries.length > 2) {
            setData('entries', data.entries.filter((_, i) => i !== index));
        }
    };

    const updateEntry = (index: number, field: string, value: any) => {
        const newEntries = [...data.entries];
        newEntries[index] = { ...newEntries[index], [field]: value };
        setData('entries', newEntries);
    };

    const totalDebit = data.entries.reduce((sum, e) => sum + (Number(e.debit) || 0), 0);
    const totalCredit = data.entries.reduce((sum, e) => sum + (Number(e.credit) || 0), 0);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('journals.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Journal Entry</h2>}
        >
            <Head title="Create Journal" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6">
                                
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div>
                                        <label htmlFor="reference" className="block text-sm font-medium text-gray-700">Reference *</label>
                                        <input
                                            id="reference"
                                            type="text"
                                            value={data.reference}
                                            onChange={e => setData('reference', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                        {errors.reference && <div className="text-red-500 text-xs mt-1">{errors.reference}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date *</label>
                                        <input
                                            id="date"
                                            type="date"
                                            value={data.date}
                                            onChange={e => setData('date', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
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
                                            <option value="posted">Posted</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        rows={2}
                                    />
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-md font-medium text-gray-900">Double-Entry Lines (Debits = Credits)</h4>
                                        <button
                                            type="button"
                                            onClick={addEntry}
                                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm font-medium hover:bg-gray-300"
                                        >
                                            + Add Line
                                        </button>
                                    </div>

                                    {errors.entries && <div className="text-red-500 text-sm mb-2">{errors.entries}</div>}

                                    <div className="space-y-3">
                                        {data.entries.map((entry, index) => (
                                            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 p-3 rounded-md">
                                                <div className="md:col-span-6">
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Account *</label>
                                                    <select
                                                        value={entry.account_id}
                                                        onChange={e => updateEntry(index, 'account_id', e.target.value)}
                                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        required
                                                    >
                                                        <option value="">Select Account</option>
                                                        {accounts.map((acc: any) => (
                                                            <option key={acc.id} value={acc.id}>{acc.code} - {acc.name} ({acc.type})</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Debit</label>
                                                    <input
                                                        type="number"
                                                        step="0.0001"
                                                        value={entry.debit}
                                                        onChange={e => updateEntry(index, 'debit', e.target.value)}
                                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Credit</label>
                                                    <input
                                                        type="number"
                                                        step="0.0001"
                                                        value={entry.credit}
                                                        onChange={e => updateEntry(index, 'credit', e.target.value)}
                                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                                <div className="md:col-span-2 flex justify-end pt-5">
                                                    {data.entries.length > 2 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeEntry(index)}
                                                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center mt-4 bg-gray-100 p-3 rounded-md font-medium text-sm">
                                        <div>Total Debits: ${totalDebit.toFixed(4)}</div>
                                        <div>Total Credits: ${totalCredit.toFixed(4)}</div>
                                        <div className={totalDebit === totalCredit ? 'text-green-600' : 'text-red-600'}>
                                            {totalDebit === totalCredit ? 'Balanced ✓' : 'Unbalanced ✗'}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mt-6 border-t pt-4">
                                    <Link 
                                        href={route('journals.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing || totalDebit !== totalCredit}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Post Journal'}
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
