"use client";

export default function ScoreRing({
  score,
  maxScore,
}: {
  score: number;
  maxScore: number;
}) {
  const radius = 54;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = Math.max(0, Math.min(score / maxScore, 1));
  const strokeDashoffset = circumference - progress * circumference;
  const rotationOffset = -60;
  const endAngle = rotationOffset + progress * 360;
  const endAngleInRadians = (endAngle * Math.PI) / 180;
  const dotCenterX = radius + normalizedRadius * Math.cos(endAngleInRadians);
  const dotCenterY = radius + normalizedRadius * Math.sin(endAngleInRadians);

  return (
    <div className="relative h-[116px] w-[116px] shrink-0">
      <svg
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        className="h-full w-full"
        aria-hidden="true"
      >
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          stroke="rgba(255,255,255,0.98)"
          strokeWidth={stroke}
          fill="none"
        />
        <g transform={`rotate(${rotationOffset} ${radius} ${radius})`}>
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            stroke="rgba(200,227,226,0.9)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            fill="none"
          />
        </g>
      </svg>

      <span
        className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#d4dfdd] shadow-[0_2px_6px_rgba(0,0,0,0.14)]"
        style={{
          left: `${(dotCenterX / (radius * 2)) * 100}%`,
          top: `${(dotCenterY / (radius * 2)) * 100}%`,
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <strong className="text-[1.8rem] font-bold leading-none tracking-[-0.045em]">
          {score}
        </strong>
        <span className="mt-1 text-[0.74rem] font-medium text-white/82">
          dari {maxScore}
        </span>
      </div>
    </div>
  );
}
