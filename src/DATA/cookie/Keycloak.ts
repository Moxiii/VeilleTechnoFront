import Keycloak from "keycloak-js";
const kc = new Keycloak({
    url:"http://auth.localhost/",
    realm: "VeilleRealm",
    clientId:"front"
});
export async function bootKeycloak() {
    return kc.init({onLoad: "check-sso", checkLoginIframe: false});
}
export default kc;