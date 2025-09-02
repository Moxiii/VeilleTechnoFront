import {createCategory , deleteCategory , updateCategory , getCatName , getAllCategorys} from "@fetch/CategoryFetch";
import type {CategoryInterface} from "@interfaces/CategoryInterface";
import {create} from "zustand";


type CategoryStore = {
    category:CategoryInterface[],
    getCatName:()=>Promise<void>;
    addCategory: (category: CategoryInterface) => Promise<void>;
    removeCategory: (categoryId:number) => Promise<void>;
    updateCategoryById: (categoryId:number, category: CategoryInterface) => Promise<void>;
    loadUserCategories: () => Promise<void>;
}
export const useCategoryStore = create<CategoryStore>((set, get)=>({
    category:[],
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
             set({ category: [...get().category, formatted] });
         }
    },
    removeCategory:async (catId) => {
        const res = await deleteCategory(catId);
        if(res.ok){
            set({
                category:get().category.filter((c)=>c.id !== catId)
            });
        }
    },
    updateCategoryById:async (catId , updatedCat) => {
        const res = await updateCategory(catId , updatedCat);
        if(res?.name || res?.type){
            set({
                category:get().category.map((c)=>
                    c.id === catId ? {
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