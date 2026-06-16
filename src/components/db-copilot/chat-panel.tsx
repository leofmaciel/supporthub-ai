import { useEffect, useRef, useState } from "react";
import { Bot, Send, User, Trash2, Copy } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { initialChat, suggestedPrompts } from "@/lib/mock/chat-seed";
import type { ChatMessage } from "@/lib/types";
import { formatDate, formatDuration } from "@/lib/utils";

const STORAGE_KEY = "db-copilot-history";

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Carregar histórico do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch {
        setMessages(initialChat);
      }
    } else {
      setMessages(initialChat);
    }
  }, []);

  // Salvar histórico
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function send(text: string) {
    const t = text.trim();
    if (!t || isLoading) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: t,
      timestamp: new Date().toISOString(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simular resposta com análise de query
    setTimeout(() => {
      const executionTime = Math.random() * 5000 + 100;
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Analisado. Identifiquei um N+1 query na sua aplicação. Atualizei o painel à direita com a sugestão otimizada usando JOIN, o plano de execução antes/depois e o impacto estimado. Recomendo testar em staging primeiro.",
          timestamp: new Date().toISOString(),
          executionTime,
        },
      ]);
      setIsLoading(false);
    }, 700);
  }

  const clearHistory = () => {
    if (confirm("Tem certeza? Isso vai limpar todo o histórico.")) {
      localStorage.removeItem(STORAGE_KEY);
      setMessages(initialChat);
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/30">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">DB Copilot</p>
            <p className="text-[11px] text-muted-foreground">
              conectado a <span className="font-mono">postgres-orders-prod</span>
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          className="h-8 w-8"
          title="Limpar histórico"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-auto px-4 py-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn("flex items-start gap-3", m.role === "user" && "flex-row-reverse")}
          >
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-md ring-1",
                m.role === "assistant"
                  ? "bg-violet-500/15 text-violet-300 ring-violet-500/30"
                  : "bg-sky-500/15 text-sky-300 ring-sky-500/30",
              )}
            >
              {m.role === "assistant" ? (
                <Bot className="h-3.5 w-3.5" />
              ) : (
                <User className="h-3.5 w-3.5" />
              )}
            </div>
            <div className="flex-1">
              <div
                className={cn(
                  "max-w-[80%] rounded-lg border px-3 py-2 text-sm leading-relaxed",
                  m.role === "assistant"
                    ? "border-border/60 bg-card/60"
                    : "border-sky-500/30 bg-sky-500/10",
                )}
              >
                <p>{m.content}</p>
                {m.timestamp && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(m.timestamp)}
                    {m.executionTime && ` • ${formatDuration(m.executionTime)}`}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyMessage(m.content)}
                className="mt-1 h-6 w-6"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-violet-500/15 flex items-center justify-center">
              <Bot className="h-3.5 w-3.5 text-violet-300 animate-pulse" />
            </div>
            <div className="text-sm text-muted-foreground animate-pulse">
              Analisando...
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border/60 px-4 py-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {suggestedPrompts.map((p) => (
            <button
              key={p}
              onClick={() => send(p)}
              disabled={isLoading}
              className="rounded-full border border-border/60 bg-muted/30 px-2.5 py-1 text-[11px] text-muted-foreground transition hover:border-violet-500/40 hover:text-foreground disabled:opacity-50"
            >
              {p}
            </button>
          ))}
        </div>
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            disabled={isLoading}
            placeholder="Descreva o sintoma, cole uma query ou pergunte algo… (Enter envia, Shift+Enter quebra linha)"
            className="min-h-[88px] resize-none border-border/60 bg-muted/20 pr-12 font-mono text-xs disabled:opacity-50"
          />
          <Button
            size="icon"
            onClick={() => send(input)}
            disabled={isLoading}
            className="absolute bottom-2 right-2 h-8 w-8"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
