import "./Login.scss"
import {useCallback, useEffect, useState} from "react";
import {useAuthStore} from "@store/AUTH/AuthStore";
import {useNavigate} from "react-router-dom";
import {useUserStore} from "@store/UserStore.js";
import kc from "@src/DATA/cookie/Keycloak"
export default function Login() {

  const navigate = useNavigate();
    const isAuth = useAuthStore((state)=>state.isAuth)
    const loadUserData = useUserStore(state => state.loadUserData)
    const loadAndNavigate = useCallback(async () => {
        await loadUserData();
        navigate("/profile");
    }, [loadUserData, navigate]);
    useEffect(() => {
        if (isAuth) {
            loadAndNavigate();
        }
    }, [isAuth, loadAndNavigate]);



  return (
      <div className="login">
        <h2>Ce connecter</h2>
        <button
            onClick={() => kc.login()}
        >Se connecter avec Keycloak</button>
      </div>
  );
}