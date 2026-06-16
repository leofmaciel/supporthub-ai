import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "neutral";
  hint?: string;
  icon: LucideIcon;
  accent?: "primary" | "warning" | "danger" | "success";
}

const accentMap = {
  primary: "text-sky-400 bg-sky-500/10 ring-sky-500/20",
  warning: "text-amber-400 bg-amber-500/10 ring-amber-500/20",
  danger: "text-rose-400 bg-rose-500/10 ring-rose-500/20",
  success: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20",
};

export function MetricCard({
  label,
  value,
  delta,
  trend = "neutral",
  hint,
  icon: Icon,
  accent = "primary",
}: MetricCardProps) {
  const trendColor =
    trend === "up"
      ? "text-rose-400"
      : trend === "down"
      ? "text-emerald-400"
      : "text-muted-foreground";
  const TrendIcon = trend === "down" ? ArrowDownRight : ArrowUpRight;

  return (
    <Card className="border-border/60 bg-card/60 backdrop-blur">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0 space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
          <p className="font-mono text-3xl font-semibold tracking-tight">{value}</p>
          <div className="flex items-center gap-2 text-xs">
            {delta ? (
              <span className={cn("inline-flex items-center gap-0.5 font-medium", trendColor)}>
                <TrendIcon className="h-3 w-3" />
                {delta}
              </span>
            ) : null}
            {hint ? <span className="text-muted-foreground">{hint}</span> : null}
          </div>
        </div>
        <div className={cn("rounded-md p-2 ring-1", accentMap[accent])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
}
