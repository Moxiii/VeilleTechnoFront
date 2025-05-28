import {createContext, useContext, useState , useEffect} from "react";
import {useUserData} from "../User/UserContext";
import { updateProject , deleteProject , getAllProjects , createProject} from "../../Fetch/Projects/projectsFetch";

const ProjectContext = createContext< undefined>(undefined);
export function ProjectProvider({ children }) {
const {setUserProjects} = useUserData();

    // @ts-ignore
    const addProjectToContext = async (project)=>{
        try{
            const response = await createProject(project);
            if (response.name) {
                setUserProjects((prevProjects) => [...prevProjects, response]);
            }
        }catch(error){throw new Error(error)}
    }
    // @ts-ignore
    const deleteProjectToContext = async (projectID)=>{
        try{
            const response = await deleteProject(projectID);
            if(response.ok){
                setUserProjects((prevProjects)=>
                    prevProjects.filter((project)=>
                        project.id !== projectID
                    ))
            }

        }catch(error){throw new Error(error)}
    }

    // @ts-ignore
    const updateProjectToContext = async (projectID, updatedProject)=>{
        try{
            const response = await updateProject(projectID, updatedProject);
            if(response.name){
                setUserProjects((prevProjects) =>
                    prevProjects.map((project) =>
                        project.id === projectID
                            ? {
                                ...project,
                                name: response.name,
                                links: response.links || [],
                            }
                            : project
                    ));
            }
        }catch(error){throw new Error(error)}
    }
    return(
        <ProjectContext.Provider
            value={{
            addProjectToContext,
            deleteProjectToContext,
            updateProjectToContext,
        }}>
            {children}
        </ProjectContext.Provider>

    )
}
export function useProjectContext() {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProjectContext must be used within an ProjectProvider");
    }
    return context;
}