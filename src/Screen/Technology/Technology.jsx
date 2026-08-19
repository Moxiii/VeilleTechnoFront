import "./Technology.scss";
import { useTechnologyStore } from "@store/TechnologyStore";
import { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "@components/AddButton/AddButton";
const PopUpModal = lazy(
  () => import("@components/Modal/PopUpModal/PopUpModal"),
);
const ModalView = lazy(
  () => import("@components/TechnologyComponent/ModalView/ModalView"),
);
const ModalEdit = lazy(
  () => import("@components/TechnologyComponent/ModalEdit/ModalEdit"),
);
const TechTable = lazy(
  () => import("@components/TechnologyComponent/Table/TechTable"),
);

export default function Technology() {
  const navigate = useNavigate();
  const { loadUserTechnology } = useTechnologyStore();
  const [editTechnology, setEditTechnology, addTechnology] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    loadUserTechnology();
  }, []);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleNavigateToResssource = (res) => {
    setSelectedRessource(res);
    navigate("/ressources");
  };
  return (
    <div className="technology">
      <h1>Technology</h1>
      <AddButton label="technology" onClick={() => setIsModalOpen(true)} />
      <TechTable
        onView={(tech) => setSelectedTech(tech)}
        onEdit={(tech) => setEditTechnology(tech)}
      />
      {selectedTech && (
        <ModalView tech={selectedTech} onClose={() => setSelectedTech(null)} />
      )}

      {editTechnology && (
        <ModalEdit
          tech={editTechnology}
          onClose={() => setEditTechnology(null)}
        />
      )}
      {isModalOpen && (
        <PopUpModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Rapport PDF"
        >
          test
        </PopUpModal>
      )}
    </div>
  );
}
