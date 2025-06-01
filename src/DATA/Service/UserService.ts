import {getAllProjects} from "@fetch/projectsFetch";
import {getUser} from "@fetch/userFetch";
import {getAllRessources} from "@fetch/ressourcesFetch";
import {getAlltechnology} from "@fetch/technologyFetch";

export const userService = {
    loadUserData: async () => await getUser(),
    loadUserProjects: async () => await getAllProjects(),
    loadUserRessources: async () => await getAllRessources(),
    loadUserTechnology:async () => await getAlltechnology(),
}