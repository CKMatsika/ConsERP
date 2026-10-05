<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy([TenantScope::class])]
class PurchaseRequisition extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'project_id',
        'requested_by',
        'requisition_number',
        'title',
        'status',
        'required_date',
        'notes',
    ];

    protected $casts = [
        'required_date' => 'date',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function requester(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requested_by');
    }
}
