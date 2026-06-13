"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import StoreCashierHeader from "@/src/features/dashboard/components/officer/store/common/StoreCashierHeader";
import type { StoreCashierDraft } from "@/src/features/dashboard/storeTypes";
import { getStoreCashierDraft, saveStoreCashierDraft } from "@/src/features/dashboard/utils/storeCashierDraftStorage";
import CurrencyInput from "@/src/shared/components/ui/CurrencyInput";
import PressButton from "@/src/shared/components/ui/PressButton";
import { formatThousandGroupedNumber, sanitizeDigitInput } from "@/src/shared/utils/numberFormatting";

const fallbackDraft: StoreCashierDraft = {
  cashReceived: "150000",
  changeAmount: "10000",
  createdAtLabel: "11 Jun 2026, 09:08",
  hashPreview: "SHA-256: a3f7b2e1...",
  items: [
    {
      id: "cashier-001",
      initials: "BP",
      name: "Beras Premium",
      price: 70000,
      quantity: 2,
    },
  ],
  receiptNumber: "INV-0001",
  recordedBy: "Jamaludin",
  totalAmount: "140000",
};

function formatRupiah(value: string) {
  return `Rp ${formatThousandGroupedNumber(value)}`;
}

export default function OfficerStoreCashierCheckoutScreen() {
  const router = useRouter();
  const draft = getStoreCashierDraft() ?? fallbackDraft;
  const [cashReceived, setCashReceived] = useState(draft.cashReceived);

  const totalAmount = draft.totalAmount;
  const changeAmount = useMemo(() => {
    const totalValue = Number(totalAmount) || 0;
    const receivedValue = Number(sanitizeDigitInput(cashReceived)) || 0;

    return String(Math.max(receivedValue - totalValue, 0));
  }, [cashReceived, totalAmount]);

  return (
    <DashboardScreenShell background="bg-white">
      <div className="flex min-h-full flex-col bg-white">
        <StoreCashierHeader
          actionHref="/dashboard/officer/store"
          title="Kasir Padiwangi"
          subtitle="Kelola penjualan produk koperasi anda"
        />

        <div className="px-4 pb-6 pt-0">
          <div className="mt-[-24px] rounded-[14px] border border-border bg-white px-4 py-4 shadow-sm">
            <h2 className="text-[1.02rem] font-bold tracking-[-0.025em] text-primary">
              Ringkasan pembelian
            </h2>

            <div className="mt-4 space-y-3.5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                <span className="text-[0.96rem] font-medium text-text/72">
                  {`${draft.items[0]?.name ?? "Beras Premium"} x ${draft.items[0]?.quantity ?? 2}`}
                </span>
                <span className="text-right text-[0.96rem] font-bold text-text/78">
                  {formatRupiah(totalAmount)}
                </span>
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                <span className="text-[0.96rem] font-medium text-text/72">Total</span>
                <span className="text-right text-[1.5rem] font-bold leading-none tracking-[-0.04em] text-text">
                  {formatRupiah(totalAmount)}
                </span>
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                <span className="text-[0.96rem] font-medium text-text/72">Hash</span>
                <span className="max-w-[11rem] truncate text-right text-[0.96rem] text-text/28">
                  {draft.hashPreview}
                </span>
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                <span className="text-[0.96rem] font-medium text-text/72">Dicatat oleh</span>
                <span className="text-right text-[0.96rem] font-bold text-text/78">
                  {draft.recordedBy}
                </span>
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                <span className="text-[0.96rem] font-medium text-text/72">Tanggal</span>
                <span className="text-right text-[0.96rem] font-bold text-text/78">
                  {draft.createdAtLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CurrencyInput
              label="Uang diterima"
              value={cashReceived}
              onValueChange={setCashReceived}
              placeholder=""
              startAdornment={
                <span className="text-[1.05rem] font-bold text-text/72">Rp</span>
              }
            />
          </div>

          <div className="mt-4 flex items-center justify-between rounded-[12px] bg-primary-light px-4 py-3.5">
            <span className="text-[0.98rem] font-semibold text-text/72">Kembalian</span>
            <span className="text-[1.45rem] font-bold leading-none tracking-[-0.04em] text-primary">
              {formatRupiah(changeAmount)}
            </span>
          </div>
        </div>

        <div className="sticky bottom-0 mt-auto border-t border-[#e2e6ea] bg-white/96 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 backdrop-blur">
          <PressButton
            type="button"
            className="w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold"
            onClick={() => {
              saveStoreCashierDraft({
                ...draft,
                cashReceived,
                changeAmount,
              });
              router.push("/dashboard/officer/store/cashier/success");
            }}
          >
            Proses Pembayaran
          </PressButton>
        </div>
      </div>
    </DashboardScreenShell>
  );
}
