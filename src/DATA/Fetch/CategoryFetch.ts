import { handleResponse } from "./handleResponse";
import {apiFetch} from "./wrapper/apiFetch";


export const getAllCategorys = async () => {
    const res = await apiFetch("/category", {
        method: "GET",

    });
    return handleResponse(res);
};


export const createCategory = async (createdCategory) => {
    const res = await apiFetch("/category", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createdCategory),

    });
    return handleResponse(res);
};

export const updateCategory = async (categoryId, updatedCategory) => {
    const res = await apiFetch(`/category/${categoryId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),

    });
    return handleResponse(res);
};

export const deleteCategory = async (categoryId) => {
    const res = await apiFetch(`/category/${categoryId}`, {
        method: "DELETE",

    });
    return handleResponse(res);
};
export const getCatName = async () =>{
    const res = await apiFetch("/category/name",{
        method: "GET",
    });
    return handleResponse(res);
}
