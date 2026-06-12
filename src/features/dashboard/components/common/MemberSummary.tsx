import { twMerge } from "tailwind-merge";

export type DashboardMemberSummary = {
  id: string;
  initials: string;
  meta: string;
  name: string;
};

type MemberSummaryProps = {
  member: DashboardMemberSummary;
  size?: "compact" | "default";
  trailing?: React.ReactNode;
};

export default function MemberSummary({
  member,
  size = "default",
  trailing,
}: MemberSummaryProps) {
  const compact = size === "compact";

  return (
    <div className="flex min-w-0 flex-1 items-center gap-3.5">
      <div
        className={twMerge(
          "flex shrink-0 items-center justify-center rounded-full bg-secondary font-bold text-white",
          compact
            ? "h-12 w-12 text-[0.92rem]"
            : "h-[52px] w-[52px] text-[1.05rem]",
        )}
      >
        {member.initials}
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-[0.98rem] font-bold tracking-[-0.03em] text-text">
          {member.name}
        </h2>
        <p className="mt-1 truncate text-[0.78rem] font-medium text-text/82">
          {member.meta}
        </p>
      </div>

      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </div>
  );
}
