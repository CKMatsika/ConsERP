import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ costCodes }: any) {
    const { data, setData, post, processing, errors } = useForm({
        cost_code_id: '',
        item_name: '',
        unit: 'm2',
        unit_rate: '',
        notes: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('rate-build-ups.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Rate Build-Up</h2>}
        >
            <Head title="Create Rate Build-Up" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div>
                                    <label htmlFor="item_name" className="block text-sm font-medium text-gray-700">Item Name *</label>
                                    <input
                                        id="item_name"
                                        type="text"
                                        value={data.item_name}
                                        onChange={e => setData('item_name', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                    {errors.item_name && <div className="text-red-500 text-xs mt-1">{errors.item_name}</div>}
                                </div>

                                <div>
                                    <label htmlFor="cost_code_id" className="block text-sm font-medium text-gray-700">Cost Code</label>
                                    <select
                                        id="cost_code_id"
                                        value={data.cost_code_id}
                                        onChange={e => setData('cost_code_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="">Select Cost Code (Optional)</option>
                                        {costCodes.map((cc: any) => (
                                            <option key={cc.id} value={cc.id}>{cc.code} - {cc.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Unit *</label>
                                        <input
                                            id="unit"
                                            type="text"
                                            value={data.unit}
                                            onChange={e => setData('unit', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="unit_rate" className="block text-sm font-medium text-gray-700">Unit Rate *</label>
                                        <input
                                            id="unit_rate"
                                            type="number"
                                            step="0.0001"
                                            value={data.unit_rate}
                                            onChange={e => setData('unit_rate', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                                    <textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        rows={3}
                                    />
                                </div>

                                <div className="flex justify-end gap-4 mt-6 border-t pt-4">
                                    <Link 
                                        href={route('rate-build-ups.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Rate Build-Up'}
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
