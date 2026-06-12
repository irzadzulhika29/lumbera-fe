import { ApiError, apiClient } from "@/src/shared/api";

import type {
  ApiEnvelope,
  ForgotPinRequestOtpData,
  ForgotPinRequestOtpRequest,
  ForgotPinSetPinRequest,
  ForgotPinVerifyOtpData,
  ForgotPinVerifyOtpRequest,
  LoginData,
  LoginRequest,
} from "./authTypes";
import {
  normalizePhoneNumberForApi,
  normalizePhoneNumberForLoginApi,
} from "./phoneNumber";

export const login = async ({
  phoneNumber,
  pin,
}: {
  phoneNumber: string;
  pin: string;
}) => {
  const payload: LoginRequest = {
    phone_number: normalizePhoneNumberForLoginApi(phoneNumber),
    pin,
  };

  const response = await apiClient.post<ApiEnvelope<LoginData>, LoginRequest>(
    "/auth/login",
    payload,
  );

  if (!response.status?.isSuccess) {
    throw new ApiError({
      message: response.message || "Gagal masuk ke akun",
      status: response.status?.code ?? 500,
      code: "AUTH_LOGIN_FAILED",
      details: response,
    });
  }

  return response.data;
};

export const requestForgotPinOtp = async ({
  phoneNumber,
}: {
  phoneNumber: string;
}) => {
  const payload: ForgotPinRequestOtpRequest = {
    phone_number: normalizePhoneNumberForApi(phoneNumber),
  };

  const response = await apiClient.post<
    ApiEnvelope<ForgotPinRequestOtpData>,
    ForgotPinRequestOtpRequest
  >("/auth/forgot-pin/request-otp", payload);

  if (!response.status?.isSuccess) {
    throw new ApiError({
      message: response.message || "Gagal mengirim OTP lupa PIN",
      status: response.status?.code ?? 500,
      code: "AUTH_FORGOT_PIN_REQUEST_OTP_FAILED",
      details: response,
    });
  }

  return response.data;
};

export const verifyForgotPinOtp = async ({
  challengeId,
  phoneNumber,
  otp,
}: {
  challengeId: string;
  phoneNumber: string;
  otp: string;
}) => {
  const payload: ForgotPinVerifyOtpRequest = {
    challenge_id: challengeId,
    phone_number: phoneNumber,
    otp,
  };

  const response = await apiClient.post<
    ApiEnvelope<ForgotPinVerifyOtpData>,
    ForgotPinVerifyOtpRequest
  >("/auth/forgot-pin/verify-otp", payload);

  if (!response.status?.isSuccess) {
    throw new ApiError({
      message: response.message || "Gagal memverifikasi OTP lupa PIN",
      status: response.status?.code ?? 500,
      code: "AUTH_FORGOT_PIN_VERIFY_OTP_FAILED",
      details: response,
    });
  }

  return response.data;
};

export const setForgotPin = async ({
  challengeId,
  pinResetToken,
  pin,
  confirmPin,
}: {
  challengeId: string;
  pinResetToken: string;
  pin: string;
  confirmPin: string;
}) => {
  const payload: ForgotPinSetPinRequest = {
    challenge_id: challengeId,
    pin_reset_token: pinResetToken,
    pin,
    confirm_pin: confirmPin,
  };

  const response = await apiClient.post<
    ApiEnvelope<LoginData>,
    ForgotPinSetPinRequest
  >("/auth/forgot-pin/set-pin", payload);

  if (!response.status?.isSuccess) {
    throw new ApiError({
      message: response.message || "Gagal menyimpan PIN baru",
      status: response.status?.code ?? 500,
      code: "AUTH_FORGOT_PIN_SET_PIN_FAILED",
      details: response,
    });
  }

  return response.data;
};
