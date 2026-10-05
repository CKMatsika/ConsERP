<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

#[ScopedBy([TenantScope::class])]
class AIUsage extends Model
{
    protected $table = 'ai_usage';

    protected $fillable = [
        'organisation_id',
        'user_id',
        'provider',
        'model',
        'input_tokens',
        'output_tokens',
        'estimated_cost',
    ];

    protected $casts = [
        'estimated_cost' => 'decimal:6',
    ];
}
