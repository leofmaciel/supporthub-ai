import { useState, useMemo } from "react";
import type { DashboardFilters } from "@/lib/types";

interface UseFiltersOptions<T> {
  data: T[];
  filterFn: (items: T[], filters: DashboardFilters) => T[];
}

export function useFilters<T>({ data, filterFn }: UseFiltersOptions<T>) {
  const [filters, setFilters] = useState<DashboardFilters>({});

  const filtered = useMemo(() => filterFn(data, filters), [data, filters, filterFn]);

  const updateFilter = <K extends keyof DashboardFilters>(key: K, value: DashboardFilters[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => setFilters({});

  return {
    filters,
    filtered,
    updateFilter,
    clearFilters,
    hasFilters: Object.keys(filters).length > 0,
  };
}
