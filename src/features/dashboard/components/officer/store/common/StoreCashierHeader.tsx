import { Icon } from "@iconify/react";
import Link from "next/link";

type StoreCashierHeaderProps = {
  actionHref: string;
  subtitle: string;
  title: string;
};

export default function StoreCashierHeader({
  actionHref,
  subtitle,
  title,
}: StoreCashierHeaderProps) {
  return (
    <header className="bg-secondary px-4 pb-11 pt-[calc(1.2rem+env(safe-area-inset-top))] text-white">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[1.6rem] font-bold leading-none tracking-[-0.04em]">
            {title}
          </h1>
          <p className="mt-2 text-[0.78rem] font-medium text-white/80">{subtitle}</p>
        </div>

        <Link
          href={actionHref}
          aria-label="Keluar dari kasir"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-white text-secondary shadow-[0_6px_14px_rgba(15,23,42,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Icon icon="solar:home-2-linear" className="text-[1.2rem]" />
        </Link>
      </div>
    </header>
  );
}
