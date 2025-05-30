import {createContext, useContext, useState , useEffect} from "react";
import {useUserData} from "../User/UserContext";
import { updateProject , deleteProject , getAllProjects , createProject} from "../../Fetch/projectsFetch";
import {ProjectInterface} from "../../Interfaces/ProjectInterface";

const ProjectContext = createContext< undefined>(undefined);
export function ProjectProvider({ children }) {
const {setUserProjects} = useUserData();

    // @ts-ignore
    const addProjectToContext = async (project:ProjectInterface)=>{
        try{
            const response = await createProject(project);
            if (response && response.projectName) {
                const formattedProject: ProjectInterface = {
                    id: response.id,
                    projectName: response.projectName,
                    status: response.status,
                    startDate: response.startDate,
                    endDate: response.endDate,
                    links: Array.isArray(response.links) ? response.links : [],
                    technology: Array.isArray(response.technology) ? response.technology : [],
                };

                setUserProjects((prevProjects) => [...prevProjects, formattedProject]);
            }
        } catch (error) {
            console.error("Error adding project:", error);
            throw new Error(error);
        }
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