import { ApiError } from "@/src/shared/api";
import type { ApiEnvelope } from "@/src/features/auth/api/authTypes";

import type {
  ActivateCooperativeRequest,
  ActivateCooperativeResponse,
  CooperativeTypeCode,
  GetOnboardingStateRequest,
  OnboardingDraftStateResponse,
  OnboardingStepTransitionData,
  UpdateBankAccountRequest,
  UpdateCooperativeProfileRequest,
  UpdateCooperativeTypeRequest,
  UpdateFinancialConfigurationRequest,
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
  existingCooperativeCode,
}: UpdatePersonalDataRequest) => {
  const formData = new FormData();
  formData.append("onboarding_draft_id", onboardingDraftId);
  formData.append("onboarding_token", onboardingToken);
  formData.append("ktp_file", ktpFile);
  formData.append("full_name", fullName);
  formData.append("nik_encrypted", nikEncrypted);
  formData.append("nik_hash", nikHash);
  formData.append("position_code", positionCode);

  if (existingCooperativeCode?.trim()) {
    formData.append("existing_cooperative_code", existingCooperativeCode.trim());
  }

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

export const updateFinancialConfiguration = async ({
  onboardingDraftId,
  onboardingToken,
  maxLoanAmountPerMember,
  loanInterestRateBpsPerMonth,
  lateFeeRateBpsPerDay,
  maxLoanTermMonths,
  mandatorySavingsPerMonth,
}: UpdateFinancialConfigurationRequest) => {
  const response = await fetch("/api/onboarding/financial-configuration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      onboarding_draft_id: onboardingDraftId,
      onboarding_token: onboardingToken,
      max_loan_amount_per_member: maxLoanAmountPerMember,
      loan_interest_rate_bps_per_month: loanInterestRateBpsPerMonth,
      late_fee_rate_bps_per_day: lateFeeRateBpsPerDay,
      max_loan_term_months: maxLoanTermMonths,
      mandatory_savings_per_month: mandatorySavingsPerMonth,
    }),
  });

  const payload = (await response.json()) as ApiEnvelope<OnboardingStepTransitionData>;

  if (!response.ok) {
    throw new ApiError({
      message: payload.message || "Gagal menyimpan konfigurasi keuangan",
      status: response.status,
      details: payload,
    });
  }

  if (!payload.status?.isSuccess) {
    throw new ApiError({
      message: payload.message || "Gagal menyimpan konfigurasi keuangan",
      status: payload.status?.code ?? 500,
      code: "ONBOARDING_FINANCIAL_CONFIGURATION_FAILED",
      details: payload,
    });
  }

  return payload.data;
};

export const updateBankAccount = async ({
  onboardingDraftId,
  onboardingToken,
  bankName,
  bankAccountNumber,
  bankAccountHolderName,
}: UpdateBankAccountRequest) => {
  const response = await fetch("/api/onboarding/bank-account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      onboarding_draft_id: onboardingDraftId,
      onboarding_token: onboardingToken,
      bank_name: bankName,
      bank_account_number: bankAccountNumber,
      bank_account_holder_name: bankAccountHolderName,
    }),
  });

  const payload = (await response.json()) as ApiEnvelope<OnboardingStepTransitionData>;

  if (!response.ok) {
    throw new ApiError({
      message: payload.message || "Gagal menyimpan rekening koperasi",
      status: response.status,
      details: payload,
    });
  }

  if (!payload.status?.isSuccess) {
    throw new ApiError({
      message: payload.message || "Gagal menyimpan rekening koperasi",
      status: payload.status?.code ?? 500,
      code: "ONBOARDING_BANK_ACCOUNT_FAILED",
      details: payload,
    });
  }

  return payload.data;
};

export const activateCooperative = async ({
  onboardingDraftId,
  onboardingToken,
}: ActivateCooperativeRequest) => {
  const response = await fetch("/api/onboarding/activate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      onboarding_draft_id: onboardingDraftId,
      onboarding_token: onboardingToken,
    }),
  });

  const payload = (await response.json()) as ApiEnvelope<ActivateCooperativeResponse>;

  if (!response.ok) {
    throw new ApiError({
      message: payload.message || "Gagal mengaktifkan koperasi",
      status: response.status,
      details: payload,
    });
  }

  if (!payload.status?.isSuccess) {
    throw new ApiError({
      message: payload.message || "Gagal mengaktifkan koperasi",
      status: payload.status?.code ?? 500,
      code: "ONBOARDING_ACTIVATION_FAILED",
      details: payload,
    });
  }

  return payload.data;
};

export const getOnboardingState = async ({
  onboardingDraftId,
  onboardingToken,
}: GetOnboardingStateRequest) => {
  const response = await fetch("/api/onboarding/state", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      onboarding_draft_id: onboardingDraftId,
      onboarding_token: onboardingToken,
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as ApiEnvelope<OnboardingDraftStateResponse>;

  if (!response.ok) {
    throw new ApiError({
      message: payload.message || "Gagal memuat ringkasan onboarding",
      status: response.status,
      details: payload,
    });
  }

  if (!payload.status?.isSuccess) {
    throw new ApiError({
      message: payload.message || "Gagal memuat ringkasan onboarding",
      status: payload.status?.code ?? 500,
      code: "ONBOARDING_STATE_FAILED",
      details: payload,
    });
  }

  return payload.data;
};
