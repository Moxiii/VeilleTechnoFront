import {create} from "zustand";
import {useKeycloak} from "keycloak-react-web";


type AuthStore = {
    ready: boolean;
    isAuth: boolean;
    login:()=>void;
    logout:()=>void;
}
export const useAuthStore = create(()=>({

}))
export const useAuth = () =>{
    const { keycloak, initialized } = useKeycloak();
    return {
        initialized,
        isAuth: keycloak?.authenticated ?? false,
        login: () => keycloak?.login(),
        logout: () => keycloak?.logout(),
        token: keycloak?.token,
        user: keycloak?.tokenParsed,
    };
}