import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles, TrendingUp, Clock } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/knowledge/file-dropzone";
import { ArticleCard } from "@/components/knowledge/article-card";
import { ArticleSheet } from "@/components/knowledge/article-sheet";
import { articles } from "@/lib/mock/articles";
import { searchArticles } from "@/lib/utils";
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
  const [sortBy, setSortBy] = useState<"relevance" | "recent" | "views">("relevance");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const categories = Array.from(new Set(articles.map((a) => a.category)));

  const filtered = useMemo(() => {
    let result = query ? searchArticles(articles, query) : articles;

    if (categoryFilter) {
      result = result.filter((a) => a.category === categoryFilter);
    }

    // Ordenar
    if (sortBy === "recent") {
      result = [...result].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    } else if (sortBy === "views") {
      result = [...result].sort((a, b) => b.views - a.views);
    }

    return result;
  }, [query, sortBy, categoryFilter]);

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

        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Categories */}
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={categoryFilter === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
            >
              {cat}
            </Button>
          ))}

          {/* Sort */}
          <div className="ml-auto flex gap-1">
            <Button
              variant={sortBy === "relevance" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("relevance")}
              className="gap-1"
            >
              <Sparkles className="h-3.5 w-3.5" /> Relevância
            </Button>
            <Button
              variant={sortBy === "recent" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("recent")}
              className="gap-1"
            >
              <Clock className="h-3.5 w-3.5" /> Recente
            </Button>
            <Button
              variant={sortBy === "views" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("views")}
              className="gap-1"
            >
              <TrendingUp className="h-3.5 w-3.5" /> Popular
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-semibold tracking-tight">
                {filtered.length} artigo{filtered.length !== 1 && "s"}
              </h2>
              <p className="text-xs text-muted-foreground">
                Ranqueado por {sortBy === "recent" ? "data" : sortBy === "views" ? "visualizações" : "relevância semântica"}
              </p>
            </div>
            {filtered.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border/60 p-12 text-center">
                <p className="text-muted-foreground">Nenhum artigo encontrado</p>
              </div>
            ) : (
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
            )}
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
