import {RessourcesInterface} from "@interfaces/RessourcesInterface";

export interface IdeasInterface{
    id:number;
    title:string;
    description:string;
    image:string[];
    tags:string[];
    links:string[];
    ressources:RessourcesInterface[];
}