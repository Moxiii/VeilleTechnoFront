import "@components/Layout/Layout.scss"
import { Outlet } from 'react-router-dom'
import Navbar from "@components/Navbar/Navbar.jsx";
export default function Layout(){
    return (
        <>
        <Navbar/>
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}