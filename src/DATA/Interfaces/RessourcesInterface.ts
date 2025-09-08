export interface RessourcesInterface {
    id: number;
    name: string;
    url: string;
    label: string;
    technologyId:number;
    createdAt: string;
    description: string;
    tags?: string[];
    type?: string;
    categoryId:number;
    updatedAt: string;
}