import {handleResponse} from "../handleResponse";

export const getUser = async () => {
    const res = await fetch("http://localhost:8080/user",{
        method:"GET"
    })
    return handleResponse(res)
}
export const updateUser = async (userId , updatedUser) => {
    const res = await fetch("http://localhost:8080/user/"+`${userId}`,{
        method:"PUT",
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
    })
    return handleResponse(res)
}