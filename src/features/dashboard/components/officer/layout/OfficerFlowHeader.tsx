import Link from "next/link";
import { twMerge } from "tailwind-merge";

import BackIcon from "../../common/BackIcon";

type OfficerFlowHeaderProps = {
  backHref: string;
  floatingContent?: React.ReactNode;
  floatingClassName?: string;
  subtitle: string;
  title: string;
};

export default function OfficerFlowHeader({
  backHref,
  floatingContent,
  floatingClassName,
  subtitle,
  title,
}: OfficerFlowHeaderProps) {
  return (
    <header className="relative bg-primary px-7 pb-24 pt-[calc(1.3rem+env(safe-area-inset-top))] text-white">
      <div className="flex items-center gap-3">
        <Link
          href={backHref}
          aria-label="Kembali"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <BackIcon className="text-[1.35rem] text-primary" />
        </Link>

        <div className="min-w-0">
          <h1 className="text-[1.68rem] font-bold leading-none tracking-[-0.045em] text-white">
            {title}
          </h1>
          <p className="mt-1 text-xs font-medium text-white/82">{subtitle}</p>
        </div>
      </div>

      {floatingContent ? (
        <div
          className={twMerge(
            "absolute inset-x-5 bottom-[-20px] rounded-[18px] border border-[#dfe5ea] bg-white px-5 py-3.5 shadow-[0_8px_18px_rgba(15,23,42,0.08)]",
            floatingClassName,
          )}
        >
          {floatingContent}
        </div>
      ) : null}
    </header>
  );
}
