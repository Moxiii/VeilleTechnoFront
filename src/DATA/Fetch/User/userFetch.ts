import {handleResponse} from "../handleResponse";

export const getUser = async () => {
    const res = await fetch("http://localhost:8080/user",{
        method:"GET",
        credentials: "include",
    })
    return handleResponse(res)
}
export const updateUser = async (userId , updatedUser) => {
    const res = await fetch("http://localhost:8080/user/"+`${userId}`,{
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
    const res = await fetch("http://localhost:8080/user/"+`${userId}`,{
        method:"DELETE",
        credentials: "include",
    })
    return handleResponse(res)
}