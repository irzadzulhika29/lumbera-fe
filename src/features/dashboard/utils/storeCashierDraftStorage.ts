import type { StoreCashierDraft } from "@/src/features/dashboard/storeTypes";

const STORE_CASHIER_DRAFT_KEY = "lumbera:store-cashier-draft";

export function saveStoreCashierDraft(draft: StoreCashierDraft) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(STORE_CASHIER_DRAFT_KEY, JSON.stringify(draft));
}

export function getStoreCashierDraft(): StoreCashierDraft | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(STORE_CASHIER_DRAFT_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as StoreCashierDraft;
  } catch {
    return null;
  }
}
