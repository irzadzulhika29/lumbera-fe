"use client";

import Image from "next/image";

import DashboardPageHeader from "../../layout/DashboardPageHeader";
import DashboardScreenShell from "../../layout/DashboardScreenShell";

const ledgerCertificateItems = [
  { label: "Koperasi", value: "Koperasi Padiwangi" },
  { label: "Periode", value: "1-11 Juni 2026" },
  { label: "Merkle Root Hash", value: "a3f7b2e14..........8f2" },
  { label: "Blockchain TX ID", value: "b92...Hyperledger #48291" },
] as const;

const transactionChainItems = [
  {
    amount: "+Rp 500.000",
    hash: "a3f7b2e1...b5a1",
    memberName: "Siti Lestari",
    time: "10:23",
    title: "Simpanan Sukarela",
  },
  {
    amount: "+Rp 500.000",
    hash: "a3f7b2e1...b5a1",
    memberName: "Siti Lestari",
    time: "10:23",
    title: "Simpanan Sukarela",
  },
  {
    amount: "+Rp 500.000",
    hash: "a3f7b2e1...b5a1",
    memberName: "Siti Lestari",
    time: "10:23",
    title: "Simpanan Sukarela",
  },
] as const;

const shouldShowTransactionScrollbar = transactionChainItems.length > 3;

function VerifiedCheckIcon() {
  return (
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white">
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 10.5 8 14l7.5-8" />
      </svg>
    </span>
  );
}

export default function OfficerSecurityReportScreen() {
  return (
    <DashboardScreenShell background="bg-[#f7f8f9]">
      <div className="px-6 pb-8 pt-[calc(1.4rem+env(safe-area-inset-top))]">
        <DashboardPageHeader
          backHref="/dashboard/reports"
          title="Keamanan Koperasi"
          subtitle="Cek keamanan koperasi secara berkala"
          titleClassName="text-[1.62rem] leading-[1.02]"
        />

        <section className="mt-10 overflow-hidden rounded-[18px] border border-[#dde2e7] bg-white shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
          <div className="px-6 py-4">
            <h2 className="text-[1rem] font-bold tracking-[-0.03em] text-primary">
              Audit Keamanan
            </h2>
          </div>

          <div className="bg-[#177D79] px-6 py-5 text-white">
            <p className="text-[0.9rem] font-medium text-white/92">
              Data tersimpan dalam blockchain
            </p>
            <p className="mt-4 text-[1.08rem] font-bold tracking-[-0.03em]">
              Hyperledger Fabric · Block #48291
            </p>
            <p className="mt-5 text-[0.9rem] font-medium text-white/92">
              14 Juni 2026, 01:00 WIB
            </p>
          </div>

          <div className="px-6 pb-3 pt-4">
            <h3 className="text-[1rem] font-bold tracking-[-0.03em] text-primary">
              Rantai Transaksi
            </h3>

            <div
              className={`relative mt-4 ${shouldShowTransactionScrollbar ? "pr-7" : ""}`}
            >
              <div className="space-y-6">
                {transactionChainItems.map((item, index) => (
                  <div key={`${item.hash}-${index}`} className="flex gap-3">
                    <VerifiedCheckIcon />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[0.92rem] font-bold leading-snug tracking-[-0.02em] text-text">
                          {item.title}
                        </p>
                        <span className="shrink-0 text-[0.82rem] font-medium text-text/34">
                          {item.time}
                        </span>
                      </div>

                      <div className="mt-1.5 flex items-start justify-between gap-3">
                        <p className="text-[0.88rem] font-medium text-text/34">
                          {item.memberName} · {item.amount}
                        </p>
                        <span className="shrink-0 text-[0.88rem] font-medium text-text/34">
                          {item.hash}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {shouldShowTransactionScrollbar ? (
                <div className="pointer-events-none absolute bottom-0 right-0 top-0 flex w-4 items-start justify-center">
                  <span className="mt-1 h-[160px] w-[14px] rounded-full bg-[#c8dcec]" />
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-[1.05rem] font-bold tracking-[-0.03em] text-primary">
            Sertifikat Ledger
          </h2>
          <p className="mt-3 text-xs font-medium text-primary/90">
            Bukti integritas data untuk mitra pembiayaan
          </p>

          <div className="mt-4 rounded-[18px] border border-[#dde2e7] bg-white shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between gap-4 px-6 py-6">
              <p className="min-w-0 text-[0.95rem] font-medium text-primary">
                Sertifikat Bukti Ledger
              </p>

              <div className="flex shrink-0 items-center gap-2">
                <Image
                  src="/logo/primary.webp"
                  alt="Lumbera"
                  width={170}
                  height={44}
                  className="h-auto w-[34px]"
                  priority
                />
                <span className="text-[1.05rem] font-bold tracking-[-0.03em] text-primary">
                  LUMBERA
                </span>
              </div>
            </div>

            <div className="border-t border-dashed border-[#c8dced]" />

            <div className="space-y-7 px-6 py-7">
              {ledgerCertificateItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start justify-between gap-6"
                >
                  <span className="text-[0.88rem] font-medium text-text/68">
                    {item.label}
                  </span>
                  <span className="max-w-[60%] text-right text-[0.9rem] font-bold tracking-[-0.02em] text-text/72">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-10">
          <button
            type="button"
            className="w-full rounded-[14px] bg-primary px-4 py-5 text-[1rem] font-bold text-white shadow-[0_6px_0_0_var(--color-primary-shadow)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5"
          >
            Download Sertifikat
          </button>
        </div>
      </div>
    </DashboardScreenShell>
  );
}
