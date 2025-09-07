import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useAuthStore} from "@store/AUTH/AuthStore";

export default function PublicRoute(){
    const {isAuth} = useAuthStore();
    return !isAuth ? <Outlet /> : <Navigate to="/" replace />;
}