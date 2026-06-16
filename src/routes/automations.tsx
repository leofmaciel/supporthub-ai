import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Camera,
  DatabaseZap,
  Eraser,
  KeyRound,
  PlayCircle,
  RefreshCw,
  Stethoscope,
  TrendingUp,
  Workflow,
  BarChart3,
  Clock,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { automations as seed } from "@/lib/mock/automations";
import { formatDuration, formatPercent } from "@/lib/utils";

export const Route = createFileRoute("/automations")({
  head: () => ({
    meta: [
      { title: "Automações · SupportHub Enterprise" },
      { name: "description", content: "Fluxos de automação operacional e disparo manual de webhooks." },
    ],
  }),
  component: AutomationsPage,
});

const iconMap: Record<string, LucideIcon> = {
  Eraser,
  RefreshCw,
  Workflow,
  DatabaseZap,
  KeyRound,
  Stethoscope,
  TrendingUp,
  Camera,
};

function AutomationsPage() {
  const [items, setItems] = useState(seed);
  const [activeId, setActiveId] = useState<string | null>(null);

  function toggle(id: string) {
    setItems((curr) =>
      curr.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)),
    );
  }

  async function fire(name: string, webhookUrl: string) {
    console.info("[automations] webhook target:", webhookUrl);
    toast.success(`"${name}" disparado`, {
      description: "Webhook enviado · acompanhe execução no painel de jobs.",
    });
  }

  const stats = {
    total: items.length,
    enabled: items.filter((i) => i.enabled).length,
    avgSuccess: (
      items.reduce((acc, i) => acc + (i.successRate || 0), 0) / items.length
    ).toFixed(1),
  };

  return (
    <AppShell
      title="Centro de Automações"
      subtitle="Workflows operacionais, toggles e disparo manual de webhooks"
    >
      <div className="space-y-6 p-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/60 bg-card/60">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Workflow className="h-8 w-8 text-muted-foreground/50" />
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-card/60">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Ativos</p>
                <p className="text-2xl font-bold">{stats.enabled}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-500/50" />
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-card/60">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Taxa Sucesso Média</p>
                <p className="text-2xl font-bold">{stats.avgSuccess}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-violet-500/50" />
            </CardContent>
          </Card>
        </div>

        {/* Workflows */}
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-semibold tracking-tight">
              Workflows
            </h2>
            <p className="text-xs text-muted-foreground">
              Integração com <span className="font-mono">n8n.internal</span>
            </p>
          </div>

          <div className="grid gap-3">
            {items.map((a) => {
              const Icon = iconMap[a.icon] ?? Workflow;
              return (
                <Card key={a.id} className="border-border/60 bg-card/60">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/30">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate text-sm font-semibold">{a.name}</h3>
                          <Badge
                            variant="outline"
                            className={
                              a.enabled
                                ? "border-emerald-500/40 bg-emerald-500/10 text-[10px] text-emerald-300"
                                : "border-border/60 bg-muted/30 text-[10px] text-muted-foreground"
                            }
                          >
                            {a.enabled ? "ATIVO" : "PAUSADO"}
                          </Badge>
                          {a.lastStatus === "failed" && (
                            <Badge variant="destructive" className="text-[10px]">
                              Erro
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {a.description}
                        </p>

                        {/* Metrics */}
                        <div className="mt-3 grid gap-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Taxa de sucesso</span>
                            <span className="font-mono">
                              {formatPercent(a.successRate || 0)}
                            </span>
                          </div>
                          <Progress
                            value={(a.successRate || 0) * 100}
                            className="h-1.5"
                          />
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              Última: {a.lastRun}
                            </div>
                            <div className="text-muted-foreground">
                              {a.totalRuns} execuções
                              {a.executionTime && ` · ${formatDuration(a.executionTime)}`}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Switch
                          checked={a.enabled}
                          onCheckedChange={() => toggle(a.id)}
                          aria-label={`Toggle ${a.name}`}
                        />
                        <Dialog open={activeId === a.id} onOpenChange={(open) => setActiveId(open ? a.id : null)}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1.5"
                            >
                              <PlayCircle className="h-3.5 w-3.5" />
                              Disparar
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Disparar "{a.name}"</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="rounded-lg bg-muted/50 p-3 text-sm">
                                <p className="font-mono text-xs text-muted-foreground">
                                  {a.webhookUrl}
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Frequência: <strong>{a.frequency}</strong>
                              </p>
                              <Button
                                onClick={() => {
                                  fire(a.name, a.webhookUrl);
                                  setActiveId(null);
                                }}
                                className="w-full"
                              >
                                Enviar Webhook
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
