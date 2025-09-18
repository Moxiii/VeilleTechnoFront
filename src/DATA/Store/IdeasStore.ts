import {create} from "zustand";
import {IdeasInterface} from "@interfaces/IdeasInterface";
import {createIdeas , deleteIdeas , getAllIdeas , updateIdeas} from "@fetch/IdeasFetch"

type IdeasStore = {
    ideas: IdeasInterface[];
    setIdeas: (ideas: IdeasInterface[]) => void;
    addIdeas: (ideas: IdeasInterface) => Promise<void>;
    removeIdeas: (ideasId: number) => Promise<void>;
    updateIdeasById: (ideasId: number, ideas: IdeasInterface) => Promise<void>;
    loadUserIdeas:()=>Promise<void>;
    loaded:boolean;
}

export const useIdeasStore = create<IdeasStore>((set,get)=>({
    loaded:false,
    ideas:[],
    loadUserIdeas: async () => {
        try {
            if (get().loaded) return;
            const res = await getAllIdeas();
            set({ideas:res , loaded:true});
        }catch (error){
            console.log(" Failed to load ideas:" , error)
        }
    },
    setIdeas:(ideas) => set({ ideas }),
    addIdeas : async (newIdea) => {
        const res = await createIdeas(newIdea);
        if(res.id){
            const formated : IdeasInterface = {
                id:res.id,
                title:res.title,
                description:res.description,
                image:res.image,
                tags: res.tags || [],
                links: res.links || [],
                ressources: res.ressources || [],
            }
            set({ ideas: [...get().ideas , formated]});
        }
    },
    removeIdeas : async (ideasId) => {
    const res = await deleteIdeas(ideasId);
    if(res.ok){
        set({ideas:get().ideas.filter((i) => i.id !== ideasId)});
    }
    },
    updateIdeasById : async (ideasId, ideas) => {
    const res = await updateIdeas(ideasId, ideas);
    if (res.id){
        set({
            ideas: get().ideas.map((i) =>
                i.id === ideasId
                    ? {
                        ...i,
                        title: res.title,
                        description: res.description,
                        image: res.image,
                        tags: res.tags || [],
                        links: res.links || [],
                        ressources: res.ressources || [],
                    }
                    : i
            ),
        });
    }
    },
}))