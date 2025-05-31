import "./Profile.scss"
import logout from "../../DATA/Fetch/Auth/LougoutFetch"
import {useAuthStore} from "../../DATA/Store/AUTH/AuthStore";
import {useUserStore} from "../../DATA/Store/UserStore";
export default function Profile() {
    const isAuth = useAuthStore((state) => state.isAuth);
    const setIsAuth = useAuthStore((state) => state.setIsAuth);
    const userData = useUserStore((state) => state.userData);
    const handleclick = async (e) =>{
        e.preventDefault();
         await logout()
        setIsAuth(false)
    }
  return (
    <div className="profile">
   <h1>Profile</h1>
        {isAuth && (
            <>
            <p>Hello {userData?.username}</p>
        <button onClick={handleclick}>Logout</button>
            </>
  )
        }
    </div>
  );
}