<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy([TenantScope::class])]
class RateBuildUp extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'cost_code_id',
        'item_name',
        'unit',
        'unit_rate',
        'notes',
    ];

    protected $casts = [
        'unit_rate' => 'decimal:4',
    ];

    public function costCode(): BelongsTo
    {
        return $this->belongsTo(CostCode::class);
    }
}
