"use client";

import { Icon } from "@iconify/react";

export default function ProfileLogoutButton({
  disabled = false,
  onClick,
  label = "Keluar dari Akun",
}: {
  disabled?: boolean;
  onClick?: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-8 flex w-full items-center gap-3.5 rounded-[18px] border border-error bg-white px-4 py-3.5 text-left"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-error bg-error text-white">
        <Icon icon="solar:logout-2-bold" className="text-[1.15rem]" />
      </div>
      <span className="text-[1rem] font-semibold tracking-[-0.02em] text-error">
        {label}
      </span>
    </button>
  );
}
