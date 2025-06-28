import "./Register.scss"
import {useAuthStore} from "@store/AUTH/AuthStore";
import {useState} from "react";
export default function Register() {
  const  {register} = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await register({username, password, email, firstName , lastName});
    }catch (err) {
      alert("user not found");
      console.error("Login error", err);
    }
  }
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
        />
        <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
        />
        <input
            type="email"
            value={email}
            placeholder="username@example.com"
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}