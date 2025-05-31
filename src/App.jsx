
import { Route, Routes } from 'react-router-dom'
//global
import Layout from "./Components/Layout/Layout.jsx";
import links from "./CONST/_const.ts"
//Views
import Home from "./Screen/Home/Home.jsx";
import Ideas from "./Screen/Ideas/Ideas.jsx";
import Ressources from "./Screen/Ressources/Ressources.jsx";
import Technology from "./Screen/Technology/Technology.jsx";
import NotFound from "./Screen/NotFound/NotFound.jsx";
import About from "./Screen/About/About.jsx";
//Auth
import Login from "./Screen/AUTH/Login/Login.jsx";
import Register from "./Screen/AUTH/Register/Register.jsx";
//user
import Profile from "./Screen/Profile/Profile.jsx";
//Lenis
import {ReactLenis} from "lenis/react"
//Auth
import {useAuthStore} from "./DATA/Store/AUTH/AuthStore";
import {useEffect} from "react";


function App() {

    const isAuth = useAuthStore((state)=>state.isAuth)
    useEffect(()=>{
        useAuthStore.getState().checkAuth();

    },[])
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
