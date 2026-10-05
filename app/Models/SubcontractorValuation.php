<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ScopedBy([TenantScope::class])]
class SubcontractorValuation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'project_id',
        'supplier_id',
        'valuation_number',
        'valuation_date',
        'certified_amount',
        'status',
    ];

    protected $casts = [
        'certified_amount' => 'decimal:4',
        'valuation_date' => 'date',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function certificates(): HasMany
    {
        return $this->hasMany(SubcontractorCertificate::class);
    }
}
