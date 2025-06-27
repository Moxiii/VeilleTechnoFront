import {SubCategoryInterface} from "@interfaces/SubCategoryInterface";

export interface CategoryInterface {
    name: string;
    type:null;
    subCategory:SubCategoryInterface[] | null;
}