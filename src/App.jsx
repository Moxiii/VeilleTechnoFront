
import {Route, Routes} from 'react-router-dom'
//global
import Layout from "@components/Layout/Layout.jsx";
import links from "@const/_const.ts"
//Routes
import {GlobalRoutes} from "@src/Stack/GlobalRoutes";
import {PublicRoutes} from "@src/Stack/PublicRoutes";
import {AuthRoutes} from "@src/Stack/AuthRoutes";
//Auth
import ProtectedRoute from "@components/AUTH/Protection/ProtectedRoute"
import PublicRoute from "@components/AUTH/Protection/PublicRoute"
//user
import Profile from "@screen/Profile/Profile.jsx";
import {userService} from "@src/DATA/Service/UserService";
//Lenis
import {ReactLenis} from "lenis/react"
//Auth
import {useAuthStore} from "@store/AUTH/AuthStore.js";
import { useEffect} from "react";



function App() {
    const isAuth = useAuthStore((state) => state.isAuth);
    const {loadAll} = userService();

useEffect(() => {
    if (isAuth) {
        loadAll();
    }
},[isAuth]);

useEffect(() => {
    useAuthStore.getState().checkSession();
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
                  {GlobalRoutes()}
                  <Route element={<ProtectedRoute />}>
                      {AuthRoutes()}
                  </Route>
                  <Route element={<PublicRoute />}>
                      {PublicRoutes()}
                  </Route>
              </Route>
          </Routes>
      </ReactLenis>

  )
}

export default App
