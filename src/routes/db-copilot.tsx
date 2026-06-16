import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/layout/app-shell";
import { ChatPanel } from "@/components/db-copilot/chat-panel";
import { CodePanel } from "@/components/db-copilot/code-panel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const Route = createFileRoute("/db-copilot")({
  head: () => ({
    meta: [
      { title: "DB Copilot · SupportHub Enterprise" },
      { name: "description", content: "Assistente de IA para análise, otimização e rollback de queries SQL." },
    ],
  }),
  component: DbCopilotPage,
});

function DbCopilotPage() {
  return (
    <AppShell
      title="DB Copilot"
      subtitle="Assistente de IA para análise, tuning e rollback de queries"
    >
      <div className="h-[calc(100svh-3.5rem)]">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={42} minSize={30}>
            <ChatPanel />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={58} minSize={35}>
            <CodePanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </AppShell>
  );
}
