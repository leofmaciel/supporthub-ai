import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Alert, Incident, Article, DashboardFilters } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 📊 Filtros e Busca
export function filterAlerts(alerts: Alert[], filters: DashboardFilters): Alert[] {
  return alerts.filter((alert) => {
    if (filters.severity && !filters.severity.includes(alert.severity)) return false;
    if (filters.service && !filters.service.includes(alert.service)) return false;
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      return alert.description.toLowerCase().includes(q) || alert.service.toLowerCase().includes(q);
    }
    return true;
  });
}

export function filterIncidents(incidents: Incident[], filters: DashboardFilters): Incident[] {
  return incidents.filter((incident) => {
    if (filters.status && !filters.status.includes(incident.status)) return false;
    if (filters.severity && !filters.severity.includes(incident.severity)) return false;
    if (filters.service && !filters.service.includes(incident.service)) return false;
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      return incident.title.toLowerCase().includes(q) || incident.service.toLowerCase().includes(q);
    }
    return true;
  });
}

export function searchArticles(articles: Article[], query: string): Article[] {
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.body.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
}

// 📥 Exportação
export function exportToCSV(data: any[], filename: string): void {
  const headers = Object.keys(data[0] || {});
  const csv = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((h) => {
        const val = row[h];
        return typeof val === "string" && val.includes(",") ? `"${val}"` : val;
      }).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportToJSON(data: any[], filename: string): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

// 📈 Formatação
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  const mins = Math.floor(ms / 60000);
  const secs = Math.round((ms % 60000) / 1000);
  return `${mins}m ${secs}s`;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// 🎯 Análise
export function calculateMetrics(incidents: Incident[]) {
  const critical = incidents.filter((i) => i.severity === "critical").length;
  const resolved = incidents.filter((i) => i.status === "resolved").length;
  const avgResolutionTime = incidents.length
    ? incidents
        .filter((i) => i.resolvedAt)
        .reduce((acc, i) => acc + parseInt(i.duration), 0) / incidents.length
    : 0;

  return {
    total: incidents.length,
    critical,
    resolved,
    resolvedRate: (resolved / incidents.length) * 100,
    avgResolutionTime,
    mttr: formatDuration(avgResolutionTime * 60000),
  };
}

export function getSeverityColor(
  severity: string
): "danger" | "warning" | "primary" | "success" {
  switch (severity) {
    case "critical":
      return "danger";
    case "warning":
      return "warning";
    case "low":
      return "success";
    default:
      return "primary";
  }
}
