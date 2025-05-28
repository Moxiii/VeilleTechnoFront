

// @ts-ignore
export default async function login(username:string , password:string ) {
    try{
        const response = await fetch("http://localhost:8080/api/auth/login", {
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