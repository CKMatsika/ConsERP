import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

interface Props {
    invoices: {
        data: Array<{
            id: number;
            invoice_number: string;
            invoice_type: string;
            description?: string;
            issue_date: string;
            due_date: string;
            total_amount: number;
            amount_paid: number;
            status: string;
            certificate_reference?: string;
            customer?: { id: number; name: string };
            project?: { id: number; code: string; name: string };
            quotation?: { id: number; reference_number: string; title: string };
            income_account?: { id: number; code: string; name: string };
        }>;
        links: any[];
    };
}

export default function Index({ invoices }: Props) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Construction Sales Invoices</h2>}
        >
            <Head title="Sales Invoices" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Sales Invoices & Progress Claims</h3>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        Track client billings, interim payment certificates (IPC), valuations, and general invoices.
                                    </p>
                                </div>
                                <Link 
                                    href={route('sales-invoices.create')} 
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium shadow-sm transition"
                                >
                                    + Create Invoice
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice # / Type</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Scope / Description</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client & Project</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Certificate / Estimate</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue Account</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total / Balance</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {invoices.data && invoices.data.length > 0 ? (
                                            invoices.data.map((inv) => (
                                                <tr key={inv.id} className="hover:bg-gray-50 transition">
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-bold text-gray-900 font-mono">
                                                            {inv.invoice_number}
                                                        </div>
                                                        <div className="mt-1">
                                                            {inv.invoice_type === 'measured_work' ? (
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                                                                    📐 Measured Work
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-700">
                                                                    General
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="text-sm text-gray-900 font-medium line-clamp-2 max-w-xs">
                                                            {inv.description || <span className="text-gray-400 italic">No description</span>}
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Issued: {inv.issue_date} • Due: {inv.due_date}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-semibold text-gray-900">
                                                            {inv.customer ? inv.customer.name : '-'}
                                                        </div>
                                                        {inv.project && (
                                                            <div className="text-xs text-blue-600 font-medium mt-0.5 flex items-center gap-1">
                                                                <span>🏗️ {inv.project.code}: {inv.project.name}</span>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        {inv.certificate_reference ? (
                                                            <div className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-1 rounded inline-block border border-amber-200 font-mono">
                                                                Cert: {inv.certificate_reference}
                                                            </div>
                                                        ) : null}
                                                        {inv.quotation && (
                                                            <div className="text-xs text-gray-600 mt-0.5">
                                                                Est: {inv.quotation.reference_number}
                                                            </div>
                                                        )}
                                                        {!inv.certificate_reference && !inv.quotation && (
                                                            <span className="text-xs text-gray-400">-</span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-600">
                                                        {inv.income_account ? (
                                                            <span className="font-mono bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded">
                                                                {inv.income_account.code} - {inv.income_account.name}
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-400">4000 (Default)</span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-bold text-gray-900">
                                                            ${Number(inv.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Paid: ${Number(inv.amount_paid).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <span className={`px-2.5 py-1 inline-flex text-xs leading-4 font-bold rounded-full uppercase tracking-wider ${
                                                            inv.status === 'paid'
                                                                ? 'bg-green-100 text-green-800'
                                                                : inv.status === 'sent'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : inv.status === 'overdue'
                                                                ? 'bg-red-100 text-red-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {inv.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <Link 
                                                            href={route('sales-invoices.edit', inv.id)} 
                                                            className="text-blue-600 hover:text-blue-900 font-semibold mr-3"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link 
                                                            href={route('sales-invoices.destroy', inv.id)} 
                                                            method="delete" 
                                                            as="button" 
                                                            className="text-red-600 hover:text-red-900 font-medium"
                                                        >
                                                            Delete
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className="px-6 py-8 text-center text-sm text-gray-500">
                                                    No construction sales invoices recorded yet. Click <strong>+ Create Invoice</strong> to issue a new client invoice or progress claim.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
