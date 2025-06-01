import {handleResponse} from "./handleResponse";
import {apiFetch} from "./wrapper/apiFetch";
export const getUser = async () => {
    const res = await apiFetch("/user",{
        method:"GET",
    })
    console.log("🔍 /user response:", res.status, res.headers.get("Content-Type"));
    return handleResponse(res);
}
export const updateUser = async (userId , updatedUser) => {
    const res = await apiFetch(`/user/${userId}`,{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(updatedUser)
    })
    return handleResponse(res)
}
export const deleteUser = async (userId )=> {
    const res = await apiFetch(`/user/${userId}`,{
        method:"DELETE",
    })
    return handleResponse(res)
}