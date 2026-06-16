import { useState } from "react";
import { toast } from "sonner";
import { Check, Copy, FlaskConical, Sparkles } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "./code-block";
import { sqlSamples } from "@/lib/mock/chat-seed";

type Tab = "suggested" | "explain" | "rollback";

export function CodePanel() {
  const [tab, setTab] = useState<Tab>("suggested");
  const [copied, setCopied] = useState(false);

  const code =
    tab === "suggested"
      ? sqlSamples.suggested
      : tab === "explain"
      ? sqlSamples.explain
      : sqlSamples.rollback;

  function onCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    toast.success("Código copiado para a área de transferência");
  }

  function onTest() {
    toast.message("Executando em homologação…", {
      description: "Job enviado para staging-runner-eu. Acompanhe no painel de jobs.",
    });
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-violet-300" />
          <p className="text-sm font-semibold">Sugestão da IA</p>
          <Badge variant="outline" className="border-violet-500/40 bg-violet-500/10 text-[10px] text-violet-300">
            gpt-4o · 0.7s
          </Badge>
        </div>
        <div className="text-[11px] text-muted-foreground">
          schema: <span className="font-mono">public.orders_v2</span>
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)} className="flex flex-1 flex-col">
        <div className="border-b border-border/60 px-4 pt-3">
          <TabsList className="bg-muted/30">
            <TabsTrigger value="suggested">SQL Sugerido</TabsTrigger>
            <TabsTrigger value="explain">Explain Plan</TabsTrigger>
            <TabsTrigger value="rollback">Script de Rollback</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <TabsContent value="suggested" className="m-0 h-full">
            <CodeBlock code={sqlSamples.suggested} className="h-full" />
          </TabsContent>
          <TabsContent value="explain" className="m-0 h-full">
            <CodeBlock code={sqlSamples.explain} className="h-full" />
          </TabsContent>
          <TabsContent value="rollback" className="m-0 h-full">
            <CodeBlock code={sqlSamples.rollback} className="h-full" />
          </TabsContent>
        </div>
      </Tabs>

      <div className="flex items-center justify-end gap-2 border-t border-border/60 px-4 py-3">
        <Button variant="outline" size="sm" onClick={onCopy} className="gap-1.5">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copiado" : "Copiar Código"}
        </Button>
        <Button size="sm" onClick={onTest} className="gap-1.5">
          <FlaskConical className="h-3.5 w-3.5" />
          Testar em Homologação
        </Button>
      </div>
    </div>
  );
}
