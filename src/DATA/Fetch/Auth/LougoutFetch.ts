export default async function logout(){
    try{
        const response = await fetch("http://localhost:8080/api/auth/logout", {
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