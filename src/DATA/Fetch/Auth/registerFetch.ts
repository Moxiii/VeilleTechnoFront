export default async function registerFetch({email , name , password , username}) {
    const user = {email,password,name,username};
    fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    })
        .catch((error) => {
            console.error("Erreur lors de l'enregistrement :", error);
        });
};
