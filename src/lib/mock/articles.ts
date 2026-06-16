import type { Article } from "../types";

const md = (title: string) => `# ${title}

## Contexto
Este artigo descreve um cenário recorrente identificado pela equipe de SRE, com diagnóstico, mitigação e correção definitiva.

## Sintomas
- Latência p99 acima do SLO acordado (250ms).
- Erros 5xx intermitentes nos serviços downstream.
- Picos de \`wait_event = LWLock\` no PostgreSQL.

## Diagnóstico
1. Coletar \`pg_stat_activity\` e \`pg_stat_statements\`.
2. Avaliar planos de execução com \`EXPLAIN (ANALYZE, BUFFERS)\`.
3. Inspecionar métricas de I/O, locks e replicação.

\`\`\`sql
SELECT pid, state, wait_event_type, wait_event, query
FROM pg_stat_activity
WHERE state <> 'idle'
ORDER BY query_start;
\`\`\`

## Mitigação
- Aumentar pool do PgBouncer temporariamente (\`default_pool_size = 50\`).
- Rotacionar conexões \`idle in transaction\` acima de 5 minutos.

## Correção definitiva
Criar índice parcial para a query problemática e revisar VACUUM autovacuum threshold.

> **Aprendizado:** padronizar timeouts de aplicação evita cascata de falhas.
`;

export const articles: Article[] = [
  { id: "k1", title: "Timeouts intermitentes em PostgreSQL sob carga", summary: "Diagnóstico e mitigação de timeouts causados por contenção de locks e pool saturado.", tags: ["#PostgreSQL", "#Timeout", "#PgBouncer"], body: md("Timeouts intermitentes em PostgreSQL sob carga"), category: "Database", author: "Marco Costa", createdAt: "2026-05-10T10:30:00Z", updatedAt: "2026-06-14T15:22:00Z", views: 234 },
  { id: "k2", title: "Replication lag em cluster Patroni", summary: "Investigação de lag de replicação física e tuning de wal_keep_size.", tags: ["#PostgreSQL", "#Patroni", "#Replication"], body: md("Replication lag em cluster Patroni"), category: "Database", author: "DBA Team", createdAt: "2026-05-08T09:15:00Z", updatedAt: "2026-06-12T11:45:00Z", views: 156 },
  { id: "k3", title: "Pods em CrashLoopBackOff por OOMKilled", summary: "Como dimensionar requests/limits e identificar memory leaks em workloads JVM.", tags: ["#Kubernetes", "#OOMKilled", "#JVM"], body: md("Pods em CrashLoopBackOff por OOMKilled"), category: "Kubernetes", author: "Platform Team", createdAt: "2026-04-22T14:20:00Z", updatedAt: "2026-06-15T08:30:00Z", views: 412 },
  { id: "k4", title: "DNS resolution intermitente em EKS", summary: "Aplicação de NodeLocal DNSCache e ajuste de ndots para reduzir falhas.", tags: ["#EKS", "#DNS", "#Network"], body: md("DNS resolution intermitente em EKS"), category: "Kubernetes", author: "Infrastructure Team", createdAt: "2026-05-01T12:00:00Z", updatedAt: "2026-06-13T16:10:00Z", views: 189 },
  { id: "k5", title: "MTU mismatch em VPC peering", summary: "Identificando fragmentação de pacotes e PMTUD bloqueado por ACLs.", tags: ["#Network", "#AWS", "#MTU"], body: md("MTU mismatch em VPC peering"), category: "Networking", author: "Network Team", createdAt: "2026-04-15T08:45:00Z", updatedAt: "2026-06-10T09:20:00Z", views: 67 },
  { id: "k6", title: "Deadlocks em transações concorrentes", summary: "Padrão para ordenar acessos a múltiplas tabelas e evitar ciclos.", tags: ["#PostgreSQL", "#Deadlock", "#Transactions"], body: md("Deadlocks em transações concorrentes"), category: "Database", author: "Backend Team", createdAt: "2026-05-20T13:30:00Z", updatedAt: "2026-06-14T10:15:00Z", views: 298 },
  { id: "k7", title: "Kafka consumer lag crescente", summary: "Tuning de fetch.min.bytes, partições e estratégias de rebalance.", tags: ["#Kafka", "#Consumer", "#Throughput"], body: md("Kafka consumer lag crescente"), category: "Messaging", author: "Backend Team", createdAt: "2026-05-05T11:00:00Z", updatedAt: "2026-06-11T14:25:00Z", views: 145 },
  { id: "k8", title: "Rotação de certificados TLS sem downtime", summary: "Cert-manager + reload gracioso no ingress-nginx.", tags: ["#TLS", "#cert-manager", "#Ingress"], body: md("Rotação de certificados TLS sem downtime"), category: "Security", author: "Security Team", createdAt: "2026-05-12T09:30:00Z", updatedAt: "2026-06-12T17:45:00Z", views: 223 },
  { id: "k9", title: "Saturação de IOPS em volumes EBS gp3", summary: "Métricas chave e quando migrar para io2 Block Express.", tags: ["#AWS", "#EBS", "#IOPS"], body: md("Saturação de IOPS em volumes EBS gp3"), category: "Infrastructure", author: "Infrastructure Team", createdAt: "2026-04-28T15:20:00Z", updatedAt: "2026-06-13T12:10:00Z", views: 92 },
  { id: "k10", title: "Backup WAL atrasado em pgBackRest", summary: "Diagnóstico de archive_command lento e tuning de paralelismo.", tags: ["#PostgreSQL", "#Backup", "#WAL"], body: md("Backup WAL atrasado em pgBackRest"), category: "Database", author: "DBA Team", createdAt: "2026-05-15T10:45:00Z", updatedAt: "2026-06-14T08:30:00Z", views: 134 },
  { id: "k11", title: "Memory leak em worker Node.js", summary: "Captura de heap snapshots e análise de retainers.", tags: ["#Node.js", "#Memory", "#Profiling"], body: md("Memory leak em worker Node.js"), category: "Application", author: "Backend Team", createdAt: "2026-05-18T14:15:00Z", updatedAt: "2026-06-14T11:50:00Z", views: 267 },
  { id: "k12", title: "Rate limiting com Redis token bucket", summary: "Implementação distribuída resiliente a falhas parciais.", tags: ["#Redis", "#RateLimit", "#Resilience"], body: md("Rate limiting com Redis token bucket"), category: "Application", author: "Backend Team", createdAt: "2026-05-25T11:20:00Z", updatedAt: "2026-06-13T09:35:00Z", views: 178 },
];
