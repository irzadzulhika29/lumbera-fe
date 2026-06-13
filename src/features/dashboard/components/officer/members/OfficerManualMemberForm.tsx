"use client";

import { useState } from "react";

import { createOfficerMember } from "@/src/features/dashboard/api/officerMemberApi";

import BaseInput from "@/src/shared/components/ui/BaseInput";
import PressButton from "@/src/shared/components/ui/PressButton";

const requiredMark = <span className="text-[#e74c3c]">*</span>;
const memberInputFieldClassName =
  "flex h-12 items-center rounded-[8px] border-[#cbd5e1] bg-white px-4 py-0 shadow-none focus-within:border-[#118B87] [&>div]:w-full";
const memberInputClassName = "leading-none";

export default function OfficerManualMemberForm({
  onSubmit,
  onSwitchMode,
}: {
  onSubmit: () => void;
  onSwitchMode: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [nik, setNik] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [joinedDate, setJoinedDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const isFormValid =
    fullName.trim() &&
    nik.trim().length === 16 &&
    phone.trim() &&
    address.trim() &&
    joinedDate.trim();

  const missingFields = [
    !fullName.trim() && "Nama Lengkap",
    nik.trim().length > 0 && nik.trim().length !== 16 && "NIK (harus 16 digit)",
    !nik.trim() && "NIK",
    !phone.trim() && "No. Handphone",
    !address.trim() && "Alamat Lengkap",
    !joinedDate.trim() && "Tanggal Bergabung",
  ].filter(Boolean) as string[];

  const handleSubmit = async () => {
    if (!isFormValid) {
      setShowWarning(true);
      return;
    }

    if (submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const joinedAt = new Date(joinedDate);
      const timezoneOffset = joinedAt.getTimezoneOffset();
      const offsetHours = Math.abs(Math.floor(timezoneOffset / 60));
      const offsetMinutes = Math.abs(timezoneOffset % 60);
      const offsetSign = timezoneOffset <= 0 ? "+" : "-";
      const formattedOffset = `${offsetSign}${String(offsetHours).padStart(2, "0")}:${String(offsetMinutes).padStart(2, "0")}`;
      const joinedDateISO = `${joinedDate}T00:00:00${formattedOffset}`;

      await createOfficerMember({
        full_name: fullName.trim(),
        nik: nik.trim(),
        phone_number: phone.trim(),
        address: address.trim(),
        joined_date: joinedDateISO,
      });

      onSubmit();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal menambahkan anggota";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="mb-6 mt-2">
        <h2 className="text-[1.5rem] font-extrabold tracking-[-0.03em] text-[#2c3e50]">
          Input Data Diri
        </h2>
        <p className="mt-1 text-[0.92rem] font-medium text-[#475569]">
          Isi data diri anggota dengan benar
        </p>
      </div>

      {error ? (
        <div className="mb-4 rounded-[8px] bg-red-50 px-4 py-3 text-[0.92rem] font-medium text-red-600">
          {error}
        </div>
      ) : null}

      <form className="space-y-[1.15rem]" onSubmit={(e) => e.preventDefault()}>
        <BaseInput
          id="nama"
          name="nama"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          label={<>Nama Lengkap {requiredMark}</>}
          labelClassName="text-[0.95rem] text-[#475569]"
          fieldClassName={memberInputFieldClassName}
          inputClassName={memberInputClassName}
        />
        <BaseInput
          id="nik"
          name="nik"
          value={nik}
          onChange={(e) => setNik(e.target.value)}
          inputMode="numeric"
          maxLength={16}
          label={<>NIK (16 Digit) {requiredMark}</>}
          labelClassName="text-[0.95rem] text-[#475569]"
          fieldClassName={memberInputFieldClassName}
          inputClassName={memberInputClassName}
        />
        <BaseInput
          id="hp"
          name="hp"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          label={<>No. Handphone {requiredMark}</>}
          labelClassName="text-[0.95rem] text-[#475569]"
          fieldClassName={memberInputFieldClassName}
          inputClassName={memberInputClassName}
        />
        <BaseInput
          id="alamat"
          name="alamat"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          label={<>Alamat Lengkap {requiredMark}</>}
          labelClassName="text-[0.95rem] text-[#475569]"
          fieldClassName={memberInputFieldClassName}
          inputClassName={memberInputClassName}
        />
        <BaseInput
          id="tanggal"
          name="tanggal"
          value={joinedDate}
          onChange={(e) => setJoinedDate(e.target.value)}
          type="date"
          label={<>Tanggal Bergabung {requiredMark}</>}
          labelClassName="text-[0.95rem] text-[#475569]"
          fieldClassName={memberInputFieldClassName}
          inputClassName={memberInputClassName}
        />
      </form>

      <div className="mt-12 flex flex-col gap-4">
        {showWarning && !isFormValid ? (
          <div className="rounded-[8px] border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-[0.88rem] font-semibold text-amber-800">
              Lengkapi data berikut:
            </p>
            <ul className="mt-1.5 list-inside list-disc space-y-0.5 text-[0.82rem] font-medium text-amber-700">
              {missingFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <PressButton
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid || submitting}
          className="h-14 w-full rounded-[12px] text-[1.05rem] font-bold"
        >
          {submitting ? "Menyimpan..." : "Daftarkan anggota"}
        </PressButton>
        <button
          type="button"
          onClick={onSwitchMode}
          className="flex h-12 w-full items-center justify-center text-[0.95rem] font-bold text-[#118B87] transition-colors hover:text-[#0f7a76]"
        >
          atau impor data anggota
        </button>
      </div>
    </>
  );
}
