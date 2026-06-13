import Link from "next/link";
import { twMerge } from "tailwind-merge";

import BackIcon from "../common/BackIcon";

type DashboardPageHeaderProps = {
  backHref: string;
  subtitle: string;
  title: string;
  titleClassName?: string;
  variant?: "default" | "form" | "compact";
};

export default function DashboardPageHeader({
  backHref,
  subtitle,
  title,
  titleClassName,
  variant = "default",
}: DashboardPageHeaderProps) {
  return (
    <header
      className={twMerge(
        "flex gap-4",
        variant === "compact" ? "items-center" : "items-start",
      )}
    >
      <Link
        href={backHref}
        aria-label="Kembali"
        className={twMerge(
          "flex shrink-0 items-center justify-center bg-primary text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          variant === "form"
            ? "h-14 w-14 rounded-[12px]"
            : variant === "compact"
              ? "h-[40px] w-[40px] rounded-[10px]"
              : "h-[54px] w-[54px] rounded-[14px]",
        )}
      >
        <BackIcon
          className={variant === "compact" ? "text-[1.2rem]" : "text-[1.55rem]"}
        />
      </Link>

      <div className={twMerge("min-w-0", variant === "compact" ? "pt-0" : "pt-1")}>
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
