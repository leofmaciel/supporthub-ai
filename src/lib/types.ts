export type Severity = "critical" | "warning" | "info" | "low";
export type IncidentStatus = "open" | "investigating" | "mitigated" | "resolved" | "on-hold";
export type AutomationStatus = "running" | "success" | "failed" | "pending" | "paused";
export type UserRole = "admin" | "engineer" | "viewer";

export interface Alert {
  id: string;
  severity: Severity;
  description: string;
  service: string;
  downtime: string;
  timestamp: string;
  resolvedAt?: string;
  assignee?: string;
  tags?: string[];
}

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  status: IncidentStatus;
  service: string;
  startedAt: string;
  resolvedAt?: string;
  duration: string;
  assignee?: string;
  postMortemUrl?: string;
  tags?: string[];
  impactedUsers?: number;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  body: string;
  category: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  lastRun: string;
  lastStatus?: AutomationStatus;
  webhookUrl: string;
  frequency?: string;
  executionTime?: number;
  totalRuns?: number;
  successRate?: number;
}

export interface AutomationRun {
  id: string;
  automationId: string;
  status: AutomationStatus;
  startedAt: string;
  completedAt?: string;
  logs: string;
  error?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
  executedQuery?: string;
  executionTime?: number;
}

export interface DashboardFilters {
  severity?: Severity[];
  status?: IncidentStatus[];
  service?: string[];
  dateRange?: { from: string; to: string };
  searchQuery?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}
