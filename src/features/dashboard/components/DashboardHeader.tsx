import DashboardIcon from "./DashboardIcon";

type DashboardHeaderProps = {
  greeting: string;
  userName: string;
  cooperativeName: string;
  period: string;
  syncLabel: string;
  notificationCount: number;
};

export default function DashboardHeader({
  greeting,
  userName,
  cooperativeName,
  period,
  syncLabel,
  notificationCount,
}: DashboardHeaderProps) {
  return (
    <header className="relative bg-primary px-6 pb-12 pt-[calc(1.75rem+env(safe-area-inset-top))] text-white">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/18 px-3.5 py-2 text-[0.78rem] font-semibold leading-none backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[#8bd38b] shadow-[0_0_0_3px_rgba(139,211,139,0.14)]" />
          {syncLabel}
        </div>

        <button
          type="button"
          aria-label={`${notificationCount} notifikasi baru`}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/18 text-white transition-colors hover:bg-white/25"
        >
          <DashboardIcon name="notification" className="h-[21px] w-[21px]" />
          <span className="absolute -right-0.5 -top-1 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-error px-1 text-[0.65rem] font-bold ring-2 ring-primary">
            {notificationCount}
          </span>
        </button>
      </div>

      <div className="mt-6">
        <h1 className="text-[1.85rem] font-bold leading-[1.02] tracking-[-0.045em]">
          <span className="block">{greeting}</span>
          <span className="block">{userName}</span>
        </h1>
        <p className="mt-3 text-[0.96rem] font-medium text-white/75">
          {cooperativeName} · {period}
        </p>
      </div>
    </header>
  );
}
