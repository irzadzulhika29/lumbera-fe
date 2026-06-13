"use client";

import { useState } from "react";

import { createOfficerStoreProduct } from "@/src/features/dashboard/api";
import { useRouter } from "next/navigation";

import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import StoreProductSummaryCard from "@/src/features/dashboard/components/officer/store/common/StoreProductSummaryCard";
import { mapCreatedStoreProductToSuccess } from "@/src/features/dashboard/utils/officerStoreMapper";
import { getStoreProductDraft, saveStoreProductSuccess } from "@/src/features/dashboard/utils/storeProductDraftStorage";
import { isApiError } from "@/src/shared/api";
import PressButton from "@/src/shared/components/ui/PressButton";

const fallbackProduct = {
  name: "Beras Premium",
  unit: "Kg",
  category: "Pertanian",
  costPrice: "Rp 6.500",
  salePrice: "Rp 8.000",
  initialStockQuantity: "90 Kg",
  minimumStock: "50 Kg",
  recordedBy: "Petugas koperasi",
  createdAtLabel: "11 Jun 2026, 09:08",
  hashPreview: "Akan dibuat setelah disimpan",
  payload: {
    name: "Beras Premium",
    unit: "Kg",
    category: "Pertanian",
    costPrice: 6500,
    salePrice: 8000,
    minimumStock: 50,
    initialStockQuantity: 90,
  },
};

export default function OfficerStoreProductConfirmScreen() {
  const router = useRouter();
  const product = getStoreProductDraft() ?? fallbackProduct;
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          {error ? <p className="mb-4 text-sm text-error">{error}</p> : null}

          <PressButton
            type="button"
            className="w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold"
            disabled={isSubmitting}
            onClick={async () => {
              setError("");
              setIsSubmitting(true);

              try {
                const response = await createOfficerStoreProduct({
                  name: product.payload.name,
                  unit: product.payload.unit,
                  category: product.payload.category,
                  costPrice: product.payload.costPrice,
                  salePrice: product.payload.salePrice,
                  minStockQuantity: product.payload.minimumStock,
                  initialStockQuantity: product.payload.initialStockQuantity,
                  clientReferenceId: `product-${product.payload.name
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
                });

                saveStoreProductSuccess(
                  mapCreatedStoreProductToSuccess(response.data),
                );
                router.push("/dashboard/officer/store/catalog/new/success");
              } catch (requestError) {
                setError(
                  isApiError(requestError)
                    ? requestError.message
                    : "Terjadi kesalahan saat menambahkan produk",
                );
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            {isSubmitting ? "Memproses..." : "Tambah produk"}
          </PressButton>
        </div>
      </div>
    </DashboardScreenShell>
  );
}
