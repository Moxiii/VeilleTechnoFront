import {create} from "zustand";
type ConfigStore = {
    baseUrl: string;
    setBaseUrl: (url: string) => void;
}
export const useConfigStore = create<ConfigStore>((set)=>({
    baseUrl: "http://localhost:8080",
    setBaseUrl: (url) => set({ baseUrl: url }),
}));