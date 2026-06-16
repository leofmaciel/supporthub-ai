export const postMortemTemplate = (incidentId: string, title: string) => `# Post-Mortem ${incidentId}
**Incidente:** ${title}
**Severidade:** Crítica  ·  **Status:** Resolvido
**Autor:** DB Copilot (gerado por IA)  ·  **Revisores:** SRE on-call

## 1. Resumo Executivo
Entre 02:14 e 03:37 UTC, usuários da região EU-WEST-1 enfrentaram falhas intermitentes no fluxo de checkout. A causa raiz foi a exaustão do pool de conexões do PgBouncer combinada com queries não otimizadas em \`orders_v2\`.

## 2. Linha do Tempo (UTC)
- **02:14** — Alerta crítico: \`p99 checkout > 2.5s\`.
- **02:18** — On-call paged via PagerDuty.
- **02:24** — Identificado \`connection limit exceeded\` no PgBouncer.
- **02:31** — Mitigação: \`default_pool_size\` aumentado de 25 para 60.
- **02:48** — Criado índice parcial em \`orders_v2 (customer_id, created_at)\`.
- **03:12** — Latência p99 retorna ao SLO (< 250ms).
- **03:37** — Incidente declarado resolvido após 25min de observação.

## 3. Causa Raiz
Crescimento orgânico da tabela \`orders_v2\` (8.4M linhas) tornou o Seq Scan inviável sob carga de pico. Sem índice apropriado, cada request mantinha conexões ocupadas por > 1.2s, saturando o pool.

## 4. Impacto
- **Usuários afetados:** ~14.200 sessões.
- **Pedidos falhados:** 312 (recuperados em retry).
- **Receita estimada em risco:** € 18.4k (mitigado por retry assíncrono).
- **SLO mensal:** consumiu 38% do error budget de junho.

## 5. O Que Funcionou
- Detecção automática em < 4 min via alertas Prometheus.
- Runbook de tuning do PgBouncer estava atualizado.
- Comunicação no status page foi proativa.

## 6. O Que Pode Melhorar
- Análise de crescimento de tabelas deveria ser semanal, não mensal.
- Faltava índice apesar de query estar entre top-10 do \`pg_stat_statements\`.
- Alerta de pool saturation só disparou após 80% — antecipar para 60%.

## 7. Ações Corretivas
| # | Ação | Responsável | Prazo |
|---|------|-------------|-------|
| 1 | Automação semanal de revisão de \`pg_stat_statements\` | SRE | 7 dias |
| 2 | Alerta de PgBouncer pool > 60% | Observability | 3 dias |
| 3 | Revisão de índices em todas as tabelas > 5M linhas | DBA | 14 dias |
| 4 | Adicionar circuit breaker em checkout-service | Backend | 21 dias |
`;
