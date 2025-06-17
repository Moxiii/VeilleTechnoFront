import {create} from "zustand";

import {useUserStore} from "@store/UserStore";

type AuthSate = {
    ready: boolean;
    isAuth: boolean;
    token?: string;
    user?:unknown;
}
export const useAuthStore = create<AuthSate>(()=>({
    ready:false,
    isAuth:false,

}));
const { setState } = useAuthStore;




