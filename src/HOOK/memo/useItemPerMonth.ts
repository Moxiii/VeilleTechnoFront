import {useMemo} from "react"
export function useItemsPerMonth<T extends { createdAt: string }>(items: T[], monthsCount = 12) {
    return useMemo(() => {
        const counts: Record<string, number> = {};

        const now = new Date();
        for (let i = monthsCount; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const label = date.toLocaleString("default", { month: "short" });
            counts[label] = 0;
        }

        items.forEach((item) => {
            const date = new Date(item.createdAt);
            const label = date.toLocaleString("default", { month: "short" });
            if (counts[label] !== undefined) {
                counts[label]++;
            }
        });

        return {
            labels: Object.keys(counts),
            data: Object.values(counts),
        };
    }, [items, monthsCount]);
}