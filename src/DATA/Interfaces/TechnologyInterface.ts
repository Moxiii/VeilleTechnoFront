export interface Technology {
    id: number;
    name: string;
    category?: string | null;
    trainingTime?: number | null;
    resources?: string[] | null;
}