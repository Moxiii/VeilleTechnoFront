import kc from "@src/DATA/cookie/Keycloak"
import {useConfigStore} from "@store/ConfigStore";

export function apiFetch(path:string, options: RequestInit = {}) {
    const baseUrl  = useConfigStore.getState().baseUrl;
    const headers = {...options.headers} as Record<string, string>;
    const token = kc.token;
    if (token) headers.Authorization = `Bearer ${token}`;
    return fetch(`${baseUrl}${path}` ,{
        ...options,
        headers,
    });
}