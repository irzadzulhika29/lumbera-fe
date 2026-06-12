"use client";

import { useState } from "react";

import OtpInput from "@/src/shared/components/ui/OtpInput";

type OtpInputShowcaseProps = {
  initialValue?: string;
  error?: string;
  hint?: string;
};

export default function OtpInputShowcase({
  initialValue = "",
  error,
  hint,
}: OtpInputShowcaseProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <OtpInput
      label="Kode OTP"
      value={value}
      onChange={setValue}
      error={error}
      hint={hint}
    />
  );
}
