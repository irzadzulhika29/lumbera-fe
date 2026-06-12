import type { DashboardMetric } from "@/src/features/dashboard/types";

export default function DashboardStats({
  metrics,
}: {
  metrics: DashboardMetric[];
}) {
  return (
    <section
      aria-label="Ringkasan koperasi"
      className="overflow-hidden rounded-[20px] border border-[#dde2e7] bg-white"
    >
      <div className="grid grid-cols-2">
        {metrics.map((metric, index) => (
          <article
            key={metric.label}
            className={`min-w-0 px-6 py-4 ${index === 1 ? "border-l border-[#edf0f3]" : ""}`}
          >
            <p className="truncate text-[0.7rem] font-bold uppercase tracking-[0.055em] text-[#b0b6bf]">
              {metric.label}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <strong className="text-[1.05rem] font-bold leading-none tracking-[-0.03em] text-text">
                {metric.value}
              </strong>
              {metric.badge ? (
                <span className="rounded-full bg-primary-light px-3 py-1 text-[0.72rem] font-medium leading-none text-primary">
                  {metric.badge}
                </span>
              ) : null}
            </div>
            <p
              className={
                metric.tone === "success"
                  ? "mt-3 text-[0.72rem] font-semibold text-success"
                  : "mt-3 text-[0.72rem] font-medium text-primary"
              }
            >
              {metric.caption}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
