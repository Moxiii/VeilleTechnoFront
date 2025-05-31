const API_URL = "http://api.localhost/api/auth/register";
export default async function registerFetch({email , name , password , username}) {
    const user = {email,password,name,username};
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user),
    })
        .catch((error) => {
            console.error("Erreur lors de l'enregistrement :", error);
        });
};
