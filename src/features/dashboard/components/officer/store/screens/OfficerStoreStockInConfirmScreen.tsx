"use client";

import { useRouter } from "next/navigation";

import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import StoreMutationSummaryCard from "@/src/features/dashboard/components/officer/store/common/StoreMutationSummaryCard";
import { getStoreStockInDraft } from "@/src/features/dashboard/utils/storeStockInDraftStorage";
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
  recordedBy: "Jamaludin",
  createdAtLabel: "11 Jun 2026, 09:08",
  hashPreview: "SHA-256: d3f7b2e1...",
};

export default function OfficerStoreStockInConfirmScreen() {
  const router = useRouter();
  const mutation = getStoreStockInDraft() ?? fallbackMutation;

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
          <PressButton
            type="button"
            className="w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold"
            onClick={() => {
              router.push("/dashboard/officer/store/stock-in/success");
            }}
          >
            Simpan
          </PressButton>
        </div>
      </div>
    </DashboardScreenShell>
  );
}
