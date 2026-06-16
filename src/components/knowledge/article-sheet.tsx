import ReactMarkdown from "react-markdown";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/types";

export function ArticleSheet({
  article,
  open,
  onOpenChange,
}: {
  article: Article | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
        {article ? (
          <>
            <SheetHeader>
              <SheetTitle className="text-lg">{article.title}</SheetTitle>
              <SheetDescription>{article.summary}</SheetDescription>
              <div className="flex flex-wrap gap-1 pt-2">
                {article.tags.map((t) => (
                  <Badge key={t} variant="outline" className="border-border/60 bg-muted/30 font-mono text-[10px]">
                    {t}
                  </Badge>
                ))}
              </div>
            </SheetHeader>
            <article className="prose prose-sm prose-invert mt-6 max-w-none px-1 prose-headings:tracking-tight prose-code:font-mono prose-pre:border prose-pre:border-border/60 prose-pre:bg-[#0b0d12]">
              <ReactMarkdown>{article.body}</ReactMarkdown>
            </article>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
