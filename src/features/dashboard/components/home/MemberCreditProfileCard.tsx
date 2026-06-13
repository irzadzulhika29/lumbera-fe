import { Icon } from "@iconify/react";

import type { DashboardCreditProfile } from "@/src/features/dashboard/types";

export default function MemberCreditProfileCard({
  profile,
}: {
  profile: DashboardCreditProfile;
}) {
  return (
    <section
      aria-label="Profil kredit"
      className="flex items-center gap-3 rounded-[18px] bg-[#eef3f8] px-4 py-3.5"
    >
      <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full border-[5px] border-[#d5dfea] border-r-[#2a64a7] border-t-[#2a64a7] text-[1.05rem] font-bold text-[#2a64a7]">
        {profile.initials}
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-[0.95rem] font-bold tracking-[-0.03em] text-text">
          {profile.title}
        </h2>
        <p className="mt-1 text-[0.78rem] font-medium text-text/78">
          {profile.scoreLabel} - {profile.updatedLabel}
        </p>
      </div>

      <Icon
        icon="solar:alt-arrow-right-linear"
        className="shrink-0 text-[1.25rem] text-[#2a64a7]"
        aria-hidden="true"
      />
    </section>
  );
}
