import type { Incident } from "../types";

export const incidents: Incident[] = [
  { id: "INC-2041", title: "Indisponibilidade parcial do checkout em EU-WEST-1", severity: "critical", status: "resolved", service: "checkout-service", startedAt: "2026-06-14 02:14", duration: "01h 23m" },
  { id: "INC-2040", title: "Latência elevada em queries de relatório", severity: "warning", status: "mitigated", service: "rds-analytics", startedAt: "2026-06-13 18:02", duration: "00h 47m" },
  { id: "INC-2039", title: "Falha de failover no cluster Patroni", severity: "critical", status: "resolved", service: "postgres-cluster", startedAt: "2026-06-12 09:38", duration: "02h 11m" },
  { id: "INC-2038", title: "Kafka broker 3 OOMKilled repetidamente", severity: "critical", status: "investigating", service: "kafka-prod", startedAt: "2026-06-15 22:51", duration: "03h 04m" },
  { id: "INC-2037", title: "Certificado expirado em api.partners", severity: "warning", status: "resolved", service: "ingress-nginx", startedAt: "2026-06-10 11:00", duration: "00h 18m" },
  { id: "INC-2036", title: "Deadlock recorrente em tabela orders_v2", severity: "warning", status: "open", service: "postgres-orders", startedAt: "2026-06-16 07:22", duration: "—" },
  { id: "INC-2035", title: "DNS resolution intermitente em pods EKS", severity: "warning", status: "resolved", service: "eks-prod-eu", startedAt: "2026-06-09 14:30", duration: "00h 52m" },
  { id: "INC-2034", title: "Backup WAL atrasou > 1h", severity: "info", status: "resolved", service: "postgres-cluster", startedAt: "2026-06-08 03:15", duration: "01h 09m" },
  { id: "INC-2033", title: "Rate limiting agressivo no API gateway", severity: "warning", status: "resolved", service: "api-gateway-eu", startedAt: "2026-06-07 16:44", duration: "00h 31m" },
  { id: "INC-2032", title: "Memory leak suspeito em worker de billing", severity: "critical", status: "mitigated", service: "billing-worker", startedAt: "2026-06-06 21:09", duration: "04h 18m" },
  { id: "INC-2031", title: "Saturação de IOPS em volume EBS gp3", severity: "warning", status: "resolved", service: "rds-orders-prod", startedAt: "2026-06-05 13:25", duration: "01h 42m" },
  { id: "INC-2030", title: "Falha na rotação automática de secrets Vault", severity: "warning", status: "resolved", service: "vault-prod", startedAt: "2026-06-04 09:00", duration: "00h 26m" },
];
