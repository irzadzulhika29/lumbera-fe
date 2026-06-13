import type { StoreProductDraft } from "@/src/features/dashboard/storeTypes";

export default function StoreProductSummaryCard({
  product,
}: {
  product: StoreProductDraft;
}) {
  return (
    <section className="rounded-[14px] border border-border bg-white px-4 py-4 shadow-sm">
      <h2 className="text-[1.05rem] font-bold tracking-[-0.025em] text-primary">
        Ringkasan Produk
      </h2>

      <div className="mt-4 space-y-3.5">
        {[
          ["Nama", product.name],
          ["Satuan", product.unit],
          ["Kategori", product.category],
          ["HPP", product.costPrice],
          ["Harga Jual", product.salePrice],
          ["Stok awal", product.initialStockQuantity],
          ["Stok min. peringatan", product.minimumStock],
          ["Dicatat oleh", product.recordedBy],
          ["Tanggal", product.createdAtLabel],
          ["Hash", product.hashPreview],
        ].map(([label, value]) => (
          <div key={label} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
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
