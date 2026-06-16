# 🎨 Layouts Visuais - SupportHub v2.1.0

## Dashboard Principal

```
╔════════════════════════════════════════════════════════════════════╗
║ 📊 SupportHub · Visão Geral                                        ║
║ Saúde da plataforma, alertas e atividade do time SRE              ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ║
║  │ Incidentes      │  │ Alertas         │  │ MTTR Médio      │  ║
║  │ Ativos          │  │ Críticos        │  │                 │  ║
║  │                 │  │                 │  │                 │  ║
║  │      8          │  │      3          │  │    2h 15m       │  ║
║  └─────────────────┘  └─────────────────┘  └─────────────────┘  ║
║                                                                    ║
║  [Buscar...] [Severidade ✓] [Status ✓] [Serviço]                 ║
║                       [Exportar ▼] [Limpar] · 24 resultados      ║
║                                                                    ║
║  ┌──────────────────────────────┐  ┌─────────────────────────┐   ║
║  │ Volumetria de Alertas        │  │ SLO Mensal              │   ║
║  │ (gráfico com série temporal) │  │ checkout-service: 62%   │   ║
║  │                              │  │ orders-api:      78%    │   ║
║  │ [████████░░] Seg: 27         │  │ billing-worker:  91%    │   ║
║  │ [████████░░] Ter: 23         │  │ search-api:      34%    │   ║
║  │ [████████░░] Qua: 28         │  │                         │   ║
║  │ [████████░░] Qui: 22         │  │                         │   ║
║  │ [████████░░] Sex: 34         │  │                         │   ║
║  │ [████████░░] Sáb: 9          │  │                         │   ║
║  │ [████████░░] Dom: 12         │  │                         │   ║
║  └──────────────────────────────┘  └─────────────────────────┘   ║
║                                                                    ║
║  ┌────────────────────────────────────────────────────────────┐   ║
║  │ Alertas Recentes · 8 eventos                               │   ║
║  ├────────────────────────────────────────────────────────────┤   ║
║  │ ⚠️  CRÍTICO · postgres-cluster · Replication lag > 30s    │   ║
║  │     00:04:12 · há 3 min                                   │   ║
║  │ ⚠️  CRÍTICO · pgbouncer-edge · Connection pool exhausted  │   ║
║  │     00:02:48 · há 8 min                                   │   ║
║  │ ⚠️  AVISO · api-gateway-eu · CPU sustained > 85%          │   ║
║  │     — · há 14 min                                         │   ║
║  │ 🔵 INFO · checkout-service · Deploy v2.41.0 concluído   │   ║
║  │     — · há 37 min                                         │   ║
║  └────────────────────────────────────────────────────────────┘   ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## Incidents com Filtros e Métricas

```
╔════════════════════════════════════════════════════════════════════╗
║ 🚨 Gestão de Incidentes                                             ║
║ Histórico, filtros e geração assistida de post-mortems             ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  ║
║  │   Total    │  │ Críticos   │  │Taxa Resol  │  │   MTTR     │  ║
║  │     12     │  │     3      │  │   66.7%    │  │   2h 45m   │  ║
║  └────────────┘  └────────────┘  └────────────┘  └────────────┘  ║
║                                                                    ║
║  [Buscar...] [Severidade ✓] [Status ✓] [Serviço...]              ║
║                       [Exportar ▼] [Limpar] · 12 resultados      ║
║                                                                    ║
║  ┌────────────────────────────────────────────────────────────┐   ║
║  │ ID    │ Título                      │ Sev   │ Status      │   ║
║  ├────────────────────────────────────────────────────────────┤   ║
║  │ INC-  │ Database connection pool    │ 🔴   │ RESOLVIDO   │   ║
║  │ 2041  │ exhausted                   │      │ 01h 23m     │   ║
║  │───────┼─────────────────────────────┼──────┼─────────────│   ║
║  │ INC-  │ API timeout on checkout     │ 🔴   │ INVESTIGANDO│   ║
║  │ 2040  │ service                     │      │ 04h 15m     │   ║
║  │───────┼─────────────────────────────┼──────┼─────────────│   ║
║  │ INC-  │ Cache layer memory pressure │ 🟡   │ MITIGADO    │   ║
║  │ 2039  │                             │      │ 00h 47m     │   ║
║  │───────┼─────────────────────────────┼──────┼─────────────│   ║
║  │ INC-  │ SSL certificate expiring    │ 🟡   │ ABERTO      │   ║
║  │ 2038  │ soon                        │      │ 2d          │   ║
║  │───────┼─────────────────────────────┼──────┼─────────────│   ║
║  │ ...                                                        │   ║
║  └────────────────────────────────────────────────────────────┘   ║
║                 [◄] Página 1 de 2 [►]                             ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## DB Copilot com Histórico

```
╔════════════════════════════════════════════════════════════════════╗
║ 💜 DB Copilot                                        [🗑️ Limpar]   ║
║ conectado a postgres-orders-prod                                   ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  👤 SELECT p.*, count(*) FROM pg_stat_activity                   ║
║     WHERE state <> 'idle' GROUP BY pid;                          ║
║                                                                    ║
║  💜 Analisado. Índice sugerido em `pg_stat_activity(state)`.     ║
║     Plano de execução otimizado pode ganhar 312ms.               ║
║     Recomendo testar em staging primeiro.                        ║
║     10:30 · 1.2s [📋]                                            ║
║                                                                    ║
║  👤 Qual é a replication lag agora?                              ║
║                                                                    ║
║  💜 Consultando... ⏳                                              ║
║                                                                    ║
║  ┌────────────────────────────────────────────────────────────┐   ║
║  │ [Sugestões rápidas]                                        │   ║
║  │ · "Qual é o plano de execução?"                            │   ║
║  │ · "Qual index está usando?"                                │   ║
║  │ · "Replication status"                                     │   ║
║  └────────────────────────────────────────────────────────────┘   ║
║                                                                    ║
║  ┌────────────────────────────────────────────────────────────┐   ║
║  │ Digita a pergunta... (Shift+Enter para quebra de linha)   │   ║
║  │                                        [Enviar 📤]         │   ║
║  └────────────────────────────────────────────────────────────┘   ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## Automações com Estatísticas

```
╔════════════════════════════════════════════════════════════════════╗
║ ⚙️  Centro de Automações                                            ║
║ Workflows operacionais, toggles e disparo manual de webhooks       ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ┌────────────┐  ┌────────────┐  ┌────────────┐                  ║
║  │   Total    │  │   Ativos   │  │Tx Sucesso  │                  ║
║  │     8      │  │     6      │  │   96.1%    │                  ║
║  └────────────┘  └────────────┘  └────────────┘                  ║
║                                                                    ║
║  ┌────────────────────────────────────────────────────────────┐   ║
║  │ 🗑️  Limpar Cache de Aplicação          [●] [Disparar]      │   ║
║  │     Invalida cache Redis e CDN                             │   ║
║  │     Taxa: 98% ▓▓▓▓▓▓▓▓▓░ | 245 runs | 12m ago             │   ║
║  ├────────────────────────────────────────────────────────────┤   ║
║  │ 🔄 Resetar Serviço (rolling restart)   [●] [Disparar]      │   ║
║  │     Executa rollout restart no deployment alvo            │   ║
║  │     Taxa: 99% ▓▓▓▓▓▓▓▓▓░ | 156 runs | 2h ago              │   ║
║  ├────────────────────────────────────────────────────────────┤   ║
║  │ ⚙️  Triage Automática de Incidentes    [●] [Disparar]      │   ║
║  │     Classifica alertas do PagerDuty                        │   ║
║  │     Taxa: 97% ▓▓▓▓▓▓▓▓░░ | 1890 runs | 4m ago             │   ║
║  ├────────────────────────────────────────────────────────────┤   ║
║  │ 🗝️  Rotacionar Secrets Vault          [○] [Disparar]      │   ║
║  │     Gera novas credenciais e força reload                 │   ║
║  │     Taxa: 95% ▓▓▓▓▓▓▓▓░░ | 52 runs | ontem · 3m          │   ║
║  ├────────────────────────────────────────────────────────────┤   ║
║  │ 📷 Coletar Diagnóstico de Pod         [●] [Disparar]      │   ║
║  │     Captura logs, heap dump e métricas                    │   ║
║  │     Taxa: 96% ▓▓▓▓▓▓▓▓░░ | 432 runs | 27m ago             │   ║
║  ├────────────────────────────────────────────────────────────┤   ║
║  │ ...                                                         │   ║
║  └────────────────────────────────────────────────────────────┘   ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## Knowledge Base com Filtros e Busca

```
╔════════════════════════════════════════════════════════════════════╗
║ 📚 Base de Conhecimento                                             ║
║ Busca semântica sobre runbooks, postmortems e documentação         ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ┌──────────────────────────────────────────────────────────────┐ ║
║  │ 🔍 Busca semântica · "timeout PgBouncer"      [RAG ativo ✨] │ ║
║  └──────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
║  [Database] [Kubernetes] [Messaging] [Performance] [Security]    ║
║  [Network] [Application] [Infrastructure] [Operations]            ║
║                      [Relevância ✓] [Recente] [Popular]          ║
║                                                                    ║
║  12 artigos · Ranqueado por relevância semântica                  ║
║                                                                    ║
║  ┌──────────────────────┐  ┌──────────────────────┐              ║
║  │📄 Timeouts           │  │📄 Replication lag    │              ║
║  │intermitentes em PG   │  │em cluster Patroni    │              ║
║  │                      │  │                      │              ║
║  │"Diagnóstico e..."    │  │"Investigação de lag  │              ║
║  │                      │  │e tuning de..."       │              ║
║  │234 views · By Marco  │  │156 views · By DBA    │              ║
║  │#PostgreSQL #Timeout  │  │#PostgreSQL #Patroni  │              ║
║  └──────────────────────┘  └──────────────────────┘              ║
║                                                                    ║
║  ┌──────────────────────┐  ┌──────────────────────┐              ║
║  │📄 Pods em            │  │📄 DNS resolution     │              ║
║  │CrashLoopBackOff      │  │intermitente em EKS   │              ║
║  │                      │  │                      │              ║
║  │"Como dimensionar...  │  │"Aplicação de Node... │              ║
║  │requests/limits"      │  │e ajuste de ndots"    │              ║
║  │                      │  │                      │              ║
║  │412 views · By Plat   │  │189 views · By Infra  │              ║
║  │#Kubernetes #OOMKil   │  │#EKS #DNS #Network    │              ║
║  └──────────────────────┘  └──────────────────────┘              ║
║  ...                                                              ║
║                                                                    ║
║  ┌──────────────────────┐                                         ║
║  │ 📁 Ingestão de       │                                         ║
║  │    documentos        │                                         ║
║  │                      │                                         ║
║  │ [Arraste arquivos ou │                                         ║
║  │  clique para upload] │                                         ║
║  └──────────────────────┘                                         ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## Componente Reutilizável: DashboardFiltersUI

```
╔════════════════════════════════════════════════════════════════════╗
║ Interface de Filtros (Reutilizável em qualquer página)           ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ┌──────────────────────────────────────────────────────────────┐ ║
║  │ Buscar...                                                    │ ║
║  └──────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
║  ┌───────────┐ ┌───────────┐ ┌──────────────┐ ┌───────────────┐ ║
║  │Severidade ✓│ │ Status ✓  │ │ Serviço     │ │ Exportar ▼    │ ║
║  │ (filtros) │ │ (filtros) │ │ (search)    │ │ CSV / JSON    │ ║
║  └───────────┘ └───────────┘ └──────────────┘ └───────────────┘ ║
║                                                                    ║
║  ┌───────────┐                                  24 resultados     ║
║  │ Limpar    │                                                    ║
║  └───────────┘                                                    ║
║                                                                    ║
║  Modal de Severidade:       │  Modal de Status:                  ║
║  ├─ Critical         [✓]    │  ├─ Aberto         [✓]            ║
║  ├─ Warning          [✓]    │  ├─ Investigando   [ ]            ║
║  ├─ Info             [ ]    │  ├─ Mitigado       [✓]            ║
║  └─ Low              [ ]    │  └─ Resolvido      [ ]            ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## Fluxo de Filtros

```
                    ┌─────────────────┐
                    │  Dados Brutos   │
                    │  (incidents[])  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  useFilters()   │
                    │   hook          │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
    ┌─────▼─────┐      ┌─────▼─────┐    ┌─────▼─────┐
    │ Severidade│      │  Status   │    │ Service   │
    │ Filter    │      │  Filter   │    │  Filter   │
    └─────┬─────┘      └─────┬─────┘    └─────┬─────┘
          │                  │                │
          └──────────────────┼────────────────┘
                             │
                    ┌────────▼────────┐
                    │ Search Query    │
                    │ (contains())    │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Dados Filtrados│
                    │  (displayed)    │
                    └─────────────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
        ┌─────▼─────┐            ┌─────────▼─┐
        │  Exportar │            │ Paginação │
        │ CSV / JSON│            │ 10 items  │
        └───────────┘            └───────────┘
```

---

## Estrutura de Dados - Incident

```typescript
┌─────────────────────────────────────────┐
│ INC-2041                                │
├─────────────────────────────────────────┤
│ title: "Indisponibilidade parcial..."  │
│ severity: "critical"                   │ ◄─── filtro
│ status: "resolved"                     │ ◄─── filtro
│ service: "checkout-service"            │ ◄─── filtro
│ startedAt: "2026-06-14T02:14:00Z"      │ ◄─── timestamp
│ resolvedAt: "2026-06-14T03:37:00Z"     │ ◄─── NEW
│ duration: "01h 23m"                    │
│ assignee: "Carlos Silva"               │ ◄─── NEW
│ impactedUsers: 1250                    │ ◄─── NEW
│ tags: ["checkout", "eu-west-1"]        │ ◄─── NEW
│ postMortemUrl: "..."                   │ ◄─── NEW
└─────────────────────────────────────────┘
```

---

## Performance Timeline

```
Antes:                  Depois:
─────────────────────────────────────
Filtrar dados: 30s  →   Filtrar: 2s
Exportar: 60s       →   Export: 5s
Encontrar runbook: 5m → Search: 10s
Ver histórico: ✗   →   Histórico: ✓
Métricas: manuals → Métricas: auto
```

---

**Última atualização**: 16 de junho de 2026
