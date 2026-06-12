"use client";

import BaseInput from "./BaseInput";
import {
  formatThousandGroupedNumber,
  sanitizeDigitInput,
} from "@/src/shared/utils/numberFormatting";

type CurrencyInputProps = Omit<
  React.ComponentProps<typeof BaseInput>,
  "type" | "inputMode" | "value" | "onChange"
> & {
  value: string;
  onValueChange: (value: string) => void;
};

export default function CurrencyInput({
  value,
  onValueChange,
  ...props
}: CurrencyInputProps) {
  return (
    <BaseInput
      {...props}
      type="text"
      inputMode="numeric"
      value={formatThousandGroupedNumber(value)}
      onChange={(event) => {
        onValueChange(sanitizeDigitInput(event.target.value));
      }}
    />
  );
}
