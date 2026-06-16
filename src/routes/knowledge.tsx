import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileDropzone } from "@/components/knowledge/file-dropzone";
import { ArticleCard } from "@/components/knowledge/article-card";
import { ArticleSheet } from "@/components/knowledge/article-sheet";
import { articles } from "@/lib/mock/articles";
import type { Article } from "@/lib/types";

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Base de Conhecimento · SupportHub Enterprise" },
      { name: "description", content: "Busca semântica (RAG) em runbooks, postmortems e documentação técnica." },
    ],
  }),
  component: KnowledgePage,
});

function KnowledgePage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Article | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <AppShell
      title="Base de Conhecimento"
      subtitle="Busca semântica sobre runbooks, postmortems e documentação"
    >
      <div className="space-y-6 p-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca semântica · ex: 'replication lag em Patroni' ou 'timeout PgBouncer'"
            className="h-14 rounded-xl border-border/60 bg-card/60 pl-12 pr-32 text-base"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Badge variant="outline" className="gap-1.5 border-violet-500/40 bg-violet-500/10 text-violet-300">
              <Sparkles className="h-3 w-3" /> RAG ativo
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-semibold tracking-tight">
                {filtered.length} artigo{filtered.length !== 1 && "s"}
              </h2>
              <p className="text-xs text-muted-foreground">
                Ranqueado por relevância semântica · embeddings · text-embedding-3-large
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
              {filtered.map((a) => (
                <ArticleCard
                  key={a.id}
                  article={a}
                  onOpen={() => {
                    setActive(a);
                    setOpen(true);
                  }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold tracking-tight">Ingestão de documentos</h2>
            <FileDropzone />
          </div>
        </div>
      </div>

      <ArticleSheet article={active} open={open} onOpenChange={setOpen} />
    </AppShell>
  );
}
