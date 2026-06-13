"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import StoreProductSelectField from "@/src/features/dashboard/components/officer/store/common/StoreProductSelectField";
import { storeDashboardData } from "@/src/features/dashboard/storeData";
import { saveStoreStockInDraft } from "@/src/features/dashboard/utils/storeStockInDraftStorage";
import BaseInput from "@/src/shared/components/ui/BaseInput";
import CurrencyInput from "@/src/shared/components/ui/CurrencyInput";
import PressButton from "@/src/shared/components/ui/PressButton";

const defaultProduct = storeDashboardData.products[0];

export default function OfficerStoreStockInCreateScreen() {
  const router = useRouter();
  const [incomingQuantity, setIncomingQuantity] = useState("500");

  const totalQuantityLabel = useMemo(() => {
    const baseStock = Number(defaultProduct.stockLabel.replace(/\D/g, "")) || 0;
    const incomingStock = Number(incomingQuantity.replace(/\D/g, "")) || 0;
    return `${baseStock + incomingStock} Kg`;
  }, [incomingQuantity]);

  return (
    <DashboardScreenShell background="bg-white">
      <div className="flex min-h-full flex-col bg-white">
        <div className="px-4 pb-6 pt-[calc(1.05rem+env(safe-area-inset-top))]">
          <DashboardPageHeader
            backHref="/dashboard/officer/store"
            title="Stok Masuk"
            subtitle="Pencatatan Pertambahan stok"
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

            <BaseInput
              label={
                <>
                  Kuantitas masuk <span className="text-error">*</span>
                </>
              }
              inputMode="numeric"
              value={incomingQuantity}
              onChange={(event) =>
                setIncomingQuantity(event.target.value.replace(/\D/g, ""))
              }
              endAdornment={
                <span className="text-[1.02rem] font-bold text-text/72">Kg</span>
              }
              hint={`500 kg - Estimasi jadi ${totalQuantityLabel}`}
              placeholder=""
            />

            <CurrencyInput
              label="HPP (Harga Pokok Produksi)"
              value={defaultProduct.costPrice.replace(/\D/g, "")}
              onValueChange={() => {}}
              readOnly
              placeholder=""
              startAdornment={
                <span className="text-[1.05rem] font-bold text-text/72">Rp</span>
              }
            />

            <CurrencyInput
              label="Harga Jual"
              value={defaultProduct.sellPrice.replace(/\D/g, "")}
              onValueChange={() => {}}
              readOnly
              placeholder=""
              startAdornment={
                <span className="text-[1.05rem] font-bold text-text/72">Rp</span>
              }
            />
          </div>
        </div>

        <div className="sticky bottom-0 mt-auto border-t border-[#e2e6ea] bg-white/96 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 backdrop-blur">
          <PressButton
            type="button"
            className="w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold"
            onClick={() => {
              saveStoreStockInDraft({
                productName: defaultProduct.name,
                productInitials: defaultProduct.initials,
                productSku: defaultProduct.sku,
                productStockLabel: defaultProduct.stockLabel,
                unit: "Kg",
                incomingQuantity: `${incomingQuantity || "500"} Kg`,
                totalQuantity: totalQuantityLabel,
                costPrice: defaultProduct.costPrice,
                salePrice: defaultProduct.sellPrice,
                recordedBy: "Jamaludin",
                createdAtLabel: "11 Jun 2026, 09:08",
                hashPreview: "SHA-256: d3f7b2e1...",
              });
              router.push("/dashboard/officer/store/stock-in/confirm");
            }}
          >
            Lanjut
          </PressButton>
        </div>
      </div>
    </DashboardScreenShell>
  );
}
