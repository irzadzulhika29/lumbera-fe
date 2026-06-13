"use client";

import { isApiError } from "@/src/shared/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import { storeCategoryOptions, storeUnitOptions } from "@/src/features/dashboard/storeData";
import { buildStoreProductDraft } from "@/src/features/dashboard/utils/officerStoreMapper";
import { saveStoreProductDraft } from "@/src/features/dashboard/utils/storeProductDraftStorage";
import BaseInput from "@/src/shared/components/ui/BaseInput";
import CurrencyInput from "@/src/shared/components/ui/CurrencyInput";
import PressButton from "@/src/shared/components/ui/PressButton";
import SelectField from "@/src/shared/components/ui/SelectField";

export default function OfficerStoreProductCreateScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("Kg");
  const [category, setCategory] = useState("Pertanian");
  const [costPrice, setCostPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [minimumStock, setMinimumStock] = useState("");
  const [initialStockQuantity, setInitialStockQuantity] = useState("");
  const [error, setError] = useState("");

  return (
    <DashboardScreenShell background="bg-white">
      <div className="bg-white px-4 pb-8 pt-[calc(1.05rem+env(safe-area-inset-top))]">
        <DashboardPageHeader
          backHref="/dashboard/officer/store/catalog"
          title="Tambah produk baru"
          subtitle="Tambahkan produk koperasi anda"
          titleClassName="text-[1.18rem]"
          variant="compact"
        />

        <div className="mt-6 space-y-5">
          <BaseInput
            label={
              <>
                Nama Produk <span className="text-error">*</span>
              </>
            }
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder=""
          />

          <SelectField
            label={
              <>
                Satuan <span className="text-error">*</span>
              </>
            }
            value={unit}
            options={[...storeUnitOptions]}
            onChange={setUnit}
            fieldClassName="py-3.5"
          />

          <SelectField
            label={
              <>
                Kategori <span className="text-error">*</span>
              </>
            }
            value={category}
            options={[...storeCategoryOptions]}
            onChange={setCategory}
            fieldClassName="py-3.5"
          />

          <CurrencyInput
            label={
              <>
                HPP (Harga Pokok Produksi) <span className="text-error">*</span>
              </>
            }
            value={costPrice}
            onValueChange={setCostPrice}
            placeholder=""
            startAdornment={
              <span className="text-[1.05rem] font-bold text-text/72">Rp</span>
            }
          />

          <CurrencyInput
            label={
              <>
                Harga Jual <span className="text-error">*</span>
              </>
            }
            value={salePrice}
            onValueChange={setSalePrice}
            placeholder=""
            startAdornment={
              <span className="text-[1.05rem] font-bold text-text/72">Rp</span>
            }
          />

          <BaseInput
            label={
              <>
                Stok Awal <span className="text-error">*</span>
              </>
            }
            inputMode="numeric"
            value={initialStockQuantity}
            onChange={(event) => {
              setInitialStockQuantity(event.target.value.replace(/\D/g, ""));
              if (error) {
                setError("");
              }
            }}
            placeholder=""
          />

          <BaseInput
            label={
              <>
                Stok Minimum Peringatan <span className="text-error">*</span>
              </>
            }
            inputMode="numeric"
            value={minimumStock}
            onChange={(event) => {
              setMinimumStock(event.target.value.replace(/\D/g, ""));
              if (error) {
                setError("");
              }
            }}
            placeholder=""
          />
        </div>

        {error ? <p className="mt-4 text-sm text-error">{error}</p> : null}

        <PressButton
          type="button"
          className="mt-10 w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold"
          onClick={() => {
            const trimmedName = name.trim();
            const parsedCostPrice = Number(costPrice || "0");
            const parsedSalePrice = Number(salePrice || "0");
            const parsedMinimumStock = Number(minimumStock || "0");
            const parsedInitialStockQuantity = Number(initialStockQuantity || "0");

            if (
              !trimmedName ||
              !parsedCostPrice ||
              !parsedSalePrice ||
              !parsedMinimumStock ||
              !parsedInitialStockQuantity
            ) {
              setError("Semua field wajib diisi.");
              return;
            }

            if (parsedSalePrice < parsedCostPrice) {
              setError("Harga jual tidak boleh lebih kecil dari HPP.");
              return;
            }

            saveStoreProductDraft(
              buildStoreProductDraft({
                name: trimmedName,
                unit,
                category,
                costPrice: parsedCostPrice,
                salePrice: parsedSalePrice,
                minimumStock: parsedMinimumStock,
                initialStockQuantity: parsedInitialStockQuantity,
              }),
            );
            router.push("/dashboard/officer/store/catalog/new/confirm");
          }}
        >
          Lanjut
        </PressButton>
      </div>
    </DashboardScreenShell>
  );
}
