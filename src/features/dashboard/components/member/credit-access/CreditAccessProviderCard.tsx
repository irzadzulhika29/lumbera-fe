"use client";

export default function CreditAccessProviderCard({
  initials,
  title,
  subtitle,
  providerLabel,
}: {
  initials: string;
  title: string;
  subtitle: string;
  providerLabel: string;
}) {
  return (
    <section className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-primary text-[1rem] font-bold text-white">
        {initials}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[1rem] font-bold leading-none tracking-[-0.03em] text-text">
              {title}
            </p>
            <p className="mt-2 text-[0.82rem] font-medium text-text/72">
              {subtitle}
            </p>
          </div>

          <span className="shrink-0 rounded-[6px] bg-[#e4f6f7] px-3 py-1.5 text-[0.82rem] font-semibold text-primary">
            {providerLabel}
          </span>
        </div>
      </div>
    </section>
  );
}
