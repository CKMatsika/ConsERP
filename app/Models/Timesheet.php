<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy([TenantScope::class])]
class Timesheet extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'employee_id',
        'project_id',
        'work_date',
        'hours_worked',
        'description',
        'status',
    ];

    protected $casts = [
        'hours_worked' => 'decimal:2',
        'work_date' => 'date',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
