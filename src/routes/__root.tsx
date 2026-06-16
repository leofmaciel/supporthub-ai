import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">Rota não encontrada.</p>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">Algo deu errado</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SupportHub Enterprise" },
      { name: "description", content: "Plataforma de SRE e suporte técnico avançado de infraestrutura e banco de dados." },
      { property: "og:title", content: "SupportHub Enterprise" },
      { property: "og:description", content: "Plataforma de SRE e suporte técnico avançado de infraestrutura e banco de dados." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "SupportHub Enterprise" },
      { name: "twitter:description", content: "Plataforma de SRE e suporte técnico avançado de infraestrutura e banco de dados." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/212c0f45-cc8b-437c-865b-ef915e590169/id-preview-6661a963--f3615d7e-63ca-4454-a0a8-a27f59dbadd7.lovable.app-1781634786210.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/212c0f45-cc8b-437c-865b-ef915e590169/id-preview-6661a963--f3615d7e-63ca-4454-a0a8-a27f59dbadd7.lovable.app-1781634786210.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <div className="flex min-h-svh w-full bg-background text-foreground">
          <AppSidebar />
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
        <Toaster theme="dark" position="bottom-right" />
      </SidebarProvider>
    </QueryClientProvider>
  );
}
