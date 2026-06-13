"use client";

import { useEffect } from "react";

type DetailModalProps = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

export default function DetailModal({
  children,
  footer,
  isOpen,
  onClose,
  title,
}: DetailModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
      <div className="w-full max-w-[560px] rounded-[26px] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.22)]">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <h2 className="text-[1.15rem] font-bold tracking-[-0.03em] text-text">
              {title}
            </h2>
          </div>

          <button
            type="button"
            aria-label="Tutup modal"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-text/48 transition-colors hover:bg-[#f2f5f7] hover:text-text/72 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M5 5 19 19" />
              <path d="M19 5 5 19" />
            </svg>
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-5 py-5">{children}</div>

        {footer ? (
          <div className="border-t border-border px-5 py-4">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
