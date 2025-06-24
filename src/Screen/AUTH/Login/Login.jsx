import "./Login.scss"
import {useEffect, useState} from "react";
import {useAuthStore} from "@store/AUTH/AuthStore";
import {useNavigate} from "react-router-dom";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const  { isAuth, login} = useAuthStore();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await login(username, password);
        }catch (err) {
            alert("user not found");
            console.error("Login error", err);
        }
    }
    useEffect(() => {
        if ( isAuth) {
            navigate("/");
        }
    }, [isAuth,navigate]);



  return (
      <div className="login">
          <form onSubmit={handleSubmit}>
              <h2>Ce connecter</h2>
              <input
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
              />
              <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
          </form>
      </div>
  );
}