"use client";

import Image from "next/image";

import DashboardPageHeader from "../../layout/DashboardPageHeader";
import DashboardScreenShell from "../../layout/DashboardScreenShell";

const auditItems = [
  { label: "Koperasi", value: "Koperasi Padiwangi" },
  { label: "Periode", value: "1-11 Juni 2026" },
  { label: "Merkle Root Hash", value: "a3f7b2e14..........8f2" },
  { label: "Blockchain TX ID", value: "b92...Hyperledger #48291" },
] as const;

export default function OfficerSecurityReportScreen() {
  return (
    <DashboardScreenShell background="bg-[#f7f8f9]">
      <div className="px-6 pb-8 pt-[calc(1.4rem+env(safe-area-inset-top))]">
        <DashboardPageHeader
          backHref="/dashboard/reports"
          title="Keamanan Koperasi"
          subtitle="Cek keamanan koperasi secara berkala"
          titleClassName="text-[1.5rem]"
        />

            <section className="mt-6 rounded-[18px] border border-[#dde2e7] bg-white shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
              <div className="px-6 py-2">
                <h2 className="text-[1rem] font-bold tracking-[-0.03em] text-primary">
                  Audit Keamanan
                </h2>
              </div>

              <div className="rounded-b-[18px] bg-[#177D79] px-6 py-2 text-white">
                <p className="text-sm font-medium">
                  Data tersimpan dalam blockchain
                </p>
                <p className="mt-2 text-base font-bold tracking-[-0.03em]">
                  Hyperledger Fabric . Block #48291
                </p>
                <p className="mt-2 text-sm font-medium">
                  14 Juni 2026, 01:00 WIB
                </p>
              </div>
            </section>

            <section className="mt-6">
              <h2 className="text-[1.75rem] font-bold leading-none tracking-[-0.04em] text-primary">
                Sertifikat Ledger
              </h2>
              <p className="mt-2 text-xs font-medium text-primary/88">
                Bukti integritas data untuk mitra pembiayaan
              </p>

              <div className="mt-4 rounded-[18px] border border-[#dde2e7] bg-white shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
                <div className="flex items-center justify-between gap-4 px-6 py-6">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-primary">
                      Sertifikat Bukti Ledger
                    </p>
                  </div>

                  <div className="flex items-center gap-2  px-3 py-1">
                    <Image
                      src="/logo/primary.webp"
                      alt="Lumbera"
                      width={170}
                      height={44}
                      className="h-auto w-[30px] shrink-0"
                      priority
                    />
                    <h1 className="text-lg font-bold text-primary">LUMBERA</h1>
                  </div>
                </div>

                <div className="border-t border-dashed border-[#c8dced]" />

                <div className="space-y-6 px-6 py-7">
                  {auditItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start justify-between gap-6"
                    >
                      <span className="text-xs font-medium text-text/72">
                        {item.label}
                      </span>
                      <span className="max-w-[58%] text-right text-xs font-bold text-text/78">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="mt-8">
              <button
                type="button"
                className="w-full rounded-[14px] bg-primary px-4 py-5 text-[1rem] font-bold text-white shadow-[0_4px_0_0_var(--color-primary-shadow)]"
              >
                Download Sertifikat
              </button>
            </div>
      </div>
    </DashboardScreenShell>
  );
}
