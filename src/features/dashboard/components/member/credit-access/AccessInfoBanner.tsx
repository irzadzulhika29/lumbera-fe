"use client";

export default function AccessInfoBanner({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="rounded-[12px] bg-[#eaf1fb] px-3 py-3.5">
      <p className="text-[0.9rem] font-bold leading-snug text-[#2f67a7]">
        {title}
      </p>
      <p className="mt-1 text-[0.76rem] font-medium text-[#2f67a7]/80">
        {description}
      </p>
    </section>
  );
}
