import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {keycloak} from "@src/DATA/keycloak/keycloak";
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {KeycloakProvider} from "keycloak-react-web";

createRoot(document.getElementById('root')).render(
    <KeycloakProvider
        client={keycloak}
        initOptions={{
            onLoad: 'check-sso',
            checkLoginIframe: false,
            silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
        }}
    >
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>,
    </KeycloakProvider>
    )


