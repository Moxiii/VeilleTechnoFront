import {SubCategoryInterface} from "@interfaces/SubCategoryInterface";

export interface CategoryInterface {
    name: string;
    type:string | null;
    subCategory:SubCategoryInterface[] | null;
}