import {create} from "zustand";
import {useUserStore} from "@store/UserStore";
import {apiFetch} from "@fetch/wrapper/apiFetch";

type AuthSate = {
    isAuth: boolean;
    token?: string;
    user?:unknown;
    login : (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthSate>((set)=>({
    isAuth:false,
    login: async (username, password) => {
        const res = await apiFetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password}),
        });
        if (res.ok) {
            set({ isAuth: true });
            await useUserStore.getState().loadUserData();
        } else {
            throw new Error(await res.text());
        }
    },
    logout: async () => {
        await apiFetch('/auth/logout',
            { method: 'POST' });
        set({ isAuth: false });
    },
    checkSession: async () => {
        const res = await apiFetch('/user', {
            method: 'GET',
        })
        if (res.ok) {
            set({ isAuth: true });
            await useUserStore.getState().loadUserData();
        }else{
            set({ isAuth: false });
        }
    }
}));





