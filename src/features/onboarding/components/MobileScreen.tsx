import { twMerge } from "tailwind-merge";

type MobileScreenProps = {
  children: React.ReactNode;
  className?: string;
};

export default function MobileScreen({ children, className }: MobileScreenProps) {
  return (
    <main className="min-h-[100svh] w-full bg-[#4a4a4a] sm:px-4 sm:py-6">
      <div
        className={twMerge(
          "mx-auto flex min-h-[100svh] w-screen flex-col overflow-hidden bg-white sm:min-h-[860px] sm:rounded-[34px] sm:shadow-[0_24px_80px_rgba(15,23,42,0.22)]",
          className,
        )}
      >
        {children}
      </div>
    </main>
  );
}
