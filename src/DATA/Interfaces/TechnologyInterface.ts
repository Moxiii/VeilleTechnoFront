import {RessourcesInterface} from "@interfaces/RessourcesInterface";
import {ProjectInterface} from "@interfaces/ProjectInterface";
import {CategoryInterface} from "@interfaces/CategoryInterface";
export interface TechnologyInterface {
    id: number;
    name: string;
    category?: CategoryInterface | null;
    trainingTime?: number | null;
    ressources?: RessourcesInterface[] | null;
    projects?: ProjectInterface[] | null;
    createdAt: string;
}