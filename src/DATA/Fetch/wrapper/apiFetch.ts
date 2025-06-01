import { getBaseUrl } from "@const/getBaseUrl";

export function apiFetch(path, options = {}) {
    const url = `${getBaseUrl()}${path}`
    console.log("fetching url" , url)
    return fetch(url ,{
        credentials: "include",
        ...options,
    });
}