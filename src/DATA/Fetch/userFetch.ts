import {handleResponse} from "./handleResponse";
const API_URL = "http://api.localhost/user";
export const getUser = async () => {
    const res = await fetch(API_URL,{
        method:"GET",
        credentials: "include",
    })
    return handleResponse(res)
}
export const updateUser = async (userId , updatedUser) => {
    const res = await fetch(API_URL+`${userId}`,{
        method:"PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(updatedUser)
    })
    return handleResponse(res)
}
export const deleteUser = async (userId )=> {
    const res = await fetch(API_URL+`${userId}`,{
        method:"DELETE",
        credentials: "include",
    })
    return handleResponse(res)
}