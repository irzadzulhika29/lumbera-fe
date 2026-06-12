export type ApiStatus = {
  code: number;
  isSuccess: boolean;
};

export type ApiEnvelope<TData> = {
  status: ApiStatus;
  message: string;
  data: TData;
};

export type StartOnboardingRequest = {
  phone_number: string;
};

export type StartOnboardingData = {
  onboarding_draft_id: string;
  phone_number: string;
  expires_in_seconds: number;
};

export type VerifyOtpRequest = {
  onboarding_draft_id: string;
  otp: string;
};

export type SetPinRequest = {
  onboarding_draft_id: string;
  pin: string;
  confirm_pin: string;
};

export type SetPinData = {
  onboarding_draft_id: string;
  onboarding_token: string;
  next_step: number;
};
