import type { StoreProductDraft } from "@/src/features/dashboard/storeTypes";

const STORE_PRODUCT_DRAFT_KEY = "lumbera:store-product-draft";
const STORE_PRODUCT_SUCCESS_KEY = "lumbera:store-product-success";

export function saveStoreProductDraft(draft: StoreProductDraft) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(STORE_PRODUCT_DRAFT_KEY, JSON.stringify(draft));
}

export function getStoreProductDraft(): StoreProductDraft | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(STORE_PRODUCT_DRAFT_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as StoreProductDraft;
  } catch {
    return null;
  }
}

export function saveStoreProductSuccess(productName: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(STORE_PRODUCT_SUCCESS_KEY, productName);
}

export function getStoreProductSuccess() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.sessionStorage.getItem(STORE_PRODUCT_SUCCESS_KEY) ?? "";
}
