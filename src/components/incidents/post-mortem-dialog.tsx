import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2, FileBarChart } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { postMortemTemplate } from "@/lib/mock/post-mortem";
import type { Incident } from "@/lib/types";

const steps = [
  "Coletando logs de aplicação e métricas…",
  "Correlacionando alertas e traces…",
  "Analisando timeline e blast radius…",
  "Redigindo relatório…",
];

export function PostMortemDialog({
  incident,
  open,
  onOpenChange,
}: {
  incident: Incident | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [stepIdx, setStepIdx] = useState(0);
  const [done, setDone] = useState(false);

  function start() {
    setDone(false);
    setStepIdx(0);
    const id = setInterval(() => {
      setStepIdx((i) => {
        if (i + 1 >= steps.length) {
          clearInterval(id);
          setTimeout(() => setDone(true), 400);
          return i;
        }
        return i + 1;
      });
    }, 650);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (o) start();
      }}
    >
      <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileBarChart className="h-5 w-5 text-violet-300" />
            Gerar Post-Mortem · {incident?.id}
          </DialogTitle>
          <DialogDescription>
            Análise automatizada baseada em logs, métricas e timeline correlacionada.
          </DialogDescription>
        </DialogHeader>

        {!done ? (
          <div className="space-y-3 py-8">
            <div className="flex items-center gap-3 rounded-md border border-violet-500/30 bg-violet-500/5 px-4 py-3">
              <Loader2 className="h-5 w-5 animate-spin text-violet-300" />
              <div>
                <p className="text-sm font-medium">{steps[stepIdx]}</p>
                <p className="text-xs text-muted-foreground">
                  Passo {stepIdx + 1} de {steps.length}
                </p>
              </div>
            </div>
            <ul className="space-y-1.5 text-xs">
              {steps.map((s, i) => (
                <li
                  key={s}
                  className={
                    i < stepIdx
                      ? "text-emerald-400"
                      : i === stepIdx
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }
                >
                  {i < stepIdx ? "✓" : i === stepIdx ? "›" : "·"} {s}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <article className="prose prose-sm prose-invert mt-2 max-w-none prose-headings:tracking-tight prose-code:font-mono">
            <ReactMarkdown>
              {incident ? postMortemTemplate(incident.id, incident.title) : ""}
            </ReactMarkdown>
            <div className="not-prose flex justify-end gap-2 pt-4">
              <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                Fechar
              </Button>
              <Button size="sm">Publicar no Confluence</Button>
            </div>
          </article>
        )}
      </DialogContent>
    </Dialog>
  );
}
