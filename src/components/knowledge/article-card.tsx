import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Article } from "@/lib/types";
import { FileText } from "lucide-react";

export function ArticleCard({ article, onOpen }: { article: Article; onOpen: () => void }) {
  return (
    <Card
      onClick={onOpen}
      className="group cursor-pointer border-border/60 bg-card/60 transition hover:border-violet-500/40 hover:bg-card"
    >
      <CardContent className="space-y-3 p-4">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/20">
            <FileText className="h-3.5 w-3.5" />
          </div>
          <h3 className="text-sm font-semibold leading-tight group-hover:text-foreground">
            {article.title}
          </h3>
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">{article.summary}</p>
        <div className="flex flex-wrap gap-1">
          {article.tags.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="border-border/60 bg-muted/30 font-mono text-[10px] text-muted-foreground"
            >
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
