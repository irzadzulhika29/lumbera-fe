"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { getOfficerStoreProducts } from "@/src/features/dashboard/api";
import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import { storeDashboardData } from "@/src/features/dashboard/storeData";
import type { StoreProductItem } from "@/src/features/dashboard/storeTypes";
import { mapOfficerStoreProductsToItems } from "@/src/features/dashboard/utils/officerStoreMapper";
import { saveStoreStockInDraft } from "@/src/features/dashboard/utils/storeStockInDraftStorage";
import BaseInput from "@/src/shared/components/ui/BaseInput";
import CurrencyInput from "@/src/shared/components/ui/CurrencyInput";
import PressButton from "@/src/shared/components/ui/PressButton";
import SelectField from "@/src/shared/components/ui/SelectField";

export default function OfficerStoreStockInCreateScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<StoreProductItem[]>(
    storeDashboardData.products,
  );
  const [selectedProductId, setSelectedProductId] = useState(
    storeDashboardData.products[0]?.id ?? "",
  );
  const [incomingQuantity, setIncomingQuantity] = useState("500");
  const [description, setDescription] = useState("Stok masuk dari pemasok");
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

  const totalQuantityLabel = useMemo(() => {
    if (!selectedProduct) {
      return "0";
    }

    const incomingStock = Number(incomingQuantity.replace(/\D/g, "")) || 0;
    return `${selectedProduct.rawStockQuantity + incomingStock} ${selectedProduct.unit}`;
  }, [incomingQuantity, selectedProduct]);

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
            title="Stok Masuk"
            subtitle="Pencatatan pertambahan stok"
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

            <BaseInput
              label={
                <>
                  Kuantitas masuk <span className="text-error">*</span>
                </>
              }
              inputMode="numeric"
              value={incomingQuantity}
              onChange={(event) => {
                setIncomingQuantity(event.target.value.replace(/\D/g, ""));
                if (error) {
                  setError("");
                }
              }}
              endAdornment={
                <span className="text-[1.02rem] font-bold text-text/72">
                  {selectedProduct?.unit ?? ""}
                </span>
              }
              hint={
                selectedProduct
                  ? `Estimasi stok jadi ${totalQuantityLabel}`
                  : undefined
              }
              placeholder=""
            />

            <CurrencyInput
              label="HPP (Harga Pokok Produksi)"
              value={String(selectedProduct?.rawCostPrice ?? 0)}
              onValueChange={() => {}}
              readOnly
              placeholder=""
              startAdornment={
                <span className="text-[1.05rem] font-bold text-text/72">Rp</span>
              }
            />

            <CurrencyInput
              label="Harga Jual"
              value={String(selectedProduct?.rawSalePrice ?? 0)}
              onValueChange={() => {}}
              readOnly
              placeholder=""
              startAdornment={
                <span className="text-[1.05rem] font-bold text-text/72">Rp</span>
              }
            />

            <BaseInput
              label="Keterangan"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                if (error) {
                  setError("");
                }
              }}
              placeholder=""
            />
          </div>
        </div>

        <div className="sticky bottom-0 mt-auto border-t border-[#e2e6ea] bg-white/96 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 backdrop-blur">
          {error ? <p className="mb-4 text-sm text-error">{error}</p> : null}

          <PressButton
            type="button"
            className="w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold"
            onClick={() => {
              const quantityValue = Number(incomingQuantity || "0");

              if (!selectedProduct) {
                setError("Pilih produk terlebih dahulu.");
                return;
              }

              if (!quantityValue) {
                setError("Kuantitas masuk wajib diisi.");
                return;
              }

              saveStoreStockInDraft({
                productName: selectedProduct.name,
                productInitials: selectedProduct.initials,
                productSku: selectedProduct.sku,
                productStockLabel: selectedProduct.stockLabel,
                unit: selectedProduct.unit,
                incomingQuantity: `${quantityValue} ${selectedProduct.unit}`,
                totalQuantity: totalQuantityLabel,
                costPrice: selectedProduct.costPrice,
                salePrice: selectedProduct.sellPrice,
                description: description.trim() || "Stok masuk",
                recordedBy: "Petugas koperasi",
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
                  quantity: quantityValue,
                  unitCost: selectedProduct.rawCostPrice,
                  salePrice: selectedProduct.rawSalePrice,
                  description: description.trim() || "Stok masuk",
                  isOfflineCreated: false,
                  clientReferenceId: `stockin-${selectedProduct.id}-${Date.now()}`,
                },
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
