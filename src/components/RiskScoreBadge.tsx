import { Shield } from "lucide-react";

interface Props {
  score: number;
  label: "Faible" | "Modéré" | "Élevé";
}

export function RiskScoreBadge({ score, label }: Props) {
  const tone =
    label === "Faible"
      ? "bg-success/10 text-success"
      : label === "Modéré"
      ? "bg-warning/10 text-warning"
      : "bg-error/10 text-error";

  return (
    <div className={`flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-bold ${tone}`}>
      <Shield className="h-3 w-3" />
      <span>{score}</span>
      <span className="font-medium opacity-80">· Risque {label.toLowerCase()}</span>
    </div>
  );
}
