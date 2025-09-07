import {SubCategoryInterface} from "@interfaces/SubCategoryInterface";

export interface CategoryInterface {
    id:number,
    name: string;
    type:string | null;
    defaultCategory:boolean;
    subCategory:SubCategoryInterface[] | null;
}