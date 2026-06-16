export type Severity = "critical" | "warning" | "info";
export type IncidentStatus = "open" | "investigating" | "mitigated" | "resolved";

export interface Alert {
  id: string;
  severity: Severity;
  description: string;
  service: string;
  downtime: string;
  timestamp: string;
}

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  status: IncidentStatus;
  service: string;
  startedAt: string;
  duration: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  body: string;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  lastRun: string;
  webhookUrl: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}
