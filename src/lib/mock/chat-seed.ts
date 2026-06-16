import type { ChatMessage } from "../types";

export const initialChat: ChatMessage[] = [
  { id: "m1", role: "assistant", content: "Olá. Sou o DB Copilot. Posso analisar planos de execução, sugerir índices e gerar scripts de rollback. Qual problema você está investigando?" },
  { id: "m2", role: "user", content: "A query de listagem de pedidos em /api/orders está com p99 acima de 1.2s. Pode ajudar?" },
  { id: "m3", role: "assistant", content: "Identifiquei um Seq Scan sobre `orders_v2` (≈ 8.4M linhas) filtrando por `customer_id` + `created_at`. Sugiro um índice composto parcial. Veja a aba **SQL Sugerido** à direita, e o **Explain Plan** comparativo." },
];

export const suggestedPrompts = [
  "Analisar slow query do checkout",
  "Sugerir índice para orders_v2",
  "Por que há contenção de locks em billing?",
  "Gerar rollback do último migration",
];

export const sqlSamples = {
  suggested: `-- Índice composto parcial sugerido
-- Reduz Seq Scan em orders_v2 (~8.4M rows) para Index Scan
CREATE INDEX CONCURRENTLY IF NOT EXISTS
  idx_orders_v2_customer_created
  ON public.orders_v2 (customer_id, created_at DESC)
  WHERE status IN ('paid', 'shipped');

ANALYZE public.orders_v2;`,
  explain: `-- EXPLAIN (ANALYZE, BUFFERS) — após criação do índice
Index Scan using idx_orders_v2_customer_created on orders_v2
  (cost=0.56..184.22 rows=412 width=128)
  (actual time=0.041..2.187 rows=389 loops=1)
  Index Cond: (customer_id = $1)
  Filter: (status = ANY ('{paid,shipped}'::text[]))
  Buffers: shared hit=147

Planning Time:  0.421 ms
Execution Time: 2.318 ms
-- Antes:  Seq Scan, Execution Time: 1287.402 ms`,
  rollback: `-- Rollback seguro do índice em caso de regressão
BEGIN;

DROP INDEX CONCURRENTLY IF EXISTS
  public.idx_orders_v2_customer_created;

-- Restaurar planner cache
DISCARD PLANS;

COMMIT;`,
};
