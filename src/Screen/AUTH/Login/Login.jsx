import "./Login.scss"
import { useEffect} from "react";
import {useAuthStore} from "@store/AUTH/AuthStore";
import {useNavigate} from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

    const  {ready , isAuth , login} = useAuthStore();

    useEffect(() => {
        if (ready && isAuth) {
            navigate("/profile");
        }
    }, [ready,isAuth,navigate]);



  return (
      <div className="login">
        <h2>Ce connecter</h2>
        <button
            onClick={login}
        >Se connecter avec Keycloak</button>
      </div>
  );
}