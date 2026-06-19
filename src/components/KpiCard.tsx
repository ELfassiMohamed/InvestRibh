import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface Props {
  label: string;
  value: string;
  hint?: string;
  trend?: number; // % variation
  icon?: ReactNode;
}

export function KpiCard({ label, value, hint, trend, icon }: Props) {
  const positive = (trend ?? 0) >= 0;
  return (
    <div className="card-elevated p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="label-sm text-on-surface-variant">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-on-surface">{value}</p>
          {hint && <p className="mt-1 text-xs text-on-surface-variant">{hint}</p>}
        </div>
        {icon && (
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-container/20 text-primary">
            {icon}
          </div>
        )}
      </div>
      {trend !== undefined && (
        <div
          className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${
            positive ? "text-success" : "text-error"
          }`}
        >
          {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {positive ? "+" : ""}
          {trend.toFixed(1)} % vs trimestre précédent
        </div>
      )}
    </div>
  );
}
