import "./Profile.scss"
import logout from "../../DATA/Fetch/Auth/LougoutFetch"
import {useAuthContext} from "../../DATA/Context/Auth/AuthContext";
export default function Profile() {
    const {setIsAuth} = useAuthContext();
    const handleclick = async (e) =>{
        e.preventDefault();
         await logout()
        setIsAuth(false)
    }
  return (
    <div className="profile">
   <h1>Profile</h1>
        <button onClick={handleclick}>Logout</button>
    </div>
  );
}