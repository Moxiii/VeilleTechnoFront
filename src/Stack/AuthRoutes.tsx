import {Route} from "react-router-dom";
import React,{lazy} from "react";
const Home = lazy(() => import("@screen/Home/Home.jsx"));
const Ideas = lazy(() => import("@screen/Ideas/Ideas.jsx"));
const Ressources = lazy(() => import("@screen/Ressources/Ressources.jsx"));
const Technology = lazy(() => import("@screen/Technology/Technology.jsx"));
const Profile = lazy(() => import("@screen/Profile/Profile.jsx"));
import links from "@const/_const"

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

