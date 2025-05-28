import {getAllProjects} from "../Fetch/Projects/projectsFetch";
import {getUser} from "../Fetch/User/userFetch";

export const userService = {
    loadUserData: async () => await getUser(),
    loadUserProjects: async () => await getAllProjects(),
}