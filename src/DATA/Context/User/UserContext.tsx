import  {createContext, useContext, useEffect, useState} from "react";
import {userService} from "../../Service/UserService";
import { UserInterface } from "../../Interfaces/UserInterface";
import { ProjectInterface } from "../../Interfaces/ProjectInterface";
import {useAuthContext} from "../Auth/AuthContext";

type UserContextType = {
    userData: UserInterface;
    userProjects: ProjectInterface[];
    setUserData: (user: UserInterface) => void;
    setUserProjects: React.Dispatch<React.SetStateAction<ProjectInterface[]>>;
};
const UserContext = createContext<UserContextType>(undefined);
export function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const [userProjects, setUserProjects] = useState([]);
    const {isAuth}=useAuthContext();
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const [userData,userProjects] =
                    await Promise.all([
                        userService.loadUserData(),
                        userService.loadUserProjects(),
                        userService.loadUserTechnology(),
                        userService.loadUserRessources(),

                    ]);
                setUserData(userData);
                setUserProjects(userProjects);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };
        if(isAuth){
            loadUserData();
        }

    }, [isAuth]);
    return (
        <UserContext.Provider value={{ userData, userProjects, setUserData, setUserProjects }}>
                {children}
        </UserContext.Provider>
    );
}

export function useUserData() {
    return useContext(UserContext);
}
