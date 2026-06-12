"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

import MobileScreen from "@/src/features/onboarding/components/MobileScreen";

export default function AddMemberScreen() {
  return (
    <MobileScreen className="bg-[#fafafa]">
      <section className="flex h-[100svh] w-full flex-none flex-col overflow-hidden bg-[#fafafa] sm:h-[860px]">
        {/* Header */}
        <header className="px-5 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/officer/members"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] bg-[#118B87] shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="Kembali"
            >
              <Icon
                icon="solar:alt-arrow-left-linear"
                className="text-[1.5rem] text-white"
                aria-hidden="true"
              />
            </Link>
            <div className="min-w-0">
              <h1 className="text-[1.4rem] font-bold leading-tight tracking-[-0.03em] text-[#118B87]">
                Tambah anggota
              </h1>
              <p className="mt-0.5 text-[0.8rem] font-medium text-[#118B87]/80">
                Lihat pertumbuhan keuangan koperasi
              </p>
            </div>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-10 [scrollbar-width:thin] [scrollbar-color:rgba(18,148,144,0.35)_transparent]">
          {/* Section Title */}
          <div className="mb-6 mt-2">
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.03em] text-[#2c3e50]">
              Input Data Diri
            </h2>
            <p className="mt-1 text-[0.92rem] font-medium text-[#475569]">
              Isi data diri anggota dengan benar
            </p>
          </div>

          {/* Form */}
          <form className="space-y-[1.15rem]">
            {/* Nama Lengkap */}
            <div className="flex flex-col gap-2">
              <label htmlFor="nama" className="text-[0.95rem] font-medium text-[#475569]">
                Nama Lengkap <span className="text-[#e74c3c]">*</span>
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                className="h-12 w-full rounded-[8px] border border-[#cbd5e1] bg-white px-4 text-[1rem] text-text outline-none focus:border-[#118B87] focus:ring-1 focus:ring-[#118B87]"
              />
            </div>

            {/* NIK */}
            <div className="flex flex-col gap-2">
              <label htmlFor="nik" className="text-[0.95rem] font-medium text-[#475569]">
                NIK (16 Digit) <span className="text-[#e74c3c]">*</span>
              </label>
              <input
                type="text"
                id="nik"
                name="nik"
                className="h-12 w-full rounded-[8px] border border-[#cbd5e1] bg-white px-4 text-[1rem] text-text outline-none focus:border-[#118B87] focus:ring-1 focus:ring-[#118B87]"
              />
            </div>

            {/* No. Handphone */}
            <div className="flex flex-col gap-2">
              <label htmlFor="hp" className="text-[0.95rem] font-medium text-[#475569]">
                No. Handphone <span className="text-[#e74c3c]">*</span>
              </label>
              <input
                type="tel"
                id="hp"
                name="hp"
                className="h-12 w-full rounded-[8px] border border-[#cbd5e1] bg-white px-4 text-[1rem] text-text outline-none focus:border-[#118B87] focus:ring-1 focus:ring-[#118B87]"
              />
            </div>

            {/* Alamat Lengkap */}
            <div className="flex flex-col gap-2">
              <label htmlFor="alamat" className="text-[0.95rem] font-medium text-[#475569]">
                Alamat Lengkap <span className="text-[#e74c3c]">*</span>
              </label>
              <input
                type="text"
                id="alamat"
                name="alamat"
                className="h-12 w-full rounded-[8px] border border-[#cbd5e1] bg-white px-4 text-[1rem] text-text outline-none focus:border-[#118B87] focus:ring-1 focus:ring-[#118B87]"
              />
            </div>

            {/* Tanggal Bergabung */}
            <div className="flex flex-col gap-2">
              <label htmlFor="tanggal" className="text-[0.95rem] font-medium text-[#475569]">
                Tanggal Bergabung <span className="text-[#e74c3c]">*</span>
              </label>
              <input
                type="date"
                id="tanggal"
                name="tanggal"
                className="h-12 w-full rounded-[8px] border border-[#cbd5e1] bg-white px-4 text-[1rem] text-text outline-none focus:border-[#118B87] focus:ring-1 focus:ring-[#118B87]"
              />
            </div>
          </form>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col gap-4">
            <button
              type="button"
              className="flex h-14 w-full items-center justify-center rounded-[12px] bg-[#118B87] text-[1.05rem] font-bold text-white transition-colors hover:bg-[#0f7a76] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#118B87]"
            >
              Daftarkan anggota
            </button>
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center text-[0.95rem] font-bold text-[#118B87] transition-colors hover:text-[#0f7a76]"
            >
              atau impor data anggota
            </button>
          </div>
        </div>
      </section>
    </MobileScreen>
  );
}
