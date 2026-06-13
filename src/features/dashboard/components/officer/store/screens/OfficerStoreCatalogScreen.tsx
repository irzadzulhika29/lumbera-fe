"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getOfficerStoreProducts } from "@/src/features/dashboard/api";
import DashboardSearchField from "@/src/features/dashboard/components/common/DashboardSearchField";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import OfficerFlowHeader from "@/src/features/dashboard/components/officer/layout/OfficerFlowHeader";
import StoreProductDetailModal from "@/src/features/dashboard/components/officer/store/common/StoreProductDetailModal";
import StoreProductCard from "@/src/features/dashboard/components/officer/store/common/StoreProductCard";
import { getDashboardNavigation } from "@/src/features/dashboard/data";
import { storeDashboardData } from "@/src/features/dashboard/storeData";
import type { StoreProductItem } from "@/src/features/dashboard/storeTypes";
import { mapOfficerStoreProductsToItems } from "@/src/features/dashboard/utils/officerStoreMapper";

export default function OfficerStoreCatalogScreen() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState(storeDashboardData.products);
  const [totalProducts, setTotalProducts] = useState(
    storeDashboardData.products.length,
  );
  const [selectedProduct, setSelectedProduct] = useState<StoreProductItem | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    getOfficerStoreProducts({
      page: 1,
      limit: 10,
      search: query.trim(),
    })
      .then((response) => {
        if (cancelled) return;

        setProducts(mapOfficerStoreProductsToItems(response.data));
        setTotalProducts(response.data.total);
      })
      .catch(() => {
        if (cancelled) return;
        setProducts(storeDashboardData.products);
        setTotalProducts(storeDashboardData.products.length);
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <DashboardScreenShell
      background="bg-white"
      navigationItems={getDashboardNavigation("officer", "Beranda")}
    >
      <OfficerFlowHeader
        backHref="/dashboard/officer/store"
        title="Katalog Produk"
        subtitle="Kelola stok produk koperasi anda"
        floatingContent={
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
            <div className="flex h-[46px] items-center rounded-[10px] border border-[#dfe5ea] bg-white px-3.5 shadow-[0_4px_10px_rgba(15,23,42,0.06)]">
              <DashboardSearchField
                ariaLabel="Cari produk"
                value={query}
                placeholder="Cari produk"
                iconClassName="h-[1.05rem] w-[1.05rem] text-text/28"
                onChange={setQuery}
                className="gap-2.5"
              />
            </div>
            <Link
              href="/dashboard/officer/store/catalog/new"
              aria-label="Tambah produk"
              className="flex h-[46px] w-[46px] items-center justify-center rounded-[10px] border border-[#dfe5ea] bg-white text-[1.85rem] leading-none text-primary shadow-[0_4px_10px_rgba(15,23,42,0.06)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              +
            </Link>
          </div>
        }
        floatingClassName="border-0 bg-transparent px-0 py-0 shadow-none"
      />

      <div className="bg-white px-4 pb-7 pt-0">
        <p className="mt-12 text-[0.86rem] font-medium text-text/72">
          Menampilkan {products.length} dari {totalProducts} produk.
        </p>

        <div className="mt-6 space-y-4">
          {products.map((product) => (
            <StoreProductCard
              key={product.id}
              product={product}
              onDetailClick={setSelectedProduct}
            />
          ))}

          {products.length === 0 ? (
            <div className="rounded-[14px] border border-border bg-white px-4 py-5 text-[0.84rem] font-medium text-text/56 shadow-sm">
              Produk tidak ditemukan.
            </div>
          ) : null}
        </div>
      </div>

      <StoreProductDetailModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </DashboardScreenShell>
  );
}
