import {handleResponse} from "../handleResponse";
export const getAllProjects = async () => {
    const res = await fetch("http://localhost:8080/project",{
        method:"GET"
    })
    return handleResponse(res)
}
export const getProjectById = async (projectId) => {
    const res = await fetch("http://localhost:8080/project/"+`${projectId}`,{
        method:"GET"
    })
    return handleResponse(res)
}
export const createProject = async (createdProject) => {
    const res = await fetch("http://localhost:8080/project",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(createdProject)
    })
    return handleResponse(res)
}
export const updateProject = async (projectId , updatedProject) => {
    const res = await fetch("http://localhost:8080/project/"+`${projectId}`,{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(updatedProject)
    })
    return handleResponse(res)
}
export const deleteProject = async (projectId )=> {
    const res = await fetch("http://localhost:8080/project/"+`${projectId}`,{
        method:"DELETE",
    })
    return handleResponse(res)
}