import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ equipmentMaintenance, equipmentList }: any) {
    const { data, setData, put, processing, errors } = useForm({
        equipment_id: equipmentMaintenance.equipment_id || '',
        maintenance_type: equipmentMaintenance.maintenance_type || 'routine',
        service_date: equipmentMaintenance.service_date || '',
        cost: equipmentMaintenance.cost || '',
        notes: equipmentMaintenance.notes || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('equipment-maintenances.update', equipmentMaintenance.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Maintenance Record</h2>}
        >
            <Head title="Edit Maintenance Record" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                                
                                <div>
                                    <label htmlFor="equipment_id" className="block text-sm font-medium text-gray-700">Equipment *</label>
                                    <select
                                        id="equipment_id"
                                        value={data.equipment_id}
                                        onChange={e => setData('equipment_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    >
                                        <option value="">Select Equipment</option>
                                        {equipmentList.map((eq: any) => (
                                            <option key={eq.id} value={eq.id}>{eq.asset_number} - {eq.name}</option>
                                        ))}
                                    </select>
                                    {errors.equipment_id && <div className="text-red-500 text-xs mt-1">{errors.equipment_id}</div>}
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div>
                                        <label htmlFor="maintenance_type" className="block text-sm font-medium text-gray-700">Type *</label>
                                        <select
                                            id="maintenance_type"
                                            value={data.maintenance_type}
                                            onChange={e => setData('maintenance_type', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="routine">Routine</option>
                                            <option value="repair">Repair</option>
                                            <option value="inspection">Inspection</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="service_date" className="block text-sm font-medium text-gray-700">Service Date *</label>
                                        <input
                                            id="service_date"
                                            type="date"
                                            value={data.service_date}
                                            onChange={e => setData('service_date', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost *</label>
                                        <input
                                            id="cost"
                                            type="number"
                                            step="0.0001"
                                            value={data.cost}
                                            onChange={e => setData('cost', e.target.value)}
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
                                        href={route('equipment-maintenances.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Update Maintenance'}
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
