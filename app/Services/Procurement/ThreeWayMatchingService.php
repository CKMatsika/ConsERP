<?php

namespace App\Services\Procurement;

use App\Models\PurchaseOrder;
use App\Models\GoodsReceiptNote;
use App\Models\SupplierInvoice;

class ThreeWayMatchingService
{
    /**
     * Perform 3-way matching between PO, GRN, and Supplier Invoice (Bill).
     */
    public function match(PurchaseOrder $po, GoodsReceiptNote $grn, SupplierInvoice $invoice, float $tolerancePercentage = 1.0): array
    {
        $poAmount = (float) $po->total_amount;
        $invoiceAmount = (float) $invoice->total_amount;
        
        $difference = abs($poAmount - $invoiceAmount);
        $allowedTolerance = $poAmount * ($tolerancePercentage / 100);

        $matched = $difference <= $allowedTolerance;
        $grnVerified = $grn->purchase_order_id === $po->id && $grn->status === 'accepted';
        $invoiceVerified = $invoice->purchase_order_id === $po->id;

        return [
            'three_way_matched' => $matched && $grnVerified && $invoiceVerified,
            'po_amount' => $poAmount,
            'invoice_amount' => $invoiceAmount,
            'difference' => $difference,
            'grn_verified' => $grnVerified,
            'invoice_verified' => $invoiceVerified,
            'discrepancy_flag' => !$matched ? 'Amount variance exceeds tolerance' : null,
        ];
    }
}
