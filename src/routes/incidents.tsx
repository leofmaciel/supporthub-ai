import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  AlertOctagon,
  Clock,
  Users,
  TrendingUp,
  Download,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PostMortemDialog } from "@/components/incidents/post-mortem-dialog";
import { DashboardFiltersUI } from "@/components/dashboard/dashboard-filters";
import { incidents } from "@/lib/mock/incidents";
import { useFilters } from "@/hooks/use-filters";
import { filterIncidents, calculateMetrics, formatDuration, formatDate, formatPercent, exportToCSV, getSeverityColor } from "@/lib/utils";
import type { Incident, IncidentStatus, Severity } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/incidents")({
  head: () => ({
    meta: [
      { title: "Incidentes · SupportHub Enterprise" },
      { name: "description", content: "Gestão de incidentes e geração de post-mortems assistida por IA." },
    ],
  }),
  component: IncidentsPage,
});

const sevStyles: Record<Severity, string> = {
  critical: "border-rose-500/40 bg-rose-500/10 text-rose-300",
  warning: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  info: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  low: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
};
const statusStyles: Record<IncidentStatus, string> = {
  open: "border-rose-500/40 bg-rose-500/10 text-rose-300",
  investigating: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  mitigated: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  resolved: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  "on-hold": "border-slate-500/40 bg-slate-500/10 text-slate-300",
};
const statusLabel: Record<IncidentStatus, string> = {
  open: "ABERTO",
  investigating: "INVESTIGANDO",
  mitigated: "MITIGADO",
  resolved: "RESOLVIDO",
  "on-hold": "SUSPENSO",
};

const PAGE_SIZE = 10;

function IncidentsPage() {
  const [page, setPage] = useState(0);
  const [active, setActive] = useState<Incident | null>(null);
  const [open, setOpen] = useState(false);

  const { filters, filtered, updateFilter, clearFilters, hasFilters } = useFilters({
    data: incidents,
    filterFn: filterIncidents,
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const metrics = calculateMetrics(incidents);

  const handleExport = (format: "csv" | "json") => {
    if (format === "csv") {
      exportToCSV(filtered, "incidents");
    } else {
      // JSON export
      const blob = new Blob([JSON.stringify(filtered, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "incidents.json";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <AppShell
      title="Gestão de Incidentes"
      subtitle="Histórico, filtros e geração assistida de post-mortems"
    >
      <div className="space-y-6 p-6">
        {/* Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border/60 bg-card/60">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Total</p>
                <p className="text-2xl font-bold">{metrics.total}</p>
              </div>
              <AlertOctagon className="h-8 w-8 text-muted-foreground/50" />
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-card/60">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Críticos</p>
                <p className="text-2xl font-bold">{metrics.critical}</p>
              </div>
              <AlertOctagon className="h-8 w-8 text-rose-500/50" />
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-card/60">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Taxa Resolução</p>
                <p className="text-2xl font-bold">{formatPercent(metrics.resolvedRate)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-500/50" />
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-card/60">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase">MTTR</p>
                <p className="text-2xl font-bold">{metrics.mttr}</p>
              </div>
              <Clock className="h-8 w-8 text-sky-500/50" />
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <DashboardFiltersUI
          filters={filters}
          onFilterChange={updateFilter}
          onClear={clearFilters}
          onExport={handleExport}
          hasFilters={hasFilters}
          itemCount={filtered.length}
        />

        {/* Table */}
        <Card className="border-border/60 bg-card/60">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead className="w-28">Severidade</TableHead>
                  <TableHead className="w-28">Status</TableHead>
                  <TableHead className="w-32">Serviço</TableHead>
                  <TableHead className="w-24">Duração</TableHead>
                  <TableHead className="w-20">Impacto</TableHead>
                  <TableHead className="w-24">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Nenhum incidente encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  pageItems.map((i) => (
                    <TableRow key={i.id}>
                      <TableCell className="font-mono text-sm">{i.id}</TableCell>
                      <TableCell className="font-semibold">{i.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("capitalize", sevStyles[i.severity])}>
                          {i.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("capitalize", statusStyles[i.status])}>
                          {statusLabel[i.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{i.service}</TableCell>
                      <TableCell className="text-sm font-mono">{i.duration}</TableCell>
                      <TableCell className="text-xs">
                        {i.impactedUsers ? (
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {i.impactedUsers}
                          </div>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setActive(i);
                            setOpen(true);
                          }}
                        >
                          Post-mortem
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border/60 px-6 py-3">
              <p className="text-xs text-muted-foreground">
                Página {page + 1} de {totalPages}
              </p>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      <PostMortemDialog incident={active} open={open} onOpenChange={setOpen} />
    </AppShell>
  );
}
