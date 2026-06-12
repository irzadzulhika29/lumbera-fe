import type { DashboardMetric } from "@/src/features/dashboard/types";

export default function DashboardStats({
  metrics,
}: {
  metrics: DashboardMetric[];
}) {
  return (
    <section aria-label="Ringkasan koperasi" className="grid grid-cols-2 gap-3">
      {metrics.map((metric) => (
        <article
          key={metric.label}
          className="min-w-0 rounded-[17px] border border-[#dde2e7] bg-white px-4 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
        >
          <p className="truncate text-[0.7rem] font-bold uppercase tracking-[0.055em] text-[#9aa4b2]">
            {metric.label}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <strong className="text-[1.7rem] font-bold leading-none tracking-[-0.045em] text-text">
              {metric.value}
            </strong>
            {metric.badge ? (
              <span className="rounded-full bg-primary-light px-2.5 py-1 text-[0.68rem] font-bold leading-none text-primary">
                {metric.badge}
              </span>
            ) : null}
          </div>
          <p
            className={
              metric.tone === "success"
                ? "mt-3 text-[0.72rem] font-semibold text-success"
                : "mt-3 text-[0.72rem] font-medium text-[#7d8798]"
            }
          >
            {metric.caption}
          </p>
        </article>
      ))}
    </section>
  );
}
