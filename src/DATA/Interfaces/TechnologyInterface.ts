export interface TechnologyInterface {
    id: number;
    name: string;
    category?: string | null;
    trainingTime?: number | null;
    ressources?: string[] | null;
}