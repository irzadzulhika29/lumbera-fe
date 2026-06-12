"use client";

import { twMerge } from "tailwind-merge";

type FilterChipOption<T extends string> = {
  label: string;
  value: T;
};

type FilterChipsProps<T extends string> = {
  activeValue: T;
  className?: string;
  mode?: "scroll" | "wrap";
  onChange?: (value: T) => void;
  options: readonly FilterChipOption<T>[];
};

export default function FilterChips<T extends string>({
  activeValue,
  className,
  mode = "scroll",
  onChange,
  options,
}: FilterChipsProps<T>) {
  return (
    <div
      className={twMerge(
        mode === "scroll"
          ? "-mx-1 overflow-x-auto px-1 [scrollbar-width:none]"
          : "flex flex-wrap gap-[0.65rem]",
        className,
      )}
    >
      <div className={mode === "scroll" ? "flex w-max gap-2.5" : "contents"}>
        {options.map((option) => {
          const active = option.value === activeValue;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange?.(option.value)}
              className={twMerge(
                "rounded-full px-4 py-2 text-[0.9rem] font-bold transition-colors",
                active
                  ? "bg-[#DDF2F0] text-primary"
                  : "bg-[#F2F3F5] text-text/28",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
