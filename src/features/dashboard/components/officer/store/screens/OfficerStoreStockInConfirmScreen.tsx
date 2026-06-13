"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createOfficerStoreStockIn } from "@/src/features/dashboard/api";
import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import StoreMutationSummaryCard from "@/src/features/dashboard/components/officer/store/common/StoreMutationSummaryCard";
import { getStoreStockInDraft } from "@/src/features/dashboard/utils/storeStockInDraftStorage";
import { isApiError } from "@/src/shared/api";
import { saveStoreStockInDraft } from "@/src/features/dashboard/utils/storeStockInDraftStorage";
import PressButton from "@/src/shared/components/ui/PressButton";

const fallbackMutation = {
  productName: "Beras Premium",
  productInitials: "BP",
  productSku: "ST001",
  productStockLabel: "Stok: 90 kg",
  unit: "Kg",
  incomingQuantity: "500 Kg",
  totalQuantity: "590 Kg",
  costPrice: "Rp 6.500",
  salePrice: "Rp 8.000",
  description: "Stok masuk dari pemasok",
  recordedBy: "Petugas koperasi",
  createdAtLabel: "11 Jun 2026, 09:08",
  hashPreview: "Akan dibuat setelah disimpan",
  payload: {
    productId: "83c2748b-b211-48fe-aceb-b221b5d950db",
    quantity: 500,
    unitCost: 6500,
    salePrice: 8000,
    description: "Stok masuk dari pemasok",
    isOfflineCreated: false,
    clientReferenceId: "stockin-beras-premium-001",
  },
};

export default function OfficerStoreStockInConfirmScreen() {
  const router = useRouter();
  const mutation = getStoreStockInDraft() ?? fallbackMutation;
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <DashboardScreenShell background="bg-white">
      <div className="flex min-h-full flex-col bg-white px-4 pb-8 pt-[calc(1.05rem+env(safe-area-inset-top))]">
        <DashboardPageHeader
          backHref="/dashboard/officer/store/stock-in"
          title="Konfirmasi"
          subtitle="Konfirmasi pencatatan produk"
          titleClassName="text-[1.18rem]"
          variant="compact"
        />

        <div className="mt-6">
          <StoreMutationSummaryCard mutation={mutation} />
        </div>

        <div className="mt-auto pt-10">
          {error ? <p className="mb-4 text-sm text-error">{error}</p> : null}

          <PressButton
            type="button"
            className="w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold"
            disabled={isSubmitting}
            onClick={async () => {
              setError("");
              setIsSubmitting(true);

              try {
                const response = await createOfficerStoreStockIn({
                  productId: mutation.payload.productId,
                  quantity: mutation.payload.quantity,
                  unitCost: mutation.payload.unitCost,
                  salePrice: mutation.payload.salePrice,
                  description: mutation.payload.description,
                  isOfflineCreated: mutation.payload.isOfflineCreated,
                  clientReferenceId: mutation.payload.clientReferenceId,
                });

                saveStoreStockInDraft({
                  ...mutation,
                  totalQuantity: `${response.data.resulting_stock_quantity} ${response.data.unit}`,
                  hashPreview: response.data.hash_preview || response.data.current_hash,
                  recordedBy: response.data.officer_name || mutation.recordedBy,
                  createdAtLabel: response.data.recorded_at || mutation.createdAtLabel,
                });

                router.push("/dashboard/officer/store/stock-in/success");
              } catch (requestError) {
                setError(
                  isApiError(requestError)
                    ? requestError.message
                    : "Terjadi kesalahan saat menyimpan stok masuk",
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
