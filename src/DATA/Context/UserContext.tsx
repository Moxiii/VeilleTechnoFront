import  {createContext, useContext, useEffect, useState} from "react";
import {userService} from "../Service/UserService";
import { UserInterface } from "../Interfaces/UserInterface";
import { ProjectInterface } from "../Interfaces/ProjectInterface";
import {useAuthContext} from "./AuthContext";
import {Technology} from "../Interfaces/TechnologyInterface";
import {RessourcesInterface} from "../Interfaces/RessourcesInterface";

type UserContextType = {
    userData: UserInterface;
    userProjects: ProjectInterface[];
    setUserData: (user: UserInterface) => void;
    setUserProjects: React.Dispatch<React.SetStateAction<ProjectInterface[]>>;
    userTechnology:Technology[],
    setUserTechnology: React.Dispatch<React.SetStateAction<Technology>>;
    userRessources:RessourcesInterface[];
    setUserRessources: React.Dispatch<React.SetStateAction<RessourcesInterface[]>>;
};
const UserContext = createContext<UserContextType>(undefined);
export function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const [userProjects, setUserProjects] = useState([]);
    const [userTechnology, setUserTechnology] = useState([]);
    const [userRessources, setUserRessources] = useState([]);
    const {isAuth}=useAuthContext();
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const [userData,userProjects,userTechnology, userRessources] =
                    await Promise.all([
                        userService.loadUserData(),
                        userService.loadUserProjects(),
                        userService.loadUserTechnology(),
                        userService.loadUserRessources(),

                    ]);
                setUserData(userData);
                setUserProjects(userProjects);
                setUserRessources(userRessources);
                setUserTechnology(userTechnology);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };
        if(isAuth){
            loadUserData();
        }

    }, [isAuth]);
    return (
        <UserContext.Provider value={{
            userData,
            userProjects,
            setUserData,
            setUserProjects,
            userTechnology,
            setUserTechnology,
            userRessources,
            setUserRessources,
        }}>
                {children}
        </UserContext.Provider>
    );
}

export function useUserData() {
    return useContext(UserContext);
}
