import {create} from "zustand";

import type { UserInterface } from "@interfaces/UserInterface";
import {getUser , getPdfReport} from "@fetch/userFetch";
import type {FetchTypes} from "@src/DATA/Type/FetchTypes"

type UserStore = {
    userData: UserInterface | null;
    loadUserData:()=>Promise<void>;
    loaded: boolean;
    getPdfReport:(options:FetchTypes)=>Promise<void>;
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
    },
    getPdfReport: async (options):Promise<void> => {
        try{
        if(get().loaded){
            options.username = get().userData.username;
            await getPdfReport(options);
        } else {
            console.error("Something went wrong");
        }
        }catch(error){
            console.error("Failed to get pdf", error);
        }
    }
}));