const API_URL = "http://api.localhost/api/auth/logout";
export default async function logout(){
    try{
        const response = await fetch(API_URL, {
            method: "DELETE",
            credentials: "include",
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