import "./Login.scss"
import { useState} from "react";
import login from "@fetch/Auth/loginFetch"
import {useAuthStore} from "@store/AUTH/AuthStore";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setIsAuth = useAuthStore((state)=>state.setIsAuth);
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