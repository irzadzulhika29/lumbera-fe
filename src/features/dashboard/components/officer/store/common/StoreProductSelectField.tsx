"use client";

import { Icon } from "@iconify/react";

type StoreProductSelectFieldProps = {
  initials: string;
  label: React.ReactNode;
  name: string;
  sku: string;
  stockLabel: string;
};

export default function StoreProductSelectField({
  initials,
  label,
  name,
  sku,
  stockLabel,
}: StoreProductSelectFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <label className="text-sm leading-none font-medium text-text">{label}</label>

      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-sm"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-primary text-[0.95rem] font-bold text-white">
          {initials}
        </span>

        <span className="min-w-0 flex-1 text-left">
          <span className="block truncate text-[0.92rem] font-bold leading-tight text-text">
            {name}
          </span>
          <span className="mt-1 block truncate text-[0.76rem] font-medium text-text/72">
            {sku} - {stockLabel}
          </span>
        </span>

        <Icon
          icon="solar:alt-arrow-down-linear"
          className="shrink-0 text-[1.1rem] text-text/42"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
