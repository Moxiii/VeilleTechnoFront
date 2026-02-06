import "./Ideas.scss";
import { useIdeasStore } from "@store/IdeasStore";
import { useRessourcesStore } from "@store/RessourcesStore.js";
import { lazy, useEffect, useState } from "react";

const PopUpModal = lazy(() =>
  import("@components/Modal/PopUpModal/PopUpModal")
);
const IdeasCard = lazy(() =>
  import("@components/Card/IdeasCard/IdeasCard.jsx")
);

export default function Ideas() {
  const { ideas, addIdeas, updateIdeasById, removeIdeas, loadUserIdeas } =
    useIdeasStore();
  const { ressources } = useRessourcesStore();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const [selectedIdea, setSelectedIdea] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    links: [""],
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadUserIdeas();
  }, [loadUserIdeas]);

  const openViewModal = (idea) => {
    setSelectedIdea(idea);
    setIsViewModalOpen(true);
  };

  const openAddModal = () => {
    setEditMode(false);
    setFormData({ title: "", description: "", links: [""] });
    setIsFormModalOpen(true);
  };

  const openEditModal = () => {
    if (!selectedIdea) return;

    setEditMode(true);
    setFormData({
      title: selectedIdea.title,
      description: selectedIdea.description,
      links: selectedIdea.links ?? [""],
    });

    setIsViewModalOpen(false);
    setIsFormModalOpen(true);
  };

  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsFormModalOpen(false);
    setSelectedIdea(null);
  };

  const handleSubmit = async () => {
    const data = {
      title: formData.title,
      description: formData.description,
      links: formData.links,
    };

    if (editMode && selectedIdea) {
      await updateIdeasById(selectedIdea.id, data);
    } else {
      await addIdeas(data);
    }

    closeModals();
  };

  const handleDelete = async () => {
    if (!selectedIdea) return;
    await removeIdeas(selectedIdea.id);
    closeModals();
  };

  return (
    <div className="ideas">
      <h1>Ideas</h1>

      <div className="clickable" onClick={openAddModal}>
        <h2>Add an Idea</h2>
      </div>

      <div className="ideas-grid">
        {ideas.map((idea) => (
          <IdeasCard
            key={idea.id}
            title={idea.title}
            onClick={() => openViewModal(idea)}
          />
        ))}
      </div>

      {isViewModalOpen && (
        <PopUpModal
          isOpen={isViewModalOpen}
          onClose={closeModals}
          title={selectedIdea.title}
        >
          <div className="idea-view">
            <p>{selectedIdea.description}</p>

            {selectedIdea.ressourcesIds?.length > 0 && (
              <>
                <h4>Linked ressources</h4>
                <ul>
                  {selectedIdea.ressourcesIds
                    .map((rid) => ressources.find((r) => r.id === rid))
                    .filter(Boolean)
                    .map((res) => (
                      <li key={res.id}>
                        {res.name} — <a href={res.url}>{res.url}</a>
                      </li>
                    ))}
                </ul>
              </>
            )}

            <button onClick={openEditModal}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </PopUpModal>
      )}

      {isFormModalOpen && (
        <PopUpModal
          isOpen={isFormModalOpen}
          onClose={closeModals}
          title={editMode ? "Update Idea" : "Add Idea"}
        >
          <div className="idea-form">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <input
              type="text"
              value={formData.links[0]}
              placeholder="Ideas links"
              onChange={(e) =>
                setFormData({ ...formData, links: [e.target.value] })
              }
            />
            <button onClick={handleSubmit}>
              {editMode ? "Update" : "Create"}
            </button>
          </div>
        </PopUpModal>
      )}
    </div>
  );
}
