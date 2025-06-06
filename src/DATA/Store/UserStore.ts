import {create} from "zustand/react";

import  {userService} from '@service/UserService';
import type { UserInterface } from "@interfaces/UserInterface";
import type { ProjectInterface } from "@interfaces/ProjectInterface";
import type {TechnologyInterface} from "@interfaces/TechnologyInterface";
import type {RessourcesInterface} from "@interfaces/RessourcesInterface";
import {useAuthStore} from "@store/AUTH/AuthStore";

type UserStore = {
    userData: UserInterface | null;
    userProjects: ProjectInterface[];
    userTechnology: TechnologyInterface[];
    userRessources: RessourcesInterface[];

    setUserData: (user: UserInterface) => void;
    setUserProjects: (projects: ProjectInterface[]) => void;
    setUserTechnology: (technologies: TechnologyInterface[]) => void;
    setUserRessources: (resources: RessourcesInterface[]) => void;
    loadUserData: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
    userData: null,
    userProjects: [],
    userTechnology: [],
    userRessources: [],

    setUserData: (user) => set({ userData: user }),
    setUserProjects: (projects) => set({ userProjects: projects }),
    setUserTechnology: (technologies) => set({ userTechnology: technologies }),
    setUserRessources: (resources) => set({ userRessources: resources }),

    loadUserData: async () => {
        try {
            const { isAuth } = useAuthStore.getState();
            if (!isAuth) {
                return;
            }
            const [userData, userProjects, userTechnology, userRessources] =
                await Promise.all([
                    userService.loadUserData(),
                    userService.loadUserProjects(),
                    userService.loadUserTechnology(),
                    userService.loadUserRessources(),
                ]);
            console.log("Fetched userData:", userData);
            set({
                userData,
                userProjects,
                userTechnology,
                userRessources,
            });
        } catch (error) {
            console.error("Failed to load user data", error);
        }
    },
}));