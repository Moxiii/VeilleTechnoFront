import { handleResponse } from "./handleResponse";
import {apiFetch} from "./wrapper/apiFetch";

export const getAlltechnology = async () => {
    const res = await apiFetch("/technology", {
        method: "GET",
        
    });
    return handleResponse(res);
};


export const createTechnology = async (createdTechnology) => {
    const res = await apiFetch("/technology", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createdTechnology),
        
    });
    return handleResponse(res);
};

export const updateTechnology = async (technologyId, updatedTechnology) => {
    const res = await apiFetch(`/technology"/${technologyId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTechnology),
        
    });
    return handleResponse(res);
};

export const deleteTechnology = async (technologyId) => {
    const res = await apiFetch(`/technology"/${technologyId}`, {
        method: "DELETE",
        
    });
    return handleResponse(res);
};
