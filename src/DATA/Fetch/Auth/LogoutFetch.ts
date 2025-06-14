
import {apiFetch} from "@fetch/wrapper/apiFetch";
export default async function logout(){
    try{
        const response = await apiFetch("/api/auth/logout", {
            method: "DELETE",
        })
        if (response.ok) {
            return response.json();
        }
        return ;
    }
    catch(err){
        throw new Error(err);
    }
}