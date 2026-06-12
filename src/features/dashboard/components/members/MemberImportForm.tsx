import { Icon } from "@iconify/react";

import PressButton from "@/src/shared/components/ui/PressButton";

export default function MemberImportForm({
  onImportSuccess,
  onSwitchMode,
}: {
  onImportSuccess: (fileName: string) => void;
  onSwitchMode: () => void;
}) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    onImportSuccess(file.name);
  };

  return (
    <>
      <div className="mb-6 mt-2">
        <h2 className="text-[1.5rem] font-extrabold tracking-[-0.03em] text-[#2c3e50]">
          Impor data anggota
        </h2>
        <p className="mt-1 text-[0.92rem] font-medium text-[#475569]">
          Impor data anggota dari file excel
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="file-upload"
          className="text-[0.95rem] font-medium text-[#475569]"
        >
          Upload file <span className="text-[#e74c3c]">*</span>
        </label>

        <div className="relative flex h-[3.25rem] w-full items-center overflow-hidden rounded-[8px] border border-[#cbd5e1] bg-white">
          <input
            type="file"
            id="file-upload"
            className="absolute inset-0 cursor-pointer opacity-0"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
          />
          <div className="pointer-events-none flex h-full items-center bg-[#118B87] px-4 text-white">
            <Icon
              icon="solar:upload-linear"
              className="mr-2 text-[1.1rem]"
              aria-hidden="true"
            />
            <span className="text-[0.92rem] font-bold">Upload file excel</span>
          </div>
          <div className="flex-1 px-4 text-[0.95rem] text-[#94a3b8]">
            data.xlsx
          </div>
        </div>
      </div>

      <div className="my-6 flex items-center justify-center">
        <span className="text-[0.9rem] italic text-[#475569]">atau</span>
      </div>

      <PressButton className="h-14 w-full rounded-[12px] text-[1.05rem] font-bold">
        Unduh template
      </PressButton>

      <div className="mt-auto flex flex-col gap-4 pt-24">
        <PressButton className="h-14 w-full rounded-[12px] text-[1.05rem] font-bold">
          Lanjut
        </PressButton>
        <button
          type="button"
          onClick={onSwitchMode}
          className="flex h-12 w-full items-center justify-center text-[0.95rem] font-bold text-[#118B87] transition-colors hover:text-[#0f7a76]"
        >
          atau input data manual
        </button>
      </div>
    </>
  );
}
