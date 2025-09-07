import "./Home.scss"
import StyledTable from '@components/StyledTable/StyledTable.jsx';
import TechnoChart from '@components/Chart/TechnoChart/TechnoChart.jsx';

import {useProjectStore} from "@store/ProjectStore";
import {useTechnologyStore} from "@store/TechnologyStore";
import {lazy, Suspense, useEffect, useState} from "react";
const PopUpModal = lazy(() => import("@components/Modal/PopUpModal/PopUpModal"));
export default function Home(){
const userTechnology = useTechnologyStore((state)=> state.technology);
const {addProject , removeProject , updateProjectById , projects , status  , loadUserProjects} = useProjectStore();

const [editProject, setEditProject] = useState(null);
const[projectName, setProjectName] = useState("");
const [selectedStatus, setSelectedStatus] = useState("");
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [links, setLinks] = useState([""]);
const [selectedTechIds, setSelectedTechIds] = useState([]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [lastUpdated, setLastUpdated] = useState("");
const [isStarted, setIsStarted] = useState(false);
    useEffect(() => {
        if(editProject){
            setProjectName(editProject.name);
            setSelectedStatus(editProject.status || "");
            setLinks(editProject.links?.length ? [...editProject.links] : [""]);
            setSelectedTechIds(editProject.technology?.map(t => t.id) || []);
        }
    },[editProject]);


const handleStatusChange = (s) =>{
    setSelectedStatus(s);
    const today = new Date().toISOString().split("T")[0];
    if (s === "onGoing" || s === "prototype" && isStarted ){
        setStartDate(today);
    } else if (s === "endend"){
        setEndDate(today);
    }
    else if(s === "production"){
        setLastUpdated(today);
    }
}

    const handleSubmitProject = async (e) => {
        e.preventDefault();
        const projectData = {
            projectName: projectName.trim(),
            status: selectedStatus || undefined,
            links: links.filter(link => link.trim() !== ""),
            technology: selectedTechIds,
            endDate:endDate,
            startDate: startDate,
        }
        try{
            if(editProject){
                await updateProjectById(editProject.id , projectData)
            } else {
                await addProject(projectData)
            }

            setProjectName("");
            setSelectedStatus("");
            setLinks([""]);
            setSelectedTechIds([]);
            setEditProject(null);
            setIsModalOpen(false);
            loadUserProjects();
        }catch  {
            alert("Project not submitted");
        }
    }
    const handleCloseModal = () => {
        if(editProject){
            setEditProject(null);

        }
        setIsModalOpen(false);
    }
    const handleDeleteProject = async (id) => {
        await removeProject(id)

    }
    const handleUpdateProject = async (id) => {
        const project = projects.find(p => p.id === id);
        if(!project)return;
        setIsModalOpen(true);
        setEditProject(project);
        setProjectName(project.projectName || '');
        setSelectedStatus(project.status || '');
        setStartDate(project.startDate || '');
        setEndDate(project.endDate || '');
        setSelectedTechIds(project.technology?.map(t => t.id) || []);
        setLinks(project.links?.length > 0 ? project.links : [""]);


    }
    const addLinkField = () => {
        setLinks([...links, ""]);
    };
    const handleLinkChange = (index, value) => {
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);
    };
    const removeLinkField = (index) => {
        const newLinks = [...links];
        newLinks.splice(index, 1);
        setLinks(newLinks);
    };
    return (
        <div className="home">
            <h1>Overview</h1>
            <div className="clickable" onClick={()=> {
                setIsModalOpen(true)
                setEditProject(null);
            }}
            ><h2>Add a project</h2></div>

            <Suspense fallback={<div>Loading...</div>}>
            <PopUpModal  isOpen={isModalOpen} onClose={handleCloseModal}  title={editProject ? "Update" :  "Add"} >
                <div className="project-modal">
                    <form onSubmit={handleSubmitProject}>
                        <input
                            type="text"
                            value={projectName}
                            placeholder="Name of the project"
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                        <select value={selectedStatus} onChange={e => handleStatusChange(e.target.value)}>
                            <option value="">Default Status</option>
                            <option value="prototype">Prototype</option>
                            <option value="onGoing">En cours</option>
                            <option value="production">Production</option>
                            <option value="ended">Terminé</option>
                        </select>
                        {links.map((link, index) => (
                            <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <input
                                    type="url"
                                    placeholder={`Link ${index + 1}`}
                                    value={link}
                                    onChange={(e) => handleLinkChange(index, e.target.value)}
                                />
                                {links.length > 1 && (
                                    <button type="button" onClick={() => removeLinkField(index)}>Remove</button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={addLinkField}>Add Link</button>
                        <div className="tech-checkbox-group">
                            <p>Select technologies:</p>
                            {userTechnology.map(tech => (
                                <label key={tech.id} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedTechIds.includes(tech.id)}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setSelectedTechIds(prev =>
                                                isChecked ? [...prev, tech.id] : prev.filter(id => id !== tech.id)
                                            );
                                        }}
                                    />
                                    {tech.name}
                                </label>
                            ))}
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </PopUpModal>
            </Suspense>
            {projects && <StyledTable projects={projects} onDelete={handleDeleteProject} onUpdate={handleUpdateProject}/>}
            <TechnoChart projects={projects} />
    </div>)
}