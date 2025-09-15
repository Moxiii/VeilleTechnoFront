import {create} from "zustand";
import type {TechnologyInterface} from '@interfaces/TechnologyInterface';
import {createTechnology,deleteTechnology,updateTechnology , getAlltechnology} from '@fetch/technologyFetch';
type TechnologyStore = {
    technology: TechnologyInterface[];
    addTechnology: (technology: TechnologyInterface) => Promise<void>;
    removeTechnology: (technlogyId:number) => Promise<void>;
    updateTechnologyById: (technlogyId:number, technology: TechnologyInterface) => Promise<void>;
    loadUserTechnology: () => Promise<void>;
    loaded:boolean;
}
export const useTechnologyStore = create<TechnologyStore>((set, get) => ({
    loaded:false,
    technology: [],
    loadUserTechnology : async () => {
        try{
            if (get().loaded) return;
            const userTechnology = await getAlltechnology();
            set({technology: userTechnology , loaded:true});
        } catch (error) {
            console.error("Failed to load user technology", error);
        }
    },
    addTechnology: async (tech) => {
        const res = await createTechnology(tech);
        if (res.id) {
            const formatted: TechnologyInterface = {
                id: res.id,
                name: res.name,
                category: res.category || "",
                ressources: res.ressources || [],
                createdAt : res.createdAt || "",
            };
            set({ technology: [...get().technology, formatted] });
        }
    },

    removeTechnology: async (technologyId) => {
        const res = await deleteTechnology(technologyId);
        if (res.ok) {
            set({
                technology: get().technology.filter((t) => t.id !== technologyId),
            })
        }
    },

    updateTechnologyById: async (technologyId, updatedTech) => {
        const res = await updateTechnology(technologyId, updatedTech);
        if (res.id) {
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