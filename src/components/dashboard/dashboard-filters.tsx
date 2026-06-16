import { useState } from "react";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { DashboardFilters, Severity, IncidentStatus } from "@/lib/types";
import { exportToCSV, exportToJSON } from "@/lib/utils";

interface DashboardFiltersUIProps {
  filters: DashboardFilters;
  onFilterChange: (key: keyof DashboardFilters, value: any) => void;
  onClear: () => void;
  onExport: (format: "csv" | "json", data: any[]) => void;
  hasFilters: boolean;
  itemCount?: number;
}

const SEVERITY_OPTIONS: Severity[] = ["critical", "warning", "info", "low"];
const STATUS_OPTIONS: IncidentStatus[] = ["open", "investigating", "mitigated", "resolved", "on-hold"];

export function DashboardFiltersUI({
  filters,
  onFilterChange,
  onClear,
  onExport,
  hasFilters,
  itemCount = 0,
}: DashboardFiltersUIProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Search */}
      <Input
        placeholder="Buscar..."
        value={filters.searchQuery || ""}
        onChange={(e) => onFilterChange("searchQuery", e.target.value || undefined)}
        className="w-48"
      />

      {/* Severity filter */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Severidade
            {filters.severity && filters.severity.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {filters.severity.length}
              </Badge>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filtrar por Severidade</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {SEVERITY_OPTIONS.map((sev) => (
              <div key={sev} className="flex items-center space-x-2">
                <Checkbox
                  id={`sev-${sev}`}
                  checked={filters.severity?.includes(sev) ?? false}
                  onCheckedChange={(checked) => {
                    const current = filters.severity || [];
                    const updated = checked
                      ? [...current, sev]
                      : current.filter((s) => s !== sev);
                    onFilterChange("severity", updated.length > 0 ? updated : undefined);
                  }}
                />
                <Label htmlFor={`sev-${sev}`} className="capitalize cursor-pointer">
                  {sev}
                </Label>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Status filter */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Status
            {filters.status && filters.status.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {filters.status.length}
              </Badge>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filtrar por Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {STATUS_OPTIONS.map((sta) => (
              <div key={sta} className="flex items-center space-x-2">
                <Checkbox
                  id={`sta-${sta}`}
                  checked={filters.status?.includes(sta) ?? false}
                  onCheckedChange={(checked) => {
                    const current = filters.status || [];
                    const updated = checked
                      ? [...current, sta]
                      : current.filter((s) => s !== sta);
                    onFilterChange("status", updated.length > 0 ? updated : undefined);
                  }}
                />
                <Label htmlFor={`sta-${sta}`} className="capitalize cursor-pointer">
                  {sta}
                </Label>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Service filter */}
      <Input
        placeholder="Serviço"
        value={filters.service?.[0] || ""}
        onChange={(e) =>
          onFilterChange("service", e.target.value ? [e.target.value] : undefined)
        }
        className="w-40"
      />

      {/* Export */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onExport("csv", [])}>
            Exportar como CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport("json", [])}>
            Exportar como JSON
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear filters */}
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onClear}>
          <X className="h-4 w-4 mr-1" />
          Limpar
        </Button>
      )}

      {/* Results count */}
      {itemCount > 0 && (
        <span className="text-xs text-muted-foreground ml-auto">{itemCount} resultados</span>
      )}
    </div>
  );
}
