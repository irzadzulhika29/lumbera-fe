"use client";

import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { getOfficerStoreProducts } from "@/src/features/dashboard/api";
import DashboardSearchField from "@/src/features/dashboard/components/common/DashboardSearchField";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import StoreCashierHeader from "@/src/features/dashboard/components/officer/store/common/StoreCashierHeader";
import { storeDashboardData } from "@/src/features/dashboard/storeData";
import { mapOfficerStoreProductsToItems } from "@/src/features/dashboard/utils/officerStoreMapper";
import { saveStoreCashierDraft } from "@/src/features/dashboard/utils/storeCashierDraftStorage";
import PressButton from "@/src/shared/components/ui/PressButton";
import { formatThousandGroupedNumber } from "@/src/shared/utils/numberFormatting";

type CashierProduct = {
  id: string;
  initials: string;
  name: string;
  price: number;
  stockLabel: string;
  unitLabel: string;
};

const fallbackCashierProducts: CashierProduct[] = [
  {
    id: "produk-001",
    initials: "BP",
    name: "Beras Premium",
    price: 70000,
    stockLabel: "/kg - 200kg",
    unitLabel: "Kg",
  },
  {
    id: "produk-002",
    initials: "GP",
    name: "Gula Pasir",
    price: 15000,
    stockLabel: "/kg - 200kg",
    unitLabel: "Kg",
  },
  {
    id: "produk-003",
    initials: "MG",
    name: "Minyak Goreng",
    price: 25000,
    stockLabel: "/liter - 25liter",
    unitLabel: "Liter",
  },
  {
    id: "produk-004",
    initials: "TT",
    name: "Tepung Terigu",
    price: 12000,
    stockLabel: "/kg - 50kg",
    unitLabel: "Kg",
  },
  {
    id: "produk-005",
    initials: "TA",
    name: "Telur Ayam",
    price: 30000,
    stockLabel: "/rak - 10 rak",
    unitLabel: "Rak",
  },
  {
    id: "produk-006",
    initials: "KB",
    name: "Kopi Bubuk",
    price: 8000,
    stockLabel: "/250gr - 90 pak",
    unitLabel: "Pak",
  },
  {
    id: "produk-007",
    initials: "GM",
    name: "Gula Merah",
    price: 18000,
    stockLabel: "/kg - 65kg",
    unitLabel: "Kg",
  },
  {
    id: "produk-008",
    initials: "KH",
    name: "Kacang Hijau",
    price: 22000,
    stockLabel: "/kg - 40kg",
    unitLabel: "Kg",
  },
];

const initialCart = {};

function formatRupiah(value: number) {
  return `Rp ${formatThousandGroupedNumber(String(value))}`;
}

function mapStoreProductItemsToCashierProducts(
  products: ReturnType<typeof mapOfficerStoreProductsToItems>,
): CashierProduct[] {
  return products.map((product) => ({
    id: product.id,
    initials: product.initials,
    name: product.name,
    price: product.rawSalePrice,
    stockLabel: `/${product.unit} - ${product.rawStockQuantity}${product.unit}`,
    unitLabel: product.unit,
  }));
}

export default function OfficerStoreCashierScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [products, setProducts] = useState<CashierProduct[]>(fallbackCashierProducts);
  const [cartByProductId, setCartByProductId] =
    useState<Record<string, number>>(initialCart);

  useEffect(() => {
    let cancelled = false;

    getOfficerStoreProducts({
      page: 1,
      limit: 100,
      search: query.trim(),
    })
      .then((response) => {
        if (cancelled) return;

        const mappedProducts = mapStoreProductItemsToCashierProducts(
          mapOfficerStoreProductsToItems(response.data),
        );
        setProducts(mappedProducts);
      })
      .catch(() => {
        if (cancelled) return;

        setProducts(
          mapStoreProductItemsToCashierProducts(storeDashboardData.products),
        );
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return products;
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.initials.toLowerCase().includes(normalizedQuery),
    );
  }, [products, query]);

  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

  const paginatedProducts = useMemo(() => {
    const startIndex = (activePage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [activePage, filteredProducts]);

  const cartItems = useMemo(
    () =>
      products
        .filter((product) => (cartByProductId[product.id] ?? 0) > 0)
        .map((product) => ({
          ...product,
          quantity: cartByProductId[product.id],
        })),
    [cartByProductId, products],
  );

  const totalAmount = useMemo(
    () =>
      cartItems.reduce(
        (runningTotal, item) => runningTotal + item.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  const setProductQuantity = (productId: string, nextQuantity: number) => {
    setCartByProductId((current) => {
      if (nextQuantity <= 0) {
        const nextState = { ...current };
        delete nextState[productId];
        return nextState;
      }

      return {
        ...current,
        [productId]: nextQuantity,
      };
    });
  };

  const handleProductPress = (productId: string) => {
    setIsDetailOpen(true);
    setCartByProductId((current) => {
      const currentQuantity = current[productId] ?? 0;

      if (currentQuantity > 0) {
        return current;
      }

      return {
        ...current,
        [productId]: 1,
      };
    });
  };

  return (
    <DashboardScreenShell background="bg-white">
      <div className="flex min-h-full flex-col bg-white">
        <StoreCashierHeader
          actionHref="/dashboard/officer/store"
          title="Kasir Padiwangi"
          subtitle="Kelola penjualan produk koperasi anda"
        />

        <div className="px-4 pb-5 pt-0">
          <div className="mt-[-24px] rounded-[12px] border border-[#dfe5ea] bg-white px-3.5 py-3 shadow-[0_6px_16px_rgba(15,23,42,0.08)]">
            <DashboardSearchField
              ariaLabel="Cari produk"
              value={query}
              placeholder="Cari produk"
              className="gap-2.5"
              iconClassName="h-[1.05rem] w-[1.05rem] text-text/28"
              onChange={(value) => {
                setQuery(value);
                setActivePage(1);
              }}
            />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {paginatedProducts.map((product) => {
              const quantity = cartByProductId[product.id] ?? 0;
              const isSelected = quantity > 0;

              return (
                <PressButton
                  key={product.id}
                  type="button"
                  variant={isSelected ? "primary" : "outline"}
                  onClick={() => handleProductPress(product.id)}
                  className="flex min-h-[92px] flex-col justify-start rounded-[12px] px-2.5 py-2.5 text-left"
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] text-[0.82rem] font-bold ${
                        isSelected
                          ? "bg-white text-primary"
                          : "bg-primary text-white"
                      }`}
                    >
                      {product.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-[0.82rem] font-bold leading-tight ${
                          isSelected ? "text-white" : "text-primary"
                        }`}
                      >
                        {product.name}
                      </p>
                      <p
                        className={`mt-1 text-[0.78rem] font-bold leading-none ${
                          isSelected ? "text-white" : "text-primary"
                        }`}
                      >
                        {formatRupiah(product.price)}
                      </p>
                      <p
                        className={`mt-2 text-[0.68rem] font-medium ${
                          isSelected ? "text-white/82" : "text-primary/72"
                        }`}
                      >
                        {product.stockLabel}
                      </p>
                    </div>
                  </div>
                </PressButton>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={activePage === 1}
              onClick={() => setActivePage(1)}
              className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-primary-light text-primary disabled:opacity-55"
            >
              <Icon icon="solar:double-alt-arrow-left-linear" className="text-[0.9rem]" />
            </button>
            <button
              type="button"
              disabled={activePage === 1}
              onClick={() => setActivePage((current) => Math.max(1, current - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-primary-light text-primary disabled:opacity-55"
            >
              <Icon icon="solar:alt-arrow-left-linear" className="text-[0.9rem]" />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setActivePage(page)}
                className={`flex h-7 w-7 items-center justify-center rounded-[6px] border text-[0.82rem] font-semibold ${
                  page === activePage
                    ? "border-primary bg-white text-primary"
                    : "border-[#dfe5ea] bg-white text-text/45"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={activePage === totalPages}
              onClick={() => setActivePage((current) => Math.min(totalPages, current + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-primary text-white disabled:opacity-55"
            >
              <Icon icon="solar:alt-arrow-right-linear" className="text-[0.9rem]" />
            </button>
            <button
              type="button"
              disabled={activePage === totalPages}
              onClick={() => setActivePage(totalPages)}
              className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-primary text-white disabled:opacity-55"
            >
              <Icon icon="solar:double-alt-arrow-right-linear" className="text-[0.9rem]" />
            </button>
          </div>
        </div>

        <div className="sticky bottom-0 mt-auto bg-white">
          <button
            type="button"
            onClick={() => setIsDetailOpen((current) => !current)}
            className="flex w-full items-center justify-center gap-2 rounded-t-[10px] bg-primary px-4 py-2.5 text-[0.9rem] font-bold text-white"
          >
            <span>{isDetailOpen ? "Tutup detail" : "Lihat detail"}</span>
            <Icon
              icon={
                isDetailOpen
                  ? "solar:alt-arrow-down-linear"
                  : "solar:alt-arrow-up-linear"
              }
              className="text-[1rem]"
            />
          </button>

          <AnimatePresence initial={false}>
            {isDetailOpen ? (
              <motion.div
                key="cashier-detail"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.24, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={{ y: -8 }}
                  animate={{ y: 0 }}
                  exit={{ y: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="space-y-3 border-x border-border px-4 py-4"
                >
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-primary text-[0.88rem] font-bold text-white">
                            {item.initials}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-[0.88rem] font-bold text-primary">
                              {item.name}
                            </p>
                            <p className="mt-1 text-[0.82rem] font-bold text-primary">
                              {formatRupiah(item.price)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setProductQuantity(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-primary text-white"
                          >
                            <Icon
                              icon="solar:alt-arrow-left-linear"
                              className="text-[0.85rem]"
                            />
                          </button>
                          <span className="flex h-7 min-w-7 items-center justify-center rounded-[8px] border border-[#dfe5ea] px-2 text-[0.82rem] font-semibold text-primary">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setProductQuantity(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-primary text-white"
                          >
                            <Icon
                              icon="solar:alt-arrow-right-linear"
                              className="text-[0.85rem]"
                            />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-[0.88rem] font-medium text-text/55">
                      Belum ada produk dipilih.
                    </p>
                  )}
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="border-t border-[#dfe5ea] bg-white px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <div>
                <p className="text-[0.92rem] font-medium text-text/72">Total Harga</p>
                <p className="mt-1 text-[2rem] font-bold leading-none tracking-[-0.04em] text-text">
                  {formatRupiah(totalAmount)}
                </p>
              </div>

              <PressButton
                type="button"
                className="min-w-[7.8rem] rounded-[12px] px-5 py-3.5 text-[0.98rem] font-bold"
                disabled={cartItems.length === 0}
                onClick={() => {
                  saveStoreCashierDraft({
                    cashReceived: "150000",
                    changeAmount: String(Math.max(150000 - totalAmount, 0)),
                    createdAtLabel: "11 Jun 2026, 09:08",
                    hashPreview: "SHA-256: a3f7b2e1...",
                    items: cartItems.map((item) => ({
                      id: item.id,
                      initials: item.initials,
                      name: item.name,
                      price: item.price,
                      productId: item.id,
                      quantity: item.quantity,
                    })),
                    receiptNumber: "INV-0001",
                    recordedBy: "Jamaludin",
                    totalAmount: String(totalAmount),
                  });
                  router.push("/dashboard/officer/store/cashier/checkout");
                }}
              >
                Bayar tunai
              </PressButton>
            </div>
          </div>
        </div>
      </div>
    </DashboardScreenShell>
  );
}
