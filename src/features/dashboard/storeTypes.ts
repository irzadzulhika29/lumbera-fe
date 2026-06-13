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
  lowStockCount: number;
  safeCount: number;
  totalCount: number;
};

export type StoreMutationFilter = "all" | "incoming" | "outgoing" | "adjustment";

export type StoreProductStatusTone = "safe" | "low";

export type StoreProductItem = {
  category: string;
  costPrice: string;
  id: string;
  initials: string;
  marginLabel: string;
  minimumStockLabel: string;
  name: string;
  rawCostPrice: number;
  rawSalePrice: number;
  rawStockQuantity: number;
  rawMinimumStockQuantity: number;
  sku: string;
  sellPrice: string;
  statusLabel: string;
  statusTone: StoreProductStatusTone;
  stockLabel: string;
  unit: string;
};

export type StoreProductDraft = {
  category: string;
  costPrice: string;
  createdAtLabel: string;
  hashPreview: string;
  initialStockQuantity: string;
  minimumStock: string;
  name: string;
  payload: {
    category: string;
    costPrice: number;
    initialStockQuantity: number;
    minimumStock: number;
    name: string;
    salePrice: number;
    unit: string;
  };
  recordedBy: string;
  salePrice: string;
  unit: string;
};

export type StoreProductSuccess = {
  code: string;
  hashPreview: string;
  name: string;
};

export type StoreStockInDraft = {
  costPrice: string;
  createdAtLabel: string;
  description: string;
  hashPreview: string;
  incomingQuantity: string;
  payload: {
    clientReferenceId?: string;
    description: string;
    isOfflineCreated?: boolean;
    productId: string;
    quantity: number;
    salePrice: number;
    unitCost: number;
  };
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
  payload: {
    clientReferenceId?: string;
    description: string;
    isOfflineCreated?: boolean;
    productId: string;
    quantityDelta: number;
  };
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
  productId: string;
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
  saleId?: string;
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
