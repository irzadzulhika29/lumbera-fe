import type { StoreStockAdjustmentDraft } from "@/src/features/dashboard/storeTypes";

const STORE_STOCK_ADJUSTMENT_DRAFT_KEY = "lumbera:store-stock-adjustment-draft";

export function saveStoreStockAdjustmentDraft(draft: StoreStockAdjustmentDraft) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(
    STORE_STOCK_ADJUSTMENT_DRAFT_KEY,
    JSON.stringify(draft),
  );
}

export function getStoreStockAdjustmentDraft(): StoreStockAdjustmentDraft | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(STORE_STOCK_ADJUSTMENT_DRAFT_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as StoreStockAdjustmentDraft;
  } catch {
    return null;
  }
}
