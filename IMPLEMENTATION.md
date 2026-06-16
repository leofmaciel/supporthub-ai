# 🔨 Guia de Implementação - SupportHub v2.1.0

## Arquitetura de Filtros

### Hook `useFilters()`

```typescript
// src/hooks/use-filters.tsx
interface UseFiltersOptions<T> {
  data: T[];
  filterFn: (items: T[], filters: DashboardFilters) => T[];
}

const { filters, filtered, updateFilter, clearFilters, hasFilters } = useFilters({
  data: incidents,
  filterFn: filterIncidents,
});
```

**Exemplo de Uso:**
```tsx
// Em qualquer página
const { filters, filtered, updateFilter, clearFilters, hasFilters } = useFilters({
  data: alerts,
  filterFn: filterAlerts,
});

// Atualizar filtro
updateFilter("severity", ["critical", "warning"]);

// Limpar
clearFilters();
```

---

## Interface de Filtros `DashboardFilters`

```typescript
export interface DashboardFilters {
  severity?: Severity[];           // ["critical", "warning"]
  status?: IncidentStatus[];        // ["open", "investigating"]
  service?: string[];              // ["postgres-cluster"]
  dateRange?: { from: string; to: string };
  searchQuery?: string;             // "timeout"
}
```

---

## Funções de Filtro & Busca

### Filtrar Alertas
```typescript
const filtered = filterAlerts(recentAlerts, {
  severity: ["critical"],
  searchQuery: "postgres",
});
```

### Filtrar Incidentes
```typescript
const filtered = filterIncidents(incidents, {
  status: ["open", "investigating"],
  severity: ["critical"],
});
```

### Buscar Artigos
```typescript
const results = searchArticles(articles, "timeout");
// Procura em: title, body, tags
```

---

## Exportação de Dados

### CSV Export
```typescript
import { exportToCSV } from "@/lib/utils";

exportToCSV(filteredAlerts, "alerts-export");
// Gera: alerts-export.csv
```

### JSON Export
```typescript
import { exportToJSON } from "@/lib/utils";

exportToJSON(filteredIncidents, "incidents-export");
// Gera: incidents-export.json
```

---

## Cálculo de Métricas

```typescript
import { calculateMetrics } from "@/lib/utils";

const metrics = calculateMetrics(incidents);
// Retorna:
// {
//   total: 12,
//   critical: 3,
//   resolved: 8,
//   resolvedRate: 0.67,
//   avgResolutionTime: 2700000, // ms
//   mttr: "45m"
// }
```

---

## Novo Sistema de Tipos

### Automação com Histórico
```typescript
export interface Automation {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  lastRun: string;
  lastStatus?: AutomationStatus;      // ✨ NEW
  webhookUrl: string;
  frequency?: string;                 // ✨ NEW "every 5 min"
  executionTime?: number;             // ✨ NEW ms
  totalRuns?: number;                 // ✨ NEW
  successRate?: number;               // ✨ NEW 0-1
}

export interface AutomationRun {      // ✨ NEW
  id: string;
  automationId: string;
  status: AutomationStatus;
  startedAt: string;
  completedAt?: string;
  logs: string;
  error?: string;
}
```

### Usuário com RBAC
```typescript
export interface User {               // ✨ NEW
  id: string;
  name: string;
  email: string;
  role: UserRole;                     // "admin" | "engineer" | "viewer"
  avatar?: string;
  createdAt: string;
}
```

---

## Componente `DashboardFiltersUI`

```tsx
import { DashboardFiltersUI } from "@/components/dashboard/dashboard-filters";

<DashboardFiltersUI
  filters={filters}
  onFilterChange={updateFilter}
  onClear={clearFilters}
  onExport={(format, data) => handleExport(format)}
  hasFilters={hasFilters}
  itemCount={filtered.length}
/>
```

**Features:**
- ✅ Campo de busca por texto
- ✅ Dropdown de severidade com multi-select
- ✅ Dropdown de status com multi-select
- ✅ Campo de filtro por serviço
- ✅ Menu de exportação (CSV/JSON)
- ✅ Botão de limpar filtros
- ✅ Contador de resultados

---

## DB Copilot - Histórico Persistente

### localStorage Schema
```typescript
// Chave: "db-copilot-history"
// Valor: Array<ChatMessage>
[
  {
    id: "uuid",
    role: "user",
    content: "SELECT ...",
    timestamp: "2026-06-16T10:30:00Z",
    executedQuery: "SELECT ...",
    executionTime: 1234  // ms
  },
  {
    id: "uuid",
    role: "assistant",
    content: "Análise: ...",
    timestamp: "2026-06-16T10:30:01Z",
    executionTime: 500
  }
]
```

### Implementação
```typescript
// Carregar histórico
const saved = localStorage.getItem("db-copilot-history");
if (saved) setMessages(JSON.parse(saved));

// Salvar histórico
useEffect(() => {
  if (messages.length > 0) {
    localStorage.setItem("db-copilot-history", JSON.stringify(messages));
  }
}, [messages]);
```

---

## Métricas de Incidents

### Estrutura de Dados Enriquecida
```typescript
export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  status: IncidentStatus;
  service: string;
  startedAt: string;           // ISO-8601
  resolvedAt?: string;         // ✨ NEW
  duration: string;
  assignee?: string;           // ✨ NEW
  postMortemUrl?: string;      // ✨ NEW
  tags?: string[];             // ✨ NEW
  impactedUsers?: number;      // ✨ NEW
}
```

### Exemplo com Dados Reais
```typescript
{
  id: "INC-2041",
  title: "Indisponibilidade parcial do checkout",
  severity: "critical",
  status: "resolved",
  service: "checkout-service",
  startedAt: "2026-06-14T02:14:00Z",
  resolvedAt: "2026-06-14T03:37:00Z",
  duration: "01h 23m",
  assignee: "Carlos Silva",
  impactedUsers: 1250,
  tags: ["checkout", "eu-west-1"]
}
```

---

## Knowledge Base - Categorização

### 9 Categorias Implementadas
1. **Database** - PostgreSQL, MySQL, replication, optimization
2. **Kubernetes** - EKS, pods, deployments, networking
3. **Messaging** - Kafka, RabbitMQ, queues
4. **Infrastructure** - AWS, networking, storage
5. **Security** - SSL, certificates, secrets
6. **Application** - Node.js, memory leaks, profiling
7. **Networking** - DNS, routing, connectivity
8. **Performance** - Tuning, benchmarking
9. **Operations** - Runbooks, procedures

### Busca Semântica
```typescript
const results = searchArticles(articles, "memory leak");
// Procura em:
// - a.title.toLowerCase()
// - a.body.toLowerCase()
// - a.tags.some(t => t.toLowerCase())
```

---

## Automações - Taxa de Sucesso

### Cálculo
```typescript
successRate = (successfulRuns / totalRuns) * 100
// Exemplo: 49/50 = 0.98 = 98%
```

### Status Workflow
```typescript
export type AutomationStatus = 
  | "running"   // Executando agora
  | "success"   // Completou com sucesso
  | "failed"    // Falhou (erro ou timeout)
  | "pending"   // Aguardando execução
  | "paused"    // Desabilitada/pausa
```

---

## Performance

### Otimizações Implementadas
- ✅ Filtros client-side (sem chamadas API)
- ✅ useMemo para recálculos
- ✅ localStorage para histórico (sem sync server)
- ✅ Paginação (10 items/page em incidents)
- ✅ Lazy loading de componentes

### Futuro (React Query)
```typescript
// Preparado para integração
const { data, isLoading } = useQuery({
  queryKey: ["incidents"],
  queryFn: fetchIncidents,
  staleTime: 1000 * 60 * 5, // 5 min
});
```

---

## Testes Sugeridos

### Unit Tests (Utilitários)
```typescript
describe("filterAlerts", () => {
  it("deve filtrar por severidade crítica", () => {
    const result = filterAlerts(alerts, { severity: ["critical"] });
    expect(result.every(a => a.severity === "critical")).toBe(true);
  });
});
```

### Component Tests
```typescript
describe("DashboardFiltersUI", () => {
  it("deve atualizar filtro ao clicar em severidade", async () => {
    render(<DashboardFiltersUI {...props} />);
    const button = screen.getByText("Severidade");
    await userEvent.click(button);
    expect(props.onFilterChange).toHaveBeenCalled();
  });
});
```

### E2E Tests
```typescript
describe("Dashboard com Filtros", () => {
  it("deve exportar dados como CSV", async () => {
    await page.click('button:has-text("Exportar")');
    await page.click('text=Exportar como CSV');
    const downloadPath = await page.waitForEvent("download");
    expect(downloadPath.suggestedFilename()).toMatch(/\.csv$/);
  });
});
```

---

## Integração com APIs Reais

### Exemplo: Conectar Incidents com Backend
```typescript
// Futuro: substituir mock por API
// import { incidents } from "@/lib/mock/incidents";
// por:
// const { data: incidents } = useQuery({
//   queryKey: ["incidents"],
//   queryFn: async () => {
//     const res = await fetch("/api/incidents");
//     return res.json();
//   }
// });
```

---

## Próximas Tarefas

**Para Implementar:**
1. [ ] Autenticação com JWT
2. [ ] RBAC (Role-Based Access Control)
3. [ ] WebSockets para notificações
4. [ ] Integração PagerDuty
5. [ ] Integração Datadog
6. [ ] React Query para data fetching
7. [ ] Unit tests (vitest)
8. [ ] E2E tests (Playwright)
9. [ ] CI/CD pipeline
10. [ ] Error tracking (Sentry)

---

## Contato & Suporte

**Dúvidas sobre implementação:**
- Consulte os arquivos da fonte em `src/`
- Veja exemplos em `src/routes/`
- Tipos documentados em `src/lib/types.ts`

**Stack Atual:**
- Frontend: React 18, TanStack Router, Shadcn/ui
- Styling: Tailwind CSS
- Tooling: Vite, ESLint, Prettier

---

**Última atualização**: 16 de junho de 2026
