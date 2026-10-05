<?php

namespace Tests\Feature;

use App\Models\Organisation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TenantIsolationTest extends TestCase
{
    use RefreshDatabase;

    public function test_tenant_middleware_resolves_active_organisation()
    {
        $user = User::factory()->create();
        $org1 = Organisation::create(['name' => 'Org 1']);
        $org2 = Organisation::create(['name' => 'Org 2']);
        
        $user->organisations()->attach($org1->id);
        $user->update(['active_organisation_id' => $org1->id]);

        $this->actingAs($user);

        // Simulate a request to an endpoint that requires tenant isolation.
        // We'll create a dummy route in the test.
        \Illuminate\Support\Facades\Route::get('/test-tenant', function () {
            return response()->json(['org_id' => auth()->user()->active_organisation_id]);
        })->middleware([\App\Http\Middleware\TenantMiddleware::class]);

        $response = $this->get('/test-tenant');
        $response->assertStatus(200);
        $response->assertJson(['org_id' => $org1->id]);
    }

    public function test_tenant_middleware_clears_invalid_active_organisation()
    {
        $user = User::factory()->create();
        $org1 = Organisation::create(['name' => 'Org 1']);
        
        // User sets active org to an org they don't belong to
        $user->update(['active_organisation_id' => $org1->id]);

        $this->actingAs($user);

        \Illuminate\Support\Facades\Route::get('/test-tenant-invalid', function () {
            return response()->json(['org_id' => auth()->user()->active_organisation_id]);
        })->middleware([\App\Http\Middleware\TenantMiddleware::class]);

        $response = $this->get('/test-tenant-invalid');
        $response->assertStatus(200);
        $response->assertJson(['org_id' => null]);
        
        $this->assertNull($user->fresh()->active_organisation_id);
    }
}
