import {create} from "zustand";
import { ProjectInterface } from "@interfaces/ProjectInterface";

import {
    createProject,deleteProject,updateProject,getStatus,getAllProjects
} from "@fetch/projectsFetch";

type ProjectStore = {
    projects: ProjectInterface[],
    setProjects: (projects: ProjectInterface[]) => void
    addProject: (project: ProjectInterface) => Promise<void>,
    removeProject: (projectId: number) => Promise<void>,
    updateProjectById: (projectId: number, project: ProjectInterface) => Promise<void>,
    status:string[];
    getStatus:()=>Promise<void>;
    loadUserProjects:(forceReload? : boolean)=>Promise<void>;
    loaded:boolean;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
    loaded: false,
    projects: [],
    setProjects: (projects) => set({ projects }),
    addProject: async (project: ProjectInterface) => {
        const response = await createProject(project);
        if (response.id) {
            await get().loadUserProjects(true);
        }
    },

    removeProject: async (projectId: number) => {
        const response = await deleteProject(projectId);
        if (response.ok) {
            await get().loadUserProjects(true);
        }
    },

    updateProjectById: async (projectId : number, updatedData) => {
        const response = await updateProject(projectId, updatedData);
        if (response.ok) {
            await get().loadUserProjects(true);
        }
    },
    status:[],
    getStatus:async()=>{
        const res = await getStatus()
        if (Array.isArray(res)) {
            set({status:res});
        }
    },
    loadUserProjects : async (forceReload = false)=>{
        try{
            if (get().loaded && !forceReload) return;
            const userProjects = await getAllProjects();
            const status = await getStatus();
            set({projects: userProjects , loaded:true , status:status});
        } catch (error) {
            console.error("Failed to load user Projects", error);
        }
    }
}));