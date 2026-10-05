<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

#[ScopedBy([TenantScope::class])]
class Tender extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'title',
        'client_name',
        'submission_deadline',
        'estimated_value',
        'status',
        'notes',
    ];

    protected $casts = [
        'estimated_value' => 'decimal:4',
        'submission_deadline' => 'datetime',
    ];
}
