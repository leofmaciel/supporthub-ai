import { cn } from "@/lib/utils";

const KEYWORDS = new Set([
  "SELECT","FROM","WHERE","INDEX","CREATE","DROP","BEGIN","COMMIT","ROLLBACK",
  "ON","AND","OR","NOT","IN","IS","NULL","TRUE","FALSE","INSERT","INTO","VALUES",
  "UPDATE","SET","DELETE","JOIN","LEFT","RIGHT","INNER","OUTER","GROUP","BY",
  "ORDER","LIMIT","OFFSET","CONCURRENTLY","IF","EXISTS","ANALYZE","EXPLAIN",
  "PUBLIC","DISCARD","PLANS","USING","WITH","RETURNING","AS","DESC","ASC",
  "ANY","CASE","WHEN","THEN","ELSE","END",
]);

function tokenize(line: string, lineIdx: number) {
  // very small tokenizer; comments, strings, keywords, numbers
  const tokens: Array<{ t: string; c?: string }> = [];
  const commentIdx = line.indexOf("--");
  let code = line;
  let comment = "";
  if (commentIdx >= 0) {
    code = line.slice(0, commentIdx);
    comment = line.slice(commentIdx);
  }
  const re = /('[^']*')|([A-Za-z_][A-Za-z0-9_]*)|(\d+\.?\d*)|(\s+)|([^A-Za-z0-9_'\s])/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) {
    const [tok] = m;
    if (m[1]) tokens.push({ t: tok, c: "text-emerald-300" });
    else if (m[2]) {
      const upper = tok.toUpperCase();
      if (KEYWORDS.has(upper)) tokens.push({ t: tok, c: "text-violet-300 font-semibold" });
      else tokens.push({ t: tok, c: "text-slate-200" });
    } else if (m[3]) tokens.push({ t: tok, c: "text-amber-300" });
    else tokens.push({ t: tok });
  }
  if (comment) tokens.push({ t: comment, c: "text-slate-500 italic" });
  return (
    <div key={lineIdx} className="flex">
      <span className="mr-4 w-8 shrink-0 select-none text-right text-slate-600">{lineIdx + 1}</span>
      <span className="flex-1 whitespace-pre">
        {tokens.map((t, i) => (
          <span key={i} className={t.c}>{t.t}</span>
        ))}
      </span>
    </div>
  );
}

export function CodeBlock({ code, className }: { code: string; className?: string }) {
  const lines = code.split("\n");
  return (
    <pre
      className={cn(
        "overflow-auto rounded-md border border-border/60 bg-[#0b0d12] p-4 text-xs leading-6",
        className,
      )}
    >
      <code className="font-mono">{lines.map((l, i) => tokenize(l, i))}</code>
    </pre>
  );
}
