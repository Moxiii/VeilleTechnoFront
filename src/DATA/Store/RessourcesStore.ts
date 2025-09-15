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
    loadUserRessources:()=>Promise<void>;
    selectedRessource: RessourcesInterface | null;
    setSelectedRessource: (res: RessourcesInterface | null) => void;
    loaded:boolean;
};

export const useRessourcesStore = create<RessourcesStore>((set, get) => ({
    loaded:false,
    ressources: [],
    loadUserRessources : async () => {
        try{
            if (get().loaded) return;
            const userRessources = await getAllRessources();
            const labels = await getLabels();
            set({ressources: userRessources , loaded:true , label:labels});
        } catch (error) {
            console.error("Failed to load user Ressources", error);
        }
    },
    setRessources: (ressourcesList) => set({ ressources: ressourcesList }),

    addRessource: async (ressource) => {
        const res = await createRessources(ressource);
        if (res.id) {
            set({ ressources: [...get().ressources, res] });
        }
    },

    removeRessource: async (ressourceId) => {
        const response = await deleteRessources(ressourceId);
        if (response?.ok || response?.success) {
            set({
                ressources: get().ressources.filter((r) => r.id !== ressourceId),
            });
        }
    },

    updateRessourceById: async (ressourceId, updatedRessource) => {
        const res = await updateRessources(ressourceId, updatedRessource);
        if (res.id) {
            set({
                ressources: get().ressources.map((r) =>
                    r.id === ressourceId ? res : r
                ),
            });
        }
    },
    label:[],
    getLabel: async ()=>{
        const res = await getLabels();
        set({label:res});
    },

    selectedRessource:null,
    setSelectedRessource:(res)=>{set({selectedRessource:res});},
}));