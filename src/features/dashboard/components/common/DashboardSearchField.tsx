"use client";

import { Icon } from "@iconify/react";
import { twMerge } from "tailwind-merge";

type DashboardSearchFieldProps = {
  ariaLabel: string;
  className?: string;
  iconClassName?: string;
  onChange?: (value: string) => void;
  placeholder: string;
  value: string;
};

export default function DashboardSearchField({
  ariaLabel,
  className,
  iconClassName,
  onChange,
  placeholder,
  value,
}: DashboardSearchFieldProps) {
  return (
    <div className={twMerge("flex items-center gap-3", className)}>
      <Icon
        icon="solar:magnifer-linear"
        className={twMerge("h-5 w-5 text-text/40", iconClassName)}
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        readOnly={!onChange}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="min-w-0 flex-1 border-0 bg-transparent text-[0.98rem] font-medium text-text placeholder:text-text/28 outline-none"
      />
    </div>
  );
}
