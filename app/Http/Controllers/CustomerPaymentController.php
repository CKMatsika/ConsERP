<?php

namespace App\Http\Controllers;

use App\Models\CustomerPayment;
use App\Models\Customer;
use App\Models\SalesInvoice;
use App\Models\Account;
use App\Services\Accounting\AccountingPostingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CustomerPaymentController extends Controller
{
    public function index()
    {
        $payments = CustomerPayment::with(['customer', 'invoice'])->orderBy('payment_date', 'desc')->paginate(10);
        return Inertia::render('CustomerPayments/Index', [
            'payments' => $payments
        ]);
    }

    public function create()
    {
        $customers = Customer::orderBy('name')->get();
        $invoices = SalesInvoice::where('status', '!=', 'paid')->orderBy('invoice_number')->get();
        return Inertia::render('CustomerPayments/Create', [
            'customers' => $customers,
            'invoices' => $invoices
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'sales_invoice_id' => 'nullable|exists:sales_invoices,id',
            'payment_reference' => 'required|string|max:50',
            'payment_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|in:bank_transfer,check,cash,credit_card',
            'notes' => 'nullable|string',
        ]);

        DB::transaction(function () use ($request, $validated) {
            $orgId = $request->user()->active_organisation_id;
            $validated['organisation_id'] = $orgId;

            $payment = CustomerPayment::create($validated);

            if (!empty($validated['sales_invoice_id'])) {
                $invoice = SalesInvoice::find($validated['sales_invoice_id']);
                if ($invoice) {
                    $newPaid = $invoice->amount_paid + $validated['amount'];
                    $newStatus = $newPaid >= $invoice->total_amount ? 'paid' : $invoice->status;
                    $invoice->update([
                        'amount_paid' => $newPaid,
                        'status' => $newStatus,
                    ]);
                }
            }

            $bankAcc = Account::firstOrCreate(['organisation_id' => $orgId, 'code' => '1010'], ['name' => 'Bank Account', 'type' => 'asset']);
            $arAcc = Account::firstOrCreate(['organisation_id' => $orgId, 'code' => '1200'], ['name' => 'Accounts Receivable', 'type' => 'asset']);

            $postingService = new AccountingPostingService();
            $postingService->postJournal($orgId, 'PMT-' . $payment->payment_reference, $payment->payment_date, 'Customer Receipt ' . $payment->payment_reference, [
                ['account_id' => $bankAcc->id, 'debit' => $payment->amount, 'credit' => 0],
                ['account_id' => $arAcc->id, 'debit' => 0, 'credit' => $payment->amount],
            ]);
        });

        return redirect()->route('customer-payments.index')->with('success', 'Customer payment recorded successfully.');
    }

    public function edit(CustomerPayment $customerPayment)
    {
        $customers = Customer::orderBy('name')->get();
        $invoices = SalesInvoice::orderBy('invoice_number')->get();
        return Inertia::render('CustomerPayments/Edit', [
            'payment' => $customerPayment,
            'customers' => $customers,
            'invoices' => $invoices
        ]);
    }

    public function update(Request $request, CustomerPayment $customerPayment)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'sales_invoice_id' => 'nullable|exists:sales_invoices,id',
            'payment_reference' => 'required|string|max:50',
            'payment_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|in:bank_transfer,check,cash,credit_card',
            'notes' => 'nullable|string',
        ]);

        $customerPayment->update($validated);

        return redirect()->route('customer-payments.index')->with('success', 'Customer payment updated successfully.');
    }

    public function destroy(CustomerPayment $customerPayment)
    {
        $customerPayment->delete();
        return redirect()->route('customer-payments.index')->with('success', 'Customer payment deleted successfully.');
    }
}
