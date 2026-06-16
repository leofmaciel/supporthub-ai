import { useCallback, useState, type DragEvent } from "react";
import { CloudUpload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DroppedFile {
  name: string;
  size: number;
}

export function FileDropzone() {
  const [hover, setHover] = useState(false);
  const [files, setFiles] = useState<DroppedFile[]>([
    { name: "runbook-postgres-failover.pdf", size: 482_120 },
    { name: "incident-2041-app.log", size: 1_247_882 },
  ]);

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHover(false);
    const dropped = Array.from(e.dataTransfer.files).map((f) => ({
      name: f.name,
      size: f.size,
    }));
    setFiles((f) => [...dropped, ...f]);
  }, []);

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setHover(true);
        }}
        onDragLeave={() => setHover(false)}
        onDrop={onDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-8 text-center transition",
          hover
            ? "border-violet-500/60 bg-violet-500/5"
            : "border-border/70 bg-muted/20 hover:bg-muted/30",
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/30">
          <CloudUpload className="h-5 w-5" />
        </div>
        <p className="text-sm font-medium">Arraste arquivos para ingestão RAG</p>
        <p className="text-xs text-muted-foreground">
          PDFs, logs, manuais, runbooks · até 50MB por arquivo
        </p>
      </div>

      {files.length > 0 && (
        <ul className="divide-y divide-border/40 overflow-hidden rounded-lg border border-border/60 bg-card/40">
          {files.map((f, i) => (
            <li key={i} className="flex items-center gap-3 px-3 py-2 text-xs">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 truncate font-mono">{f.name}</span>
              <span className="text-muted-foreground">{(f.size / 1024).toFixed(0)} KB</span>
              <button
                onClick={() => setFiles((curr) => curr.filter((_, j) => j !== i))}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
