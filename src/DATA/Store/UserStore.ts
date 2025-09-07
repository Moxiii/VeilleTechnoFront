import {create} from "zustand";

import type { UserInterface } from "@interfaces/UserInterface";
import {getUser} from "@fetch/userFetch";


type UserStore = {
    userData: UserInterface | null;
    loadUserData:()=>Promise<void>;
    loaded: boolean;
};


export const useUserStore = create<UserStore>((set,get) => ({
    loaded: false,
    userData: null,
    loadUserData: async ():Promise<void> => {
        try{
            if (get().loaded) return;
            const userData = await getUser();
            set({userData: userData , loaded:true});
        } catch (error) {
            console.error("Failed to load user Data", error);
        }
    }
}));