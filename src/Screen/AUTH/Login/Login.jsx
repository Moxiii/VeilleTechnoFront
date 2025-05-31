import "./Login.scss"
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import login from "@/DATA/Fetch/Auth/loginFetch"
import {useUserStore} from "@/DATA/Store/UserStore";
import {useAuthStore} from "@/DATA/Store/AUTH/AuthStore";
export default function Login() {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isAuth = useAuthStore((state)=>state.isAuth);
  const setIsAuth = useAuthStore((state)=>state.setIsAuth);
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