import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import React from 'react';

interface Props {
    customers: Array<{ id: number; name: string }>;
    salesOrders: Array<{ id: number; order_number: string; title: string }>;
    projects: Array<{ id: number; code: string; name: string }>;
    quotations: Array<{ id: number; reference_number: string; title: string; total_amount: number }>;
    boqs: Array<{ id: number; reference_number: string; title: string }>;
    certificates: Array<{ id: number; certificate_number: string; amount: number; issue_date: string; valuation?: { project?: { name: string } } }>;
    accounts: Array<{ id: number; code: string; name: string; type: string }>;
}

export default function Create({
    customers = [],
    salesOrders = [],
    projects = [],
    quotations = [],
    boqs = [],
    certificates = [],
    accounts = [],
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        customer_id: '',
        sales_order_id: '',
        project_id: '',
        quotation_id: '',
        boq_id: '',
        invoice_type: 'general',
        description: '',
        certificate_reference: '',
        subcontractor_certificate_id: '',
        income_account_id: '',
        invoice_number: 'INV-' + Math.floor(1000 + Math.random() * 9000),
        issue_date: new Date().toISOString().split('T')[0],
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'draft',
        subtotal: '',
        tax_amount: '0',
        total_amount: '',
        notes: '',
    });

    const handleSubtotalChange = (val: string) => {
        const sub = parseFloat(val) || 0;
        const tax = parseFloat(data.tax_amount) || 0;
        setData((prev) => ({
            ...prev,
            subtotal: val,
            total_amount: (sub + tax).toFixed(2),
        }));
    };

    const handleTaxChange = (val: string) => {
        const tax = parseFloat(val) || 0;
        const sub = parseFloat(data.subtotal) || 0;
        setData((prev) => ({
            ...prev,
            tax_amount: val,
            total_amount: (sub + tax).toFixed(2),
        }));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('sales-invoices.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Construction Sales Invoice</h2>}
        >
            <Head title="Create Sales Invoice" />

            <div className="py-8">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <div className="mb-6 border-b pb-4">
                                <h3 className="text-lg font-semibold text-gray-900">New Construction Client Invoice</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Issue billings for measured construction progress, valuations, or general services linked directly to projects, estimates, and your Chart of Accounts.
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-8">
                                
                                {/* 1. INVOICE TYPE SELECTION */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Billing Category / Invoice Type *
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <label
                                            className={`flex items-start p-3.5 border rounded-lg cursor-pointer transition ${
                                                data.invoice_type === 'general'
                                                    ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20'
                                                    : 'bg-white border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="invoice_type"
                                                value="general"
                                                checked={data.invoice_type === 'general'}
                                                onChange={() => setData('invoice_type', 'general')}
                                                className="mt-1 text-blue-600 focus:ring-blue-500"
                                            />
                                            <div className="ml-3">
                                                <span className="block text-sm font-semibold text-gray-900">
                                                    General Invoice
                                                </span>
                                                <span className="block text-xs text-gray-500 mt-0.5">
                                                    Fixed contract milestones, material supply, plant hire, mobilization fees, or consulting.
                                                </span>
                                            </div>
                                        </label>

                                        <label
                                            className={`flex items-start p-3.5 border rounded-lg cursor-pointer transition ${
                                                data.invoice_type === 'measured_work'
                                                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20'
                                                    : 'bg-white border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="invoice_type"
                                                value="measured_work"
                                                checked={data.invoice_type === 'measured_work'}
                                                onChange={() => setData('invoice_type', 'measured_work')}
                                                className="mt-1 text-amber-600 focus:ring-amber-500"
                                            />
                                            <div className="ml-3">
                                                <span className="block text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                                                    Measured Work / Progress Claim
                                                    <span className="bg-amber-200 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">Certificate Required</span>
                                                </span>
                                                <span className="block text-xs text-gray-500 mt-0.5">
                                                    Interim progress billings based on site quantities, valuations, and certified works.
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                    {errors.invoice_type && <div className="text-red-500 text-xs mt-1">{errors.invoice_type}</div>}
                                </div>

                                {/* 2. BASIC DETAILS */}
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Invoice & Customer Details</h4>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        <div>
                                            <label htmlFor="invoice_number" className="block text-sm font-medium text-gray-700">Invoice Number *</label>
                                            <input
                                                id="invoice_number"
                                                type="text"
                                                value={data.invoice_number}
                                                onChange={(e) => setData('invoice_number', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono"
                                                required
                                            />
                                            {errors.invoice_number && <div className="text-red-500 text-xs mt-1">{errors.invoice_number}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700">Client / Customer *</label>
                                            <select
                                                id="customer_id"
                                                value={data.customer_id}
                                                onChange={(e) => setData('customer_id', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                required
                                            >
                                                <option value="">-- Select Client / Customer --</option>
                                                {customers.map((c) => (
                                                    <option key={c.id} value={c.id}>{c.name}</option>
                                                ))}
                                            </select>
                                            {errors.customer_id && <div className="text-red-500 text-xs mt-1">{errors.customer_id}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Invoice Status *</label>
                                            <select
                                                id="status"
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            >
                                                <option value="draft">Draft (Saved only)</option>
                                                <option value="sent">Sent (Posts to GL & Accounts Receivable)</option>
                                                <option value="paid">Paid</option>
                                                <option value="overdue">Overdue</option>
                                                <option value="void">Void</option>
                                            </select>
                                            {errors.status && <div className="text-red-500 text-xs mt-1">{errors.status}</div>}
                                        </div>
                                    </div>
                                </div>

                                {/* 3. WHAT ARE YOU INVOICING (DESCRIPTION) */}
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Scope & Work Description</h4>
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Invoice Description (What is being invoiced) *
                                        </label>
                                        <textarea
                                            id="description"
                                            rows={2}
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="e.g. Interim Progress Claim #3: Substructure reinforced concrete works and excavation per BOQ Section 2..."
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Describe the exact scope, milestone, or measured work billable on this invoice.
                                        </p>
                                        {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                                    </div>
                                </div>

                                {/* 4. MEASURED WORK CERTIFICATE LINKING */}
                                {data.invoice_type === 'measured_work' && (
                                    <div className="bg-amber-50/70 p-4 rounded-lg border border-amber-300">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-amber-800 font-semibold text-sm">📐 Measured Work Certificate Link</span>
                                        </div>
                                        <p className="text-xs text-amber-700 mb-4">
                                            For measured construction work, link this invoice to the Interim Payment Certificate (IPC) or Valuation Certificate approved by the supervising engineer or client.
                                        </p>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="certificate_reference" className="block text-sm font-medium text-gray-800">
                                                    Certificate Reference # (IPC / Valuation Cert #) *
                                                </label>
                                                <input
                                                    id="certificate_reference"
                                                    type="text"
                                                    value={data.certificate_reference}
                                                    onChange={(e) => setData('certificate_reference', e.target.value)}
                                                    placeholder="e.g. IPC-004 or CERT-VAL-2026-03"
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm font-mono"
                                                    required={data.invoice_type === 'measured_work'}
                                                />
                                                {errors.certificate_reference && <div className="text-red-500 text-xs mt-1">{errors.certificate_reference}</div>}
                                            </div>

                                            <div>
                                                <label htmlFor="subcontractor_certificate_id" className="block text-sm font-medium text-gray-800">
                                                    Linked Internal Certificate (Optional)
                                                </label>
                                                <select
                                                    id="subcontractor_certificate_id"
                                                    value={data.subcontractor_certificate_id}
                                                    onChange={(e) => setData('subcontractor_certificate_id', e.target.value)}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                                                >
                                                    <option value="">-- Link to Certificate Register (Optional) --</option>
                                                    {certificates.map((cert) => (
                                                        <option key={cert.id} value={cert.id}>
                                                            {cert.certificate_number} (Amount: ${Number(cert.amount).toLocaleString()}) {cert.valuation?.project ? `- ${cert.valuation.project.name}` : ''}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.subcontractor_certificate_id && <div className="text-red-500 text-xs mt-1">{errors.subcontractor_certificate_id}</div>}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 5. CONSTRUCTION PROJECT & ESTIMATING LINKS */}
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                                        Construction Project & Estimating Links
                                    </h4>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="project_id" className="block text-sm font-medium text-gray-700">Project</label>
                                            <select
                                                id="project_id"
                                                value={data.project_id}
                                                onChange={(e) => setData('project_id', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            >
                                                <option value="">-- Select Project (Optional) --</option>
                                                {projects.map((p) => (
                                                    <option key={p.id} value={p.id}>{p.code} - {p.name}</option>
                                                ))}
                                            </select>
                                            {errors.project_id && <div className="text-red-500 text-xs mt-1">{errors.project_id}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="quotation_id" className="block text-sm font-medium text-gray-700">Estimate / Quotation</label>
                                            <select
                                                id="quotation_id"
                                                value={data.quotation_id}
                                                onChange={(e) => setData('quotation_id', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            >
                                                <option value="">-- Link to Approved Estimate / Quotation --</option>
                                                {quotations.map((q) => (
                                                    <option key={q.id} value={q.id}>
                                                        {q.reference_number} - {q.title} (${Number(q.total_amount).toLocaleString()})
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.quotation_id && <div className="text-red-500 text-xs mt-1">{errors.quotation_id}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="boq_id" className="block text-sm font-medium text-gray-700">Bill of Quantities (BOQ)</label>
                                            <select
                                                id="boq_id"
                                                value={data.boq_id}
                                                onChange={(e) => setData('boq_id', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            >
                                                <option value="">-- Select Bill of Quantities (Optional) --</option>
                                                {boqs.map((b) => (
                                                    <option key={b.id} value={b.id}>{b.reference_number} - {b.title}</option>
                                                ))}
                                            </select>
                                            {errors.boq_id && <div className="text-red-500 text-xs mt-1">{errors.boq_id}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="sales_order_id" className="block text-sm font-medium text-gray-700">Sales Order</label>
                                            <select
                                                id="sales_order_id"
                                                value={data.sales_order_id}
                                                onChange={(e) => setData('sales_order_id', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            >
                                                <option value="">-- Select Sales Order (Optional) --</option>
                                                {salesOrders.map((so) => (
                                                    <option key={so.id} value={so.id}>{so.order_number} - {so.title}</option>
                                                ))}
                                            </select>
                                            {errors.sales_order_id && <div className="text-red-500 text-xs mt-1">{errors.sales_order_id}</div>}
                                        </div>
                                    </div>
                                </div>

                                {/* 6. CHART OF ACCOUNTS LINK */}
                                <div className="bg-blue-50/60 p-4 rounded-lg border border-blue-200">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-blue-900 mb-1">
                                        Chart of Accounts Integration
                                    </h4>
                                    <p className="text-xs text-blue-700 mb-3">
                                        Choose which general ledger Revenue account should be credited for this invoice according to your organisation's financial setup.
                                    </p>
                                    <div>
                                        <label htmlFor="income_account_id" className="block text-sm font-medium text-gray-900">
                                            Revenue / Income Account *
                                        </label>
                                        <select
                                            id="income_account_id"
                                            value={data.income_account_id}
                                            onChange={(e) => setData('income_account_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                                        >
                                            <option value="">Default (4000 - Construction Revenue)</option>
                                            {accounts.map((acc) => (
                                                <option key={acc.id} value={acc.id}>
                                                    {acc.code} - {acc.name} ({acc.type})
                                                </option>
                                            ))}
                                        </select>
                                        {errors.income_account_id && <div className="text-red-500 text-xs mt-1">{errors.income_account_id}</div>}
                                    </div>
                                </div>

                                {/* 7. FINANCIAL AMOUNTS & DATES */}
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Financials & Schedule</h4>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        <div>
                                            <label htmlFor="subtotal" className="block text-sm font-medium text-gray-700">Subtotal *</label>
                                            <input
                                                id="subtotal"
                                                type="number"
                                                step="0.01"
                                                value={data.subtotal}
                                                onChange={(e) => handleSubtotalChange(e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                required
                                            />
                                            {errors.subtotal && <div className="text-red-500 text-xs mt-1">{errors.subtotal}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="tax_amount" className="block text-sm font-medium text-gray-700">Tax / VAT Amount</label>
                                            <input
                                                id="tax_amount"
                                                type="number"
                                                step="0.01"
                                                value={data.tax_amount}
                                                onChange={(e) => handleTaxChange(e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                            {errors.tax_amount && <div className="text-red-500 text-xs mt-1">{errors.tax_amount}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="total_amount" className="block text-sm font-medium text-gray-700">Total Invoiced Amount *</label>
                                            <input
                                                id="total_amount"
                                                type="number"
                                                step="0.01"
                                                value={data.total_amount}
                                                onChange={(e) => setData('total_amount', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-bold text-gray-900 bg-gray-50"
                                                required
                                            />
                                            {errors.total_amount && <div className="text-red-500 text-xs mt-1">{errors.total_amount}</div>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
                                        <div>
                                            <label htmlFor="issue_date" className="block text-sm font-medium text-gray-700">Issue Date *</label>
                                            <input
                                                id="issue_date"
                                                type="date"
                                                value={data.issue_date}
                                                onChange={(e) => setData('issue_date', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                required
                                            />
                                            {errors.issue_date && <div className="text-red-500 text-xs mt-1">{errors.issue_date}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">Due Date *</label>
                                            <input
                                                id="due_date"
                                                type="date"
                                                value={data.due_date}
                                                onChange={(e) => setData('due_date', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                required
                                            />
                                            {errors.due_date && <div className="text-red-500 text-xs mt-1">{errors.due_date}</div>}
                                        </div>
                                    </div>
                                </div>

                                {/* 8. NOTES */}
                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Payment Terms & Additional Notes</label>
                                    <textarea
                                        id="notes"
                                        rows={2}
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        placeholder="e.g. Net 30 days. Subject to 5% retention release upon practical completion."
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    {errors.notes && <div className="text-red-500 text-xs mt-1">{errors.notes}</div>}
                                </div>

                                <div className="flex justify-end gap-4 border-t pt-5">
                                    <Link
                                        href={route('sales-invoices.index')}
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-6 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 shadow-sm"
                                    >
                                        {processing ? 'Saving...' : 'Save & Create Invoice'}
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
