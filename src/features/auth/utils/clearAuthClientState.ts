import { clearOnboardingDraftSession } from "./onboardingDraftStorage";
import { clearForgotPinSession } from "./forgotPinSessionStorage";
import { clearMemberPinActivationSession } from "./memberPinActivationStorage";
import { clearAuthSession } from "./authSessionStorage";
import {
  getPendingLoginPhoneStorageKey,
  getPendingPinStorageKey,
} from "./pinSetupFlow";

const ROLE_IDS = ["officer", "member"] as const;

export const clearAuthClientState = () => {
  clearAuthSession();
  clearMemberPinActivationSession();

  for (const roleId of ROLE_IDS) {
    clearOnboardingDraftSession(roleId);
    clearForgotPinSession(roleId);
    window.sessionStorage.removeItem(getPendingLoginPhoneStorageKey(roleId));
    window.sessionStorage.removeItem(getPendingPinStorageKey(roleId));
  }
};
