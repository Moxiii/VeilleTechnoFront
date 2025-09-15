import { handleResponse } from "./handleResponse";
import {apiFetch} from "./wrapper/apiFetch";


export const getAllIdeas = async () => {
    const res = await apiFetch("/ideas", {
        method: "GET",

    });
    return handleResponse(res);
};


export const createIdeas = async (createdIdeas) => {
    const res = await apiFetch("/ideas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createdIdeas),

    });
    return handleResponse(res);
};

export const updateIdeas = async (ideasId, updatedIdeas) => {
    const res = await apiFetch(`/ideas/${ideasId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedIdeas),

    });
    return handleResponse(res);
};

export const deleteIdeas = async (ideasId) => {
    const res = await apiFetch(`/ideas/${ideasId}`, {
        method: "DELETE",

    });
    return handleResponse(res);
};

