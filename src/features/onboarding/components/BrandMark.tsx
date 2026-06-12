import Image from "next/image";
import { twMerge } from "tailwind-merge";

type BrandMarkProps = {
  variant: "light" | "color";
  className?: string;
};

export default function BrandMark({ variant, className }: BrandMarkProps) {
  if (variant === "light") {
    return (
      <Image
        src="/logo/third-invert.webp"
        alt="Lumbera"
        width={176}
        height={120}
        priority
        className={twMerge("h-auto w-[108px]", className)}
      />
    );
  }

  return (
    <div className={twMerge("flex flex-col items-center gap-2", className)}>
      <Image
        src="/logo/primary.webp"
        alt=""
        width={48}
        height={48}
        priority
        className="h-auto w-[42px]"
      />
      <span className="text-[1.85rem] font-bold leading-none tracking-[-0.04em] text-primary">
        LUMBERA
      </span>
    </div>
  );
}
