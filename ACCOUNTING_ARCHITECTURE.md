# ConsERP Accounting Architecture

## Core Principles
1. **Double-Entry Engine:** Every financial transaction must be recorded as a double-entry journal where Debits equal Credits.
2. **Immutability:** Posted journals cannot be altered or deleted. Corrections require adjustment or reversal entries.
3. **Data Types:** All monetary amounts MUST use `DECIMAL` types (e.g., `DECIMAL(15,4)` or `DECIMAL(19,4)` for precision). Floating point numbers (`float`, `double`) are strictly prohibited.

## The Posting Engine
An `AccountingPostingService` will centralize the creation of journals from operational activities.

### Example Workflows
* **Purchase Invoice:** `DR` Inventory/Expense/WIP, `CR` Accounts Payable.
* **Payment:** `DR` Accounts Payable, `CR` Bank.
* **Depreciation:** `DR` Depreciation Expense, `CR` Accumulated Depreciation.

## Extensibility (Xero)
The system remains authoritative. An optional Xero integration module will sync Journals, Invoices, and Contacts via an interface layer if enabled, but the core system does not depend on Xero to function.
