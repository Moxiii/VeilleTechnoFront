import { getBaseUrl } from "@/CONST/_const";

export function apiFetch(path, options = {}) {
    return fetch(`${getBaseUrl()}${path}`, {
        credentials: "include",
        ...options,
    });
}