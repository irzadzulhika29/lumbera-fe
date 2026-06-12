"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getAuthProfileHref,
  getAuthOtpHref,
  getAuthPinHref,
  type PinSetupStep,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import PressButton from "@/src/shared/components/ui/PressButton";
import OtpInput from "@/src/shared/components/ui/OtpInput";

import AuthBackLink from "./AuthBackLink";
import AuthPageFrame from "./AuthPageFrame";
import {
  getPendingPinStorageKey,
  validatePinConfirmation,
} from "../utils/pinSetupFlow";

type PinSetupScreenProps = {
  roleId: RoleOptionId;
  step: PinSetupStep;
};

export default function PinSetupScreen({ roleId, step }: PinSetupScreenProps) {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (step !== "create") {
      return;
    }

    window.sessionStorage.removeItem(getPendingPinStorageKey(roleId));
  }, [roleId, step]);

  useEffect(() => {
    if (step !== "create" || pin.length !== 6) {
      return;
    }

    window.sessionStorage.setItem(getPendingPinStorageKey(roleId), pin);
    startTransition(() => {
      router.push(getAuthPinHref(roleId, "confirm"));
    });
  }, [pin, roleId, router, step]);

  const title = step === "confirm" ? "Konfirmasi pin" : "Buat Pin Akun";
  const description =
    step === "confirm" ? "Buat pin untuk akun anda" : "Buat pin untuk akun anda";
  const backHref =
    step === "confirm" ? getAuthPinHref(roleId, "create") : getAuthOtpHref(roleId);

  const handleConfirmPin = () => {
    const originalPin = window.sessionStorage.getItem(getPendingPinStorageKey(roleId)) ?? "";
    const validationError = validatePinConfirmation(originalPin, pin);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    window.sessionStorage.removeItem(getPendingPinStorageKey(roleId));
    startTransition(() => {
      router.push(getAuthProfileHref(roleId));
    });
  };

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
          onChange={(nextPin) => {
            setPin(nextPin);

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

      {step === "confirm" ? (
        <div className="mt-14">
          <PressButton
            className="w-full py-3.5 text-base font-semibold"
            disabled={pin.length !== 6}
            onClick={handleConfirmPin}
          >
            Lanjut
          </PressButton>
        </div>
      ) : null}
    </AuthPageFrame>
  );
}
