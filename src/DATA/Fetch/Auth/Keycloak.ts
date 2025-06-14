import Keycloak from "keycloak-js";
const KC = new Keycloak({
    url:"http://auth.localhost/",
    realm: "VeilleRealm",
    clientId:"front"
});

KC.init({onLoad: "login-required"}).then(auth => {
    if(auth){
        document.cookie = `KEYCLOAK_TOKEN=${KC.token}; Path=/; Max-Age=3600; SameSite=Lax`;
    }
})