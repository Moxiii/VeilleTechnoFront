import {TechnologyInterface} from "./TechnologyInterface";

export interface ProjectInterface {
    id: number;
    name: string;
    status: string;
    links?: string[];
    technology?: TechnologyInterface[];
    startDate?: any;
    endDate?: any;
    createdAt: string;
}