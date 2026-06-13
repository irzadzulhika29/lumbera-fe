import Image from "next/image";
import Link from "next/link";

import type { StoreActionItem } from "@/src/features/dashboard/storeTypes";

export default function StoreActionGrid({
  actions,
  title,
}: {
  actions: StoreActionItem[];
  title: string;
}) {
  const columns = actions.length === 2 ? "grid-cols-2" : "grid-cols-3";

  return (
    <section className="mt-7">
      <h2 className="text-[1.05rem] font-bold tracking-[-0.03em] text-primary">
        {title}
      </h2>

      <div className={`mt-4 grid ${columns} gap-3`}>
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center gap-3 rounded-[18px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="flex h-[82px] w-full items-center justify-center rounded-[18px] bg-[linear-gradient(180deg,#EEF4F9_0%,#E2EEF7_100%)]">
              <Image
                src={action.icon}
                alt=""
                aria-hidden="true"
                width={56}
                height={56}
                className="h-[50px] w-[50px] object-contain"
              />
            </span>
            <strong className="text-center text-[0.8rem] font-bold leading-[1.45] tracking-[-0.02em] text-secondary">
              {action.label}
            </strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
