import "./Profile.scss"
import logout from "@fetch/Auth/LougoutFetch"
import {useAuthStore} from "@store/AUTH/AuthStore";
import {useUserStore} from "@store/UserStore";
export default function Profile() {

    const setIsAuth = useAuthStore((state) => state.setIsAuth);
    const userData = useUserStore((state) => state.userData);
    const handleclick = async (e) =>{
        e.preventDefault();
         await logout()
        setIsAuth(false)
    }
    console.log("userdata : {}",userData)
  return (
    <div className="profile">
   <h1>Profile</h1>
        {userData && (<p>Hello {userData.username}</p>)}
        <button onClick={handleclick}>Logout</button>
    </div>
  );
}