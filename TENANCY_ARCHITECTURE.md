# ConsERP Tenancy Architecture

## Multi-Tenancy Strategy
ConsERP uses a Shared Database, Shared Schema approach with row-level isolation.
Every tenant-specific record must include an `organisation_id`.

## Tenant Resolution
1. The active `organisation_id` is resolved from the authenticated user's current session or explicit selection, verified against their membership in `organisation_user`.
2. The frontend must NEVER submit `organisation_id` as part of a request payload.

## Enforcement
* **Global Scopes:** Laravel Global Scopes will automatically append `WHERE organisation_id = ?` to all relevant queries.
* **Middleware/Policies:** Requests are verified to ensure the user has access to the current organisation.
* **Validation:** Custom validation rules to ensure related entities (e.g., assigning a project to a customer) both belong to the same organisation.

## Super Admin
Platform Super Admins exist outside the tenant scope and manage Organisations, Subscriptions, and overall platform health via a dedicated portal.
