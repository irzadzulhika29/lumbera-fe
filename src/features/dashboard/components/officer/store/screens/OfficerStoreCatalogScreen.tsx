"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import DashboardSearchField from "@/src/features/dashboard/components/common/DashboardSearchField";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import OfficerFlowHeader from "@/src/features/dashboard/components/officer/layout/OfficerFlowHeader";
import StoreProductCard from "@/src/features/dashboard/components/officer/store/common/StoreProductCard";
import { getDashboardNavigation } from "@/src/features/dashboard/data";
import { storeDashboardData } from "@/src/features/dashboard/storeData";

export default function OfficerStoreCatalogScreen() {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return storeDashboardData.products;
    }

    return storeDashboardData.products.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.sku.toLowerCase().includes(normalizedQuery),
    );
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
          Menampilkan {filteredProducts.length} produk.
        </p>

        <div className="mt-6 space-y-4">
          {filteredProducts.map((product) => (
            <StoreProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </DashboardScreenShell>
  );
}
