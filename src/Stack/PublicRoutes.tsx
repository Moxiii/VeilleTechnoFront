import {Route} from "react-router-dom";
import Login from "@screen/AUTH/Login/Login.jsx";
import Register from "@screen/AUTH/Register/Register.jsx";
import links from "@const/_const";
import React from "react";

export function PublicRoutes(){
    return (
        <>
            <Route path={links.auth.login} element={<Login />} />
            <Route path={links.auth.register} element={<Register />} />
        </>
    )
}