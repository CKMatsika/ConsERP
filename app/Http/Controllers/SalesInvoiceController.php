<?php

namespace App\Http\Controllers;

use App\Models\SalesInvoice;
use App\Models\Customer;
use App\Models\SalesOrder;
use App\Models\Project;
use App\Models\Quotation;
use App\Models\Boq;
use App\Models\SubcontractorCertificate;
use App\Models\Account;
use App\Services\Accounting\AccountingPostingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class SalesInvoiceController extends Controller
{
    public function index()
    {
        $invoices = SalesInvoice::with([
            'customer',
            'salesOrder',
            'project',
            'quotation',
            'boq',
            'subcontractorCertificate',
            'incomeAccount',
        ])->orderBy('issue_date', 'desc')->paginate(10);

        return Inertia::render('SalesInvoices/Index', [
            'invoices' => $invoices
        ]);
    }

    public function create(Request $request)
    {
        $orgId = $request->user()->active_organisation_id;
        if (!$orgId) {
            return redirect()->route('organisations.create')->with('error', 'Please create or switch to an active organisation first.');
        }

        $customers = Customer::orderBy('name')->get();
        $salesOrders = SalesOrder::orderBy('order_number')->get();
        $projects = Project::orderBy('name')->get();
        $quotations = Quotation::orderBy('reference_number')->get();
        $boqs = Boq::orderBy('reference_number')->get();
        $certificates = SubcontractorCertificate::with('valuation.project')->orderBy('certificate_number')->get();
        $accounts = Account::where('type', 'revenue')->orderBy('code')->get();
        if ($accounts->isEmpty()) {
            $accounts = Account::orderBy('code')->get();
        }

        return Inertia::render('SalesInvoices/Create', [
            'customers' => $customers,
            'salesOrders' => $salesOrders,
            'projects' => $projects,
            'quotations' => $quotations,
            'boqs' => $boqs,
            'certificates' => $certificates,
            'accounts' => $accounts,
        ]);
    }

    public function store(Request $request)
    {
        $orgId = $request->user()->active_organisation_id;
        if (!$orgId) {
            return redirect()->route('organisations.create')->with('error', 'Please create or switch to an active organisation first.');
        }

        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'sales_order_id' => 'nullable|exists:sales_orders,id',
            'project_id' => 'nullable|exists:projects,id',
            'quotation_id' => 'nullable|exists:quotations,id',
            'boq_id' => 'nullable|exists:boqs,id',
            'invoice_type' => 'nullable|string|in:general,measured_work',
            'description' => 'nullable|string|max:1000',
            'certificate_reference' => 'nullable|string|max:255',
            'subcontractor_certificate_id' => 'nullable|exists:subcontractor_certificates,id',
            'income_account_id' => 'nullable|exists:accounts,id',
            'invoice_number' => 'required|string|max:50',
            'issue_date' => 'required|date',
            'due_date' => 'required|date',
            'status' => 'required|string|in:draft,sent,paid,overdue,void',
            'subtotal' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $validated['invoice_type'] = $validated['invoice_type'] ?? 'general';
        $validated['description'] = $validated['description'] ?? ($validated['invoice_type'] === 'measured_work' ? 'Interim Measured Work Valuation' : 'Construction Works & Services');
        $validated['organisation_id'] = $orgId;
        $validated['amount_paid'] = 0;

        $invoice = SalesInvoice::create($validated);

        if (in_array($invoice->status, ['sent', 'paid'])) {
            $arAcc = Account::firstOrCreate(
                ['organisation_id' => $orgId, 'code' => '1200'],
                ['name' => 'Accounts Receivable', 'type' => 'asset']
            );

            $revAcc = null;
            if ($invoice->income_account_id) {
                $revAcc = Account::where('organisation_id', $orgId)->find($invoice->income_account_id);
            }
            if (!$revAcc) {
                $revAcc = Account::firstOrCreate(
                    ['organisation_id' => $orgId, 'code' => '4000'],
                    ['name' => 'Construction Revenue', 'type' => 'revenue']
                );
            }

            $postingService = new AccountingPostingService();
            $memo = 'Sales Invoice ' . $invoice->invoice_number;
            if ($invoice->description) {
                $memo .= ' - ' . Str::limit($invoice->description, 50);
            }

            $postingService->postJournal($orgId, 'INV-' . $invoice->invoice_number, $invoice->issue_date, $memo, [
                ['account_id' => $arAcc->id, 'debit' => $invoice->total_amount, 'credit' => 0],
                ['account_id' => $revAcc->id, 'debit' => 0, 'credit' => $invoice->total_amount],
            ]);
        }

        return redirect()->route('sales-invoices.index')->with('success', 'Sales Invoice created successfully.');
    }

    public function edit(SalesInvoice $salesInvoice)
    {
        $customers = Customer::orderBy('name')->get();
        $salesOrders = SalesOrder::orderBy('order_number')->get();
        $projects = Project::orderBy('name')->get();
        $quotations = Quotation::orderBy('reference_number')->get();
        $boqs = Boq::orderBy('reference_number')->get();
        $certificates = SubcontractorCertificate::with('valuation.project')->orderBy('certificate_number')->get();
        $accounts = Account::where('type', 'revenue')->orderBy('code')->get();
        if ($accounts->isEmpty()) {
            $accounts = Account::orderBy('code')->get();
        }

        return Inertia::render('SalesInvoices/Edit', [
            'salesInvoice' => $salesInvoice,
            'customers' => $customers,
            'salesOrders' => $salesOrders,
            'projects' => $projects,
            'quotations' => $quotations,
            'boqs' => $boqs,
            'certificates' => $certificates,
            'accounts' => $accounts,
        ]);
    }

    public function update(Request $request, SalesInvoice $salesInvoice)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'sales_order_id' => 'nullable|exists:sales_orders,id',
            'project_id' => 'nullable|exists:projects,id',
            'quotation_id' => 'nullable|exists:quotations,id',
            'boq_id' => 'nullable|exists:boqs,id',
            'invoice_type' => 'nullable|string|in:general,measured_work',
            'description' => 'nullable|string|max:1000',
            'certificate_reference' => 'nullable|string|max:255',
            'subcontractor_certificate_id' => 'nullable|exists:subcontractor_certificates,id',
            'income_account_id' => 'nullable|exists:accounts,id',
            'invoice_number' => 'required|string|max:50',
            'issue_date' => 'required|date',
            'due_date' => 'required|date',
            'status' => 'required|string|in:draft,sent,paid,overdue,void',
            'subtotal' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $salesInvoice->update($validated);

        return redirect()->route('sales-invoices.index')->with('success', 'Sales Invoice updated successfully.');
    }

    public function destroy(SalesInvoice $salesInvoice)
    {
        $salesInvoice->delete();
        return redirect()->route('sales-invoices.index')->with('success', 'Sales Invoice deleted successfully.');
    }
}
