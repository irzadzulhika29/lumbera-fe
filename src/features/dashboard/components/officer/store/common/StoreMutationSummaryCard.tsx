import type { StoreStockInDraft } from "@/src/features/dashboard/storeTypes";

export default function StoreMutationSummaryCard({
  mutation,
}: {
  mutation: StoreStockInDraft;
}) {
  return (
    <section className="rounded-[14px] border border-border bg-white px-4 py-4 shadow-sm">
      <h2 className="text-[1.05rem] font-bold tracking-[-0.025em] text-primary">
        Ringkasan mutasi
      </h2>

      <div className="mt-4 space-y-3.5">
        {[
          ["Nama", mutation.productName],
          ["Satuan", mutation.unit],
          ["Kuantitas Masuk", mutation.incomingQuantity],
          ["Kuantitas Total", mutation.totalQuantity],
          ["HPP", mutation.costPrice],
          ["Harga Jual", mutation.salePrice],
          ["Keterangan", mutation.description],
          ["Dicatat oleh", mutation.recordedBy],
          ["Tanggal", mutation.createdAtLabel],
          ["Hash", mutation.hashPreview],
        ].map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4"
          >
            <span className="text-[0.96rem] font-medium text-text/72">{label}</span>
            <span
              className={`text-right text-[0.96rem] ${
                label === "Hash"
                  ? "max-w-[11rem] truncate text-text/28"
                  : "font-bold text-text/78"
              }`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
