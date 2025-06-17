import {useConfigStore} from "@store/ConfigStore";

export function apiFetch(path:string, options: RequestInit = {}) {
    const baseUrl  = useConfigStore.getState().baseUrl;

    return fetch(`${baseUrl}${path}` ,{
        credentials: "include",
        ...options,

    });
}