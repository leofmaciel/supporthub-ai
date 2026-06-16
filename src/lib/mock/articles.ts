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
  { id: "k1", title: "Timeouts intermitentes em PostgreSQL sob carga", summary: "Diagnóstico e mitigação de timeouts causados por contenção de locks e pool saturado.", tags: ["#PostgreSQL", "#Timeout", "#PgBouncer"], body: md("Timeouts intermitentes em PostgreSQL sob carga") },
  { id: "k2", title: "Replication lag em cluster Patroni", summary: "Investigação de lag de replicação física e tuning de wal_keep_size.", tags: ["#PostgreSQL", "#Patroni", "#Replication"], body: md("Replication lag em cluster Patroni") },
  { id: "k3", title: "Pods em CrashLoopBackOff por OOMKilled", summary: "Como dimensionar requests/limits e identificar memory leaks em workloads JVM.", tags: ["#Kubernetes", "#OOMKilled", "#JVM"], body: md("Pods em CrashLoopBackOff por OOMKilled") },
  { id: "k4", title: "DNS resolution intermitente em EKS", summary: "Aplicação de NodeLocal DNSCache e ajuste de ndots para reduzir falhas.", tags: ["#EKS", "#DNS", "#Network"], body: md("DNS resolution intermitente em EKS") },
  { id: "k5", title: "MTU mismatch em VPC peering", summary: "Identificando fragmentação de pacotes e PMTUD bloqueado por ACLs.", tags: ["#Network", "#AWS", "#MTU"], body: md("MTU mismatch em VPC peering") },
  { id: "k6", title: "Deadlocks em transações concorrentes", summary: "Padrão para ordenar acessos a múltiplas tabelas e evitar ciclos.", tags: ["#PostgreSQL", "#Deadlock", "#Transactions"], body: md("Deadlocks em transações concorrentes") },
  { id: "k7", title: "Kafka consumer lag crescente", summary: "Tuning de fetch.min.bytes, partições e estratégias de rebalance.", tags: ["#Kafka", "#Consumer", "#Throughput"], body: md("Kafka consumer lag crescente") },
  { id: "k8", title: "Rotação de certificados TLS sem downtime", summary: "Cert-manager + reload gracioso no ingress-nginx.", tags: ["#TLS", "#cert-manager", "#Ingress"], body: md("Rotação de certificados TLS sem downtime") },
  { id: "k9", title: "Saturação de IOPS em volumes EBS gp3", summary: "Métricas chave e quando migrar para io2 Block Express.", tags: ["#AWS", "#EBS", "#IOPS"], body: md("Saturação de IOPS em volumes EBS gp3") },
  { id: "k10", title: "Backup WAL atrasado em pgBackRest", summary: "Diagnóstico de archive_command lento e tuning de paralelismo.", tags: ["#PostgreSQL", "#Backup", "#WAL"], body: md("Backup WAL atrasado em pgBackRest") },
  { id: "k11", title: "Memory leak em worker Node.js", summary: "Captura de heap snapshots e análise de retainers.", tags: ["#Node.js", "#Memory", "#Profiling"], body: md("Memory leak em worker Node.js") },
  { id: "k12", title: "Rate limiting com Redis token bucket", summary: "Implementação distribuída resiliente a falhas parciais.", tags: ["#Redis", "#RateLimit", "#Resilience"], body: md("Rate limiting com Redis token bucket") },
];
