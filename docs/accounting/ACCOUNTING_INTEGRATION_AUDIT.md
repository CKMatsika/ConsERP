# ConsERP Accounting Integration Audit

## Overview
This document provides an audit of the integration between operational modules (Sales, Procurement, Inventory, Projects, HR, Subcontractors) and the central double-entry accounting engine (`AccountingPostingService`, `journals`, `journal_entries`).

## Accounting Integration Matrix

| Transaction | GL Posting | Project Cost | Cost Code | Automatic | Tested |
|---|---|---|---|---|---|
| Sales Invoices | Manual Journals | Optional | No | No | Manual via Journals |
| Customer Payments | Manual Journals | No | No | No | Manual via Journals |
| Supplier Invoices (Bills) | Manual Journals | Optional | Optional | No | Manual via Journals |
| Supplier Payments | Manual Journals | No | No | No | Manual via Journals |
| Inventory Receipts / Issues | Manual Journals | Optional | Optional | No | Manual via Journals |
| Payroll / Timesheets | Manual Journals | Optional | Optional | No | Manual via Journals |
| Subcontractor Valuations | Manual Journals | Yes | Optional | No | Manual via Journals |
| Equipment Maintenance | Manual Journals | Optional | Optional | No | Manual via Journals |

## Findings
Currently, operational records (invoices, payments, GRNs, payroll) store monetary amounts as decimal values in their respective tables, but do not automatically trigger double-entry journal postings in the General Ledger. The GL engine currently relies on direct manual journal creation (`JournalController`).

## Recommended Phase 18C Integration
- Integrate `AccountingPostingService` into `SalesInvoiceController`, `SupplierInvoiceController`, `CustomerPaymentController`, and `SupplierPaymentController` so that posting operational documents automatically creates balanced double-entry accounting entries.
