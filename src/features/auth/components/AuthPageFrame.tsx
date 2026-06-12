import BrandMark from "@/src/features/onboarding/components/BrandMark";

type AuthPageFrameProps = {
  children: React.ReactNode;
  showBrand?: boolean;
};

export default function AuthPageFrame({
  children,
  showBrand = true,
}: AuthPageFrameProps) {
  return (
    <main className="min-h-[100svh] w-full bg-white text-text">
      <section className="mx-auto flex min-h-[100svh] w-full max-w-[430px] flex-col bg-white">
        <div className="flex flex-1 flex-col px-6 pb-8 pt-7">
          {showBrand ? (
            <>
              <header className="flex justify-center">
                <BrandMark variant="color" className="scale-90" />
              </header>
              <div className="mt-14" />
            </>
          ) : null}
          {children}
        </div>
      </section>
    </main>
  );
}
