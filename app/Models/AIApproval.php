<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

#[ScopedBy([TenantScope::class])]
class AIApproval extends Model
{
    use SoftDeletes;

    protected $table = 'ai_approvals';

    protected $fillable = [
        'organisation_id',
        'user_id',
        'action_name',
        'payload',
        'status',
    ];

    protected $casts = [
        'payload' => 'array',
    ];
}
