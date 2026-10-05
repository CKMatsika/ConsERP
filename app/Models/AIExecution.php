<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

#[ScopedBy([TenantScope::class])]
class AIExecution extends Model
{
    use SoftDeletes;

    protected $table = 'ai_executions';

    protected $fillable = [
        'organisation_id',
        'user_id',
        'agent_name',
        'action_type',
        'inputs',
        'result',
        'status',
    ];

    protected $casts = [
        'inputs' => 'array',
        'result' => 'array',
    ];
}
