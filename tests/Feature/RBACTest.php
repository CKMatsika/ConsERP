<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RBACTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_be_assigned_role_and_permission()
    {
        $user = User::factory()->create();
        
        $role = Role::create(['name' => 'Project Manager']);
        $permission = Permission::create(['name' => 'projects.create']);
        
        $role->givePermissionTo($permission);
        $user->assignRole('Project Manager');

        $this->assertTrue($user->hasRole('Project Manager'));
        $this->assertTrue($user->hasPermissionTo('projects.create'));
    }

    public function test_super_admin_flag_is_respected()
    {
        $user = User::factory()->create(['is_super_admin' => true]);
        
        // The application will need a Gate::before rule to check this,
        // but testing the property exists and is correctly casted.
        $this->assertTrue($user->is_super_admin);
    }
}
