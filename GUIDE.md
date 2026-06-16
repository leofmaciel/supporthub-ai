# 📖 Guia Prático - Como Usar as Novas Funcionalidades

## 🚀 Quick Start

### 1. Usar Filtros em Uma Página

**Passo 1: Importar hook e função de filtro**
```typescript
import { useFilters } from "@/hooks/use-filters";
import { filterIncidents } from "@/lib/utils";
import { incidents } from "@/lib/mock/incidents";
```

**Passo 2: Inicializar hook**
```typescript
const { filters, filtered, updateFilter, clearFilters, hasFilters } = useFilters({
  data: incidents,
  filterFn: filterIncidents,
});
```

**Passo 3: Usar no template**
```tsx
return (
  <>
    <DashboardFiltersUI
      filters={filters}
      onFilterChange={updateFilter}
      onClear={clearFilters}
      onExport={handleExport}
      hasFilters={hasFilters}
      itemCount={filtered.length}
    />
    
    {/* Usar 'filtered' em vez de 'data' */}
    {filtered.map(item => <ItemCard key={item.id} item={item} />)}
  </>
);
```

---

## 📊 Exemplo Completo: Filtrar Alertas

```typescript
// src/routes/alerts.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useFilters } from "@/hooks/use-filters";
import { DashboardFiltersUI } from "@/components/dashboard/dashboard-filters";
import { filterAlerts, exportToCSV } from "@/lib/utils";
import { recentAlerts } from "@/lib/mock/alerts";

export const Route = createFileRoute("/alerts")({
  component: AlertsPage,
});

function AlertsPage() {
  const { filters, filtered, updateFilter, clearFilters, hasFilters } = useFilters({
    data: recentAlerts,
    filterFn: filterAlerts,
  });

  const handleExport = (format: "csv" | "json") => {
    if (format === "csv") {
      exportToCSV(filtered, "alerts");
    }
  };

  return (
    <div className="space-y-4 p-6">
      <DashboardFiltersUI
        filters={filters}
        onFilterChange={updateFilter}
        onClear={clearFilters}
        onExport={handleExport}
        hasFilters={hasFilters}
        itemCount={filtered.length}
      />

      <div className="grid gap-3">
        {filtered.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}
```

---

## 💾 Exemplo: Histórico em localStorage

```typescript
// Automático no DB Copilot
const [messages, setMessages] = useState<ChatMessage[]>([]);

// Carregar ao montar
useEffect(() => {
  const saved = localStorage.getItem("db-copilot-history");
  if (saved) {
    setMessages(JSON.parse(saved));
  }
}, []);

// Salvar ao atualizar
useEffect(() => {
  if (messages.length > 0) {
    localStorage.setItem("db-copilot-history", JSON.stringify(messages));
  }
}, [messages]);

// Limpar
const clearHistory = () => {
  localStorage.removeItem("db-copilot-history");
  setMessages([]);
};
```

---

## 📈 Exemplo: Calcular Métricas

```typescript
import { calculateMetrics } from "@/lib/utils";
import { incidents } from "@/lib/mock/incidents";

const metrics = calculateMetrics(incidents);

console.log(`Total: ${metrics.total}`);           // 12
console.log(`Críticos: ${metrics.critical}`);     // 3
console.log(`Taxa: ${metrics.resolvedRate}%`);    // 66.7%
console.log(`MTTR: ${metrics.mttr}`);             // "2h 15m"
```

---

## 🔄 Exemplo: Múltiplos Filtros

```typescript
// Filtrar por severidade AND status
updateFilter("severity", ["critical", "warning"]);
updateFilter("status", ["open", "investigating"]);

// Resultado: apenas critical/warning E open/investigating
// Depois adicionar busca
updateFilter("searchQuery", "postgres");

// Resultado: tudo acima + que contém "postgres"
```

---

## 📋 Exemplo: Criar Novo Tipo de Filtro

**1. Adicionar ao interface DashboardFilters**
```typescript
export interface DashboardFilters {
  // ... existing
  assignee?: string;  // ✨ NEW
}
```

**2. Criar função de filtro**
```typescript
export function filterByAssignee(items: Incident[], assignee?: string) {
  if (!assignee) return items;
  return items.filter(i => i.assignee === assignee);
}
```

**3. Atualizar função combinada**
```typescript
export function filterIncidents(incidents: Incident[], filters: DashboardFilters) {
  return incidents
    .filter(i => !filters.severity || filters.severity.includes(i.severity))
    .filter(i => !filters.status || filters.status.includes(i.status))
    .filter(i => !filters.assignee || i.assignee === filters.assignee);
}
```

**4. Usar no componente**
```tsx
<Input
  placeholder="Filtrar por assignee..."
  value={filters.assignee || ""}
  onChange={(e) => updateFilter("assignee", e.target.value || undefined)}
/>
```

---

## 🎯 Exemplo: Adicionar Status Badge

```typescript
import { Badge } from "@/components/ui/badge";

// Map de estilos
const statusStyles: Record<IncidentStatus, string> = {
  open: "border-rose-500/40 bg-rose-500/10 text-rose-300",
  investigating: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  mitigated: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  resolved: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  "on-hold": "border-slate-500/40 bg-slate-500/10 text-slate-300",
};

// Uso
<Badge variant="outline" className={statusStyles[incident.status]}>
  {statusLabel[incident.status]}
</Badge>
```

---

## 🔐 Exemplo: Preparar para Autenticação

```typescript
// Futura integração de roles
export type UserRole = "admin" | "engineer" | "viewer";

function canViewSensitiveData(user: User): boolean {
  return user.role === "admin" || user.role === "engineer";
}

function canEditAutomation(user: User): boolean {
  return user.role === "admin";
}

// Usar em componentes
{canEditAutomation(user) && (
  <Button onClick={() => updateAutomation(id)}>Editar</Button>
)}
```

---

## 📤 Exemplo: Exportar Dados

**CSV:**
```typescript
import { exportToCSV } from "@/lib/utils";

exportToCSV(filteredIncidents, "incidents-report");
// Gera arquivo: incidents-report.csv
// Com todas as colunas das estruturas
```

**JSON:**
```typescript
import { exportToJSON } from "@/lib/utils";

exportToJSON(filteredIncidents, "incidents-report");
// Gera arquivo: incidents-report.json
// Formato: [ { id, title, ... }, ... ]
```

---

## ⏱️ Exemplo: Formatar Durações

```typescript
import { formatDuration, formatDate, formatPercent } from "@/lib/utils";

console.log(formatDuration(1000));           // "1s"
console.log(formatDuration(60000));          // "1m"
console.log(formatDuration(3661000));        // "1m 1s"
console.log(formatDuration(7380000));        // "2h 3m"

console.log(formatDate("2026-06-16T10:30:00Z"));
// "16 de jun de 2026, 10:30"

console.log(formatPercent(0.856));           // "85.6%"
console.log(formatPercent(0.856, 0));        // "86%"
```

---

## 🎨 Exemplo: Cor por Severidade

```typescript
import { getSeverityColor } from "@/lib/utils";

const color = getSeverityColor("critical");  // "danger"
const color = getSeverityColor("warning");   // "warning"
const color = getSeverityColor("info");      // "primary"
const color = getSeverityColor("low");       // "success"

// Usar em MetricCard
<MetricCard
  icon={AlertOctagon}
  accent={getSeverityColor(incident.severity)}
/>
```

---

## 🔄 Exemplo: Integração com API

**De:** (mock)
```typescript
import { incidents } from "@/lib/mock/incidents";
const [data] = useState(incidents);
```

**Para:** (API real)
```typescript
import { useQuery } from "@tanstack/react-query";

const { data, isLoading } = useQuery({
  queryKey: ["incidents"],
  queryFn: async () => {
    const res = await fetch("/api/incidents");
    return res.json();
  },
  staleTime: 1000 * 60 * 5,  // 5 min
});

const { filters, filtered, updateFilter } = useFilters({
  data: data || [],
  filterFn: filterIncidents,
});
```

---

## ✅ Checklist de Implementação

Para adicionar novas funcionalidades:

- [ ] Adicionar tipos em `src/lib/types.ts`
- [ ] Criar função de filtro em `src/lib/utils.ts`
- [ ] Criar hook customizado se necessário
- [ ] Implementar em página/componente
- [ ] Testar com dados mock
- [ ] Substituir mock por API
- [ ] Adicionar testes unitários
- [ ] Documentar uso
- [ ] Code review
- [ ] Deploy

---

## 🆘 Troubleshooting

### Filtros não funcionam
```typescript
// Verificar se função filterFn está correta
const { filters, filtered } = useFilters({
  data: incidents,
  filterFn: filterIncidents,  // ✅ certo
  // filterFn: (d) => d     // ❌ errado
});
```

### Histórico não persiste
```typescript
// Verificar localStorage
localStorage.setItem("key", JSON.stringify(data));  // ✅ deve ser string
localStorage.setItem("key", data);                  // ❌ vai falhar
```

### Formatação de data errada
```typescript
// Usar ISO-8601
new Date("2026-06-16T10:30:00Z");  // ✅ funciona
new Date("16/06/2026");             // ❌ ambíguo
```

---

## 📚 Referências Rápidas

| Função | Arquivo | Use quando |
|--------|---------|-----------|
| `filterIncidents()` | `utils.ts` | Precisa filtrar incidentes |
| `filterAlerts()` | `utils.ts` | Precisa filtrar alertas |
| `searchArticles()` | `utils.ts` | Precisa buscar artigos |
| `exportToCSV()` | `utils.ts` | Usuário quer baixar CSV |
| `calculateMetrics()` | `utils.ts` | Precisa de MTTR/taxa resolução |
| `formatDuration()` | `utils.ts` | Mostrar tempo (ms → string) |
| `useFilters()` | `hooks/use-filters.tsx` | Qualquer página com filtros |
| `DashboardFiltersUI` | `components/dashboard/dashboard-filters.tsx` | Mostrar UI de filtros |

---

**Dúvidas?** Veja os exemplos reais em:
- `/src/routes/incidents.tsx` - Implementação completa
- `/src/routes/automations.tsx` - Com métricas
- `/src/routes/knowledge.tsx` - Com ordenação
- `/src/routes/index.tsx` - Com dashboard

---

**Última atualização**: 16 de junho de 2026
