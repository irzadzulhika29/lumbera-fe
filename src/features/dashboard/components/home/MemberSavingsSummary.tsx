import type { DashboardMemberSummary } from "@/src/features/dashboard/types";

export default function MemberSavingsSummary({
  summary,
}: {
  summary: DashboardMemberSummary;
}) {
  return (
    <section
      aria-label="Ringkasan saldo tabungan"
      className="overflow-hidden rounded-[22px] bg-gradient-to-tr from-primary-shadow via-primary-shadow to-[#7BB4B2] text-white shadow-[0_12px_24px_rgba(35,92,90,0.22)]"
    >
      <div className="px-6 pb-3.5 pt-3.5">
        <p className="text-[0.8rem] font-semibold text-white/86">
          {summary.title}
        </p>
        <strong className="mt-1.5 block text-[1.8rem] font-bold leading-none tracking-[-0.045em] text-white">
          {summary.totalAmount}
        </strong>
      </div>

      <div className="ml-0 mr-6 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0.35)_62%,rgba(255,255,255,0)_100%)]" />

      <div className="grid grid-cols-2 px-6 py-3">
        <div className="pr-3">
          <p className="text-[0.8rem] font-medium text-white/86">
            {summary.primaryMetricLabel}
          </p>
          <p className="mt-1 text-[0.95rem] font-bold tracking-[-0.025em] text-white">
            {summary.primaryMetricValue}
          </p>
        </div>

        <div className="pl-4">
          <p className="text-[0.8rem] font-medium text-white/86">
            {summary.secondaryMetricLabel}
          </p>
          <p className="mt-1 text-[0.95rem] font-bold tracking-[-0.025em] text-white">
            {summary.secondaryMetricValue}
          </p>
        </div>
      </div>
    </section>
  );
}
