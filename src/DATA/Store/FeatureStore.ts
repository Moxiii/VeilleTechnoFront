import {create} from "zustand";
import {FeatureInterface} from "@interfaces/FeatureInterface";
import {getProjectFeatures , createFeatures , deleteFeatures, updateFeatures} from "@fetch/featureFetch";

type FeatureStore =  {
    featuresByProject: Record<number, FeatureInterface[]>;
    setFeatures: (projectId: number, features: FeatureInterface[]) => void;
    addFeature: (projectId: number, feature: Omit<FeatureInterface, "id">) => Promise<void>;
    removeFeature: (projectId: number, featureId: number) => Promise<void>;
    updateFeature: (projectId: number, featureId: number, feature: FeatureInterface) => Promise<void>;
    loadProjectFeatures: (projectId: number , forceReload? : boolean) => Promise<void>;
    loaded:boolean;
}
export const useFeatureStore = create<FeatureStore>((set,get)=>({
    featuresByProject:{},
    loaded:false,
    setFeatures: (projectId,features) => set((state)=>({
        featuresByProject: {...state.featuresByProject, [projectId]:features},
    })),
    loadProjectFeatures : async (projectId:number , forceReload = false) => {
        if (get().loaded && !forceReload) return;
        try{
            const projectFeatures = await getProjectFeatures(projectId);
            set((state) => ({
                featuresByProject: { ...state.featuresByProject, [projectId]: projectFeatures , loaded:true},
            }));
        }catch (error) {
            console.error("Failed to load Project Features", error);
    }

    },
    addFeature : async (projectId ,feature) => {
        try{
            const res = await createFeatures(feature);
         if(res.id){
             await get().loadProjectFeatures(projectId , true);
         }
        }catch (error){
            console.error("Failed to add feature", error);
        }
    },
    removeFeature : async (projectId,featureId) => {
       try{
          const res = await deleteFeatures(featureId);
          if(res.ok){
              await get().loadProjectFeatures(projectId , true);
          }

       }catch (error){
           console.error("Failed to remove feature", error);
       }
    },
    updateFeature : async (projectId,featureId, feature) => {
        try{
           const updatedFeature =  await updateFeatures(featureId , feature);
           if(updatedFeature.ok){
               await get().loadProjectFeatures(projectId , true);
           }
        }catch (error) {
            console.error("Failed to update feature", error);
        }
    },

}))