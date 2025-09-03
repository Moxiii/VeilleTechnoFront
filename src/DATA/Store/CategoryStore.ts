import {createCategory , deleteCategory , updateCategory , getCatName , getAllCategorys} from "@fetch/CategoryFetch";
import type {CategoryInterface} from "@interfaces/CategoryInterface";
import {create} from "zustand";

type CategoryResponse = {
    default:string[];
    custom:CategoryInterface[];
}
type CategoryStore = {
    category:CategoryResponse | null;
    getCatName:()=>Promise<void>;
    addCategory: (category: CategoryInterface) => Promise<void>;
    removeCategory: (categoryId:string) => Promise<void>;
    updateCategoryById: (categoryId:string, category: CategoryInterface) => Promise<void>;
    loadUserCategories: () => Promise<void>;
}
export const useCategoryStore = create<CategoryStore>((set, get)=>({
    category:null,
    getCatName: async () => {
        const res = await getCatName();
        set({category:res})
    },
    loadUserCategories:async () => {
        try{
            const userCat = await getAllCategorys();
            set({category:userCat})
        }catch (error){
            console.error("Failed to load user Cat")
        }
      },

    addCategory:async (cat) => {
         const res = await createCategory(cat);
         if(res.ok){
             const formatted = {
                 name:res.name,
                 type:res.type,
                 subCategory:res.subCategory,
             }
             set({ category:[ ...get().category.custom, formatted] });
         }
    },
    removeCategory:async (catName) => {
        const res = await deleteCategory(catName);
        if(res.ok){
            set({
                category:get().category.custom.filter((c)=>c.name !== catName)
            });
        }
    },
    updateCategoryById:async (catName , updatedCat) => {
        const res = await updateCategory(catName , updatedCat);
        if(res?.name || res?.type){
            set({
                category:get().category.custom.map((c)=>
                    c.name === catName ? {
                    ...c,
                        name:res.name,
                        type:res.type,
                        subCategory: res.subCategory || []
                    } : c
                )
            })
        }
    },
}))