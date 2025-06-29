import {create} from "zustand";

import type { UserInterface } from "@interfaces/UserInterface";
import {getUser} from "@fetch/userFetch";


type UserStore = {
    userData: UserInterface | null;
    loadUserData:()=>Promise<void>;
};


export const useUserStore = create<UserStore>((set) => ({
    userData: null,
    loadUserData: async ():Promise<void> => {
        try{
            const userData = await getUser();
            set({userData: userData});
        } catch (error) {
            console.error("Failed to load user Data", error);
        }
    }
}));