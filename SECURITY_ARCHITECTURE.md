# ConsERP Security Architecture

## Authentication & Authorization
* **Session Management:** Secure, HttpOnly cookie-based sessions via Laravel.
* **RBAC:** Roles and permissions are strictly enforced on the backend via Laravel Policies and Middleware. The frontend UI uses these to hide/show elements, but the backend is the source of truth.

## Data Security
* **Tenant Isolation:** Enforced via Global Scopes and explicit `organisation_id` checks.
* **Maker-Checker Workflows:** Sensitive transactions (e.g., payments, approvals) require separate users to initiate and approve.

## Infrastructure Security
* **Secrets Management:** All credentials, keys, and environment-specific configurations are stored in `.env` and never hardcoded.
* **Validation:** Strict request validation on all incoming data.
* **Audit Logging:** Immutable audit logs track who did what, when, and from what IP for critical actions.
