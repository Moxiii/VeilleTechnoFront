import {create} from "zustand";
import {persist} from "zustand/middleware";
import kc , {bootKeycloak} from "@src/DATA/cookie/Keycloak";
import {useCookieStore} from "@store/AUTH/CookieStore";

type AuthStore = {
    ready: boolean;
    isAuth: boolean;
    login:()=>void;
    logout:()=>void;
    checkAuth: () => Promise<boolean>;
}
export const useAuthStore = create<AuthStore>()(
    persist(
        (set,get)=>({
            ready:false,
            isAuth: false,
            login: ()=> kc.login(),
            logout:()=> {
                kc.logout();
                useCookieStore.getState().setToken(undefined);
                set({isAuth:false});
            },
            checkAuth: async () => {
                if(!get().ready){
                    await bootKeycloak();
                    set({ready:true});
                }
                if(kc.token){
                    const refreshed = await kc.updateToken(30).catch(()=>false);
                    if(refreshed){
                        useCookieStore.getState().setToken(kc.token);
                        set({isAuth:true});
                        return true;
                    }
                }
                set({isAuth:false});
                return false;
            },
        }),{name:"auth-store"}
    )
)