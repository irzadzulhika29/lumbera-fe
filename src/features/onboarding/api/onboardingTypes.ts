export type OnboardingStepTransitionData = {
  onboarding_draft_id: string;
  current_step: number;
  next_step: string;
};

export type UpdatePersonalDataRequest = {
  onboardingDraftId: string;
  onboardingToken: string;
  ktpFile: File;
  fullName: string;
  nikHash: string;
  nikEncrypted: string;
  positionCode: string;
  existingCooperativeCode?: string;
};

export type CooperativeTypeCode =
  | "KSP"
  | "PANGAN_BULKY"
  | "COLD_CHAIN"
  | "TOKO_GERAI"
  | "UTILITY"
  | "PETERNAKAN";

export type UpdateCooperativeTypeRequest = {
  onboardingDraftId: string;
  onboardingToken: string;
  cooperativeType: CooperativeTypeCode;
};

export type UpdateCooperativeProfileRequest = {
  onboardingDraftId: string;
  onboardingToken: string;
  cooperativeName: string;
  registrationNumber: string;
  address: string;
  establishedYear: number;
};

export type UpdateFinancialConfigurationRequest = {
  onboardingDraftId: string;
  onboardingToken: string;
  maxLoanAmountPerMember: number;
  loanInterestRateBpsPerMonth: number;
  lateFeeRateBpsPerDay: number;
  maxLoanTermMonths: number;
  mandatorySavingsPerMonth: number;
};

export type UpdateBankAccountRequest = {
  onboardingDraftId: string;
  onboardingToken: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountHolderName: string;
};

export type ActivateCooperativeRequest = {
  onboardingDraftId: string;
  onboardingToken: string;
};

export type ActivateCooperativeResponse = {
  user_id: string;
  cooperative_id: string;
  membership_id: string;
  next_step: string;
};

export type GetOnboardingStateRequest = {
  onboardingDraftId: string;
  onboardingToken: string;
};

export type OnboardingDraftStateResponse = {
  onboarding_draft_id: string;
  phone_number: string;
  status: string;
  current_step: number;
  next_step: string;
  completed_steps: string[];
  draft_data: {
    personal_data?: {
      full_name?: string;
      nik_hash?: string;
      ktp_image_url?: string;
      position_code?: string;
      existing_cooperative_code?: string;
    };
    cooperative_type?: {
      cooperative_type?: CooperativeTypeCode;
    };
    cooperative_profile?: {
      cooperative_name?: string;
      registration_number?: string;
      address?: string;
      established_year?: number;
    };
    financial_configuration?: {
      max_loan_amount_per_member?: number;
      loan_interest_rate_bps_per_month?: number;
      late_fee_rate_bps_per_day?: number;
      max_loan_term_months?: number;
      mandatory_savings_per_month?: number;
    };
    bank_account?: {
      bank_name?: string;
      bank_account_number?: string;
      bank_account_holder_name?: string;
    };
  };
};
