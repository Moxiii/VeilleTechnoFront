import  {createContext, useContext, useEffect, useState} from "react";
import {userService} from "../../Service/UserService";
import { UserInterface } from "../../Interfaces/UserInterface";
import { ProjectInterface } from "../../Interfaces/ProjectInterface";

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

    useEffect(() => {
        console.log("🔄 Loading user data...");
        const loadUserData = async () => {
            try {
                const [userData,userProjects] =
                    await Promise.all([
                        userService.loadUserData(),
                        userService.loadUserProjects(),

                    ]);
                console.log("✅ Loaded user data:", userData);
                console.log("✅ Loaded projects:", userProjects);
                setUserData(userData);
                setUserProjects(userProjects);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };

        loadUserData();
    }, []);
    useEffect(() => {
        userService.loadUserData().then(console.log);
        userService.loadUserProjects().then(console.log);
    }, []);
    return (
        <UserContext.Provider value={{ userData, userProjects, setUserData, setUserProjects }}>
                {children}
        </UserContext.Provider>
    );
}

export function useUserData() {
    return useContext(UserContext);
}
