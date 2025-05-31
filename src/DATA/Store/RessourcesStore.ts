import {create} from "zustand/react";
import {RessourcesInterface} from "../Interfaces/RessourcesInterface";
import {createRessources , deleteRessources, updateRessources} from "../Fetch/ressourcesFetch"
type RessourcesStore = {
    ressources: RessourcesInterface[];
    setRessources: (ressourcesList: RessourcesInterface[]) => void;
    addRessource: (ressource: RessourcesInterface) => Promise<void>;
    removeRessource: (ressourceId: number) => Promise<void>;
    updateRessourceById: (
        ressourceId: number ,
        ressources:RessourcesInterface
    ) => Promise<void>;
};

export const useRessourcesStore = create<RessourcesStore>((set, get) => ({
    ressources: [],
    setRessources: (ressourcesList) => set({ ressources: ressourcesList }),

    addRessource: async (ressource) => {
        const res = await createRessources(ressource);
        if (res?.id) {
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
        if (res?.id) {
            set({
                ressources: get().ressources.map((r) =>
                    r.id === ressourceId ? res : r
                ),
            });
        }
    },
}));