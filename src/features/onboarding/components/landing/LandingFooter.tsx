import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function LandingFooter({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  return (
    <footer
      className={twMerge(
        "bg-primary text-white",
        mobile
          ? "mt-auto px-5 py-6"
          : "relative left-1/2 right-1/2 mt-10 w-screen -translate-x-1/2 px-6 py-10 lg:px-10 lg:py-12",
      )}
    >
      <div
        className={twMerge(
          "mx-auto",
          mobile ? "max-w-none" : "max-w-[1180px]",
        )}
      >
        <div
          className={twMerge(
            "border-t border-white/14 pt-6",
            mobile
              ? "flex flex-col items-start gap-4"
              : "flex flex-col gap-8 md:flex-row md:items-end md:justify-between",
          )}
        >
          <div className="max-w-[360px]">
            <div className="flex items-center gap-3">
              <Image
                src="/logo/icon-invert.svg"
                alt=""
                width={mobile ? 24 : 30}
                height={mobile ? 26 : 32}
                className={twMerge("h-auto", mobile ? "w-6" : "w-[1.9rem]")}
              />
              <span
                className={twMerge(
                  "font-bold tracking-[-0.04em]",
                  mobile ? "text-base" : "text-[1.2rem]",
                )}
              >
                LUMBERA
              </span>
            </div>

            <p
              className={twMerge(
                "mt-4 leading-[1.6] text-white/84",
                mobile ? "max-w-[250px] text-xs" : "max-w-[340px] text-[0.94rem]",
              )}
            >
              {mobile
                ? "Platform koperasi yang dipasang dulu di HP, lalu dipakai harian oleh anggota dan pengurus."
                : "Platform koperasi mobile-first untuk pencatatan, kasir, credit scoring, dan pelaporan yang lebih rapi."}
            </p>
          </div>

          <div
            className={twMerge(
              "text-white/68",
              mobile ? "text-[0.72rem] leading-5" : "max-w-[260px] text-right text-[0.82rem] leading-6",
            )}
          >
            {mobile
              ? "Install dulu dari browser HP untuk mulai pakai Lumbera."
              : "Akses terbaik dimulai dari browser HP, lalu pasang Lumbera ke home screen."}
          </div>
        </div>
      </div>
    </footer>
  );
}
