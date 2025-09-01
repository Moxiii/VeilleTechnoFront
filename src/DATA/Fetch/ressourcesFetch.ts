import { handleResponse } from "./handleResponse";
import {apiFetch} from "./wrapper/apiFetch";

export const getAllRessources = async () => {
    const res = await apiFetch("/ressources", {
        method: "GET",
        
    });
    return handleResponse(res);
};


export const createRessources = async (createdRessources) => {
    const res = await apiFetch("/ressources", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createdRessources),
        
    });
    return handleResponse(res);
};

export const updateRessources = async (ressourcesId, updatedRessources) => {
    const res = await apiFetch(`/ressources/${ressourcesId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRessources),
        
    });
    return handleResponse(res);
};

export const deleteRessources = async (ressourcesId) => {
    const res = await apiFetch(`/ressources/${ressourcesId}`, {
        method: "DELETE",
        
    });
    return handleResponse(res);
};

export const getLabels = async () => {
    const res = await apiFetch("/ressources/label", {
        method: "GET",
    })
    return handleResponse(res);
}
