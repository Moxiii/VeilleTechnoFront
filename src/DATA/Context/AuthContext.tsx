
import {checkAuth} from "../Fetch/Auth/checkAuth";
import {createContext, useContext, useState , useEffect} from "react";
type AuthContextType = {
    isAuth: boolean;
    setIsAuth: (auth: boolean) => void;
};
const authContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuth ,setIsAuth] = useState(false);

    useEffect(() => {
       checkAuth(setIsAuth).then(r => console.log("authenticated :" + r));


    },[])
    return (
        <authContext.Provider value={{isAuth,setIsAuth}}>
            {children}
        </authContext.Provider>
    )
}
export function useAuthContext() {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}