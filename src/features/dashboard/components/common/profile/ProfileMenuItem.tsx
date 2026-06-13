"use client";

import { Icon } from "@iconify/react";

export default function ProfileMenuItem({
  label,
  icon,
}: {
  label: string;
  icon: string;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between px-1 py-1.5 text-left transition-colors hover:bg-[#f7f8f9]"
    >
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-primary text-white">
          <Icon icon={icon} className="text-[1.15rem]" />
        </div>
        <span className="text-[1.02rem] font-semibold tracking-[-0.02em] text-text">
          {label}
        </span>
      </div>
      <Icon
        icon="solar:alt-arrow-right-linear"
        className="text-[1.15rem] text-secondary"
      />
    </button>
  );
}
