import {create} from "zustand";
import {persist} from "zustand/middleware";
import {checkAuth} from "../../Fetch/Auth/checkAuth";

type AuthStore = {
    isAuth: boolean;
    setIsAuth: (auth: boolean) => void;
    checkAuth: () => Promise<void>;
}
export const useAuthStore = create<AuthStore>()(
    persist(
        (set)=>({
            isAuth: false,
            setIsAuth: (auth) => set({isAuth: auth}),
            checkAuth:async () => {
                try {
                    const status = await checkAuth();
                    set({isAuth: status});
                }catch (err) {
                    console.error("Failed to check auth:", err);
                    set({ isAuth: false });
                }
            },
        }),{name:"auth-store"}
    )
)