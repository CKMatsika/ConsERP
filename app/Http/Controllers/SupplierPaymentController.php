<?php

namespace App\Http\Controllers;

use App\Models\SupplierPayment;
use App\Models\Supplier;
use App\Models\SupplierInvoice;
use App\Models\Account;
use App\Services\Accounting\AccountingPostingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SupplierPaymentController extends Controller
{
    public function index()
    {
        $payments = SupplierPayment::with(['supplier', 'supplierInvoice'])->orderBy('payment_date', 'desc')->paginate(10);
        return Inertia::render('SupplierPayments/Index', [
            'payments' => $payments
        ]);
    }

    public function create()
    {
        $suppliers = Supplier::orderBy('name')->get();
        $invoices = SupplierInvoice::where('status', '!=', 'paid')->orderBy('invoice_number')->get();
        return Inertia::render('SupplierPayments/Create', [
            'suppliers' => $suppliers,
            'invoices' => $invoices
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'supplier_invoice_id' => 'nullable|exists:supplier_invoices,id',
            'payment_reference' => 'required|string|max:50',
            'payment_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|in:bank_transfer,check,cash,credit_card',
            'notes' => 'nullable|string',
        ]);

        DB::transaction(function () use ($request, $validated) {
            $orgId = $request->user()->active_organisation_id;
            $validated['organisation_id'] = $orgId;

            $payment = SupplierPayment::create($validated);

            if (!empty($validated['supplier_invoice_id'])) {
                $invoice = SupplierInvoice::find($validated['supplier_invoice_id']);
                if ($invoice) {
                    $newPaid = $invoice->amount_paid + $validated['amount'];
                    $newStatus = $newPaid >= $invoice->total_amount ? 'paid' : $invoice->status;
                    $invoice->update([
                        'amount_paid' => $newPaid,
                        'status' => $newStatus,
                    ]);
                }
            }

            $apAcc = Account::firstOrCreate(['organisation_id' => $orgId, 'code' => '2000'], ['name' => 'Accounts Payable', 'type' => 'liability']);
            $bankAcc = Account::firstOrCreate(['organisation_id' => $orgId, 'code' => '1010'], ['name' => 'Bank Account', 'type' => 'asset']);

            $postingService = new AccountingPostingService();
            $postingService->postJournal($orgId, 'SPMT-' . $payment->payment_reference, $payment->payment_date, 'Supplier Payment ' . $payment->payment_reference, [
                ['account_id' => $apAcc->id, 'debit' => $payment->amount, 'credit' => 0],
                ['account_id' => $bankAcc->id, 'debit' => 0, 'credit' => $payment->amount],
            ]);
        });

        return redirect()->route('supplier-payments.index')->with('success', 'Supplier payment recorded successfully.');
    }

    public function edit(SupplierPayment $supplierPayment)
    {
        $suppliers = Supplier::orderBy('name')->get();
        $invoices = SupplierInvoice::orderBy('invoice_number')->get();
        return Inertia::render('SupplierPayments/Edit', [
            'payment' => $supplierPayment,
            'suppliers' => $suppliers,
            'invoices' => $invoices
        ]);
    }

    public function update(Request $request, SupplierPayment $supplierPayment)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'supplier_invoice_id' => 'nullable|exists:supplier_invoices,id',
            'payment_reference' => 'required|string|max:50',
            'payment_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|in:bank_transfer,check,cash,credit_card',
            'notes' => 'nullable|string',
        ]);

        $supplierPayment->update($validated);

        return redirect()->route('supplier-payments.index')->with('success', 'Supplier payment updated successfully.');
    }

    public function destroy(SupplierPayment $supplierPayment)
    {
        $supplierPayment->delete();
        return redirect()->route('supplier-payments.index')->with('success', 'Supplier payment deleted successfully.');
    }
}
