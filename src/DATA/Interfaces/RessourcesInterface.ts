import {Technology} from "./TechnologyInterface";

export interface RessourcesInterface {
    id: number;
    name: string;
    url: string[];
    label: string;
    technology:Technology[],
}