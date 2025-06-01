import {apiFetch} from "@fetch/wrapper/apiFetch";
export default async function registerFetch({email , name , password , username}) {
    const user = {email,password,name,username};
    apiFetch("/api/auth/status/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(user),
    })
        .catch((error) => {
            console.error("Erreur lors de l'enregistrement :", error);
        });
};
