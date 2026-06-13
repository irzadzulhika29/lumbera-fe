"use client";

import { useRouter } from "next/navigation";

import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import StoreAdjustmentSummaryCard from "@/src/features/dashboard/components/officer/store/common/StoreAdjustmentSummaryCard";
import { getStoreStockAdjustmentDraft } from "@/src/features/dashboard/utils/storeStockAdjustmentDraftStorage";
import PressButton from "@/src/shared/components/ui/PressButton";

const fallbackMutation = {
  adjustmentKind: "decrease" as const,
  adjustmentLabel: "Pengurangan",
  costPrice: "Rp 6.500",
  createdAtLabel: "11 Jun 2026, 09:08",
  hashPreview: "SHA-256: a3f7b2e1...",
  productInitials: "BP",
  productName: "Beras Premium",
  productSku: "ST001",
  productStockLabel: "Stok: 90 kg",
  quantityDifference: "-50 Kg",
  reason: "Beras rusak",
  recordedBy: "Jamaludin",
  salePrice: "Rp 8.000",
  totalQuantity: "40 Kg",
  unit: "Kg",
};

export default function OfficerStoreStockAdjustmentConfirmScreen() {
  const router = useRouter();
  const mutation = getStoreStockAdjustmentDraft() ?? fallbackMutation;

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
          <PressButton
            type="button"
            className="w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold"
            onClick={() => {
              router.push("/dashboard/officer/store/stock-adjustment/success");
            }}
          >
            Simpan
          </PressButton>
        </div>
      </div>
    </DashboardScreenShell>
  );
}
