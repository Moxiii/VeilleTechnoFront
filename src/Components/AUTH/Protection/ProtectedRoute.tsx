import {Navigate, Outlet} from 'react-router-dom';
import {useAuthStore} from "@store/AUTH/AuthStore";
import React from "react";

export default function ProtectedRoute() {
    const {isAuth} = useAuthStore();
    return isAuth ? <Outlet/> : <Navigate to="/login" replace/>;
}