"use client";

import Image from "next/image";
import type { RefObject } from "react";

import PressButton from "@/src/shared/components/ui/PressButton";

type ProfileCameraModalProps = {
  isOpen: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
  cameraError: string;
  isStartingCamera: boolean;
  isProcessingKtp: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onCapture: () => void | Promise<void>;
};

export default function ProfileCameraModal({
  isOpen,
  videoRef,
  cameraError,
  isStartingCamera,
  isProcessingKtp,
  isSubmitting,
  onClose,
  onCapture,
}: ProfileCameraModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      <div className="flex items-center justify-between px-6 pt-8 pb-4 text-white">
        <div>
          <p className="text-lg font-semibold leading-none">Scan KTP</p>
          <p className="mt-2 text-sm text-white/72">
            Posisikan KTP mengikuti bingkai panduan
          </p>
        </div>
        <button
          type="button"
          className="rounded-full border border-white/18 px-3 py-2 text-sm font-medium text-white/88"
          onClick={onClose}
        >
          Tutup
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-5">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="h-full w-full rounded-[28px] object-cover"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          <Image
            src="/ornament/id-skeleton.svg"
            alt="Panduan posisi KTP"
            width={320}
            height={202}
            priority
            className="h-auto w-full max-w-[320px] opacity-92"
          />
        </div>
      </div>

      <div className="px-6 pb-8">
        {cameraError ? <p className="mb-4 text-sm text-red-300">{cameraError}</p> : null}

        <div className="flex items-center gap-3">
          <PressButton
            type="button"
            variant="outlineFlat"
            className="h-14 min-w-24 flex-1 border-white/24 bg-white/10 text-base font-semibold text-white"
            onClick={onClose}
          >
            Batal
          </PressButton>
          <PressButton
            type="button"
            className="h-14 flex-[1.4] text-base font-semibold"
            disabled={isStartingCamera || isProcessingKtp || isSubmitting}
            onClick={onCapture}
          >
            {isStartingCamera ? "Menyiapkan kamera..." : "Gunakan Foto"}
          </PressButton>
        </div>
      </div>
    </div>
  );
}
