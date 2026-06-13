import type { RoleOptionId } from "@/src/features/onboarding/content";

export const getPendingPinStorageKey = (roleId: RoleOptionId) =>
  `lumbera.pending-pin.${roleId}`;

export const getPendingLoginPhoneStorageKey = (roleId: RoleOptionId) =>
  `lumbera.pending-login-phone.${roleId}`;

export const validatePinConfirmation = (
  originalPin: string,
  confirmationPin: string,
) => {
  if (confirmationPin.length !== 6) {
    return "PIN harus terdiri dari 6 digit";
  }

  if (!originalPin) {
    return "PIN awal tidak ditemukan. Ulangi dari awal.";
  }

  if (originalPin !== confirmationPin) {
    return "PIN tidak sesuai. Coba masukkan ulang.";
  }

  return null;
};
