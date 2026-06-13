"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

import { setForgotPin } from "@/src/features/auth/api/authApi";
import { getPostLoginHref, type RoleOptionId } from "@/src/features/onboarding/content";
import { isApiError } from "@/src/shared/api";

import { saveAuthSession } from "../utils/authSessionStorage";
import {
  clearForgotPinSession,
  getForgotPinSession,
} from "../utils/forgotPinSessionStorage";

export function useForgotPinResetFlow(roleId: RoleOptionId) {
  const router = useRouter();
  const [step, setStep] = useState<"create" | "confirm">("create");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentValue = step === "create" ? pin : confirmPin;
  const title = step === "confirm" ? "Konfirmasi pin" : "Buat pin baru";
  const description =
    step === "confirm" ? "Masukkan ulang pin baru anda" : "Gunakan pin baru untuk akun anda";

  const handlePinChange = (nextPin: string) => {
    if (step === "create") {
      setPin(nextPin);
    } else {
      setConfirmPin(nextPin);
    }

    if (error) {
      setError("");
    }
  };

  const resetToCreateStep = () => {
    setStep("create");
    setConfirmPin("");
    setError("");
  };

  const handleContinue = async () => {
    if (step === "create") {
      if (pin.length !== 6) {
        setError("PIN harus terdiri dari 6 digit");
        return;
      }

      setError("");
      setConfirmPin("");
      setStep("confirm");
      return;
    }

    if (confirmPin.length !== 6) {
      setError("PIN harus terdiri dari 6 digit");
      return;
    }

    if (pin !== confirmPin) {
      setError("PIN tidak sesuai. Coba masukkan ulang.");
      return;
    }

    const forgotPinSession = getForgotPinSession(roleId);

    if (!forgotPinSession?.challengeId || !forgotPinSession.pinResetToken) {
      setError("Sesi lupa PIN tidak ditemukan. Ulangi dari awal.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const resetResponse = await setForgotPin({
        challengeId: forgotPinSession.challengeId,
        pinResetToken: forgotPinSession.pinResetToken,
        pin,
        confirmPin,
      });

      saveAuthSession({
        accessToken: resetResponse.access_token,
        refreshToken: resetResponse.refresh_token,
        userId: resetResponse.user_id,
        cooperativeId: resetResponse.cooperative_id,
        roleId: resetResponse.role_id,
        roleCode: resetResponse.role_code,
        memberId: resetResponse.member_id,
      });

      clearForgotPinSession(roleId);

      startTransition(() => {
        router.push(getPostLoginHref(resetResponse.role_code));
      });
    } catch (requestError) {
      setError(
        isApiError(requestError)
          ? requestError.message
          : "Terjadi kesalahan saat menyimpan PIN baru",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    step,
    pin,
    confirmPin,
    error,
    isSubmitting,
    title,
    description,
    currentValue,
    handlePinChange,
    handleContinue,
    resetToCreateStep,
  };
}
