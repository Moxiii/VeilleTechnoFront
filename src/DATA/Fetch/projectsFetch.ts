import { handleResponse } from "./handleResponse";
import {apiFetch} from "./wrapper/apiFetch";


export const getAllProjects = async () => {
    const res = await apiFetch("/project", {
        method: "GET",
        
    });
    return handleResponse(res);
};


export const createProject = async (createdProject) => {
    const res = await apiFetch("/project", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createdProject),
        
    });
    return handleResponse(res);
};

export const updateProject = async (projectId, updatedProject) => {
    const res = await apiFetch(`/project/${projectId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
        
    });
    return handleResponse(res);
};

export const deleteProject = async (projectId) => {
    const res = await apiFetch(`/project/${projectId}`, {
        method: "DELETE",
        
    });
    return handleResponse(res);
};
