import type { RoleOptionId } from "@/src/features/onboarding/content";
import { ApiError, apiClient } from "@/src/shared/api";

import type {
  ApiEnvelope,
  CheckMemberPhoneData,
  CheckMemberPhoneRequest,
  SetMemberPinData,
  SetMemberPinRequest,
  SetPinData,
  SetPinRequest,
  StartOnboardingData,
  StartOnboardingRequest,
  VerifyOtpRequest,
} from "./authTypes";
import { normalizePhoneNumberForApi } from "./phoneNumber";

const START_ONBOARDING_ENDPOINTS: Partial<Record<RoleOptionId, string>> = {
  officer: "/onboarding/officer/start",
};

const VERIFY_OTP_ENDPOINTS: Partial<Record<RoleOptionId, string>> = {
  officer: "/onboarding/officer/verify-otp",
};

const SET_PIN_ENDPOINTS: Partial<Record<RoleOptionId, string>> = {
  officer: "/onboarding/officer/set-pin",
};

const resolveRoleEndpoint = (
  roleId: RoleOptionId,
  endpointMap: Partial<Record<RoleOptionId, string>>,
) => {
  const endpoint = endpointMap[roleId];

  if (!endpoint) {
    throw new ApiError({
      message: "Endpoint onboarding untuk role ini belum dikonfigurasi",
      status: 500,
      code: "AUTH_ENDPOINT_NOT_CONFIGURED",
      details: { roleId },
    });
  }

  return endpoint;
};

export const startOnboarding = async ({
  roleId,
  phoneNumber,
}: {
  roleId: RoleOptionId;
  phoneNumber: string;
}) => {
  const payload: StartOnboardingRequest = {
    phone_number: normalizePhoneNumberForApi(phoneNumber),
  };

  const response = await apiClient.post<
    ApiEnvelope<StartOnboardingData>,
    StartOnboardingRequest
  >(resolveRoleEndpoint(roleId, START_ONBOARDING_ENDPOINTS), payload);

  if (!response.status?.isSuccess) {
    throw new ApiError({
      message: response.message || "Gagal memulai onboarding",
      status: response.status?.code ?? 500,
      code: "AUTH_START_ONBOARDING_FAILED",
      details: response,
    });
  }

  return response.data;
};

export const checkMemberPhone = async ({
  phoneNumber,
}: {
  phoneNumber: string;
}) => {
  const payload: CheckMemberPhoneRequest = {
    phone_number: normalizePhoneNumberForApi(phoneNumber),
  };

  const response = await apiClient.post<
    ApiEnvelope<CheckMemberPhoneData>,
    CheckMemberPhoneRequest
  >("/onboarding/member/check-phone", payload);

  if (!response.status?.isSuccess) {
    throw new ApiError({
      message: response.message || "Gagal memeriksa nomor anggota",
      status: response.status?.code ?? 500,
      code: "AUTH_CHECK_MEMBER_PHONE_FAILED",
      details: response,
    });
  }

  return response.data;
};

export const verifyOnboardingOtp = async ({
  roleId,
  onboardingDraftId,
  otp,
}: {
  roleId: RoleOptionId;
  onboardingDraftId: string;
  otp: string;
}) => {
  const payload: VerifyOtpRequest = {
    onboarding_draft_id: onboardingDraftId,
    otp,
  };

  const response = await apiClient.post<ApiEnvelope<null>, VerifyOtpRequest>(
    resolveRoleEndpoint(roleId, VERIFY_OTP_ENDPOINTS),
    payload,
  );

  if (!response.status?.isSuccess) {
    throw new ApiError({
      message: response.message || "Gagal memverifikasi OTP",
      status: response.status?.code ?? 500,
      code: "AUTH_VERIFY_OTP_FAILED",
      details: response,
    });
  }
};

export const setOnboardingPin = async ({
  roleId,
  onboardingDraftId,
  pin,
  confirmPin,
}: {
  roleId: RoleOptionId;
  onboardingDraftId: string;
  pin: string;
  confirmPin: string;
}) => {
  const payload: SetPinRequest = {
    onboarding_draft_id: onboardingDraftId,
    pin,
    confirm_pin: confirmPin,
  };

  const response = await apiClient.post<ApiEnvelope<SetPinData>, SetPinRequest>(
    resolveRoleEndpoint(roleId, SET_PIN_ENDPOINTS),
    payload,
  );

  if (!response.status?.isSuccess) {
    throw new ApiError({
      message: response.message || "Gagal menyimpan PIN",
      status: response.status?.code ?? 500,
      code: "AUTH_SET_PIN_FAILED",
      details: response,
    });
  }

  return response.data;
};

export const setMemberPin = async ({
  activationChallengeId,
  activationToken,
  pin,
  confirmPin,
}: {
  activationChallengeId: string;
  activationToken: string;
  pin: string;
  confirmPin: string;
}) => {
  const payload: SetMemberPinRequest = {
    activation_challenge_id: activationChallengeId,
    activation_token: activationToken,
    pin,
    confirm_pin: confirmPin,
  };

  const response = await apiClient.post<
    ApiEnvelope<SetMemberPinData>,
    SetMemberPinRequest
  >("/onboarding/member/set-pin", payload);

  if (!response.status?.isSuccess) {
    throw new ApiError({
      message: response.message || "Gagal menyimpan PIN anggota",
      status: response.status?.code ?? 500,
      code: "AUTH_SET_MEMBER_PIN_FAILED",
      details: response,
    });
  }

  return response.data;
};
