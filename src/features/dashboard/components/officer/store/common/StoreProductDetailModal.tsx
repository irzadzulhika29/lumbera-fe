"use client";

import type { StoreProductItem } from "@/src/features/dashboard/storeTypes";
import DetailModal from "@/src/shared/components/ui/DetailModal";
import PressButton from "@/src/shared/components/ui/PressButton";

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-t border-border py-3 first:border-t-0 first:pt-0 last:pb-0">
      <span className="text-[0.9rem] font-medium text-text/56">{label}</span>
      <span className="text-right text-[0.92rem] font-bold text-text/82">
        {value}
      </span>
    </div>
  );
}

export default function StoreProductDetailModal({
  isOpen,
  onClose,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: StoreProductItem | null;
}) {
  return (
    <DetailModal
      isOpen={isOpen && !!product}
      onClose={onClose}
      title="Detail Produk"
      footer={
        <div className="flex justify-end">
          <PressButton
            type="button"
            onClick={onClose}
            className="rounded-[10px] px-5 py-2.5 text-[0.9rem] font-bold"
          >
            Tutup
          </PressButton>
        </div>
      }
    >
      {product ? (
        <div>
          <div className="rounded-[18px] bg-[#eef4f9] px-4 py-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-primary text-[1rem] font-bold text-white">
                {product.initials}
              </div>
              <div className="min-w-0">
                <h3 className="text-[1.05rem] font-bold leading-tight tracking-[-0.03em] text-text">
                  {product.name}
                </h3>
                <p className="mt-1 text-[0.84rem] font-medium text-text/60">
                  {product.sku} - {product.category}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[18px] border border-border bg-white px-4 py-4">
            <DetailRow label="Kode produk" value={product.sku} />
            <DetailRow label="Kategori" value={product.category} />
            <DetailRow label="Satuan" value={product.unit} />
            <DetailRow label="Stok saat ini" value={product.stockLabel} />
            <DetailRow label="Stok minimum" value={product.minimumStockLabel} />
            <DetailRow label="HPP" value={product.costPrice} />
            <DetailRow label="Harga jual" value={product.sellPrice} />
            <DetailRow label="Margin" value={product.marginLabel} />
            <DetailRow label="Status" value={product.statusLabel} />
          </div>
        </div>
      ) : null}
    </DetailModal>
  );
}
