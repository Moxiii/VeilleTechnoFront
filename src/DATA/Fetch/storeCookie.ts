import { handleResponse } from "./handleResponse";
import {apiFetch} from "./wrapper/apiFetch";

export const postCookie = async (token) => {
    const res = await apiFetch("/auth/cookie", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body : token

    });
    return handleResponse(res);
};