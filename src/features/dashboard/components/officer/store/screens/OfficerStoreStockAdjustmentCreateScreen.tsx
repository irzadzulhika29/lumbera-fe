"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import StoreProductSelectField from "@/src/features/dashboard/components/officer/store/common/StoreProductSelectField";
import { storeDashboardData } from "@/src/features/dashboard/storeData";
import type { StoreStockAdjustmentKind } from "@/src/features/dashboard/storeTypes";
import { saveStoreStockAdjustmentDraft } from "@/src/features/dashboard/utils/storeStockAdjustmentDraftStorage";
import BaseInput from "@/src/shared/components/ui/BaseInput";
import PressButton from "@/src/shared/components/ui/PressButton";

const defaultProduct = storeDashboardData.products[0];

function getBaseStockValue(stockLabel: string) {
  return Number(stockLabel.replace(/\D/g, "")) || 0;
}

export default function OfficerStoreStockAdjustmentCreateScreen() {
  const router = useRouter();
  const [adjustmentKind, setAdjustmentKind] =
    useState<StoreStockAdjustmentKind>("decrease");
  const [adjustmentQuantity, setAdjustmentQuantity] = useState("50");
  const [reason, setReason] = useState("Beras rusak");

  const baseStockValue = useMemo(
    () => getBaseStockValue(defaultProduct.stockLabel),
    [],
  );

  const totalQuantityValue = useMemo(() => {
    const difference = Number(adjustmentQuantity.replace(/\D/g, "")) || 0;

    if (adjustmentKind === "decrease") {
      return Math.max(baseStockValue - difference, 0);
    }

    return baseStockValue + difference;
  }, [adjustmentKind, adjustmentQuantity, baseStockValue]);

  const adjustmentLabel =
    adjustmentKind === "decrease" ? "Pengurangan" : "Penambahan";
  const quantityPrefix = adjustmentKind === "decrease" ? "-" : "+";
  const totalQuantityLabel = `${totalQuantityValue} Kg`;

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
            <StoreProductSelectField
              label={
                <>
                  Produk <span className="text-error">*</span>
                </>
              }
              initials={defaultProduct.initials}
              name={defaultProduct.name}
              sku={defaultProduct.sku}
              stockLabel={defaultProduct.stockLabel}
            />

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
              onChange={(event) =>
                setAdjustmentQuantity(event.target.value.replace(/\D/g, ""))
              }
              startAdornment={
                <span className="text-[1.2rem] font-bold text-text/72">
                  {quantityPrefix}
                </span>
              }
              endAdornment={
                <span className="text-[1.02rem] font-bold text-text/72">(Kg)</span>
              }
              hint={`Sisa stok menjadi ${totalQuantityValue} kg`}
              placeholder=""
            />

            <div className="flex w-full flex-col gap-2.5">
              <label className="text-sm leading-none font-medium text-text">
                Alasan <span className="text-error">*</span>
              </label>

              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={2}
                className="min-h-[3rem] w-full resize-none rounded-lg border border-border bg-card px-5 py-3.5 text-base text-text shadow-sm outline-none transition-colors placeholder:text-text/35 focus:border-secondary/45"
              />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 mt-auto border-t border-[#e2e6ea] bg-white/96 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 backdrop-blur">
          <PressButton
            type="button"
            className="w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold"
            onClick={() => {
              saveStoreStockAdjustmentDraft({
                adjustmentKind,
                adjustmentLabel,
                costPrice: defaultProduct.costPrice,
                createdAtLabel: "11 Jun 2026, 09:08",
                hashPreview: "SHA-256: a3f7b2e1...",
                productInitials: defaultProduct.initials,
                productName: defaultProduct.name,
                productSku: defaultProduct.sku,
                productStockLabel: defaultProduct.stockLabel,
                quantityDifference: `${quantityPrefix}${adjustmentQuantity || "50"} Kg`,
                reason: reason || "Beras rusak",
                recordedBy: "Jamaludin",
                salePrice: defaultProduct.sellPrice,
                totalQuantity: totalQuantityLabel,
                unit: "Kg",
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
