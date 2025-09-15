import {create} from "zustand/react";
import {RessourcesInterface} from "@interfaces/RessourcesInterface";
import {createRessources, deleteRessources, getAllRessources, updateRessources , getLabels} from "@fetch/ressourcesFetch"

type RessourcesStore = {
    ressources: RessourcesInterface[];
    setRessources: (ressourcesList: RessourcesInterface[]) => void;
    addRessource: (ressource: RessourcesInterface) => Promise<void>;
    removeRessource: (ressourceId: number) => Promise<void>;
    updateRessourceById: (
        ressourceId: number,
        ressources:RessourcesInterface
    ) => Promise<void>;
    label:string[];
    getLabel:()=>Promise<void>;
    loadUserRessources:(forceReload?:boolean)=>Promise<void>;
    selectedRessource: RessourcesInterface | null;
    setSelectedRessource: (res: RessourcesInterface | null) => void;
    loaded:boolean;
};

export const useRessourcesStore = create<RessourcesStore>((set, get) => ({
    loaded:false,
    ressources: [],
    setRessources: (ressourcesList) => set({ ressources: ressourcesList }),

    addRessource: async (ressource) => {
        const res = await createRessources(ressource);
        if (res.id) {
            await get().loadUserRessources(true);
        }
    },

    removeRessource: async (ressourceId) => {
        const response = await deleteRessources(ressourceId);
        if (response?.ok || response?.success) {
            await get().loadUserRessources(true);
        }
    },

    updateRessourceById: async (ressourceId, updatedRessource) => {
        const res = await updateRessources(ressourceId, updatedRessource);
        if (res?.id) {

            await get().loadUserRessources(true);
        }
    },
    label:[],
    getLabel: async ()=>{
        const res = await getLabels();
        set({label:res});
    },
    loadUserRessources : async (forceReload = false) => {
        try{
            if (get().loaded && !forceReload) return;
            const userRessources = await getAllRessources();
            const labels = await getLabels();
            set({ressources: userRessources , loaded:true , label:labels});
        } catch (error) {
            console.error("Failed to load user Ressources", error);
        }
    },
    selectedRessource:null,
    setSelectedRessource:(res)=>{set({selectedRessource:res});},
}));