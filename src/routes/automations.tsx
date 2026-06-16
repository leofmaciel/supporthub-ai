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
  type LucideIcon,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { automations as seed } from "@/lib/mock/automations";

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

  function toggle(id: string) {
    setItems((curr) =>
      curr.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)),
    );
  }

  async function fire(name: string, webhookUrl: string) {
    // TODO: Conectar ao endpoint real do n8n / orquestrador.
    // Exemplo:
    // await fetch(webhookUrl, { method: "POST", body: JSON.stringify({ triggeredBy: user.id }) });
    console.info("[automations] webhook target:", webhookUrl);
    toast.success(`"${name}" disparado`, {
      description: "Webhook enviado · acompanhe execução no painel de jobs.",
    });
  }

  return (
    <AppShell
      title="Centro de Automações"
      subtitle="Workflows operacionais, toggles e disparo manual de webhooks"
    >
      <div className="space-y-4 p-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold tracking-tight">
            {items.length} workflows · {items.filter((i) => i.enabled).length} ativos
          </h2>
          <p className="text-xs text-muted-foreground">
            Integração com <span className="font-mono">n8n.internal</span> · pronta para extensão
          </p>
        </div>

        <div className="grid gap-3">
          {items.map((a) => {
            const Icon = iconMap[a.icon] ?? Workflow;
            return (
              <Card key={a.id} className="border-border/60 bg-card/60">
                <CardContent className="flex items-center gap-4 p-4">
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
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{a.description}</p>
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                      última execução: {a.lastRun} · webhook:{" "}
                      <span className="text-foreground/70">{a.webhookUrl}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch
                      checked={a.enabled}
                      onCheckedChange={() => toggle(a.id)}
                      aria-label={`Toggle ${a.name}`}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => fire(a.name, a.webhookUrl)}
                      className="gap-1.5"
                    >
                      <PlayCircle className="h-3.5 w-3.5" />
                      Disparar Webhook
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
