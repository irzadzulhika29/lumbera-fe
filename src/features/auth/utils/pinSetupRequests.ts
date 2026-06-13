"use client";

import {
  getAuthProfileHref,
  getPostLoginHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";

import { login, setMemberPin, setOnboardingPin } from "../api/authApi";
import { saveAuthSession } from "./authSessionStorage";
import {
  clearMemberPinActivationSession,
  getMemberPinActivationSession,
} from "./memberPinActivationStorage";
import {
  getOnboardingDraftSession,
  saveOnboardingDraftSession,
} from "./onboardingDraftStorage";
import { getPendingLoginPhoneStorageKey, getPendingPinStorageKey } from "./pinSetupFlow";

export async function submitPinLogin(roleId: RoleOptionId, pin: string) {
  const pendingPhoneNumber =
    window.sessionStorage.getItem(getPendingLoginPhoneStorageKey(roleId)) ?? "";

  if (!pendingPhoneNumber) {
    throw new Error("Nomor handphone tidak ditemukan. Ulangi dari awal.");
  }

  const loginResponse = await login({
    phoneNumber: pendingPhoneNumber,
    pin,
  });

  saveAuthSession({
    accessToken: loginResponse.access_token,
    refreshToken: loginResponse.refresh_token,
    userId: loginResponse.user_id,
    cooperativeId: loginResponse.cooperative_id,
    roleId: loginResponse.role_id,
    roleCode: loginResponse.role_code,
    memberId: loginResponse.member_id,
  });

  window.sessionStorage.removeItem(getPendingLoginPhoneStorageKey(roleId));

  return getPostLoginHref(loginResponse.role_code);
}

export async function submitMemberPinActivation(
  roleId: RoleOptionId,
  originalPin: string,
  confirmPin: string,
) {
  const activationSession = getMemberPinActivationSession();

  if (!activationSession?.activationChallengeId || !activationSession.activationToken) {
    throw new Error("Sesi aktivasi anggota tidak ditemukan. Ulangi dari awal.");
  }

  const memberPinResponse = await setMemberPin({
    activationChallengeId: activationSession.activationChallengeId,
    activationToken: activationSession.activationToken,
    pin: originalPin,
    confirmPin,
  });

  saveAuthSession({
    accessToken: memberPinResponse.access_token,
    refreshToken: memberPinResponse.refresh_token,
    userId: memberPinResponse.user_id,
    cooperativeId: memberPinResponse.cooperative_id,
    roleId: memberPinResponse.role_id,
    roleCode: "ANGGOTA",
    memberId: memberPinResponse.member_id,
  });

  clearMemberPinActivationSession();
  window.sessionStorage.removeItem(getPendingPinStorageKey(roleId));
  window.sessionStorage.removeItem(getPendingLoginPhoneStorageKey(roleId));

  return getPostLoginHref("ANGGOTA");
}

export async function submitOnboardingPinSetup(
  roleId: RoleOptionId,
  originalPin: string,
  confirmPin: string,
) {
  const onboardingDraft = getOnboardingDraftSession(roleId);

  if (!onboardingDraft?.onboardingDraftId) {
    throw new Error("Sesi onboarding tidak ditemukan. Ulangi dari awal.");
  }

  const pinResponse = await setOnboardingPin({
    roleId,
    onboardingDraftId: onboardingDraft.onboardingDraftId,
    pin: originalPin,
    confirmPin,
  });

  saveOnboardingDraftSession(roleId, {
    ...onboardingDraft,
    onboardingDraftId: pinResponse.onboarding_draft_id,
    onboardingToken: pinResponse.onboarding_token,
    nextStep: pinResponse.next_step,
  });

  window.sessionStorage.removeItem(getPendingPinStorageKey(roleId));

  return getAuthProfileHref(roleId);
}
