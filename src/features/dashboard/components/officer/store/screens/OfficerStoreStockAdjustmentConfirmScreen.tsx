"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createOfficerStoreAdjustment } from "@/src/features/dashboard/api";
import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import StoreAdjustmentSummaryCard from "@/src/features/dashboard/components/officer/store/common/StoreAdjustmentSummaryCard";
import {
  getStoreStockAdjustmentDraft,
  saveStoreStockAdjustmentDraft,
} from "@/src/features/dashboard/utils/storeStockAdjustmentDraftStorage";
import { isApiError } from "@/src/shared/api";
import PressButton from "@/src/shared/components/ui/PressButton";

const fallbackMutation = {
  adjustmentKind: "decrease" as const,
  adjustmentLabel: "Pengurangan",
  costPrice: "Rp 6.500",
  createdAtLabel: "11 Jun 2026, 09:08",
  hashPreview: "Akan dibuat setelah disimpan",
  payload: {
    productId: "83c2748b-b211-48fe-aceb-b221b5d950db",
    quantityDelta: -50,
    description: "Beras rusak",
    isOfflineCreated: false,
    clientReferenceId: "adjustment-beras-tertinggal-001",
  },
  productInitials: "BP",
  productName: "Beras Premium",
  productSku: "ST001",
  productStockLabel: "Stok: 90 kg",
  quantityDifference: "-50 Kg",
  reason: "Beras rusak",
  recordedBy: "Petugas koperasi",
  salePrice: "Rp 8.000",
  totalQuantity: "40 Kg",
  unit: "Kg",
};

export default function OfficerStoreStockAdjustmentConfirmScreen() {
  const router = useRouter();
  const mutation = getStoreStockAdjustmentDraft() ?? fallbackMutation;
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <DashboardScreenShell background="bg-white">
      <div className="flex min-h-full flex-col bg-white">
        <div className="px-4 pb-6 pt-[calc(1.05rem+env(safe-area-inset-top))]">
          <DashboardPageHeader
            backHref="/dashboard/officer/store/stock-adjustment"
            title="Konfirmasi"
            subtitle="Konfirmasi pencatatan produk"
            titleClassName="text-[1.18rem]"
            variant="compact"
          />

          <div className="mt-6">
            <StoreAdjustmentSummaryCard mutation={mutation} />
          </div>
        </div>

        <div className="sticky bottom-0 mt-auto border-t border-[#e2e6ea] bg-white/96 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 backdrop-blur">
          {error ? <p className="mb-4 text-sm text-error">{error}</p> : null}

          <PressButton
            type="button"
            className="w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold"
            disabled={isSubmitting}
            onClick={async () => {
              setError("");
              setIsSubmitting(true);

              try {
                const response = await createOfficerStoreAdjustment({
                  productId: mutation.payload.productId,
                  quantityDelta: mutation.payload.quantityDelta,
                  description: mutation.payload.description,
                  isOfflineCreated: mutation.payload.isOfflineCreated,
                  clientReferenceId: mutation.payload.clientReferenceId,
                });

                saveStoreStockAdjustmentDraft({
                  ...mutation,
                  totalQuantity: `${response.data.resulting_stock_quantity} ${response.data.unit}`,
                  hashPreview: response.data.hash_preview || response.data.current_hash,
                  recordedBy: response.data.officer_name || mutation.recordedBy,
                  createdAtLabel: response.data.recorded_at || mutation.createdAtLabel,
                });

                router.push("/dashboard/officer/store/stock-adjustment/success");
              } catch (requestError) {
                setError(
                  isApiError(requestError)
                    ? requestError.message
                    : "Terjadi kesalahan saat menyimpan penyesuaian stok",
                );
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            {isSubmitting ? "Memproses..." : "Simpan"}
          </PressButton>
        </div>
      </div>
    </DashboardScreenShell>
  );
}
