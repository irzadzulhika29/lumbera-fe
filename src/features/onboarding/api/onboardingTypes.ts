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
