type DashboardHeaderProps = {
  stats?: React.ReactNode;
  greeting: string;
  userName: string;
  cooperativeName: string;
  period: string;
  syncLabel?: string;
  statsOffsetClassName?: string;
  backgroundClassName?: string;
  titleClassName?: string;
};

export default function DashboardHeader({
  stats,
  greeting,
  userName,
  cooperativeName,
  period,
  syncLabel,
  statsOffsetClassName,
  backgroundClassName,
  titleClassName,
}: DashboardHeaderProps) {
  return (
    <header
      className={`relative px-6 pb-24 pt-[calc(1.3rem+env(safe-area-inset-top))] text-white ${
        backgroundClassName ?? "bg-primary-deep"
      }`}
    >
      {syncLabel ? (
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.78rem] font-medium leading-none text-primary">
            {syncLabel}
          </div>
        </div>
      ) : null}

      <div className={syncLabel ? "mt-8" : "mt-2"}>
        <h1
          className={`font-bold leading-[1.18] tracking-[-0.045em] ${
            titleClassName ?? "text-[1.68rem]"
          }`}
        >
          {greeting} {userName}
        </h1>
        <p className="mt-3 text-xs font-medium text-white/82">
          {cooperativeName} - {period}
        </p>
      </div>

      {stats ? (
        <div
          className={`absolute inset-x-0 z-10 px-5 ${statsOffsetClassName ?? "-bottom-[54px]"}`}
        >
          {stats}
        </div>
      ) : null}
    </header>
  );
}
