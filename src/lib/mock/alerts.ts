import type { Alert } from "../types";

export const recentAlerts: Alert[] = [
  { id: "a1", severity: "critical", description: "Replication lag > 30s em postgres-primary-02", service: "postgres-cluster", downtime: "00:04:12", timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(), assignee: "DBA Team", tags: ["database", "replication"] },
  { id: "a2", severity: "critical", description: "Connection pool exhausted (PgBouncer)", service: "pgbouncer-edge", downtime: "00:02:48", timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(), assignee: "Backend Team", tags: ["database", "connections"] },
  { id: "a3", severity: "warning", description: "CPU sustained > 85% por 10 min", service: "api-gateway-eu", downtime: "—", timestamp: new Date(Date.now() - 14 * 60 * 1000).toISOString(), tags: ["performance", "cpu"] },
  { id: "a4", severity: "warning", description: "Disk IOPS aproximando do limite provisionado", service: "rds-orders-prod", downtime: "—", timestamp: new Date(Date.now() - 22 * 60 * 1000).toISOString(), assignee: "Infrastructure", tags: ["storage", "iops"] },
  { id: "a5", severity: "info", description: "Deploy v2.41.0 concluído em checkout-service", service: "checkout-service", downtime: "—", timestamp: new Date(Date.now() - 37 * 60 * 1000).toISOString(), tags: ["deployment"] },
  { id: "a6", severity: "critical", description: "Kafka consumer lag > 50k mensagens", service: "orders-consumer", downtime: "00:11:03", timestamp: new Date(Date.now() - 41 * 60 * 1000).toISOString(), assignee: "Backend Team", tags: ["messaging", "lag"] },
  { id: "a7", severity: "warning", description: "TLS cert expira em 9 dias (*.api.internal)", service: "ingress-nginx", downtime: "—", timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), assignee: "Security Team", tags: ["ssl", "security"] },
  { id: "a8", severity: "info", description: "Auto-scaling event: +3 nodes em eks-prod-eu", service: "eks-prod-eu", downtime: "—", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), tags: ["kubernetes", "scaling"] },
];

export const alertsVolume = [
  { day: "Seg", critical: 4, warning: 12, info: 22 },
  { day: "Ter", critical: 2, warning: 9, info: 31 },
  { day: "Qua", critical: 7, warning: 15, info: 28 },
  { day: "Qui", critical: 3, warning: 11, info: 19 },
  { day: "Sex", critical: 9, warning: 18, info: 34 },
  { day: "Sáb", critical: 1, warning: 4, info: 12 },
  { day: "Dom", critical: 2, warning: 6, info: 17 },
];
