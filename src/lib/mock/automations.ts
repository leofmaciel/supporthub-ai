import type { Automation } from "../types";

// TODO: Substituir webhookUrl pelos endpoints reais (ex: n8n, Zapier, Rundeck)
// Ex: https://n8n.internal.company.com/webhook/<id>
export const automations: Automation[] = [
  { id: "auto-1", name: "Limpar Cache de Aplicação", description: "Invalida cache Redis e CDN para o serviço selecionado.", icon: "Eraser", enabled: true, lastRun: "há 12 min", webhookUrl: "https://n8n.internal/webhook/clear-cache" },
  { id: "auto-2", name: "Resetar Serviço (rolling restart)", description: "Executa rollout restart no deployment alvo em EKS.", icon: "RefreshCw", enabled: true, lastRun: "há 2 h", webhookUrl: "https://n8n.internal/webhook/rolling-restart" },
  { id: "auto-3", name: "Triage Automática de Incidentes", description: "Classifica alertas do PagerDuty e enriquece com runbooks.", icon: "Workflow", enabled: true, lastRun: "há 4 min", webhookUrl: "https://n8n.internal/webhook/triage" },
  { id: "auto-4", name: "Failover de Réplica PostgreSQL", description: "Promove standby via Patroni após validações de saúde.", icon: "DatabaseZap", enabled: false, lastRun: "há 3 dias", webhookUrl: "https://n8n.internal/webhook/pg-failover" },
  { id: "auto-5", name: "Rotacionar Secrets Vault", description: "Gera novas credenciais e força reload nos consumidores.", icon: "KeyRound", enabled: true, lastRun: "ontem", webhookUrl: "https://n8n.internal/webhook/rotate-secrets" },
  { id: "auto-6", name: "Coletar Diagnóstico de Pod", description: "Captura logs, heap dump e métricas para análise post-mortem.", icon: "Stethoscope", enabled: true, lastRun: "há 27 min", webhookUrl: "https://n8n.internal/webhook/pod-diagnostics" },
  { id: "auto-7", name: "Escalonar Capacidade EKS", description: "Aumenta nós do cluster baseado em pressão de CPU/memória.", icon: "TrendingUp", enabled: false, lastRun: "há 5 dias", webhookUrl: "https://n8n.internal/webhook/scale-eks" },
  { id: "auto-8", name: "Snapshot Manual de RDS", description: "Cria snapshot rotulado antes de janela de manutenção.", icon: "Camera", enabled: true, lastRun: "há 1 dia", webhookUrl: "https://n8n.internal/webhook/rds-snapshot" },
];
