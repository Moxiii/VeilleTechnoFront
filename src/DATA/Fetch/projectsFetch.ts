import { handleResponse } from "./handleResponse";

const API_URL = "http://api.localhost/project";

export const getAllProjects = async () => {
    const res = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
    });
    return handleResponse(res);
};

export const getProjectById = async (projectId) => {
    const res = await fetch(`${API_URL}/${projectId}`, {
        method: "GET",
        credentials: "include",
    });
    return handleResponse(res);
};

export const createProject = async (createdProject) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createdProject),
        credentials: "include",
    });
    return handleResponse(res);
};

export const updateProject = async (projectId, updatedProject) => {
    const res = await fetch(`${API_URL}/${projectId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
        credentials: "include",
    });
    return handleResponse(res);
};

export const deleteProject = async (projectId) => {
    const res = await fetch(`${API_URL}/${projectId}`, {
        method: "DELETE",
        credentials: "include",
    });
    return handleResponse(res);
};
