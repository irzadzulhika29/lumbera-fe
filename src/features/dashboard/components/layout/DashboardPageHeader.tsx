import Link from "next/link";
import { twMerge } from "tailwind-merge";

import BackIcon from "../common/BackIcon";

type DashboardPageHeaderProps = {
  backHref: string;
  subtitle: string;
  title: string;
  titleClassName?: string;
  variant?: "default" | "form";
};

export default function DashboardPageHeader({
  backHref,
  subtitle,
  title,
  titleClassName,
  variant = "default",
}: DashboardPageHeaderProps) {
  return (
    <header className="flex items-start gap-4">
      <Link
        href={backHref}
        aria-label="Kembali"
        className={twMerge(
          "flex shrink-0 items-center justify-center bg-primary text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          variant === "form"
            ? "h-14 w-14 rounded-[12px]"
            : "h-[54px] w-[54px] rounded-[14px]",
        )}
      >
        <BackIcon className="text-[1.55rem]" />
      </Link>

      <div className="min-w-0 pt-1">
        <h1
          className={twMerge(
            "text-[1.95rem] font-bold leading-none tracking-[-0.04em] text-primary",
            titleClassName,
          )}
        >
          {title}
        </h1>
        <p className="mt-2 text-xs font-medium text-primary/88">{subtitle}</p>
      </div>
    </header>
  );
}
