// @ts-ignore
import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
    url:    'http://auth.localhost',
    realm:  'VeilleRealm',
    clientId: 'front',
});
export function saveCookie(){
    if(!keycloak.token)return;
    const maxAge = keycloak.tokenParsed!.exp! - keycloak.tokenParsed!.iat - 10;
    // @ts-ignore
    document.cookie = [
        `KEYCLOAK_TOKEN=${keycloak.token}`,
        'Path=/',
        'SameSite=Lax',
        'HttpOnly',
        //'Secure
        `Max-Age=${maxAge}`,
    ].join('; ');
}
keycloak.onAuthSuccess = saveCookie;
keycloak.onTokenExpired = () =>{
    keycloak.updateToken(30).then(saveCookie)
}