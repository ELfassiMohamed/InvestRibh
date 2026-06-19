import { formatMAD, formatPercent } from "@/lib/format";

interface Props {
  current: number;
  target: number;
  showLabels?: boolean;
}

export function FundingProgressBar({ current, target, showLabels = true }: Props) {
  const pct = Math.min(100, (current / target) * 100);
  return (
    <div className="space-y-1.5">
      <div className="h-2 overflow-hidden rounded-full bg-surface-container">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabels && (
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-on-surface">{formatMAD(current)}</span>
          <span className="text-on-surface-variant">
            {formatPercent(pct)} de {formatMAD(target)}
          </span>
        </div>
      )}
    </div>
  );
}
