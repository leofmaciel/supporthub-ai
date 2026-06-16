import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, FileBarChart, Filter } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { incidents } from "@/lib/mock/incidents";
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
};
const statusStyles: Record<IncidentStatus, string> = {
  open: "border-rose-500/40 bg-rose-500/10 text-rose-300",
  investigating: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  mitigated: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  resolved: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
};
const statusLabel: Record<IncidentStatus, string> = {
  open: "ABERTO",
  investigating: "INVESTIGANDO",
  mitigated: "MITIGADO",
  resolved: "RESOLVIDO",
};

const PAGE_SIZE = 6;

function IncidentsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<IncidentStatus | "all">("all");
  const [page, setPage] = useState(0);
  const [active, setActive] = useState<Incident | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return incidents.filter((i) => {
      const matchQ =
        !q ||
        i.title.toLowerCase().includes(q) ||
        i.id.toLowerCase().includes(q) ||
        i.service.toLowerCase().includes(q);
      const matchS = status === "all" || i.status === status;
      return matchQ && matchS;
    });
  }, [query, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <AppShell
      title="Gestão de Incidentes"
      subtitle="Histórico, filtros e geração assistida de post-mortems"
    >
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[240px]">
            <Filter className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
              placeholder="Filtrar por ID, título ou serviço…"
              className="h-9 border-border/60 bg-card/60 pl-9"
            />
          </div>
          <Select
            value={status}
            onValueChange={(v) => {
              setStatus(v as IncidentStatus | "all");
              setPage(0);
            }}
          >
            <SelectTrigger className="h-9 w-[180px] border-border/60 bg-card/60">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="open">Aberto</SelectItem>
              <SelectItem value="investigating">Investigando</SelectItem>
              <SelectItem value="mitigated">Mitigado</SelectItem>
              <SelectItem value="resolved">Resolvido</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 bg-muted/30 hover:bg-muted/30">
                <TableHead className="w-[110px] font-mono">ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead className="w-[100px]">Severidade</TableHead>
                <TableHead className="w-[130px]">Status</TableHead>
                <TableHead className="w-[170px]">Serviço</TableHead>
                <TableHead className="w-[150px] font-mono">Início</TableHead>
                <TableHead className="w-[90px] font-mono">Duração</TableHead>
                <TableHead className="w-[180px] text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageItems.map((i) => (
                <TableRow key={i.id} className="border-border/40">
                  <TableCell className="font-mono text-xs">{i.id}</TableCell>
                  <TableCell className="text-sm">{i.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("font-mono text-[10px]", sevStyles[i.severity])}>
                      {i.severity.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("font-mono text-[10px]", statusStyles[i.status])}>
                      {statusLabel[i.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{i.service}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{i.startedAt}</TableCell>
                  <TableCell className="font-mono text-xs">{i.duration}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 border-violet-500/40 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20"
                      onClick={() => {
                        setActive(i);
                        setOpen(true);
                      }}
                    >
                      <FileBarChart className="h-3.5 w-3.5" />
                      Gerar Post-Mortem
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {pageItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-8 text-center text-sm text-muted-foreground">
                    Nenhum incidente encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {filtered.length} resultado{filtered.length !== 1 && "s"} · página {page + 1} de {totalPages}
          </span>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Anterior
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            >
              Próxima
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <PostMortemDialog incident={active} open={open} onOpenChange={setOpen} />
    </AppShell>
  );
}
