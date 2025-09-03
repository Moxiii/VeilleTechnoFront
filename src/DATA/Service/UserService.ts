
import {useUserStore} from "@store/UserStore"
import {useProjectStore} from "@store/ProjectStore"
import {useRessourcesStore} from "@store/RessourcesStore"
import {useTechnologyStore} from "@store/TechnologyStore"
import {useCategoryStore} from "@store/CategoryStore";

export const userService = ()=> {
   const {loadUserData} = useUserStore();
   const {loadUserProjects} = useProjectStore();
   const {loadUserTechnology} = useTechnologyStore();
   const {loadUserRessources} = useRessourcesStore();
   const {loadUserCategories}=useCategoryStore();
    const loadAll = async () => {
        await Promise.all([
            loadUserData(),
            loadUserProjects(),
            loadUserTechnology(),
            loadUserRessources(),
            loadUserCategories(),
        ]);
    };

    return { loadAll };
}