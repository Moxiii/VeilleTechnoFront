
import {apiFetch} from "@fetch/wrapper/apiFetch";


export default async function login(username:string , password:string ) {
    try{
        const response = await apiFetch(`/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        })
        if (response.ok) {
            return response.json();
        }
        return ;
    }catch(err){
        console.error("Login error: " + err);
    }


}