<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy([TenantScope::class])]
class Payroll extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'organisation_id',
        'employee_id',
        'pay_period_start',
        'pay_period_end',
        'gross_pay',
        'deductions',
        'net_pay',
        'status',
    ];

    protected $casts = [
        'gross_pay' => 'decimal:4',
        'deductions' => 'decimal:4',
        'net_pay' => 'decimal:4',
        'pay_period_start' => 'date',
        'pay_period_end' => 'date',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}
