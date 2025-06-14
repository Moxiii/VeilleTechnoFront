// @ts-ignore
import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
    url:    'http://auth.localhost',
    realm:  'VeilleRealm',
    clientId: 'front',
});