import {create} from "zustand";
import type {TechnologyInterface} from '@interfaces/TechnologyInterface';
import {createTechnology,deleteTechnology,updateTechnology , getAlltechnology} from '@fetch/technologyFetch';
type TechnologyStore = {
    technology: TechnologyInterface[];
    addTechnology: (technology: TechnologyInterface) => Promise<void>;
    removeTechnology: (technlogyId:number) => Promise<void>;
    updateTechnologyById: (technlogyId:number, technology: TechnologyInterface) => Promise<void>;
    loadUserTechnology: (forceReload:boolean) => Promise<void>;
    loaded:boolean;
}
export const useTechnologyStore = create<TechnologyStore>((set, get) => ({
    loaded:false,
    technology: [],
    addTechnology: async (tech) => {
        const res = await createTechnology(tech);
        if (res.id) {
            await get().loadUserTechnology(true);
        }
    },

    removeTechnology: async (technologyId) => {
        const res = await deleteTechnology(technologyId);
        if (res.ok) {
            await get().loadUserTechnology(true);
        }
    },

    updateTechnologyById: async (technologyId, updatedTech) => {
        const res = await updateTechnology(technologyId, updatedTech);
        if (res.ok) {
            await get().loadUserTechnology(true);
        }
    },
    loadUserTechnology : async (forceReload = false) => {
        try{
            if (get().loaded && !forceReload) return;
            const userTechnology = await getAlltechnology();
            set({technology: userTechnology , loaded:true});
        } catch (error) {
            console.error("Failed to load user technology", error);
        }
    },
}));