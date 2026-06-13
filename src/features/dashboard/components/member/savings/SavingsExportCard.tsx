"use client";

import PressButton from "@/src/shared/components/ui/PressButton";
import SelectField from "@/src/shared/components/ui/SelectField";

const monthOptions = [
  { label: "Bulan ini", value: "this-month" },
  { label: "Bulan lalu", value: "last-month" },
] as const;

export default function SavingsExportCard({
  month,
  onMonthChange,
}: {
  month: string;
  onMonthChange: (value: string) => void;
}) {
  return (
    <section className="rounded-[16px] border border-border bg-card p-4 shadow-sm">
      <h2 className="text-[0.96rem] font-bold tracking-[-0.02em] text-primary">
        Export Tabungan
      </h2>

      <SelectField
        value={month}
        options={[...monthOptions]}
        onChange={onMonthChange}
        className="mt-4"
        fieldClassName="rounded-[12px] px-4 py-3.5"
      />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <PressButton
          variant="primaryFlat"
          className="rounded-[10px] py-3 text-[0.92rem] font-bold"
        >
          Export Excel
        </PressButton>
        <PressButton
          variant="primaryFlat"
          className="rounded-[10px] py-3 text-[0.92rem] font-bold"
        >
          Export PDF
        </PressButton>
      </div>
    </section>
  );
}
