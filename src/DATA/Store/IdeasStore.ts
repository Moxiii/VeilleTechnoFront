import {create} from "zustand";
import {IdeasInterface} from "@interfaces/IdeasInterface";
import {createIdeas , deleteIdeas , getAllIdeas , updateIdeas} from "@fetch/IdeasFetch"

type IdeasStore = {
    ideas: IdeasInterface[];
    setIdeas: (ideas: IdeasInterface[]) => void
    addIdeas: (ideas: IdeasInterface) => Promise<void>,
    removeIdeas: (ideasId: number) => Promise<void>,
    updateIdeasById: (ideasId: number, ideas: IdeasInterface) => Promise<void>,
    loadUserIdeas:()=>Promise<void>;
    loaded:boolean;
}

export const useIdeasStore = create<IdeasStore>((get,set)=>({
    loaded:false,
    ideas:[],
    loadUserIdeas: async () => {

    },
    setIdeas:(ideas) => set({ ideas }),
    addIdeas : async () => {

    },
    removeIdeas : async () => {

    },
    updateIdeasById : async () => {

    },
}))