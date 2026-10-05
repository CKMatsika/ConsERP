<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/organisations/create', [\App\Http\Controllers\OrganisationController::class, 'create'])->name('organisations.create');
    Route::post('/organisations', [\App\Http\Controllers\OrganisationController::class, 'store'])->name('organisations.store');
    Route::post('/organisations/{organisation}/switch', [\App\Http\Controllers\OrganisationController::class, 'switch'])->name('organisations.switch');

    // Category Dashboards
    Route::get('/sales-crm/dashboard', [\App\Http\Controllers\SalesCrmDashboardController::class, 'index'])->name('sales-crm.dashboard');
    Route::get('/procurement/dashboard', [\App\Http\Controllers\ProcurementDashboardController::class, 'index'])->name('procurement.dashboard');
    Route::get('/estimating/dashboard', [\App\Http\Controllers\EstimatingDashboardController::class, 'index'])->name('estimating.dashboard');
    Route::get('/projects/dashboard', [\App\Http\Controllers\ProjectsDashboardController::class, 'index'])->name('projects-module.dashboard');
    Route::get('/operations/dashboard', [\App\Http\Controllers\OperationsDashboardController::class, 'index'])->name('operations.dashboard');
    Route::get('/hr-subcontractors/dashboard', [\App\Http\Controllers\HrSubcontractorsDashboardController::class, 'index'])->name('hr-subcontractors.dashboard');
    Route::get('/financials/dashboard', [\App\Http\Controllers\FinancialsDashboardController::class, 'index'])->name('financials.dashboard');

    // Phase 2: Master Data
    Route::resource('branches', \App\Http\Controllers\BranchController::class);
    Route::resource('departments', \App\Http\Controllers\DepartmentController::class);
    Route::resource('customers', \App\Http\Controllers\CustomerController::class);
    Route::resource('suppliers', \App\Http\Controllers\SupplierController::class);

    // Phase 3: CRM & Estimating
    Route::resource('leads', \App\Http\Controllers\LeadController::class);
    Route::resource('prospects', \App\Http\Controllers\ProspectController::class);
    Route::resource('quotations', \App\Http\Controllers\QuotationController::class);
    Route::resource('tenders', \App\Http\Controllers\TenderController::class);

    // Sales & CRM Expansion (Invoices, Credit Notes, Payments, Sales Orders)
    Route::resource('sales-orders', \App\Http\Controllers\SalesOrderController::class);
    Route::resource('sales-invoices', \App\Http\Controllers\SalesInvoiceController::class);
    Route::resource('credit-notes', \App\Http\Controllers\CreditNoteController::class);
    Route::resource('customer-payments', \App\Http\Controllers\CustomerPaymentController::class);

    // Phase 4: QS & Cost Control
    Route::resource('cost-codes', \App\Http\Controllers\CostCodeController::class);
    Route::resource('boqs', \App\Http\Controllers\BoqController::class);
    Route::resource('rate-build-ups', \App\Http\Controllers\RateBuildUpController::class);

    // Phase 5: Projects
    Route::resource('projects', \App\Http\Controllers\ProjectController::class);
    Route::resource('contracts', \App\Http\Controllers\ContractController::class);
    Route::resource('wbs-tasks', \App\Http\Controllers\WbsTaskController::class);
    Route::resource('site-logs', \App\Http\Controllers\SiteLogController::class);

    // Phase 6: Procurement
    Route::resource('purchase-requisitions', \App\Http\Controllers\PurchaseRequisitionController::class);
    Route::resource('purchase-orders', \App\Http\Controllers\PurchaseOrderController::class);

    // Procurement Expansion (GRNs, Supplier Invoices/Bills, Supplier Payments)
    Route::resource('goods-receipt-notes', \App\Http\Controllers\GoodsReceiptNoteController::class);
    Route::resource('supplier-invoices', \App\Http\Controllers\SupplierInvoiceController::class);
    Route::resource('supplier-payments', \App\Http\Controllers\SupplierPaymentController::class);

    // Phase 7: Inventory
    Route::resource('warehouses', \App\Http\Controllers\WarehouseController::class);
    Route::resource('inventory-items', \App\Http\Controllers\InventoryItemController::class);
    Route::resource('stock-movements', \App\Http\Controllers\StockMovementController::class);

    // Phase 8: Prefab Manufacturing
    Route::resource('prefab-products', \App\Http\Controllers\PrefabProductController::class);
    Route::resource('bill-of-materials', \App\Http\Controllers\BillOfMaterialController::class);
    Route::resource('production-orders', \App\Http\Controllers\ProductionOrderController::class);

    // Phase 9: Plant & Fleet
    Route::resource('equipment', \App\Http\Controllers\EquipmentController::class);
    Route::resource('equipment-maintenances', \App\Http\Controllers\EquipmentMaintenanceController::class);

    // Phase 10: HR & Payroll
    Route::resource('employees', \App\Http\Controllers\EmployeeController::class);
    Route::resource('timesheets', \App\Http\Controllers\TimesheetController::class);
    Route::resource('payrolls', \App\Http\Controllers\PayrollController::class);

    // Phase 11: SHEQ
    Route::resource('sheq-incidents', \App\Http\Controllers\SheqIncidentController::class);

    // Phase 12: Subcontractors & Progress
    Route::resource('subcontractor-valuations', \App\Http\Controllers\SubcontractorValuationController::class);
    Route::resource('subcontractor-variations', \App\Http\Controllers\SubcontractorVariationController::class);
    Route::resource('subcontractor-certificates', \App\Http\Controllers\SubcontractorCertificateController::class);

    // Phase 13: Financials & Accounting
    Route::resource('accounts', \App\Http\Controllers\AccountController::class);
    Route::resource('journals', \App\Http\Controllers\JournalController::class)->except(['edit', 'update']);

    // Financial Reports & Banking
    Route::get('/financials/reports/trial-balance', [\App\Http\Controllers\FinancialsReportController::class, 'trialBalance'])->name('financials.reports.trial-balance');
    Route::get('/financials/reports/profit-loss', [\App\Http\Controllers\FinancialsReportController::class, 'profitLoss'])->name('financials.reports.profit-loss');
    Route::get('/financials/reports/balance-sheet', [\App\Http\Controllers\FinancialsReportController::class, 'balanceSheet'])->name('financials.reports.balance-sheet');
    Route::get('/financials/reports/cash-flow', [\App\Http\Controllers\FinancialsReportController::class, 'cashFlow'])->name('financials.reports.cash-flow');
    Route::get('/financials/reports/aged-debtors', [\App\Http\Controllers\FinancialsReportController::class, 'agedDebtors'])->name('financials.reports.aged-debtors');
    Route::get('/financials/reports/aged-creditors', [\App\Http\Controllers\FinancialsReportController::class, 'agedCreditors'])->name('financials.reports.aged-creditors');
    Route::resource('bank-accounts', \App\Http\Controllers\BankAccountController::class);

    // Cashbook & Bank Reconciliation
    Route::get('/financials/cashbook', [\App\Http\Controllers\CashbookController::class, 'index'])->name('financials.cashbook');
    Route::get('/financials/bank-reconciliation', [\App\Http\Controllers\BankReconciliationController::class, 'index'])->name('financials.bank-reconciliation');
    Route::post('/financials/bank-reconciliation/line', [\App\Http\Controllers\BankReconciliationController::class, 'store'])->name('financials.bank-statement-line.store');
    Route::post('/financials/bank-reconciliation/{statementLine}/toggle', [\App\Http\Controllers\BankReconciliationController::class, 'reconcile'])->name('financials.bank-reconciliation.toggle');

    // Phase 14: Job Costing
    Route::get('/job-costing', [\App\Http\Controllers\JobCostingController::class, 'index'])->name('job-costing.index');

    // Phase 15: Reporting & Dashboards
    Route::get('/reports', [\App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');
    Route::resource('documents', \App\Http\Controllers\DocumentController::class)->except(['edit', 'update']);

    // Phase 16: Platform & Subscriptions
    Route::get('/subscriptions', [\App\Http\Controllers\SubscriptionController::class, 'index'])->name('subscriptions.index');
    Route::post('/subscriptions/{plan}/subscribe', [\App\Http\Controllers\SubscriptionController::class, 'subscribe'])->name('subscriptions.subscribe');

    // ConstructAI (Phase AI-1)
    Route::get('/construct-ai', [\App\Http\Controllers\ConstructAIController::class, 'index'])->name('construct-ai.index');
    Route::post('/construct-ai/chat', [\App\Http\Controllers\ConstructAIController::class, 'chat'])->name('construct-ai.chat');
    Route::get('/settings/construct-ai', [\App\Http\Controllers\ConstructAISettingsController::class, 'edit'])->name('construct-ai.settings');
    Route::put('/settings/construct-ai', [\App\Http\Controllers\ConstructAISettingsController::class, 'update'])->name('construct-ai.settings.update');
});

require __DIR__.'/auth.php';
