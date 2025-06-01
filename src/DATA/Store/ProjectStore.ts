import {create} from "zustand";
import { ProjectInterface } from "@interfaces/ProjectInterface";
import {
    createProject,deleteProject,updateProject
} from "@fetch/projectsFetch";

type ProjectStore = {
    projects: ProjectInterface[],
    setProjects: (projects: ProjectInterface) => void
    addProject: (project: ProjectInterface) => Promise<void>,
    removeProject: (projectId: number) => Promise<void>,
    updateProjectById: (projectId: number, project: ProjectInterface) => Promise<void>,
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
    projects: [],
    setProjects: (projects) => set({ projects }),
    addProject: async (project) => {
        const response = await createProject(project);
        if (response?.projectName) {
            const formatted: ProjectInterface = {
                id: response.id,
                projectName: response.projectName,
                status: response.status,
                startDate: response.startDate,
                endDate: response.endDate,
                links: Array.isArray(response.links) ? response.links : [],
                technology: Array.isArray(response.technology) ? response.technology : [],
            };
            set({ projects: [...get().projects, formatted] });
        }
    },

    removeProject: async (projectId: number) => {
        const response = await deleteProject(projectId);
        if (response.ok) {
            set({ projects: get().projects.filter(p => p.id !== projectId) });
        }
    },

    updateProjectById: async (projectId : number, updatedData) => {
        const response = await updateProject(projectId, updatedData);
        if (response.name) {
            set({
                projects: get().projects.map((p) =>
                    p.id === projectId
                        ? {
                            ...p,
                            projectName: response.name,
                            links: response.links || [],
                        }
                        : p
                ),
            });
        }
    },

}));