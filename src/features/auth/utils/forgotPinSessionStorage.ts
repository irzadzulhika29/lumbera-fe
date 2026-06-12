import type { RoleOptionId } from "@/src/features/onboarding/content";

export type ForgotPinSession = {
  challengeId: string;
  phoneNumber: string;
  expiresInSeconds: number;
  pinResetToken?: string;
};

const getStorageKey = (roleId: RoleOptionId) => `lumbera.forgot-pin.${roleId}`;

export const saveForgotPinSession = (
  roleId: RoleOptionId,
  session: ForgotPinSession,
) => {
  window.sessionStorage.setItem(getStorageKey(roleId), JSON.stringify(session));
};

export const getForgotPinSession = (roleId: RoleOptionId) => {
  const rawValue = window.sessionStorage.getItem(getStorageKey(roleId));

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as ForgotPinSession;
  } catch {
    window.sessionStorage.removeItem(getStorageKey(roleId));
    return null;
  }
};

export const clearForgotPinSession = (roleId: RoleOptionId) => {
  window.sessionStorage.removeItem(getStorageKey(roleId));
};
