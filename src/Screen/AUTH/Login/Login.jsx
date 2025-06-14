import "./Login.scss"
import {useCallback, useEffect} from "react";
import {useAuth} from "@store/AUTH/AuthStore";
import {useNavigate} from "react-router-dom";
import {useUserStore} from "@store/UserStore.js";
export default function Login() {

  const navigate = useNavigate();
    const  {initialized , isAuth , login} = useAuth();
    const loadUserData = useUserStore(state => state.loadUserData)
    const loadAndNavigate = useCallback(async () => {
        await loadUserData();
        navigate("/profile");
    }, [loadUserData, navigate]);
    useEffect(() => {
        if (initialized && isAuth) {
            loadAndNavigate();
        }
    }, [initialized, loadAndNavigate , isAuth]);



  return (
      <div className="login">
        <h2>Ce connecter</h2>
        <button
            onClick={login}
        >Se connecter avec Keycloak</button>
      </div>
  );
}