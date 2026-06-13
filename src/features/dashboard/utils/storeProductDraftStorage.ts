import type {
  StoreProductDraft,
  StoreProductSuccess,
} from "@/src/features/dashboard/storeTypes";

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

export function saveStoreProductSuccess(product: StoreProductSuccess) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(STORE_PRODUCT_SUCCESS_KEY, JSON.stringify(product));
}

export function getStoreProductSuccess(): StoreProductSuccess | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(STORE_PRODUCT_SUCCESS_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as StoreProductSuccess;
  } catch {
    return null;
  }
}
