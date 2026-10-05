<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TenantMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->active_organisation_id) {
            // Check if the user actually belongs to this organisation
            $valid = $user->organisations()->where('organisation_id', $user->active_organisation_id)->exists();
            if (!$valid) {
                // If they have an invalid active_organisation, clear it
                $user->active_organisation_id = null;
                $user->save();
            }
        }

        return $next($request);
    }
}
