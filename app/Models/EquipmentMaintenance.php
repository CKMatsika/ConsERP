<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy([TenantScope::class])]
class EquipmentMaintenance extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'equipment_id',
        'maintenance_type',
        'service_date',
        'cost',
        'notes',
    ];

    protected $casts = [
        'cost' => 'decimal:4',
        'service_date' => 'date',
    ];

    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class);
    }
}
