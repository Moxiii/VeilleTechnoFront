import {create} from "zustand";
import {keycloak } from "@src/DATA/keycloak/keycloak"
import {useUserStore} from "@store/UserStore";

type AuthStore = {
    ready: boolean;
    isAuth: boolean;
    token?: string;
    user?:unknown;
}
export const useAuthStore = create<AuthStore>(()=>({
    ready:false,
    isAuth:false,
}));
const { setState } = useAuthStore;
keycloak.onReady = (autenticated) => setState({
    ready: true,
    isAuth: autenticated,
    token: keycloak.token ?? undefined,
    user: keycloak.tokenParsed,
})
keycloak.onAuthSuccess = () => {setState({
    isAuth: true,
    user:keycloak.tokenParsed,
    token: keycloak.token!,
})
    useUserStore.getState().loadUserData().catch(console.error)

}
keycloak.onAuthLogout = () =>
    setState({ isAuth: false, token: undefined, user: undefined });




