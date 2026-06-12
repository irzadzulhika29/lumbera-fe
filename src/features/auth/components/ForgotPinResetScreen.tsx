"use client";

import { getForgotPinOtpHref, type RoleOptionId } from "@/src/features/onboarding/content";
import PressButton from "@/src/shared/components/ui/PressButton";
import OtpInput from "@/src/shared/components/ui/OtpInput";

import AuthBackLink from "./common/AuthBackLink";
import AuthPageFrame from "./common/AuthPageFrame";
import { useForgotPinResetFlow } from "../hooks/useForgotPinResetFlow";

type ForgotPinResetScreenProps = {
  roleId: RoleOptionId;
};

export default function ForgotPinResetScreen({
  roleId,
}: ForgotPinResetScreenProps) {
  const {
    step,
    error,
    isSubmitting,
    title,
    description,
    currentValue,
    handlePinChange,
    handleContinue,
    resetToCreateStep,
  } = useForgotPinResetFlow(roleId);

  return (
    <AuthPageFrame>
      <AuthBackLink
        href={step === "confirm" ? undefined : getForgotPinOtpHref(roleId)}
        onClick={step === "confirm" ? resetToCreateStep : undefined}
      />

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
          value={currentValue}
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

      <div className="mt-14">
        <PressButton
          className="w-full py-3.5 text-base font-semibold"
          disabled={currentValue.length !== 6 || isSubmitting}
          onClick={handleContinue}
        >
          {isSubmitting ? "Memproses..." : step === "confirm" ? "Simpan" : "Lanjut"}
        </PressButton>
      </div>
    </AuthPageFrame>
  );
}
