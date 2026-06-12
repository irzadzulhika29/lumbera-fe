"use client";

import { twMerge } from "tailwind-merge";

import {
  POSITION_OPTIONS,
  type PositionOptionValue,
} from "./profileOnboardingConfig";

type ProfilePositionFieldProps = {
  value: PositionOptionValue;
  onChange: (value: PositionOptionValue) => void;
};

export default function ProfilePositionField({
  value,
  onChange,
}: ProfilePositionFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <label className="text-[1.05rem] leading-none font-medium text-text">
        Jabatan di Koperasi <span className="text-error">*</span>
      </label>
      <div className="grid grid-cols-3 gap-3">
        {POSITION_OPTIONS.map((option) => {
          const isSelected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              className={twMerge(
                "rounded-lg px-3 py-6 text-center text-[0.95rem] font-bold leading-none transition-colors",
                isSelected ? "bg-primary text-white" : "bg-primary/38 text-white/92",
              )}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
