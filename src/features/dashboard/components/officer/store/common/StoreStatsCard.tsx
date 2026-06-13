import type { StoreDashboardStats } from "@/src/features/dashboard/storeTypes";

export default function StoreStatsCard({
  stats,
}: {
  stats: StoreDashboardStats;
}) {
  return (
    <div className="grid grid-cols-3 overflow-hidden rounded-[14px] border border-[#e4eaef] bg-white shadow-[0_8px_16px_rgba(15,23,42,0.06)]">
      {[
        { label: "Total data", value: stats.totalCount, className: "text-text" },
        { label: "Berhasil", value: stats.successCount, className: "text-primary" },
        { label: "Gagal", value: stats.failedCount, className: "text-error" },
      ].map((item, index) => (
        <div
          key={item.label}
          className={`px-4 py-3.5 ${index === 0 ? "" : "border-l border-black/5"}`}
        >
          <p className="text-[0.72rem] font-semibold tracking-[-0.02em] text-text/36">
            {item.label}
          </p>
          <p className={`mt-1 text-[1.68rem] font-bold leading-none ${item.className}`}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
