import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertOctagon, Bot, Database } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { MetricCard } from "@/components/dashboard/metric-card";
import { AlertsVolumeChart } from "@/components/dashboard/alerts-volume-chart";
import { RecentAlertsTable } from "@/components/dashboard/recent-alerts-table";
import { DashboardFiltersUI } from "@/components/dashboard/dashboard-filters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recentAlerts } from "@/lib/mock/alerts";
import { incidents } from "@/lib/mock/incidents";
import { useFilters } from "@/hooks/use-filters";
import { filterAlerts, calculateMetrics, exportToCSV } from "@/lib/utils";

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
  const { filters, filtered: filteredAlerts, updateFilter, clearFilters, hasFilters } = useFilters({
    data: recentAlerts,
    filterFn: filterAlerts,
  });

  const metrics = calculateMetrics(incidents);
  const criticalAlerts = recentAlerts.filter((a) => a.severity === "critical").length;

  const handleExport = (format: "csv" | "json") => {
    if (format === "csv") {
      exportToCSV(filteredAlerts, "alerts");
    } else {
      const blob = new Blob([JSON.stringify(filteredAlerts, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "alerts.json";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <AppShell title="Visão Geral" subtitle="Saúde da plataforma, alertas e atividade do time SRE">
      <div className="space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <MetricCard
            label="Incidentes Ativos"
            value={String(incidents.filter((i) => i.status !== "resolved").length)}
            delta={`${metrics.critical} críticos`}
            trend={metrics.critical > 0 ? "up" : "down"}
            hint={`Taxa resolução: ${Math.round(metrics.resolvedRate)}%`}
            icon={AlertOctagon}
            accent="danger"
          />
          <MetricCard
            label="Alertas Críticos"
            value={String(criticalAlerts)}
            delta={`+${Math.floor(Math.random() * 3)} this hour`}
            trend="up"
            hint={`${recentAlerts.length} total alertas`}
            icon={Bot}
            accent="primary"
          />
          <MetricCard
            label="MTTR Médio"
            value={metrics.mttr}
            delta={`-12% semana`}
            trend="down"
            hint="Mean time to resolve"
            icon={Database}
            accent="success"
          />
        </div>

        {/* Filtros */}
        <DashboardFiltersUI
          filters={filters}
          onFilterChange={updateFilter}
          onClear={clearFilters}
          onExport={handleExport}
          hasFilters={hasFilters}
          itemCount={filteredAlerts.length}
        />

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
            <p className="text-xs text-muted-foreground">Últimas 2 horas · {filteredAlerts.length} eventos</p>
          </CardHeader>
          <CardContent>
            <RecentAlertsTable alerts={filteredAlerts} />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
