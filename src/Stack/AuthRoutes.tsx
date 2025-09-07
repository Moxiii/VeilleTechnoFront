import {Route} from "react-router-dom";
import Home from "@screen/Home/Home.jsx";
import Ideas from "@screen/Ideas/Ideas.jsx";
import Ressources from "@screen/Ressources/Ressources.jsx";
import Technology from "@screen/Technology/Technology.jsx";
import Profile from "@screen/Profile/Profile.jsx";
import links from "@const/_const"
import React from "react";

export function AuthRoutes(){
    return(
            <>
                <Route index element={<Home />} />
                <Route path={links.ideas} element={<Ideas/>}/>
                <Route path={links.ressources} element={<Ressources />}/>
                <Route path={links.technology} element={<Technology/>}/>
                <Route path={links.auth.profile} element={<Profile/>}/>
            </>
        )

}

