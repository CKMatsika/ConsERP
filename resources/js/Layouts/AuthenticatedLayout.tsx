import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const categories = [
        {
            title: 'Overview',
            dashboardRoute: route('dashboard'),
            links: [
                { name: 'Dashboard', href: route('dashboard'), active: route().current('dashboard') },
                { name: 'Subscriptions', href: route('subscriptions.index'), active: route().current('subscriptions.*') },
            ],
        },
        {
            title: 'Master Data',
            dashboardRoute: route('branches.index'),
            links: [
                { name: 'Branches', href: route('branches.index'), active: route().current('branches.*') },
                { name: 'Departments', href: route('departments.index'), active: route().current('departments.*') },
                { name: 'Customers', href: route('customers.index'), active: route().current('customers.*') },
                { name: 'Suppliers', href: route('suppliers.index'), active: route().current('suppliers.*') },
            ],
        },
        {
            title: 'Sales & CRM',
            dashboardRoute: route('sales-crm.dashboard'),
            links: [
                { name: 'CRM Dashboard', href: route('sales-crm.dashboard'), active: route().current('sales-crm.*') },
                { name: 'Leads', href: route('leads.index'), active: route().current('leads.*') },
                { name: 'Prospects', href: route('prospects.index'), active: route().current('prospects.*') },
                { name: 'Quotations', href: route('quotations.index'), active: route().current('quotations.*') },
                { name: 'Tenders', href: route('tenders.index'), active: route().current('tenders.*') },
                { name: 'Sales Orders', href: route('sales-orders.index'), active: route().current('sales-orders.*') },
                { name: 'Sales Invoices', href: route('sales-invoices.index'), active: route().current('sales-invoices.*') },
                { name: 'Credit Notes', href: route('credit-notes.index'), active: route().current('credit-notes.*') },
                { name: 'Customer Payments', href: route('customer-payments.index'), active: route().current('customer-payments.*') },
            ],
        },
        {
            title: 'Estimating & QS',
            dashboardRoute: route('estimating.dashboard'),
            links: [
                { name: 'Estimating Dashboard', href: route('estimating.dashboard'), active: route().current('estimating.*') },
                { name: 'Cost Codes', href: route('cost-codes.index'), active: route().current('cost-codes.*') },
                { name: 'BOQs', href: route('boqs.index'), active: route().current('boqs.*') },
                { name: 'Rate Build-Ups', href: route('rate-build-ups.index'), active: route().current('rate-build-ups.*') },
            ],
        },
        {
            title: 'Projects & Site',
            dashboardRoute: route('projects-module.dashboard'),
            links: [
                { name: 'Projects Dashboard', href: route('projects-module.dashboard'), active: route().current('projects-module.*') },
                { name: 'Projects', href: route('projects.index'), active: route().current('projects.*') },
                { name: 'Contracts', href: route('contracts.index'), active: route().current('contracts.*') },
                { name: 'WBS Tasks', href: route('wbs-tasks.index'), active: route().current('wbs-tasks.*') },
                { name: 'Site Logs', href: route('site-logs.index'), active: route().current('site-logs.*') },
            ],
        },
        {
            title: 'Procurement',
            dashboardRoute: route('procurement.dashboard'),
            links: [
                { name: 'Procurement Dashboard', href: route('procurement.dashboard'), active: route().current('procurement.*') },
                { name: 'Requisitions', href: route('purchase-requisitions.index'), active: route().current('purchase-requisitions.*') },
                { name: 'Purchase Orders', href: route('purchase-orders.index'), active: route().current('purchase-orders.*') },
                { name: 'Goods Receipt Notes', href: route('goods-receipt-notes.index'), active: route().current('goods-receipt-notes.*') },
                { name: 'Supplier Invoices (Bills)', href: route('supplier-invoices.index'), active: route().current('supplier-invoices.*') },
                { name: 'Supplier Payments', href: route('supplier-payments.index'), active: route().current('supplier-payments.*') },
            ],
        },
        {
            title: 'Operations & Assets',
            dashboardRoute: route('operations.dashboard'),
            links: [
                { name: 'Operations Dashboard', href: route('operations.dashboard'), active: route().current('operations.*') },
                { name: 'Warehouses', href: route('warehouses.index'), active: route().current('warehouses.*') },
                { name: 'Inventory Items', href: route('inventory-items.index'), active: route().current('inventory-items.*') },
                { name: 'Stock Movements', href: route('stock-movements.index'), active: route().current('stock-movements.*') },
                { name: 'Prefab Products', href: route('prefab-products.index'), active: route().current('prefab-products.*') },
                { name: 'Bill of Materials', href: route('bill-of-materials.index'), active: route().current('bill-of-materials.*') },
                { name: 'Production Orders', href: route('production-orders.index'), active: route().current('production-orders.*') },
                { name: 'Equipment & Fleet', href: route('equipment.index'), active: route().current('equipment.*') },
                { name: 'Maintenance Records', href: route('equipment-maintenances.index'), active: route().current('equipment-maintenances.*') },
            ],
        },
        {
            title: 'HR & Subcontractors',
            dashboardRoute: route('hr-subcontractors.dashboard'),
            links: [
                { name: 'HR Dashboard', href: route('hr-subcontractors.dashboard'), active: route().current('hr-subcontractors.*') },
                { name: 'Employees', href: route('employees.index'), active: route().current('employees.*') },
                { name: 'Timesheets', href: route('timesheets.index'), active: route().current('timesheets.*') },
                { name: 'Payrolls', href: route('payrolls.index'), active: route().current('payrolls.*') },
                { name: 'SHEQ Incidents', href: route('sheq-incidents.index'), active: route().current('sheq-incidents.*') },
                { name: 'Sub. Valuations', href: route('subcontractor-valuations.index'), active: route().current('subcontractor-valuations.*') },
                { name: 'Sub. Variations', href: route('subcontractor-variations.index'), active: route().current('subcontractor-variations.*') },
                { name: 'Sub. Certificates', href: route('subcontractor-certificates.index'), active: route().current('subcontractor-certificates.*') },
            ],
        },
        {
            title: 'Financials',
            dashboardRoute: route('financials.dashboard'),
            links: [
                { name: 'Financials Dashboard', href: route('financials.dashboard'), active: route().current('financials.dashboard') },
                { name: 'Chart of Accounts', href: route('accounts.index'), active: route().current('accounts.*') },
                { name: 'Journals', href: route('journals.index'), active: route().current('journals.*') },
                { name: 'Trial Balance', href: route('financials.reports.trial-balance'), active: route().current('financials.reports.trial-balance') },
                { name: 'Profit & Loss', href: route('financials.reports.profit-loss'), active: route().current('financials.reports.profit-loss') },
                { name: 'Balance Sheet', href: route('financials.reports.balance-sheet'), active: route().current('financials.reports.balance-sheet') },
                { name: 'Cash Flow', href: route('financials.reports.cash-flow'), active: route().current('financials.reports.cash-flow') },
                { name: 'Aged Debtors (AR)', href: route('financials.reports.aged-debtors'), active: route().current('financials.reports.aged-debtors') },
                { name: 'Aged Creditors (AP)', href: route('financials.reports.aged-creditors'), active: route().current('financials.reports.aged-creditors') },
                { name: 'Banking & Accounts', href: route('bank-accounts.index'), active: route().current('bank-accounts.*') },
            ],
        },
        {
            title: 'Reports & Docs',
            dashboardRoute: route('reports.index'),
            links: [
                { name: 'Job Costing', href: route('job-costing.index'), active: route().current('job-costing.*') },
                { name: 'Reports', href: route('reports.index'), active: route().current('reports.*') },
                { name: 'Documents', href: route('documents.index'), active: route().current('documents.*') },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar for desktop */}
            <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30 bg-gray-900 text-white">
                <div className="flex items-center h-16 px-6 bg-gray-950 shrink-0">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <ApplicationLogo className="block h-8 w-auto fill-current text-white" />
                        <span className="font-bold text-lg tracking-wider">ConsERP</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="space-y-1">
                            <Link
                                href={cat.dashboardRoute}
                                className="block px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 hover:text-white transition"
                            >
                                {cat.title} ↗
                            </Link>
                            {cat.links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`block px-3 py-1.5 rounded-md text-sm font-medium transition ${
                                        link.active
                                            ? 'bg-gray-800 text-white'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main content wrapper */}
            <div className="md:pl-64 flex flex-col flex-1 min-h-screen">
                {/* Top header */}
                <header className="bg-white shadow h-16 flex items-center justify-between px-6 z-20 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        {header && <div className="text-xl font-semibold text-gray-800">{header}</div>}
                    </div>

                    <div className="flex items-center">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                    >
                                        {user.name}
                                        <svg className="ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* Mobile sidebar modal */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-40 flex md:hidden">
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
                        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-900 text-white p-4 overflow-y-auto space-y-6">
                            <div className="flex items-center justify-between h-16 px-2 mb-2 border-b border-gray-800">
                                <span className="font-bold text-lg">ConsERP</span>
                                <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white">✕</button>
                            </div>
                            {categories.map((cat, idx) => (
                                <div key={idx} className="space-y-1">
                                    <Link
                                        href={cat.dashboardRoute}
                                        onClick={() => setSidebarOpen(false)}
                                        className="block px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 hover:text-white transition"
                                    >
                                        {cat.title} ↗
                                    </Link>
                                    {cat.links.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`block px-3 py-1.5 rounded-md text-sm font-medium transition ${
                                                link.active ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Page content */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
