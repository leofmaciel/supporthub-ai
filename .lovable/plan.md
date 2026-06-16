
## SupportHub Enterprise — Build Plan

A dark-mode, information-dense SPA for SRE / advanced infra & DB support. Built on the existing TanStack Start + shadcn/ui + Tailwind v4 stack. No backend — all data is mocked. Code organized for clean GitHub export.

### Design language

- Dark mode forced on `<html>` (class `dark`) — no theme toggle required.
- Developer palette: deep slate/zinc background, subtle borders, accent in cyan/emerald for "healthy", amber/red for severity, violet for AI actions.
- Tokens defined in `src/styles.css` (`@theme inline`, oklch). No hardcoded colors in components.
- Monospace (`JetBrains Mono` via `<link>` in `__root.tsx`) for code/metrics; Inter for UI.
- Dense layout: compact tables, small badges, tight spacing, sidebar `collapsible="icon"`.

### Routes & file layout

```
src/routes/
  __root.tsx                 # forces dark, loads fonts, SidebarProvider shell
  index.tsx                  # Dashboard
  db-copilot.tsx             # DB Copilot split pane
  knowledge.tsx              # RAG / Docs
  incidents.tsx              # Incidents + Post-Mortem
  automations.tsx            # Automation Center

src/components/
  layout/
    app-sidebar.tsx          # Sidebar with 5 nav items + lucide icons
    app-shell.tsx            # Header (SidebarTrigger, breadcrumb, env badge)
  dashboard/
    metric-card.tsx
    alerts-volume-chart.tsx  # Recharts (bar) – 7 days
    recent-alerts-table.tsx
  db-copilot/
    chat-panel.tsx           # bubbles + multiline textarea
    code-panel.tsx           # Tabs: SQL / Explain Plan / Rollback
    code-block.tsx           # simulated syntax highlighting (token spans)
  knowledge/
    semantic-search-bar.tsx
    file-dropzone.tsx        # drag-and-drop area (no upload, local state)
    article-card.tsx
    article-sheet.tsx        # Sheet w/ react-markdown render
  incidents/
    incidents-data-table.tsx # filter + pagination
    post-mortem-dialog.tsx   # loading spinner → generated report
  automations/
    automation-row.tsx       # Switch + "Disparar Webhook Manual"

src/lib/mock/
  alerts.ts, incidents.ts, articles.ts, automations.ts,
  chat-seed.ts, sql-samples.ts
src/lib/types.ts             # Severity, Incident, Article, Automation, etc.
```

### Route-by-route details

**1. Dashboard (`/`)**
- 3 `MetricCard`s: Incidentes Ativos (12, ▲2), Automações Executadas (348, ▲14%), Consultas Otimizadas Mês (87).
- `AlertsVolumeChart`: Recharts `BarChart`, last 7 days, stacked by severity (critical/warning/info).
- `RecentAlertsTable`: shadcn `Table` with Severity badge (destructive / warning / secondary), Descrição, Serviço, Downtime (e.g. `00:04:12`), Timestamp relativo.

**2. DB Copilot (`/db-copilot`)**
- `ResizablePanelGroup` (horizontal) — left chat, right code.
- Left: scrollable conversation, assistant bubbles with avatar, user bubbles right-aligned, `Textarea` (auto-grow) + Send button. Suggested prompts as chips above input.
- Right: `Tabs` — `SQL Sugerido`, `Explain Plan`, `Script de Rollback`. Each renders `CodeBlock` (pre/code with tokenized spans for keywords/strings/comments — no external highlighter needed).
- Action row: `Copiar Código` (uses `navigator.clipboard`), `Testar em Homologação` (shows toast via `sonner`).

**3. Base de Conhecimento (`/knowledge`)**
- Hero search input with `Search` icon and helper text "Busca semântica (RAG) ativa".
- `FileDropzone` — dashed border, accepts PDF/log/md, lists dropped files in state.
- Grid of `ArticleCard`s (12 mock articles: timeouts Postgres, replication lag, kernel panics, k8s OOMKilled, network MTU, etc.) with title, summary, tag badges.
- Click → `Sheet` (right side) renders article body via `react-markdown` (add dep).

**4. Incidentes & Post-Mortem (`/incidents`)**
- `DataTable` (custom, using shadcn Table) with columns: ID, Título, Severidade, Status, Serviço Afetado, Início, Duração, Ações.
- Filter input + status select + pagination controls (Prev/Next, page X of Y).
- "Gerar Post-Mortem" opens `Dialog` → 2.5s simulated loading (`Loader2` spinner + step text: "Coletando logs… Analisando timeline… Redigindo relatório…") → renders mock post-mortem markdown (Resumo, Timeline, Root Cause, Impacto, Ações Corretivas).

**5. Centro de Automações (`/automations`)**
- List of 8 workflows in `Card`s: Limpar Cache, Resetar Serviço, Triage Automática, Failover Replica, Rotate Secrets, etc.
- Each row: icon, nome, descrição, última execução, `Switch` (enabled), `Button` "Disparar Webhook Manual".
- `// TODO: connect webhook endpoint (e.g. n8n) here` comments in handlers + a constants file `src/lib/automations/webhooks.ts` with placeholder URLs.

### Technical specifics

- Dependencies to add: `recharts`, `react-markdown`.
- shadcn components already present — use Sidebar, Card, Table, Tabs, Sheet, Dialog, Switch, Button, Badge, Input, Textarea, Resizable, Sonner, Tooltip.
- `__root.tsx`: add `className="dark"` to `<html>`, font `<link>`s, wrap `<Outlet />` in `SidebarProvider` + `AppSidebar` + main area with header.
- All data lives in `src/lib/mock/*.ts` as typed arrays so swap-to-API later is trivial.
- Responsive: sidebar collapses on small screens, tables get horizontal scroll, split pane stacks under `lg`. Primary target = desktop ≥1280px.
- `head()` per route with PT-BR title + description.

### Out of scope (not building now)

- Real auth, real DB, real LLM calls, real webhook integration (only TODO markers).
- Light theme toggle.
- Persisted state across reloads.

After approval I'll implement all files in one pass and verify the build.
