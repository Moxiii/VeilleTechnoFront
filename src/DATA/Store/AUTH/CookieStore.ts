import {create} from "zustand";
import {readCookie , writeSessionCookie} from "@src/DATA/cookie/sessionCookie";

type CookieStore = {
    token?:string;
    setToken: (t?:string) => void ;
}

export const useCookieStore = create<CookieStore>(
    (set)=>
        ({
            token:readCookie("KEYCLOAK_TOKEN"),
            setToken: (t) => {
                if(t) writeSessionCookie("KEYCLOAK_TOKEN" , t);
                set({token:t});
            }
        })
)