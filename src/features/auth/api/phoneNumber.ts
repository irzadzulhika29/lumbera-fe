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

export const normalizePhoneNumberForLoginApi = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");

  if (!digitsOnly) {
    return "";
  }

  if (digitsOnly.startsWith("62")) {
    return digitsOnly;
  }

  if (digitsOnly.startsWith("0")) {
    return `62${digitsOnly.slice(1)}`;
  }

  return `62${digitsOnly}`;
};
