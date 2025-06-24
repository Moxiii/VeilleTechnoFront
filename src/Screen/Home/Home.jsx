import "./Home.scss"
import StyledTable from '@components/StyledTable/StyledTable.jsx';
import TechnoChart from '@components/Chart/TechnoChart/TechnoChart.jsx';
import {useUserStore} from '@store/UserStore';
import {useProjectStore} from "@store/ProjectStore.js";
import {lazy, Suspense, useEffect, useState} from "react";
const PopUpModal = lazy(() => import("@components/Modal/PopUpModal/PopUpModal"));
export default function Home(){
const userProjects = useUserStore().userProjects;

const {addProject , removeProject , updateProjectById} = useProjectStore();
const status = useProjectStore((state) => state.status);
const getStatus = useProjectStore((state) => state.getStatus);
useEffect(() => {
    getStatus();
},[getStatus])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const[projectName, setProjectName] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const handleAddProject = async (e) => {
        e.preventDefault();
        try{
            const newProject = {
                projectName: projectName.trim(),
                ...(selectedStatus && {status: selectedStatus})
            }
            await addProject(newProject)
            setProjectName("");
        }catch  {
            alert("Project not added");
        }
    }
    const handleDeleteProject = async (id) => {


    }
    const handleUpdateProject = async (id) => {

    }
    return (
        <div className="home">
            <h1>Overview</h1>
            <div onClick={()=>setIsModalOpen(true)}><h2>Add a project</h2></div>

            <Suspense fallback={<div>Loading...</div>}>
            <PopUpModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}  title="Add project" >
                <div className="project-modal">
                    <form onSubmit={handleAddProject}>
                        <input
                            type="text"
                            value={projectName}
                            placeholder="Name of the project"
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                        <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                            <option value=""> Default Status</option>
                            {status.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </PopUpModal>
            </Suspense>
            <StyledTable projects={userProjects} onDelete={handleDeleteProject} onUpdate={handleUpdateProject}/>
            <TechnoChart projects={userProjects} />
    </div>)
}