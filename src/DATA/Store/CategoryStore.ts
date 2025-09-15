import {createCategory , deleteCategory , updateCategory , getCatName , getAllCategorys} from "@fetch/CategoryFetch";
import type {CategoryInterface} from "@interfaces/CategoryInterface";
import {create} from "zustand";

type CategoryStore = {
    category:CategoryInterface[];
    getCatName:()=>Promise<void>;
    addCategory: (category: CategoryInterface) => Promise<void>;
    removeCategory: (categoryId:number) => Promise<void>;
    updateCategoryById: (categoryId:number, category: CategoryInterface) => Promise<void>;
    loadUserCategories: (forceReload? : boolean) => Promise<void>;
    loaded:boolean;
}
export const useCategoryStore = create<CategoryStore>((set, get)=>({
    loaded:false,
    category:null,
    getCatName: async () => {
        const res = await getCatName();
        set({category:res})
    },
    loadUserCategories: async ( forceReload:boolean = false ) => {
        try{
            if(get().loaded && !forceReload) return
            const userCat = await getAllCategorys();
            set({category:userCat , loaded:true});
        }catch (error){
            console.error("Failed to load user Cat")
        }
      },

    addCategory:async (cat) => {
         const res = await createCategory(cat);
         if(res.id){
             await get().loadUserCategories(true);
         }
    },
    removeCategory:async (categoryId) => {
        const res = await deleteCategory(categoryId);
        if(res.ok){
            await get().loadUserCategories(true);
        }

    },
    updateCategoryById:async (categoryId , updatedCat) => {
        const res = await updateCategory(categoryId , updatedCat);
        if(res.id){
            await get().loadUserCategories(true);
        }
    },
}))