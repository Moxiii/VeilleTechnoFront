import {handleResponse} from "../handleResponse";


export async function checkAuth(){


        try {
            const res = await fetch("http://localhost:8080/api/auth/status", {
                method: "GET",
                credentials: "include",
            });
        const data = await res.json();
       return Boolean(data.authenticated);;
        } catch (err) {
            console.error("Auth check failed:", err);
            return false;
        }}
