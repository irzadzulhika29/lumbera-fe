"use client";

import ProfileMenuItem from "./ProfileMenuItem";

export default function ProfileMenuSection({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; icon: string }[];
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 px-1 text-[0.96rem] font-bold tracking-[-0.02em] text-primary">
        {title}
      </h2>
      <div className="space-y-1">
        {items.map((item) => (
          <ProfileMenuItem key={item.label} label={item.label} icon={item.icon} />
        ))}
      </div>
    </section>
  );
}
