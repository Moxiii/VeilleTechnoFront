import { useMemo, useState } from "react";
import { RessourcesInterface } from "@interfaces/RessourcesInterface";

export type FilterKey = "technology" | "type" | "label";

export interface FilterLevel {
  key: FilterKey;
  value: string | number;
  label: string;
}

export default function useRessourceFilter(ressources: RessourcesInterface[]) {
  const [filterPath, setFilterPath] = useState<FilterLevel[]>([]);

  const filteredRessources = useMemo(() => {
    return ressources.filter((ressource) =>
      filterPath.every((filter) => {
        switch (filter.key) {
          case "technology":
            return ressource.technology.id === filter.value;

          case "type":
            return ressource.type === filter.value;

          case "label":
            return ressource.label === filter.value;

          default:
            return true;
        }
      }),
    );
  }, [ressources, filterPath]);

  const availableFilters = useMemo(() => {
    const filters = new Map<string, FilterLevel>();

    filteredRessources.forEach((ressource) => {
      filters.set(`technology-${ressource.technology.id}`, {
        key: "technology",
        value: ressource.technology.id,
        label: ressource.technology.name,
      });

      if (ressource.type) {
        filters.set(`type-${ressource.type}`, {
          key: "type",
          value: ressource.type,
          label: ressource.type,
        });
      }

      if (ressource.label) {
        filters.set(`label-${ressource.label}`, {
          key: "label",
          value: ressource.label,
          label: ressource.label,
        });
      }
    });

    return Array.from(filters.values());
  }, [filteredRessources]);

  const selectFilter = (filter: FilterLevel) => {
    setFilterPath((currentPath) => [...currentPath, filter]);
  };

  const removeFilter = (index: number) => {
    setFilterPath((currentPath) => currentPath.slice(0, index));
  };

  const resetFilters = () => {
    setFilterPath([]);
  };

  return {
    filterPath,
    filteredRessources,
    availableFilters,
    selectFilter,
    removeFilter,
    resetFilters,
  };
}
