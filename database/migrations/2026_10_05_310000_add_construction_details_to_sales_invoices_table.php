<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('sales_invoices', function (Blueprint $table) {
            $table->string('invoice_type')->default('general')->after('invoice_number'); // general, measured_work
            $table->text('description')->nullable()->after('invoice_type');
            $table->foreignId('quotation_id')->nullable()->after('project_id')->constrained()->nullOnDelete();
            $table->foreignId('boq_id')->nullable()->after('quotation_id')->constrained()->nullOnDelete();
            $table->string('certificate_reference')->nullable()->after('boq_id');
            $table->foreignId('subcontractor_certificate_id')->nullable()->after('certificate_reference')->constrained()->nullOnDelete();
            $table->foreignId('income_account_id')->nullable()->after('subcontractor_certificate_id')->constrained('accounts')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_invoices', function (Blueprint $table) {
            $table->dropForeign(['quotation_id']);
            $table->dropForeign(['boq_id']);
            $table->dropForeign(['subcontractor_certificate_id']);
            $table->dropForeign(['income_account_id']);
            $table->dropColumn([
                'invoice_type',
                'description',
                'quotation_id',
                'boq_id',
                'certificate_reference',
                'subcontractor_certificate_id',
                'income_account_id',
            ]);
        });
    }
};
