import "@components/Layout/Layout.scss"
import { Outlet } from 'react-router-dom'
import Navbar from "@components/Navbar/Navbar.jsx";
import {useTransitionStore} from "@store/Effects/TransitionStore"
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
export default function Layout(){
    const {startTransition , endTransition} = useTransitionStore();
    const location = useLocation();
    useEffect(()=>{
        startTransition();
        const timeout = setTimeout(()=>endTransition(), 500);
        return () => {clearTimeout(timeout);};
    },[endTransition, location, startTransition]);
    return (
        <>
        <Navbar/>
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}