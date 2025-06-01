
import {apiFetch} from "../wrapper/apiFetch";
const API_URL = "http://api.localhost/api/auth/status"
export async function checkAuth(){


        try {
            const res = await apiFetch("/api/auth/status", {
                method: "GET",
        });
        const data = await res.json();
       return Boolean(data.authenticated);;
        } catch (err) {
            console.error("Auth check failed:", err);
            return false;
        }}
