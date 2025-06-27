import {create} from "zustand";
import {createCategory,deleteCategory,updateCategory,getCatName} from "@fetch/CategoryFetch";
import {CategoryInterface} from "@interfaces/CategoryInterface";

type CategoryStrore = {
    name:string;
}