import BaseInput from "@/src/shared/components/ui/BaseInput";
import PressButton from "@/src/shared/components/ui/PressButton";

const requiredMark = <span className="text-[#e74c3c]">*</span>;

export default function OfficerManualMemberForm({
  onSubmit,
  onSwitchMode,
}: {
  onSubmit: () => void;
  onSwitchMode: () => void;
}) {
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

      <form className="space-y-[1.15rem]">
        <BaseInput
          id="nama"
          name="nama"
          label={<>Nama Lengkap {requiredMark}</>}
          labelClassName="text-[0.95rem] text-[#475569]"
          fieldClassName="h-12 rounded-[8px] border-[#cbd5e1] bg-white px-4 py-0 shadow-none focus-within:border-[#118B87]"
        />
        <BaseInput
          id="nik"
          name="nik"
          inputMode="numeric"
          label={<>NIK (16 Digit) {requiredMark}</>}
          labelClassName="text-[0.95rem] text-[#475569]"
          fieldClassName="h-12 rounded-[8px] border-[#cbd5e1] bg-white px-4 py-0 shadow-none focus-within:border-[#118B87]"
        />
        <BaseInput
          id="hp"
          name="hp"
          type="tel"
          label={<>No. Handphone {requiredMark}</>}
          labelClassName="text-[0.95rem] text-[#475569]"
          fieldClassName="h-12 rounded-[8px] border-[#cbd5e1] bg-white px-4 py-0 shadow-none focus-within:border-[#118B87]"
        />
        <BaseInput
          id="alamat"
          name="alamat"
          label={<>Alamat Lengkap {requiredMark}</>}
          labelClassName="text-[0.95rem] text-[#475569]"
          fieldClassName="h-12 rounded-[8px] border-[#cbd5e1] bg-white px-4 py-0 shadow-none focus-within:border-[#118B87]"
        />
        <BaseInput
          id="tanggal"
          name="tanggal"
          type="date"
          label={<>Tanggal Bergabung {requiredMark}</>}
          labelClassName="text-[0.95rem] text-[#475569]"
          fieldClassName="h-12 rounded-[8px] border-[#cbd5e1] bg-white px-4 py-0 shadow-none focus-within:border-[#118B87]"
        />
      </form>

      <div className="mt-12 flex flex-col gap-4">
        <PressButton
          type="button"
          onClick={onSubmit}
          className="h-14 w-full rounded-[12px] text-[1.05rem] font-bold"
        >
          Daftarkan anggota
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
