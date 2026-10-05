<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ScopedBy([TenantScope::class])]
class Project extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'customer_id',
        'name',
        'code',
        'status',
        'start_date',
        'end_date',
        'contract_value',
    ];

    protected $casts = [
        'contract_value' => 'decimal:4',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function contracts(): HasMany
    {
        return $this->hasMany(Contract::class);
    }

    public function wbsTasks(): HasMany
    {
        return $this->hasMany(WbsTask::class);
    }

    public function siteLogs(): HasMany
    {
        return $this->hasMany(SiteLog::class);
    }
}
