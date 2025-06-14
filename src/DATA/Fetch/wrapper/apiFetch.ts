
import {useConfigStore} from "@store/ConfigStore";

export function apiFetch(path, options = {}) {
    const  baseUrl  = useConfigStore.getState().baseUrl;
    const url = `${baseUrl}${path}`
    console.log("fetching url" , url)
    return fetch(url ,{
        credentials: "include",
        ...options,
    });
}