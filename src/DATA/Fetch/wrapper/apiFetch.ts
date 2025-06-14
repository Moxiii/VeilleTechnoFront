import {useKeycloak} from "keycloak-react-web";
import {useConfigStore} from "@store/ConfigStore";

export function apiFetch(path:string, options: RequestInit = {}) {
    const baseUrl  = useConfigStore.getState().baseUrl;
    const headers = {...options.headers} as Record<string, string>;
    const {keycloak} = useKeycloak();
    const token = keycloak?.token as string;
    if (token) headers.Authorization = `Bearer ${token}`;
    return fetch(`${baseUrl}${path}` ,{
        ...options,
        headers,
    });
}