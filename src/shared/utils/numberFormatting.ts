export const sanitizeDigitInput = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");

  if (!digitsOnly) {
    return "";
  }

  return digitsOnly.replace(/^0+(?=\d)/, "");
};

export const formatThousandGroupedNumber = (value: string) => {
  if (!value) {
    return "";
  }

  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
