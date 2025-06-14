
import {Route, Routes, useNavigate} from 'react-router-dom'
//global
import Layout from "@components/Layout/Layout.jsx";
import links from "@const/_const.ts"
//Views
import Home from "@screen/Home/Home.jsx";
import Ideas from "@screen/Ideas/Ideas.jsx";
import Ressources from "@screen/Ressources/Ressources.jsx";
import Technology from "@screen/Technology/Technology.jsx";
import NotFound from "@screen/NotFound/NotFound.jsx";
import About from "@screen/About/About.jsx";
//Auth
import Login from "@screen/AUTH/Login/Login.jsx";
import Register from "@screen/AUTH/Register/Register.jsx";
//user
import Profile from "@screen/Profile/Profile.jsx";
import {useUserStore} from "@store/UserStore.js";
//Lenis
import {ReactLenis} from "lenis/react"
//Auth
import {useAuthStore} from "@store/AUTH/AuthStore.js";
import {useEffect} from "react";


function App() {
    const isAuth = useAuthStore((state) => state.isAuth);
    const checkAuth = useAuthStore((state) => state.checkAuth);
    const loadUserData = useUserStore((state) => state.loadUserData);
    const navigate = useNavigate();
    useEffect(()=>{
        const init = async () =>{
            const authStatus = await checkAuth();
            if(authStatus ){
                await loadUserData();
            }else{
                navigate("/login")
            }
        }
        init();

    },[]);
    const lenisOption = {
        autoRaf: true,
        smooth: true,
        lerp: 0.1,
    };

  return (
      <ReactLenis
          root
          options={lenisOption}
          style={{ height: "100vh", overflowY: "auto" }}
      >
                    <Routes>
                        <Route path={links.home} element={<Layout/>}>
                            <Route index element={isAuth?  <Home /> : <About/>} />
                            <Route path={links.ideas} element={<Ideas />} />
                            <Route path={links.ressources} element={<Ressources />} />
                            <Route path={links.technology} element={<Technology />} />
                            <Route path={links.auth.profile} element={<Profile />} />
                            <Route path={links.auth.login} element={<Login />} />
                            <Route path={links.auth.register} element={<Register />} />
                            <Route path={links.about} element={<About />} />
                            <Route path="*" element={<NotFound/>}/>
                        </Route>
                    </Routes>
      </ReactLenis>
  )
}

export default App
