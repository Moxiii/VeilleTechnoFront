import "./Home.scss";
import AddButton from "@components/AddButton/AddButton";
import { lazy, Suspense, useState } from "react";
import { useProjectStore } from "@store/ProjectStore";
import ProjectDashboard from "@components/Project/ProjectDashboard/ProjectDashboard";
import ProjectForm from "@components/Project/ProjectForm/ProjectFrom";

const PopUpModal = lazy(
  () => import("@components/Modal/PopUpModal/PopUpModal"),
);
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateProjectById, addProject, removeProject } = useProjectStore();
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitProject = async (data) => {
    if (selectedProject) {
      await updateProjectById(selectedProject.id, data);
    } else {
      await addProject(data);
    }
    setIsModalOpen(false);
    setSelectedProject(null);
  };
  const handleEditProject = async () => {
    console.log("edit");
  };
  const handleDeleteProject = async () => {
    console.log("delete");
  };
  const handleAddProject = async () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };
  const handleViewFeatures = async () => {
    console.log("features");
  };
  const handleViewDetails = async () => {
    console.log("details");
  };
  const handleViewResource = async () => {
    console.log("Ressources");
  };
  return (
    <div className="home">
      <h1>Overview</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <PopUpModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedProject ? "update project" : "Add project"}
        >
          <ProjectForm
            project={selectedProject}
            onSubmit={handleSubmitProject}
            onCancel={handleCloseModal}
          />
        </PopUpModal>
      </Suspense>
      <ProjectDashboard
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
        onAdd={handleAddProject}
        onDetails={handleViewDetails}
        onFeatures={handleViewFeatures}
        onResources={handleViewResource}
      />
    </div>
  );
}
