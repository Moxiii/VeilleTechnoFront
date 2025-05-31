const API_URL = "http://api.localhost/api/auth/login"

// @ts-ignore
export default async function login(username:string , password:string ) {
    try{
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
            credentials:"include",
        })
        if (response.ok) {
            return response.json();
        }
        return ;
    }catch(err){
        console.error("Login error: " + err);
    }


}