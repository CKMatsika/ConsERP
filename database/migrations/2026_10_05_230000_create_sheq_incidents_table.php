<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sheq_incidents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organisation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('project_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('reported_by')->nullable()->constrained('users')->nullOnDelete();
            $table->dateTime('incident_date');
            $table->string('category')->default('safety'); // safety, quality, environmental
            $table->string('severity')->default('medium'); // low, medium, high, critical
            $table->text('description');
            $table->text('corrective_action')->nullable();
            $table->string('status')->default('open'); // open, investigating, resolved, closed
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sheq_incidents');
    }
};
