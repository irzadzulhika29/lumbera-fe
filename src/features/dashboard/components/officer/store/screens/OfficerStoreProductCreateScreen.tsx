"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import { storeCategoryOptions, storeUnitOptions } from "@/src/features/dashboard/storeData";
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
                Stok Minimum Peringatan <span className="text-error">*</span>
              </>
            }
            inputMode="numeric"
            value={minimumStock}
            onChange={(event) => setMinimumStock(event.target.value.replace(/\D/g, ""))}
            placeholder=""
          />
        </div>

        <PressButton
          type="button"
          className="mt-10 w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold"
          onClick={() => {
            saveStoreProductDraft({
              name: name || "Beras Premium",
              unit,
              category,
              costPrice: costPrice ? `Rp ${Number(costPrice).toLocaleString("id-ID")}` : "Rp 6.500",
              salePrice: salePrice ? `Rp ${Number(salePrice).toLocaleString("id-ID")}` : "Rp 8.000",
              minimumStock: `${minimumStock || "50"} ${unit}`,
              recordedBy: "Jamaludin",
              createdAtLabel: "11 Jun 2026, 09:08",
              hashPreview: "SHA-256: d3f7b2e1...",
            });
            router.push("/dashboard/officer/store/catalog/new/confirm");
          }}
        >
          Lanjut
        </PressButton>
      </div>
    </DashboardScreenShell>
  );
}
