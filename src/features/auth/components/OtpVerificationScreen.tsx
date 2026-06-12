"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { verifyOnboardingOtp } from "@/src/features/auth/api/authApi";
import {
  getAuthPhoneHref,
  getAuthPinHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import { isApiError } from "@/src/shared/api";
import OtpInput from "@/src/shared/components/ui/OtpInput";

import AuthBackLink from "./AuthBackLink";
import AuthPageFrame from "./AuthPageFrame";
import { getOnboardingDraftSession } from "../utils/onboardingDraftStorage";

type OtpVerificationScreenProps = {
  roleId: RoleOptionId;
};

export default function OtpVerificationScreen({
  roleId,
}: OtpVerificationScreenProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const lastSubmittedOtpRef = useRef<string | null>(null);

  useEffect(() => {
    if (otp.length !== 6) {
      return;
    }

    if (lastSubmittedOtpRef.current === otp) {
      return;
    }

    let isCancelled = false;

    void (async () => {
      const onboardingDraft = getOnboardingDraftSession(roleId);

      if (!onboardingDraft?.onboardingDraftId) {
        lastSubmittedOtpRef.current = null;

        if (!isCancelled) {
          setError("Sesi onboarding tidak ditemukan. Ulangi dari awal.");
        }

        return;
      }

      lastSubmittedOtpRef.current = otp;

      try {
        await verifyOnboardingOtp({
          roleId,
          onboardingDraftId: onboardingDraft.onboardingDraftId,
          otp,
        });

        if (!isCancelled) {
          setError("");
          startTransition(() => {
            router.push(getAuthPinHref(roleId, "create"));
          });
        }
      } catch (requestError) {
        if (!isCancelled) {
          setError(
            isApiError(requestError)
              ? requestError.message
              : "Terjadi kesalahan saat memverifikasi OTP",
          );
        }

        lastSubmittedOtpRef.current = null;
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [otp, roleId, router]);

  return (
    <AuthPageFrame>
      <AuthBackLink href={getAuthPhoneHref(roleId)} />

      <div className="mt-16">
        <h1 className="text-[2.15rem] font-bold leading-none tracking-[-0.04em]">
          Verifikasi OTP
        </h1>
        <p className="mt-4 text-[1.15rem] leading-snug text-text/78">
          Masukkan OTP dari WhatsApp
        </p>
      </div>

      <div className="mt-14">
        <OtpInput
          value={otp}
          onChange={(nextOtp) => {
            if (nextOtp !== otp) {
              lastSubmittedOtpRef.current = null;
            }

            setOtp(nextOtp);

            if (error) {
              setError("");
            }
          }}
          label={
            <>
              Masukkan pin <span className="text-error">*</span>
            </>
          }
          className="[&_label]:text-[1.05rem] [&_label]:font-medium"
          slotClassName="h-13 text-base"
          emptySlotCharacter="0"
          error={error}
        />
      </div>
    </AuthPageFrame>
  );
}
