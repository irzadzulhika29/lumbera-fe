"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { getOfficerStoreProducts } from "@/src/features/dashboard/api";
import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import { storeDashboardData } from "@/src/features/dashboard/storeData";
import type {
  StoreProductItem,
  StoreStockAdjustmentKind,
} from "@/src/features/dashboard/storeTypes";
import { mapOfficerStoreProductsToItems } from "@/src/features/dashboard/utils/officerStoreMapper";
import { saveStoreStockAdjustmentDraft } from "@/src/features/dashboard/utils/storeStockAdjustmentDraftStorage";
import BaseInput from "@/src/shared/components/ui/BaseInput";
import PressButton from "@/src/shared/components/ui/PressButton";
import SelectField from "@/src/shared/components/ui/SelectField";

export default function OfficerStoreStockAdjustmentCreateScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<StoreProductItem[]>(
    storeDashboardData.products,
  );
  const [selectedProductId, setSelectedProductId] = useState(
    storeDashboardData.products[0]?.id ?? "",
  );
  const [adjustmentKind, setAdjustmentKind] =
    useState<StoreStockAdjustmentKind>("decrease");
  const [adjustmentQuantity, setAdjustmentQuantity] = useState("50");
  const [reason, setReason] = useState("Beras rusak");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    getOfficerStoreProducts({
      page: 1,
      limit: 100,
      search: "",
    })
      .then((response) => {
        if (cancelled) return;

        const mappedProducts = mapOfficerStoreProductsToItems(response.data);
        setProducts(mappedProducts);
        setSelectedProductId((current) => current || mappedProducts[0]?.id || "");
      })
      .catch(() => {
        if (cancelled) return;
        setProducts(storeDashboardData.products);
        setSelectedProductId(
          (current) => current || storeDashboardData.products[0]?.id || "",
        );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedProduct =
    products.find((product) => product.id === selectedProductId) ?? products[0];

  const totalQuantityValue = useMemo(() => {
    const difference = Number(adjustmentQuantity.replace(/\D/g, "")) || 0;
    const baseStockValue = selectedProduct?.rawStockQuantity ?? 0;

    if (adjustmentKind === "decrease") {
      return Math.max(baseStockValue - difference, 0);
    }

    return baseStockValue + difference;
  }, [adjustmentKind, adjustmentQuantity, selectedProduct]);

  const adjustmentLabel =
    adjustmentKind === "decrease" ? "Pengurangan" : "Penambahan";
  const quantityPrefix = adjustmentKind === "decrease" ? "-" : "+";
  const totalQuantityLabel = `${totalQuantityValue} ${selectedProduct?.unit ?? ""}`;

  const productOptions = products.map((product) => ({
    label: `${product.name} (${product.sku})`,
    value: product.id,
  }));

  return (
    <DashboardScreenShell background="bg-white">
      <div className="flex min-h-full flex-col bg-white">
        <div className="px-4 pb-6 pt-[calc(1.05rem+env(safe-area-inset-top))]">
          <DashboardPageHeader
            backHref="/dashboard/officer/store"
            title="Penyesuaian Stok"
            subtitle="Penyesuaian ketersediaan stok produk"
            titleClassName="text-[1.18rem]"
            variant="compact"
          />

          <div className="mt-6 space-y-5">
            <SelectField
              label={
                <>
                  Produk <span className="text-error">*</span>
                </>
              }
              value={selectedProductId}
              options={productOptions}
              onChange={(value) => {
                setSelectedProductId(value);
                if (error) {
                  setError("");
                }
              }}
              fieldClassName="py-3.5"
            />

            {selectedProduct ? (
              <div className="rounded-[12px] bg-[#eef4f9] px-4 py-3">
                <p className="text-[0.92rem] font-bold text-text">
                  {selectedProduct.name}
                </p>
                <p className="mt-1 text-[0.8rem] font-medium text-text/72">
                  {selectedProduct.sku} - {selectedProduct.stockLabel}
                </p>
              </div>
            ) : null}

            <div className="flex w-full flex-col gap-2.5">
              <span className="text-sm leading-none font-medium text-text">
                Jenis penyesuaian
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: "Pengurangan", value: "decrease" },
                  { label: "Penambahan", value: "increase" },
                ].map((option) => {
                  const isActive = adjustmentKind === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setAdjustmentKind(option.value as StoreStockAdjustmentKind)
                      }
                      className={`rounded-[12px] px-4 py-3.5 text-[0.98rem] font-bold transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-primary-light text-white"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <BaseInput
              label={
                <>
                  Selisih stok <span className="text-error">*</span>
                </>
              }
              inputMode="numeric"
              value={adjustmentQuantity}
              onChange={(event) => {
                setAdjustmentQuantity(event.target.value.replace(/\D/g, ""));
                if (error) {
                  setError("");
                }
              }}
              startAdornment={
                <span className="text-[1.2rem] font-bold text-text/72">
                  {quantityPrefix}
                </span>
              }
              endAdornment={
                <span className="text-[1.02rem] font-bold text-text/72">
                  ({selectedProduct?.unit ?? ""})
                </span>
              }
              hint={`Sisa stok menjadi ${totalQuantityLabel}`}
              placeholder=""
            />

            <div className="flex w-full flex-col gap-2.5">
              <label className="text-sm leading-none font-medium text-text">
                Alasan <span className="text-error">*</span>
              </label>

              <textarea
                value={reason}
                onChange={(event) => {
                  setReason(event.target.value);
                  if (error) {
                    setError("");
                  }
                }}
                rows={2}
                className="min-h-[3rem] w-full resize-none rounded-lg border border-border bg-card px-5 py-3.5 text-base text-text shadow-sm outline-none transition-colors placeholder:text-text/35 focus:border-secondary/45"
              />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 mt-auto border-t border-[#e2e6ea] bg-white/96 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 backdrop-blur">
          {error ? <p className="mb-4 text-sm text-error">{error}</p> : null}

          <PressButton
            type="button"
            className="w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold"
            onClick={() => {
              const quantityValue = Number(adjustmentQuantity || "0");

              if (!selectedProduct) {
                setError("Pilih produk terlebih dahulu.");
                return;
              }

              if (!quantityValue) {
                setError("Selisih stok wajib diisi.");
                return;
              }

              saveStoreStockAdjustmentDraft({
                adjustmentKind,
                adjustmentLabel,
                costPrice: selectedProduct.costPrice,
                createdAtLabel: new Intl.DateTimeFormat("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  timeZone: "Asia/Jakarta",
                })
                  .format(new Date())
                  .replace(".", ":"),
                hashPreview: "Akan dibuat setelah disimpan",
                payload: {
                  productId: selectedProduct.id,
                  quantityDelta:
                    adjustmentKind === "decrease" ? -quantityValue : quantityValue,
                  description: reason.trim() || "Penyesuaian stok",
                  isOfflineCreated: false,
                  clientReferenceId: `adjustment-${selectedProduct.id}-${Date.now()}`,
                },
                productInitials: selectedProduct.initials,
                productName: selectedProduct.name,
                productSku: selectedProduct.sku,
                productStockLabel: selectedProduct.stockLabel,
                quantityDifference: `${quantityPrefix}${quantityValue} ${selectedProduct.unit}`,
                reason: reason.trim() || "Penyesuaian stok",
                recordedBy: "Petugas koperasi",
                salePrice: selectedProduct.sellPrice,
                totalQuantity: totalQuantityLabel,
                unit: selectedProduct.unit,
              });
              router.push("/dashboard/officer/store/stock-adjustment/confirm");
            }}
          >
            Lanjut
          </PressButton>
        </div>
      </div>
    </DashboardScreenShell>
  );
}
