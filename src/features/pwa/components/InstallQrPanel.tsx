"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { twMerge } from "tailwind-merge";

type InstallQrPanelProps = {
  className?: string;
  path?: string;
  description?: string;
  showDescription?: boolean;
  showInstallUrl?: boolean;
  showTitle?: boolean;
  title?: string;
  variant?: "card" | "plain";
};

const DEFAULT_INSTALL_PATH = "/install";

function createAbsoluteInstallUrl(path: string) {
  if (typeof window === "undefined") {
    return path;
  }

  return new URL(path, window.location.origin).toString();
}

function createQrSource(url: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=0&data=${encodeURIComponent(url)}`;
}

export default function InstallQrPanel({
  className,
  path = DEFAULT_INSTALL_PATH,
  description = "Akses platform koperasi langsung dari layar utama",
  showDescription = true,
  showInstallUrl = true,
  showTitle = true,
  title = "Scan di HP untuk pasang Lumbera",
  variant = "card",
}: InstallQrPanelProps) {
  const [installUrl, setInstallUrl] = useState(path);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setInstallUrl(createAbsoluteInstallUrl(path));
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [path]);

  if (variant === "plain") {
    return (
      <section className={twMerge("flex flex-col items-center", className)}>
        <Image
          src={createQrSource(installUrl)}
          alt="QR install Lumbera"
          width={280}
          height={280}
          unoptimized
          className="aspect-square w-full max-w-[212px] rounded-[14px]"
        />

        {showInstallUrl ? (
          <p className="mt-4 break-all text-center text-sm font-medium leading-6 text-text/62">
            {installUrl}
          </p>
        ) : null}
      </section>
    );
  }

  return (
    <section
      className={twMerge(
        "rounded-[36px] border border-white/45 bg-white/92 p-6 shadow-[0_28px_70px_rgba(15,23,42,0.16)] backdrop-blur",
        className,
      )}
    >
      {(showTitle || showDescription) && (
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-primary/10 text-primary">
            <Icon icon="solar:qr-code-bold-duotone" className="h-6 w-6" />
          </span>
          <div>
            {showTitle ? (
              <h2 className="text-[1.4rem] font-bold leading-tight tracking-[-0.04em] text-primary">
                {title}
              </h2>
            ) : null}
            {showDescription ? (
              <p className="mt-1 text-sm font-medium leading-6 text-text/68">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      )}

      <div className="mt-5 rounded-[30px] bg-[#f3f6f7] p-4">
        <div className="overflow-hidden rounded-[24px] border border-[#dbe4e6] bg-white p-4 shadow-[0_12px_26px_rgba(15,23,42,0.08)]">
          <Image
            src={createQrSource(installUrl)}
            alt="QR install Lumbera"
            width={280}
            height={280}
            unoptimized
            className="mx-auto aspect-square w-full max-w-[280px] rounded-[18px]"
          />
        </div>
      </div>

      {showInstallUrl ? (
        <div className="mt-4 rounded-[22px] bg-primary/[0.06] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/72">
            Link install
          </p>
          <p className="mt-1 break-all text-sm font-medium text-text/72">
            {installUrl}
          </p>
        </div>
      ) : null}
    </section>
  );
}
