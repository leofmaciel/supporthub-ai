import { createFileRoute } from "@tanstack/react-router";
import { AlertOctagon, Bot, Database } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { MetricCard } from "@/components/dashboard/metric-card";
import { AlertsVolumeChart } from "@/components/dashboard/alerts-volume-chart";
import { RecentAlertsTable } from "@/components/dashboard/recent-alerts-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · SupportHub Enterprise" },
      { name: "description", content: "Visão geral de incidentes, automações e saúde da infraestrutura." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <AppShell title="Visão Geral" subtitle="Saúde da plataforma, alertas e atividade do time SRE">
      <div className="space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <MetricCard
            label="Incidentes Ativos"
            value="12"
            delta="+2 vs ontem"
            trend="up"
            hint="3 críticos, 9 avisos"
            icon={AlertOctagon}
            accent="danger"
          />
          <MetricCard
            label="Automações Executadas (24h)"
            value="348"
            delta="+14% semana"
            trend="up"
            hint="média de 14.5/h"
            icon={Bot}
            accent="primary"
          />
          <MetricCard
            label="Consultas Otimizadas (mês)"
            value="87"
            delta="-21% latência p99"
            trend="down"
            hint="ganho médio 312ms"
            icon={Database}
            accent="success"
          />
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Card className="border-border/60 bg-card/60 xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-sm font-semibold">Volumetria de alertas — últimos 7 dias</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  Empilhado por severidade · fonte: Prometheus + PagerDuty
                </p>
              </div>
            </CardHeader>
            <CardContent className="pl-2">
              <AlertsVolumeChart />
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">SLO mensal</CardTitle>
              <p className="text-xs text-muted-foreground">Error budget · junho</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "checkout-service", value: 62, color: "bg-emerald-500" },
                { name: "orders-api", value: 78, color: "bg-amber-500" },
                { name: "billing-worker", value: 91, color: "bg-rose-500" },
                { name: "search-api", value: 34, color: "bg-emerald-500" },
              ].map((s) => (
                <div key={s.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-muted-foreground">{s.name}</span>
                    <span className="font-mono">{s.value}% consumido</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full ${s.color}`} style={{ width: `${s.value}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/60 bg-card/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Alertas recentes</CardTitle>
            <p className="text-xs text-muted-foreground">Últimas 2 horas · 8 eventos</p>
          </CardHeader>
          <CardContent>
            <RecentAlertsTable />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
