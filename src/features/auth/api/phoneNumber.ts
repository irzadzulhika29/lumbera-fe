export const normalizePhoneNumberForApi = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");

  if (!digitsOnly) {
    return "";
  }

  if (digitsOnly.startsWith("0")) {
    return digitsOnly;
  }

  if (digitsOnly.startsWith("62")) {
    return `0${digitsOnly.slice(2)}`;
  }

  return `0${digitsOnly}`;
};
