import { handleResponse } from "./handleResponse";

const API_URL = "http://api.localhost/technology";

export const getAlltechnology = async () => {
    const res = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
    });
    return handleResponse(res);
};

export const getTechnologyById = async (technologyId) => {
    const res = await fetch(`${API_URL}/${technologyId}`, {
        method: "GET",
        credentials: "include",
    });
    return handleResponse(res);
};

export const createTechnology = async (createdTechnology) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createdTechnology),
        credentials: "include",
    });
    return handleResponse(res);
};

export const updateTechnology = async (technologyId, updatedTechnology) => {
    const res = await fetch(`${API_URL}/${technologyId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTechnology),
        credentials: "include",
    });
    return handleResponse(res);
};

export const deleteTechnology = async (technologyId) => {
    const res = await fetch(`${API_URL}/${technologyId}`, {
        method: "DELETE",
        credentials: "include",
    });
    return handleResponse(res);
};
