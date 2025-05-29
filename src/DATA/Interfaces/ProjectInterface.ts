import {Technology} from "./TechnologyInterface";

export interface ProjectInterface {
    id: number;
    projectName: string;
    status: string;
    links?: string[];
    technology?: Technology[];
    startDate?: any;
    endDate?: any;
}