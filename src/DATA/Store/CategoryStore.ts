import {createCategory , deleteCategory , updateCategory , getCatName , getAllCategorys} from "@fetch/CategoryFetch";
import type {CategoryInterface} from "@interfaces/CategoryInterface";
import {create} from "zustand";

type CategoryStore = {
    category:CategoryInterface[];
    getCatName:()=>Promise<void>;
    addCategory: (category: CategoryInterface) => Promise<void>;
    removeCategory: (categoryId:number) => Promise<void>;
    updateCategoryById: (categoryId:number, category: CategoryInterface) => Promise<void>;
    loadUserCategories: () => Promise<void>;
    loaded:boolean;
}
export const useCategoryStore = create<CategoryStore>((set, get)=>({
    loaded:false,
    category:null,
    getCatName: async () => {
        const res = await getCatName();
        set({category:res})
    },
    loadUserCategories:async () => {
        try{
            if(get().loaded) return
            const userCat = await getAllCategorys();
            set({category:userCat , loaded:true});
        }catch (error){
            console.error("Failed to load user Cat")
        }
      },

    addCategory:async (cat) => {
         const res = await createCategory(cat);
         if(res.ok){
             const formatted = {
                 id: res.id,
                 name:res.name,
                 type:res.type,
                 defaultCategory:res.defaultCategory,
                 subCategory:res.subCategory,
             }
             set({ category:[ ...get().category, formatted] });
         }
    },
    removeCategory:async (categoryId) => {
        const res = await deleteCategory(categoryId);
        if(res.ok){
            set({
                category:get().category.filter((c)=>c.id !== categoryId)
            });
        }
    },
    updateCategoryById:async (categoryId , updatedCat) => {
        const res = await updateCategory(categoryId , updatedCat);
        if(res.id){
            set({
                category:get().category.map((c)=>
                    c.id === categoryId ? {
                    ...c,
                        id:res.id,
                        name:res.name,
                        type:res.type,
                        subCategory: res.subCategory || []
                    } : c
                )
            })
        }
    },
}))