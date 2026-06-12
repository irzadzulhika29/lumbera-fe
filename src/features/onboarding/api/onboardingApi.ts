import { ApiError } from "@/src/shared/api";
import type { ApiEnvelope } from "@/src/features/auth/api/authTypes";

import type {
  CooperativeTypeCode,
  OnboardingStepTransitionData,
  UpdateCooperativeProfileRequest,
  UpdateCooperativeTypeRequest,
  UpdatePersonalDataRequest,
} from "./onboardingTypes";

export const updatePersonalData = async ({
  onboardingDraftId,
  onboardingToken,
  ktpFile,
  fullName,
  nikHash,
  nikEncrypted,
  positionCode,
  existingCooperativeCode = "",
}: UpdatePersonalDataRequest) => {
  const formData = new FormData();
  formData.append("onboarding_draft_id", onboardingDraftId);
  formData.append("onboarding_token", onboardingToken);
  formData.append("ktp_file", ktpFile);
  formData.append("full_name", fullName);
  formData.append("nik_encrypted", nikEncrypted);
  formData.append("nik_hash", nikHash);
  formData.append("position_code", positionCode);
  formData.append("existing_cooperative_code", existingCooperativeCode);

  const response = await fetch("/api/onboarding/personal-data", {
    method: "POST",
    body: formData,
  });

  const payload = (await response.json()) as ApiEnvelope<OnboardingStepTransitionData>;

  if (!response.ok) {
    throw new ApiError({
      message: payload.message || "Gagal menyimpan data diri",
      status: response.status,
      details: payload,
    });
  }

  if (!payload.status?.isSuccess) {
    throw new ApiError({
      message: payload.message || "Gagal menyimpan data diri",
      status: payload.status?.code ?? 500,
      code: "ONBOARDING_PERSONAL_DATA_FAILED",
      details: payload,
    });
  }

  return payload.data;
};

export const updateCooperativeType = async ({
  onboardingDraftId,
  onboardingToken,
  cooperativeType,
}: UpdateCooperativeTypeRequest) => {
  const response = await fetch("/api/onboarding/cooperative-type", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      onboarding_draft_id: onboardingDraftId,
      onboarding_token: onboardingToken,
      cooperative_type: cooperativeType satisfies CooperativeTypeCode,
    }),
  });

  const payload = (await response.json()) as ApiEnvelope<OnboardingStepTransitionData>;

  if (!response.ok) {
    throw new ApiError({
      message: payload.message || "Gagal menyimpan jenis koperasi",
      status: response.status,
      details: payload,
    });
  }

  if (!payload.status?.isSuccess) {
    throw new ApiError({
      message: payload.message || "Gagal menyimpan jenis koperasi",
      status: payload.status?.code ?? 500,
      code: "ONBOARDING_COOPERATIVE_TYPE_FAILED",
      details: payload,
    });
  }

  return payload.data;
};

export const updateCooperativeProfile = async ({
  onboardingDraftId,
  onboardingToken,
  cooperativeName,
  registrationNumber,
  address,
  establishedYear,
}: UpdateCooperativeProfileRequest) => {
  const response = await fetch("/api/onboarding/cooperative-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      onboarding_draft_id: onboardingDraftId,
      onboarding_token: onboardingToken,
      cooperative_name: cooperativeName,
      registration_number: registrationNumber,
      address,
      established_year: establishedYear,
    }),
  });

  const payload = (await response.json()) as ApiEnvelope<OnboardingStepTransitionData>;

  if (!response.ok) {
    throw new ApiError({
      message: payload.message || "Gagal menyimpan profil koperasi",
      status: response.status,
      details: payload,
    });
  }

  if (!payload.status?.isSuccess) {
    throw new ApiError({
      message: payload.message || "Gagal menyimpan profil koperasi",
      status: payload.status?.code ?? 500,
      code: "ONBOARDING_COOPERATIVE_PROFILE_FAILED",
      details: payload,
    });
  }

  return payload.data;
};
