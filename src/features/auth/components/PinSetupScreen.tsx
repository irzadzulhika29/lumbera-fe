"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";

import {
  getForgotPinPhoneHref,
  type PinSetupStep,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import PressButton from "@/src/shared/components/ui/PressButton";
import OtpInput from "@/src/shared/components/ui/OtpInput";

import AuthBackLink from "./common/AuthBackLink";
import AuthPageFrame from "./common/AuthPageFrame";
import { usePinSetupScreen } from "../hooks/usePinSetupScreen";

type PinSetupScreenProps = {
  roleId: RoleOptionId;
  step: PinSetupStep;
};

export default function PinSetupScreen({ roleId, step }: PinSetupScreenProps) {
  const router = useRouter();
  const {
    pin,
    error,
    title,
    description,
    isLoginStep,
    isSubmitting,
    backHref,
    handlePinChange,
    handleContinue,
  } = usePinSetupScreen(roleId, step);

  return (
    <AuthPageFrame>
      <AuthBackLink href={backHref} />

      <div className="mt-16">
        <h1 className="text-[2.15rem] font-bold leading-none tracking-[-0.04em]">
          {title}
        </h1>
        <p className="mt-4 text-[1.15rem] leading-snug text-text/78">
          {description}
        </p>
      </div>

      <div className="mt-14">
        <OtpInput
          value={pin}
          onChange={handlePinChange}
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

      {isLoginStep ? (
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            className="text-[1.02rem] font-semibold text-primary"
            onClick={() => {
              startTransition(() => {
                router.push(getForgotPinPhoneHref(roleId));
              });
            }}
          >
            Lupa pin?
          </button>
        </div>
      ) : null}

      {step === "confirm" || isLoginStep ? (
        <div className="mt-14">
          <PressButton
            className="w-full py-3.5 text-base font-semibold"
            disabled={pin.length !== 6 || isSubmitting}
            onClick={handleContinue}
          >
            {isSubmitting ? "Memproses..." : isLoginStep ? "Masuk" : "Lanjut"}
          </PressButton>
        </div>
      ) : null}
    </AuthPageFrame>
  );
}
