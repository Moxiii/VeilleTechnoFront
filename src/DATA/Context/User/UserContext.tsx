import  {createContext, useContext, useEffect, useState} from "react";
import {userService} from "../../Service/UserService";
import {ProjectProvider} from "../Project/ProjectContext";
import { User } from "../../Interfaces/User";
import { Project } from "../../Interfaces/Project";

type UserContextType = {
    userData: User;
    userProjects: Project[];
    setUserData: (user: User) => void;
    setUserProjects: (projects: (prevProjects) => any) => void;
};
const UserContext = createContext<UserContextType>(undefined);
export function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const [userProjects, setUserProjects] = useState([]);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const [userData,projects] =
                    await Promise.all([
                        userService.loadUserData(),
                        userService.loadUserProjects(),

                    ]);

                setUserData(userData);
                setUserProjects(projects);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };

        loadUserData();
    }, []);

    return (
        <UserContext.Provider value={{ userData, userProjects, setUserData, setUserProjects }}>
            <ProjectProvider>
                {children}
            </ProjectProvider>
        </UserContext.Provider>
    );
}

export function useUserData() {
    return useContext(UserContext);
}
