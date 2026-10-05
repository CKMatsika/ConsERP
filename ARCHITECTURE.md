# ConsERP Architecture

## Overview
ConsERP is a Multi-Tenant Construction ERP SaaS application designed to handle both general building/civil construction and prefabricated building manufacturing.

## Technology Stack
* **Backend:** PHP 8.4+, Laravel 13
* **Database:** PostgreSQL
* **Frontend:** React, TypeScript, Inertia.js, Tailwind CSS
* **Caching & Queues:** Redis (via Laravel Cache/Queues)
* **Job Scheduling:** Laravel Scheduler
* **Storage:** S3-compatible object storage
* **Testing:** PHPUnit/Pest (Backend), Vitest (Frontend), Playwright (E2E)

## High-Level Architecture
1. **Multi-Tenancy:** Single database, schema-based or row-based tenant isolation using `organisation_id`.
2. **Modular Monolith:** Application divided into distinct modules (CRM, QS, Projects, Procurement, Inventory, Prefab, HR, Payroll, SHEQ, Subcontractors, Accounting) communicating through well-defined service boundaries.
3. **Frontend:** Inertia.js bridges Laravel with React to provide an SPA feel without building a separate API.
4. **API:** Versioned RESTful API under `/api/v1` for external integrations and mobile apps.

## Key Design Principles
* **Environment Configuration:** Strict reliance on `.env` for all infrastructure parameters.
* **UUID/ULID:** Used for primary and foreign keys.
* **Data Integrity:** Numeric/Decimal fields for currency, database transactions for critical operations.
* **Security:** Strict tenant isolation, granular RBAC, maker-checker approval workflows.
