# ConsERP Database Design

## Core Architecture
* **Database:** PostgreSQL
* **Primary Keys:** UUID or ULID.
* **Foreign Keys:** Strictly enforced with constraints.
* **Soft Deletes:** Used selectively (e.g., users, projects) but avoided for immutable financial and audit logs.
* **Timestamps:** Standard `created_at`, `updated_at`, `deleted_at`.

## Key Entities
### Multi-Tenancy & Access
* `organisations`: Core tenant entity.
* `users`: Global users.
* `organisation_user`: Links users to tenants.
* `roles`, `permissions`: Standard RBAC (Spatie Permission recommended).

### Subscription Management
* `subscription_plans`: Available SaaS plans.
* `organisation_subscriptions`: Active tenant subscriptions.
* `subscription_invoices`: Platform billing.

### Project & QS
* `projects`: Main project entity linked to `organisation_id`.
* `boqs`: Bill of Quantities for projects.
* `boq_items`: Line items in a BOQ.

### Accounting Engine
* `accounts`: Chart of Accounts.
* `journals`: Journal headers.
* `journal_entries`: Double-entry lines (Debits = Credits).

### Manufacturing (Prefab)
* `prefab_products`: Standard product definitions.
* `bill_of_materials`: BOM for products.
* `production_orders`: Active manufacturing jobs.
