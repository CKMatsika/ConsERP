# ConsERP Agents

This document defines agent instructions and boundaries for working on the ConsERP codebase.

## Principles
1. **Tenant Isolation:** Agents must verify that any queries or mutations strictly enforce `organisation_id` checks. Never trust client-supplied IDs.
2. **Financial Integrity:** Agents must ensure all monetary values are stored as `DECIMAL` types and arithmetic operations use precise math functions, never floating-point.
3. **Immutability:** Accounting journals and critical stock movements must be immutable. Modifications require reversing entries.
4. **Phased Implementation:** Agents must strictly adhere to the phases defined in `IMPLEMENTATION_PLAN.md`.
