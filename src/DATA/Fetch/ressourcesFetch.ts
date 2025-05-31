import { handleResponse } from "./handleResponse";

const API_URL = "http://api.localhost/ressources";

export const getAllRessources = async () => {
    const res = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
    });
    return handleResponse(res);
};

export const getRessourcesById = async (ressourcesId) => {
    const res = await fetch(`${API_URL}/${ressourcesId}`, {
        method: "GET",
        credentials: "include",
    });
    return handleResponse(res);
};

export const createRessources = async (createdRessources) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createdRessources),
        credentials: "include",
    });
    return handleResponse(res);
};

export const updateRessources = async (ressourcesId, updatedRessources) => {
    const res = await fetch(`${API_URL}/${ressourcesId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRessources),
        credentials: "include",
    });
    return handleResponse(res);
};

export const deleteRessources = async (ressourcesId) => {
    const res = await fetch(`${API_URL}/${ressourcesId}`, {
        method: "DELETE",
        credentials: "include",
    });
    return handleResponse(res);
};
