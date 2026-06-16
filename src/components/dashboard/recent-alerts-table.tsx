import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { recentAlerts } from "@/lib/mock/alerts";
import type { Severity } from "@/lib/types";
import { cn } from "@/lib/utils";

const severityStyles: Record<Severity, string> = {
  critical: "border-rose-500/40 bg-rose-500/10 text-rose-300",
  warning: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  info: "border-sky-500/40 bg-sky-500/10 text-sky-300",
};
const severityLabel: Record<Severity, string> = {
  critical: "CRÍTICO",
  warning: "AVISO",
  info: "INFO",
};

export function RecentAlertsTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-border/60">
      <Table>
        <TableHeader>
          <TableRow className="border-border/60 bg-muted/30 hover:bg-muted/30">
            <TableHead className="w-[110px]">Severidade</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="w-[180px]">Serviço</TableHead>
            <TableHead className="w-[110px] font-mono">Downtime</TableHead>
            <TableHead className="w-[110px] text-right">Quando</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentAlerts.map((a) => (
            <TableRow key={a.id} className="border-border/40">
              <TableCell>
                <Badge variant="outline" className={cn("font-mono text-[10px]", severityStyles[a.severity])}>
                  {severityLabel[a.severity]}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{a.description}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">{a.service}</TableCell>
              <TableCell className="font-mono text-xs">{a.downtime}</TableCell>
              <TableCell className="text-right text-xs text-muted-foreground">{a.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
