<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy([TenantScope::class])]
class SubcontractorCertificate extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'subcontractor_valuation_id',
        'certificate_number',
        'issue_date',
        'amount',
    ];

    protected $casts = [
        'amount' => 'decimal:4',
        'issue_date' => 'date',
    ];

    public function valuation(): BelongsTo
    {
        return $this->belongsTo(SubcontractorValuation::class, 'subcontractor_valuation_id');
    }
}
