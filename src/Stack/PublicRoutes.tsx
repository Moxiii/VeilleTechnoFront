import {Route} from "react-router-dom";
import React,{lazy} from "react";
const Login = lazy(()=>import("@screen/AUTH/Login/Login.jsx"))
const Register = lazy(()=>import("@screen/AUTH/Register/Register.jsx"))
import links from "@const/_const";


export function PublicRoutes(){
    return (
        <>
            <Route path={links.auth.login} element={<Login />} />
            <Route path={links.auth.register} element={<Register />} />
        </>
    )
}