"use client";

import { useRouter } from "next/navigation";

import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import StoreProductSummaryCard from "@/src/features/dashboard/components/officer/store/common/StoreProductSummaryCard";
import { getStoreProductDraft, saveStoreProductSuccess } from "@/src/features/dashboard/utils/storeProductDraftStorage";
import PressButton from "@/src/shared/components/ui/PressButton";

const fallbackProduct = {
  name: "Beras Premium",
  unit: "Kg",
  category: "Pertanian",
  costPrice: "Rp 6.500",
  salePrice: "Rp 8.000",
  minimumStock: "50 Kg",
  recordedBy: "Jamaludin",
  createdAtLabel: "11 Jun 2026, 09:08",
  hashPreview: "SHA-256: d3f7b2e1...",
};

export default function OfficerStoreProductConfirmScreen() {
  const router = useRouter();
  const product = getStoreProductDraft() ?? fallbackProduct;

  return (
    <DashboardScreenShell background="bg-white">
      <div className="flex min-h-full flex-col bg-white px-4 pb-8 pt-[calc(1.05rem+env(safe-area-inset-top))]">
        <DashboardPageHeader
          backHref="/dashboard/officer/store/catalog/new"
          title="Konfirmasi"
          subtitle="Tambahkan produk koperasi anda"
          titleClassName="text-[1.18rem]"
          variant="compact"
        />

        <div className="mt-6">
          <StoreProductSummaryCard product={product} />
        </div>

        <div className="mt-auto pt-10">
          <PressButton
            type="button"
            className="w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold"
            onClick={() => {
              saveStoreProductSuccess(product.name);
              router.push("/dashboard/officer/store/catalog/new/success");
            }}
          >
            Tambah produk
          </PressButton>
        </div>
      </div>
    </DashboardScreenShell>
  );
}
