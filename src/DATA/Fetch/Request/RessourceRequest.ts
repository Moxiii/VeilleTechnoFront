import { TechnologyInterface } from "@src/DATA/Interfaces/TechnologyInterface";
export interface RessourceRequest {
  id: number;
  name: string;
  technologyId: number;
  label: string;
  url: string;
  description: string;
  categoryId?: number | null;
  tags: string[];
}
