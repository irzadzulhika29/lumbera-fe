"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

import { requestForgotPinOtp } from "@/src/features/auth/api/authApi";
import {
  getAuthPinHref,
  getForgotPinOtpHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import { isApiError } from "@/src/shared/api";
import PressButton from "@/src/shared/components/ui/PressButton";

import AuthBackLink from "./common/AuthBackLink";
import AuthPageFrame from "./common/AuthPageFrame";
import PhoneInput from "./common/PhoneInput";
import { saveForgotPinSession } from "../utils/forgotPinSessionStorage";

type ForgotPinPhoneScreenProps = {
  roleId: RoleOptionId;
};

export default function ForgotPinPhoneScreen({
  roleId,
}: ForgotPinPhoneScreenProps) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const normalizedPhone = phone.replace(/\D/g, "");

    if (!normalizedPhone) {
      setError("Nomor handphone wajib diisi");
      return;
    }

    if (normalizedPhone.length < 9) {
      setError("Masukkan nomor WhatsApp yang valid");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const challenge = await requestForgotPinOtp({
        phoneNumber: normalizedPhone,
      });

      saveForgotPinSession(roleId, {
        challengeId: challenge.challenge_id,
        phoneNumber: challenge.phone_number,
        expiresInSeconds: challenge.expires_in_seconds,
      });

      startTransition(() => {
        router.push(getForgotPinOtpHref(roleId));
      });
    } catch (requestError) {
      setError(
        isApiError(requestError)
          ? requestError.message
          : "Terjadi kesalahan saat menghubungi server",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageFrame>
      <div className="mt-10">
        <AuthBackLink href={getAuthPinHref(roleId, "login")} />
      </div>

      <div className="mt-14">
        <h1 className="text-[2.15rem] font-bold leading-none tracking-[-0.04em]">
          Lupa Pin
        </h1>
        <p className="mt-4 text-[1.15rem] leading-snug text-text/78">
          Masukkan nomor handphone akun anda
        </p>
      </div>

      <div className="mt-10">
        <label className="text-[1.05rem] font-medium text-text">
          No. Handphone <span className="text-error">*</span>
        </label>
        <PhoneInput
          value={phone}
          error={error}
          onChange={(event) => {
            setPhone(event.target.value);

            if (error) {
              setError("");
            }
          }}
          fieldClassName={error ? "border-error px-4 py-2.5" : "px-4 py-2.5"}
          inputClassName={
            error
              ? "text-base text-error placeholder:text-error/35"
              : "text-base"
          }
          prefixClassName="text-base"
          className="mt-3"
        />
      </div>

      <div className="mt-12">
        <PressButton
          className="w-full py-3.5 text-base font-semibold"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Memproses..." : "Lanjut"}
        </PressButton>
      </div>

      <div className="mt-auto pt-12 text-center text-[0.82rem] text-text/22">
        Diawasi OJK - Sesuai UU PDP No.27/2022
      </div>
    </AuthPageFrame>
  );
}
