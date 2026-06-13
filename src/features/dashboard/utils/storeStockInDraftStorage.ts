import type { StoreStockInDraft } from "@/src/features/dashboard/storeTypes";

const STORE_STOCK_IN_DRAFT_KEY = "lumbera:store-stock-in-draft";

export function saveStoreStockInDraft(draft: StoreStockInDraft) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(STORE_STOCK_IN_DRAFT_KEY, JSON.stringify(draft));
}

export function getStoreStockInDraft(): StoreStockInDraft | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(STORE_STOCK_IN_DRAFT_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as StoreStockInDraft;
  } catch {
    return null;
  }
}
