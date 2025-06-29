import {create} from "zustand";
import type {TechnologyInterface} from '@interfaces/TechnologyInterface';
import {createTechnology,deleteTechnology,updateTechnology} from '@fetch/technologyFetch';
import {getCatName} from "@fetch/CategoryFetch";
import {getAlltechnology} from "@fetch/technologyFetch";
type TechnologyStore = {
    technology: TechnologyInterface[];
    addTechnology: (technology: TechnologyInterface) => Promise<void>;
    removeTechnology: (technlogyId:number) => Promise<void>;
    updateTechnologyById: (technlogyId:number, technology: TechnologyInterface) => Promise<void>;
    category:string[];
    getCategory:()=>Promise<void>;
    loadUserTechnology: () => Promise<void>;
}
export const useTechnologyStore = create<TechnologyStore>((set, get) => ({
    technology: [],


    addTechnology: async (tech) => {
        const res = await createTechnology(tech);
        if (res.ok) {
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
    category:[],
    getCategory: async ()=>{
        const res = await getCatName();
        set({category:res});
    },
    loadUserTechnology : async () => {
        try{
            const userTechnology = await getAlltechnology();
            set({technology: userTechnology});
        } catch (error) {
            console.error("Failed to load user technology", error);
        }
    },
}));