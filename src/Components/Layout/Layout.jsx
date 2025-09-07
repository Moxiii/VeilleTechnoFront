import "@components/Layout/Layout.scss"
import {Outlet, useNavigate} from 'react-router-dom'
import Navbar from "@components/Navbar/Navbar.jsx";
import {useTransitionStore} from "@store/Effects/TransitionStore"
import {useLocation} from "react-router-dom";
import {useEffect, useRef} from "react";
import gsap from "gsap";
export default function Layout(){
    const {type , animation , isTransitioning, onComplete , setTransition , toPage ,fromPage} = useTransitionStore();
    const location = useLocation();
    const navigate = useNavigate();
    const pageRef = useRef(null);
    useEffect(()=>{
        if(type === "enter" && pageRef.current){
            gsap.fromTo(pageRef.current,
                {
                    opacity:0,
                    y:20
            },
                {
                    opacity:1,
                    y:0,
                    duration:0.5 ,
                    onComplete : ()=> setTransition({isTransitioning:false})
                }
                )
        }
    },[setTransition, type]);
    const triggerExit = (nextPath) =>{
        if(isTransitioning)return;
        setTransition({
            type:"exit",
            isTransitioning:true,
            toPage:nextPath,
            onComplete:()=> navigate(nextPath)
        })
        if(pageRef.current){
            gsap.to(pageRef.current,{
                opacity:0,
                y:-20,
                duration:0.5 ,
                onComplete : ()=> {
                    navigate(nextPath)
                    setTransition({
                        type:"enter",
                        isTransitioning:false,
                        fromPage:location.pathname,
                    })
                }

            })
        }
    }
    return (
        <>
        <Navbar triggerExit={triggerExit}/>
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}