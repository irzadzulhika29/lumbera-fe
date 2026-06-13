import {
  getAuthOtpHref,
  getAuthPhoneHref,
  getAuthPinHref,
  type PinSetupStep,
  type RoleOptionId,
} from "@/src/features/onboarding/content";

type PinSetupScreenConfigParams = {
  roleId: RoleOptionId;
  step: PinSetupStep;
  isLoginStep: boolean;
  isMemberPinActivationFlow: boolean;
};

export function getPinSetupBackHref({
  roleId,
  step,
  isLoginStep,
  isMemberPinActivationFlow,
}: PinSetupScreenConfigParams) {
  if (isLoginStep) {
    return getAuthPhoneHref(roleId);
  }

  if (step === "confirm") {
    return getAuthPinHref(roleId, "create");
  }

  return isMemberPinActivationFlow ? getAuthPhoneHref(roleId) : getAuthOtpHref(roleId);
}

export function getPinSetupCopy(step: PinSetupStep, isLoginStep: boolean) {
  if (step === "confirm") {
    return {
      title: "Konfirmasi pin",
      description: "Buat pin untuk akun anda",
    };
  }

  if (isLoginStep) {
    return {
      title: "Masukkan pin",
      description: "Gunakan PIN akun anda",
    };
  }

  return {
    title: "Buat Pin Akun",
    description: "Buat pin untuk akun anda",
  };
}
