import {Route} from "react-router-dom";
import React,{lazy} from "react";
const About = lazy(() => import("@screen/About/About.jsx"));
const NotFound = lazy(() => import("@screen/NotFound/NotFound.jsx"));
import links from "@const/_const";


export  function GlobalRoutes(){
    return  (
        <>
            <Route path={links.about} element={<About />} />
            <Route path="*" element={<NotFound />} />
        </>
    )
}