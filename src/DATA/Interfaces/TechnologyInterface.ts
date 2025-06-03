import {RessourcesInterface} from "@interfaces/RessourcesInterface";

export interface TechnologyInterface {
    id: number;
    name: string;
    category?: string | null;
    trainingTime?: number | null;
    ressources?: RessourcesInterface[] | null;
}