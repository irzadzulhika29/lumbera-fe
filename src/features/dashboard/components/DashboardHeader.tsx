import DashboardIcon from "./DashboardIcon";

type DashboardHeaderProps = {
  stats?: React.ReactNode;
  greeting: string;
  userName: string;
  cooperativeName: string;
  period: string;
  syncLabel: string;
  notificationCount: number;
};

export default function DashboardHeader({
  stats,
  greeting,
  userName,
  cooperativeName,
  period,
  syncLabel,
  notificationCount,
}: DashboardHeaderProps) {
  return (
    <header className="relative bg-primary px-6 pb-24 pt-[calc(1.3rem+env(safe-area-inset-top))] text-white">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.78rem] font-medium leading-none text-primary">
          <span className="h-2 w-2 rounded-full bg-[#8dd1ca]" />
          {syncLabel}
        </div>

        <button
          type="button"
          aria-label={`${notificationCount} notifikasi baru`}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/18 text-white transition-colors hover:bg-white/24"
        >
          <DashboardIcon name="notification" className="h-[21px] w-[21px]" />
          <span className="absolute -right-0.5 -top-1 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-error px-1 text-[0.65rem] font-bold text-white ring-2 ring-primary">
            {notificationCount}
          </span>
        </button>
      </div>

      <div className="mt-8">
        <h1 className="text-[1.68rem] font-bold leading-[1.18] tracking-[-0.045em]">
          {greeting} {userName}
        </h1>
        <p className="mt-3 text-xs font-medium text-white/82">
          {cooperativeName} · {period}
        </p>
      </div>

      {stats ? (
        <div className="absolute inset-x-0 -bottom-[54px] z-10 px-5">{stats}</div>
      ) : null}
    </header>
  );
}
