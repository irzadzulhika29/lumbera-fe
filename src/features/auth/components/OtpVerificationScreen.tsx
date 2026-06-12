"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getAuthPhoneHref,
  getAuthPinHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import OtpInput from "@/src/shared/components/ui/OtpInput";

import AuthBackLink from "./AuthBackLink";
import AuthPageFrame from "./AuthPageFrame";

type OtpVerificationScreenProps = {
  roleId: RoleOptionId;
};

export default function OtpVerificationScreen({
  roleId,
}: OtpVerificationScreenProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (otp.length !== 6) {
      return;
    }

    startTransition(() => {
      router.push(getAuthPinHref(roleId, "create"));
    });
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
          onChange={setOtp}
          label={
            <>
              Masukkan pin <span className="text-error">*</span>
            </>
          }
          className="[&_label]:text-[1.05rem] [&_label]:font-medium"
          slotClassName="h-13 text-base"
          emptySlotCharacter="0"
        />
      </div>
    </AuthPageFrame>
  );
}
