import {create} from "zustand";

type TransitionState = {
    isTransitioning: boolean;
    type: "enter" | "exit";
    animation:string;
    fromPage?:string;
    toPage?:string;
    onComplete?:() => void;
    setTransition:(state:Partial<Omit<TransitionState , "setTransition">>)=>void;
}
export const useTransitionStore = create<TransitionState>((set)=>({
    isTransitioning:false,
     type:"enter",
    animation:"fade",
    fromPage:undefined,
    toPage:undefined,
    onComplete:undefined,
    setTransition:(state)=>set((prev)=>({...prev , ...state})),
}))