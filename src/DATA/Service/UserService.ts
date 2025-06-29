
import {useUserStore} from "@store/UserStore"
import {useProjectStore} from "@store/ProjectStore"
import {useRessourcesStore} from "@store/RessourcesStore"
import {useTechnologyStore} from "@store/TechnologyStore"

export const userService = ()=> {
   const {loadUserData} = useUserStore();
   const {loadUserProjects} = useProjectStore();
   const {loadUserTechnology} = useTechnologyStore();
   const {loadUserRessources} = useRessourcesStore();
    const loadAll = async () => {
        await Promise.all([
            loadUserData(),
            loadUserProjects(),
            loadUserTechnology(),
            loadUserRessources(),
        ]);
    };

    return { loadAll };
}