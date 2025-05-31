import {handleResponse} from "../handleResponse";

const API_URL = "http://api.localhost/api/auth/status"
export async function checkAuth(){


        try {
            const res = await fetch(API_URL, {
                method: "GET",
                credentials: "include",
            });
        const data = await res.json();
       return Boolean(data.authenticated);;
        } catch (err) {
            console.error("Auth check failed:", err);
            return false;
        }}
