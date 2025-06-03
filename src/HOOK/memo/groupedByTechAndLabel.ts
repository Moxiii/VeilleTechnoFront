import {useMemo } from "react";
import {RessourcesInterface} from "@interfaces/RessourcesInterface";

export default function useGroupedRessources(ressources) {
    return  useMemo(() => {
        const map = new Map<string, Map<string, RessourcesInterface[]>>();

        ressources.forEach((res) => {
            const tech = res.technology.name;
            const label = res.label;

            if (!map.has(tech)) map.set(tech, new Map());
            const labelMap = map.get(tech);

            if (!labelMap.has(label)) labelMap.set(label, []);
            labelMap.get(label).push(res);
        });

        return map;
    }, [ressources]);
}