import {create} from "zustand";
import type {TechnologyInterface} from '@interfaces/TechnologyInterface';
import {createTechnology,deleteTechnology,updateTechnology} from '@fetch/technologyFetch';

type TechnologyStore = {
    technology: TechnologyInterface[];
    setTechnology: (techList: TechnologyInterface[]) => void;
    addTechnology: (technology: TechnologyInterface) => Promise<void>;
    removeTechnology: (technlogyId:number) => Promise<void>;
    updateTechnologyById: (technlogyId:number, technology: TechnologyInterface) => Promise<void>;
}
export const useTechnologyStore = create<TechnologyStore>((set, get) => ({
    technology: [],

    setTechnology: (techList) => set({ technology: techList }),

    addTechnology: async (tech) => {
        const res = await createTechnology(tech);
        if (res?.name) {
            const formatted: TechnologyInterface = {
                id: res.id,
                name: res.name,
                category: res.category || "",
                ressources: res.ressources || [],
            };
            set({ technology: [...get().technology, formatted] });
        }
    },

    removeTechnology: async (technologyId) => {
        const res = await deleteTechnology(technologyId);
        if (res.ok) {
            set({
                technology: get().technology.filter((t) => t.id !== technologyId),
            });
        }
    },

    updateTechnologyById: async (technologyId, updatedTech) => {
        const res = await updateTechnology(technologyId, updatedTech);
        if (res?.name) {
            set({
                technology: get().technology.map((t) =>
                    t.id === technologyId
                        ? {
                            ...t,
                            name: res.name,
                            category: res.category || "",
                            ressources: res.ressources || [],
                        }
                        : t
                ),
            });
        }
    },
}));