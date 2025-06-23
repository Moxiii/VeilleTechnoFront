import {create} from "zustand";
type ConfigStore = {
    baseUrl: string;
    setBaseUrl: (url: string) => void;
}
export const useConfigStore = create<ConfigStore>(
    (set)=>
        ({
    baseUrl: "https://api.localhost",
    setBaseUrl: (url) => set({ baseUrl: url }),
}));