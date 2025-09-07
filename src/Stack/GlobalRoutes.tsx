import {Route} from "react-router-dom";
import About from "@screen/About/About.jsx";
import NotFound from "@screen/NotFound/NotFound";
import links from "@const/_const";
import React from "react";

export  function GlobalRoutes(){
    return  (
        <>
            <Route path={links.about} element={<About />} />
            <Route path="*" element={<NotFound />} />
        </>
    )
}