"use client";

import { useId, useRef, type ClipboardEvent, type KeyboardEvent } from "react";
import { twMerge } from "tailwind-merge";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
};

export default function OtpInput({
  value,
  onChange,
  length = 6,
  label,
  hint,
  error,
  disabled = false,
  className,
}: OtpInputProps) {
  const generatedId = useId();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const normalizedValue = value.replace(/\D/g, "").slice(0, length);
  const descriptionId = hint || error ? `${generatedId}-description` : undefined;
  const slots = Array.from({ length }, (_, index) => normalizedValue[index] ?? "");

  const focusIndex = (index: number) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };

  const updateValue = (nextValue: string) => {
    onChange(nextValue.replace(/\D/g, "").slice(0, length));
  };

  const handleChange = (index: number, nextRawValue: string) => {
    const nextDigit = nextRawValue.replace(/\D/g, "").slice(-1);
    const nextChars = normalizedValue.padEnd(length, " ").split("");

    nextChars[index] = nextDigit || " ";
    updateValue(nextChars.join("").replace(/\s+/g, ""));

    if (nextDigit && index < length - 1) {
      focusIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Backspace") {
      return;
    }

    if (slots[index]) {
      const nextChars = normalizedValue.padEnd(length, " ").split("");
      nextChars[index] = " ";
      updateValue(nextChars.join("").replace(/\s+/g, ""));
      return;
    }

    if (index > 0) {
      event.preventDefault();
      const nextChars = normalizedValue.padEnd(length, " ").split("");
      nextChars[index - 1] = " ";
      updateValue(nextChars.join("").replace(/\s+/g, ""));
      focusIndex(index - 1);
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pastedDigits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);

    if (!pastedDigits) {
      return;
    }

    updateValue(pastedDigits);
    focusIndex(Math.min(pastedDigits.length, length) - 1);
  };

  return (
    <div className={twMerge("flex w-full flex-col gap-2.5", className)}>
      {label ? (
        <label className="text-sm leading-none font-medium text-text">
          {label}
        </label>
      ) : null}

      <div className="flex gap-3" onPaste={handlePaste}>
        {slots.map((slot, index) => (
          <input
            key={`${generatedId}-${index}`}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            value={slot}
            disabled={disabled}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            aria-label={`OTP digit ${index + 1}`}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={descriptionId}
            className={twMerge(
              "h-14 w-12 rounded-lg border bg-card text-center text-lg font-semibold text-text shadow-sm outline-none transition-colors",
              error ? "border-error/45" : "border-border focus:border-secondary/45",
              disabled ? "cursor-not-allowed opacity-60" : "",
            )}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
          />
        ))}
      </div>

      {error ? (
        <p id={descriptionId} className="text-sm text-error">
          {error}
        </p>
      ) : hint ? (
        <p id={descriptionId} className="text-sm text-text/55">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
