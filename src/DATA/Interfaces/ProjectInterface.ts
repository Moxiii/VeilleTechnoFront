import {TechnologyInterface} from "./TechnologyInterface";

export interface ProjectInterface {
    id: number;
    projectName: string;
    status: string;
    links?: string[];
    technology?: TechnologyInterface[];
    startDate?: any;
    endDate?: any;
    createdAt: string;
}