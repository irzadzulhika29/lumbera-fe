import type { RoleOptionId } from "@/src/features/onboarding/content";

export type OnboardingDraftSession = {
  onboardingDraftId: string;
  roleId: RoleOptionId;
  phoneNumber: string;
  expiresInSeconds: number;
  onboardingToken?: string;
  nextStep?: number | string;
  userId?: string;
  cooperativeId?: string;
  membershipId?: string;
};

const getStorageKey = (roleId: RoleOptionId) =>
  `lumbera.onboarding-draft.${roleId}`;

export const saveOnboardingDraftSession = (
  roleId: RoleOptionId,
  session: OnboardingDraftSession,
) => {
  window.localStorage.setItem(getStorageKey(roleId), JSON.stringify(session));
};

export const getOnboardingDraftSession = (roleId: RoleOptionId) => {
  const rawValue = window.localStorage.getItem(getStorageKey(roleId));

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as OnboardingDraftSession;
  } catch {
    window.localStorage.removeItem(getStorageKey(roleId));
    return null;
  }
};

export const clearOnboardingDraftSession = (roleId: RoleOptionId) => {
  window.localStorage.removeItem(getStorageKey(roleId));
};
