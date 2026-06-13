import type { DashboardTransaction } from "@/src/features/dashboard/types";

export type StoreActionItem = {
  href: string;
  icon: string;
  label: string;
};

export type StoreActionSection = {
  actions: StoreActionItem[];
  title: string;
};

export type StoreDashboardStats = {
  failedCount: number;
  lowStockCount: number;
  successCount: number;
  totalCount: number;
};

export type StoreMutationFilter = "all" | "incoming" | "outgoing" | "adjustment";

export type StoreProductStatusTone = "safe" | "low";

export type StoreProductItem = {
  costPrice: string;
  id: string;
  initials: string;
  marginLabel: string;
  name: string;
  sku: string;
  sellPrice: string;
  statusLabel: string;
  statusTone: StoreProductStatusTone;
  stockLabel: string;
};

export type StoreProductDraft = {
  category: string;
  costPrice: string;
  createdAtLabel: string;
  hashPreview: string;
  minimumStock: string;
  name: string;
  recordedBy: string;
  salePrice: string;
  unit: string;
};

export type StoreStockInDraft = {
  costPrice: string;
  createdAtLabel: string;
  hashPreview: string;
  incomingQuantity: string;
  productInitials: string;
  productName: string;
  productSku: string;
  productStockLabel: string;
  recordedBy: string;
  salePrice: string;
  totalQuantity: string;
  unit: string;
};

export type StoreStockAdjustmentKind = "decrease" | "increase";

export type StoreStockAdjustmentDraft = {
  adjustmentKind: StoreStockAdjustmentKind;
  adjustmentLabel: string;
  costPrice: string;
  createdAtLabel: string;
  hashPreview: string;
  productInitials: string;
  productName: string;
  productSku: string;
  productStockLabel: string;
  quantityDifference: string;
  reason: string;
  recordedBy: string;
  salePrice: string;
  totalQuantity: string;
  unit: string;
};

export type StoreCashierDraftItem = {
  id: string;
  initials: string;
  name: string;
  price: number;
  quantity: number;
};

export type StoreCashierDraft = {
  cashReceived: string;
  changeAmount: string;
  createdAtLabel: string;
  hashPreview: string;
  items: StoreCashierDraftItem[];
  receiptNumber: string;
  recordedBy: string;
  totalAmount: string;
};

export type StoreDashboardViewModel = {
  alertHref: string;
  alertLabel: string;
  dateLabel: string;
  mutationFilters: ReadonlyArray<{
    label: string;
    value: StoreMutationFilter;
  }>;
  mutations: Array<
    DashboardTransaction & {
      mutationType: Exclude<StoreMutationFilter, "all">;
    }
  >;
  productCountLabel: string;
  products: StoreProductItem[];
  sections: StoreActionSection[];
  stats: StoreDashboardStats;
};
