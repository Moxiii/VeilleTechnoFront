import "./Login.scss"
import {useAuthContext} from "../../../DATA/Context/AuthContext.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import login from "../../../DATA/Fetch/Auth/loginFetch"
export default function Login() {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {isAuth,setIsAuth} = useAuthContext();
    useEffect(() => {
        if (isAuth) {
            navigate("/profile");
        }
    }, [isAuth, navigate]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const res = await login(username, password);
      if(res){
          setIsAuth(true);
      }
    }catch (err) {
        alert("user not found");
      console.error("Login error", err);
    }
  }
  return (
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
  );
}