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

export type LoginRequest = {
  phone_number: string;
  pin: string;
};

export type LoginData = {
  access_token: string;
  refresh_token: string;
  user_id: string;
  cooperative_id: string;
  role_id: string;
  role_code: string;
  member_id: string | null;
};

export type CheckMemberPhoneRequest = {
  phone_number: string;
};

export type CheckMemberPhoneData = {
  activation_challenge_id: string;
  activation_token: string;
  phone_number: string;
  expires_in_seconds: number;
  status: "ACTIVE" | "INACTIVE";
};

export type SetMemberPinRequest = {
  activation_challenge_id: string;
  activation_token: string;
  pin: string;
  confirm_pin: string;
};

export type SetMemberPinData = {
  access_token: string;
  refresh_token: string;
  user_id: string;
  member_id: string | null;
  cooperative_id: string;
  role_id: string;
};

export type ForgotPinRequestOtpRequest = {
  phone_number: string;
};

export type ForgotPinRequestOtpData = {
  challenge_id: string;
  phone_number: string;
  expires_in_seconds: number;
};

export type ForgotPinVerifyOtpRequest = {
  challenge_id: string;
  phone_number: string;
  otp: string;
};

export type ForgotPinVerifyOtpData = {
  challenge_id: string;
  pin_reset_token: string;
  expires_in_seconds: number;
};

export type ForgotPinSetPinRequest = {
  challenge_id: string;
  pin_reset_token: string;
  pin: string;
  confirm_pin: string;
};

export type LogoutRequest = {
  refresh_token: string;
};

export type LogoutData = {
  session_id: string;
  revoked_at: string;
};
