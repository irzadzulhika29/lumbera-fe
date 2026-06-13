"use client";

import { twMerge } from "tailwind-merge";

type ProfileHeaderProps = {
  backgroundClassName?: string;
  initials: string;
  name: string;
  subtitle: string;
};

export default function ProfileHeader({
  backgroundClassName,
  initials,
  name,
  subtitle,
}: ProfileHeaderProps) {
  return (
    <div
      className={twMerge(
        "px-5 pb-14 pt-[calc(2.4rem+env(safe-area-inset-top))]",
        backgroundClassName ?? "bg-primary-deep",
      )}
    >
      <div className="flex items-start gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[0.95rem] font-bold text-primary">
          {initials}
        </div>
        <div className="min-w-0 pt-0.5">
          <h1 className="truncate text-[1.36rem] font-bold tracking-[-0.03em] text-white">
            {name}
          </h1>
          <p className="mt-1 text-[0.9rem] font-medium text-white/78">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
