import PressButton from "@/src/shared/components/ui/PressButton";
import type { StoreProductItem } from "@/src/features/dashboard/storeTypes";

export default function StoreProductCard({
  product,
  onDetailClick,
}: {
  product: StoreProductItem;
  onDetailClick: (product: StoreProductItem) => void;
}) {
  return (
    <article className="rounded-[18px] bg-[#EEF4F9] px-4 py-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-primary text-[1rem] font-bold text-white">
          {product.initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-[1rem] font-bold leading-none tracking-[-0.03em] text-text">
                {product.name}
              </h3>
              <p className="mt-2 text-[0.8rem] font-medium text-text/76">
                {product.sku} - {product.stockLabel}
              </p>
            </div>

            <span
              className={`shrink-0 rounded-[8px] px-3 py-1.5 text-[0.8rem] font-semibold ${
                product.statusTone === "safe"
                  ? "bg-[#CFF1EE] text-primary"
                  : "bg-[#FFF0D7] text-warning"
              }`}
            >
              {product.statusLabel}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <p className="text-[0.78rem] font-semibold text-text/82">HPP (Beli)</p>
              <p className="mt-1 text-[0.96rem] font-bold text-primary">{product.costPrice}</p>
            </div>
            <div>
              <p className="text-[0.78rem] font-semibold text-text/82">Harga Jual</p>
              <p className="mt-1 text-[0.96rem] font-bold text-primary">{product.sellPrice}</p>
            </div>
            <div>
              <p className="text-[0.78rem] font-semibold text-text/82">Margin</p>
              <p className="mt-1 text-[0.96rem] font-bold text-primary">{product.marginLabel}</p>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <PressButton
              type="button"
              variant="outlineFlat"
              onClick={() => onDetailClick(product)}
              className="rounded-[10px] px-4 py-2 text-[0.84rem] font-bold text-primary"
            >
              Detail
            </PressButton>
          </div>
        </div>
      </div>
    </article>
  );
}
