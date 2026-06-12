import DashboardIcon from "./DashboardIcon";

type DashboardHeaderProps = {
  stats?: React.ReactNode;
  greeting: string;
  userName: string;
  cooperativeName: string;
  period: string;
  syncLabel: string;
};

export default function DashboardHeader({
  stats,
  greeting,
  userName,
  cooperativeName,
  period,
  syncLabel,
}: DashboardHeaderProps) {
  return (
    <header className="relative bg-primary px-6 pb-24 pt-[calc(1.3rem+env(safe-area-inset-top))] text-white">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.78rem] font-medium leading-none text-primary">
          <span className="h-2 w-2 rounded-full bg-[#8dd1ca]" />
          {syncLabel}
        </div>

        
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
