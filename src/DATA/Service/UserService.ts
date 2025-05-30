import {getAllProjects} from "../Fetch/projectsFetch";
import {getUser} from "../Fetch/userFetch";
import {getAllRessources} from "../Fetch/ressourcesFetch";
import {getAlltechnology} from "../Fetch/technologyFetch";

export const userService = {
    loadUserData: async () => await getUser(),
    loadUserProjects: async () => await getAllProjects(),
    loadUserRessources: async () => await getAllRessources(),
    loadUserTechnology:async () => await getAlltechnology(),
}