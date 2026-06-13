import Link from "next/link";

import NextIcon from "@/src/features/dashboard/components/common/NextIcon";

export default function StoreWarningBanner({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <div className="mt-6 -mx-5 flex items-center justify-between bg-[#FFF4E6] px-5 py-2.5">
      <p className="text-[0.82rem] font-medium text-warning">{label}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-[0.9rem] font-bold text-warning focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning"
      >
        Lihat
        <NextIcon className="text-[1rem] text-warning" />
      </Link>
    </div>
  );
}
