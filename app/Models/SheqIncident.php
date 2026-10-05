<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy([TenantScope::class])]
class SheqIncident extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'project_id',
        'reported_by',
        'incident_date',
        'category',
        'severity',
        'description',
        'corrective_action',
        'status',
    ];

    protected $casts = [
        'incident_date' => 'datetime',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function reporter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reported_by');
    }
}
