import { handleResponse } from "./wrapper/handleResponse";
import {apiFetch} from "./wrapper/apiFetch";


export const getProjectFeatures = async (projectID) => {
    const res = await apiFetch(`/features/project/${projectID}`, {
        method: "GET",

    });
    return handleResponse(res);
};


export const createFeatures = async (createdFeatures) => {
    const res = await apiFetch("/features", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createdFeatures),

    });
    return handleResponse(res);
};

export const updateFeatures = async (featuresId, updatedFeatures) => {
    const res = await apiFetch(`/features/${featuresId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFeatures),

    });
    return handleResponse(res);
};

export const deleteFeatures = async (featuresId) => {
    const res = await apiFetch(`/features/${featuresId}`, {
        method: "DELETE",

    });
    return handleResponse(res);
};

