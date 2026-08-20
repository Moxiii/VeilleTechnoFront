import "./Home.scss";
import { lazy, Suspense, useState } from "react";
import { useProjectStore } from "@store/ProjectStore";
import { useRessourcesStore } from "@store/RessourcesStore";
import ProjectDashboard from "@components/Project/ProjectDashboard/ProjectDashboard";
import ProjectForm from "@components/Project/ProjectForm/ProjectFrom";
import ResourceForm from "@components/ResourcesQuickAdd/ResourceForm/ResourceForm";
import ResourceDashboard from "@components/ResourcesQuickAdd/ResourceDashboard/ResourceDashboard";
const PopUpModal = lazy(
  () => import("@components/Modal/PopUpModal/PopUpModal"),
);
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateProjectById, addProject, removeProject } = useProjectStore();
  const addRessource = useRessourcesStore((state) => state.addRessource);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalType, setModalType] = useState(null);
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
  const handleSubmitResource = async (data) => {
    await addRessource(data);
  };
  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  const handleDeleteProject = async (project) => {
    try {
      await removeProject(project.id);
    } catch (error) {
      console.error("Unable to delete project:", error);
    }
  };
  const handleAddProject = async () => {
    setSelectedProject(null);
    setModalType("project");
    setIsModalOpen(true);
  };
  const handleAddResource = () => {
    setModalType("resource");
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
          title={
            modalType === "project"
              ? selectedProject
                ? "Update project"
                : "Add project"
              : "Add resource"
          }
        >
          {modalType === "project" && (
            <ProjectForm
              project={selectedProject}
              onSubmit={handleSubmitProject}
              onCancel={handleCloseModal}
            />
          )}
          {modalType === "resource" && (
            <ResourceForm
              onSubmit={handleSubmitProject}
              onCancel={handleCloseModal}
            />
          )}
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
      <ResourceDashboard
        onAdd={handleAddResource}
        onView={handleViewResource}
      />
    </div>
  );
}
