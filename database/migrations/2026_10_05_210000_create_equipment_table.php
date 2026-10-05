<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('equipment', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organisation_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('asset_number');
            $table->string('category')->default('plant'); // plant, vehicle, tool
            $table->string('status')->default('available'); // available, in_use, maintenance, decommissioned
            $table->date('purchase_date')->nullable();
            $table->decimal('purchase_cost', 15, 4)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipment');
    }
};
