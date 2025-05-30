import {Technology} from "./TechnologyInterface";

export interface RessourcesInterface {
    id: string;
    name: string;
    url: string[];
    label: string;
    technology:Technology[],
}