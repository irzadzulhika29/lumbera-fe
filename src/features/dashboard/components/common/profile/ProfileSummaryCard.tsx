"use client";

type ProfileSummaryItem = {
  label: string;
  value: string;
  tone?: "primary";
  wideLabel?: boolean;
};

export default function ProfileSummaryCard({
  items,
}: {
  items: readonly ProfileSummaryItem[];
}) {
  return (
    <section className="rounded-[12px] border border-[#dde2e7] bg-white px-4 py-3.5 shadow-sm">
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className={
              item.wideLabel
                ? "grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4"
                : "grid grid-cols-[5rem_minmax(0,1fr)] gap-4"
            }
          >
            <span className="text-[0.95rem] font-medium text-text/66">
              {item.label}
            </span>
            <span
              className={`text-right text-[0.98rem] font-semibold leading-snug ${
                item.tone === "primary" ? "text-primary" : "text-text/82"
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
