import {handleResponse} from "../handleResponse";

export async function checkAuth(){
        try {
            const res = await fetch("http://localhost:8080/api/auth/status", {
                method: "GET",
                credentials: "include",
            });
        if(!res.ok){
            return false;
        }
        const data = await handleResponse(res);
        return data.authenticated === true;
        } catch (err) {
            console.error("Auth check failed:", err);
            return false;
        }}
