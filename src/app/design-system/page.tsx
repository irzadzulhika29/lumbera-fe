import PhoneInput from "@/src/features/auth/components/common/PhoneInput";
import PressButton from "@/src/shared/components/ui/PressButton";
import OtpInputShowcase from "./_components/OtpInputShowcase";

const colorGroups = [
  {
    title: "Brand",
    tokens: [
      { name: "Primary", hex: "#129490", swatchClass: "bg-primary" },
      {
        name: "Primary Deep",
        hex: "#0e6f6c",
        swatchClass: "bg-[var(--color-primary-deep)]",
      },
      {
        name: "Primary Shadow",
        hex: "#0e7673",
        swatchClass: "bg-[var(--color-primary-shadow)]",
      },
      { name: "Secondary", hex: "#255c99", swatchClass: "bg-secondary" },
      {
        name: "Secondary Shadow",
        hex: "#1d4a7d",
        swatchClass: "bg-[var(--color-secondary-shadow)]",
      },
      { name: "Primary Light", hex: "#e6f6f5", swatchClass: "bg-primary-light" },
    ],
  },
  {
    title: "Surface",
    tokens: [
      { name: "Surface", hex: "#f9fafb", swatchClass: "bg-surface" },
      { name: "Card", hex: "#ffffff", swatchClass: "bg-card" },
      { name: "Text", hex: "#262626", swatchClass: "bg-text" },
      { name: "Border", hex: "#e5e7eb", swatchClass: "bg-border" },
    ],
  },
  {
    title: "Semantic",
    tokens: [
      { name: "Success", hex: "#70b77e", swatchClass: "bg-success" },
      { name: "Warning", hex: "#f59e0b", swatchClass: "bg-warning" },
      { name: "Error", hex: "#dc2626", swatchClass: "bg-error" },
    ],
  },
];

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen w-full bg-surface px-6 py-12 text-text">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Internal Reference
          </p>
          <h1 className="mt-4 text-4xl font-semibold">Design System</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-text/70">
            Typography, color tokens, and button variants used as the current UI
            foundation for Membara.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Typography
            </p>
            <h2 className="mt-4 text-5xl font-semibold leading-tight">
              Poppins leads the visual rhythm.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-text/72">
              The global type system uses Poppins for headings and body copy to
              keep the interface warm, rounded, and readable.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-text/45">
              font-family: poppins
            </p>
          </article>

          <article className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Button Showcase
            </p>
            <h2 className="mt-4 text-2xl font-semibold">Press Button Variants</h2>
            <div className="mt-6 flex flex-wrap gap-4">
              <PressButton variant="primary">Primary</PressButton>
              <PressButton variant="secondary">Secondary</PressButton>
              <PressButton variant="success">Success</PressButton>
              <PressButton variant="warning">Warning</PressButton>
              <PressButton variant="danger">Danger</PressButton>
              <PressButton variant="outline">Outline</PressButton>
              <PressButton disabled>Disabled</PressButton>
            </div>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Input
            </p>
            <h2 className="mt-4 text-2xl font-semibold">Phone Input</h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-text/70">
              Auth-ready phone field built on top of the shared Base Input.
            </p>
          </article>

          <article className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
            <div className="space-y-5">
              <PhoneInput
                label="No. Handphone"
                hint="Fixed +62 prefix with a mobile-first phone number layout."
              />
              <PhoneInput
                label="No. Handphone"
                error="Nomor telepon wajib diisi"
              />
            </div>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              OTP
            </p>
            <h2 className="mt-4 text-2xl font-semibold">Otp Input</h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-text/70">
              Six-digit verification field with auto-advance, backspace navigation,
              and paste support.
            </p>
          </article>

          <article className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
            <div className="space-y-5">
              <OtpInputShowcase
                hint="Masukkan 6 digit kode verifikasi yang dikirim."
              />
              <OtpInputShowcase initialValue="12" error="Kode OTP tidak valid" />
            </div>
          </article>
        </section>

        <section className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Color Tokens
          </p>
          <h2 className="mt-4 text-2xl font-semibold">Palette</h2>
          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            {colorGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-3xl border border-border/80 p-5"
              >
                <h3 className="text-lg font-semibold">{group.title}</h3>
                <div className="mt-4 space-y-3">
                  {group.tokens.map((token) => (
                    <div
                      key={token.name}
                      className="flex items-center gap-4 rounded-2xl border border-border/70 p-3"
                    >
                      <span
                        className={`h-12 w-12 rounded-2xl border border-border/80 ${token.swatchClass}`}
                      />
                      <div>
                        <p className="font-medium">{token.name}</p>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text/45">
                          {token.hex}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
