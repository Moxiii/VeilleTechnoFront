import "./Technology.scss";
import { useTechnologyStore } from "@store/TechnologyStore";
import { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ModalView = lazy( () => import("@components/TechnologyComponent/ModalView/ModalView"),);
const ModalEdit = lazy(
  () => import("@components/TechnologyComponent/ModalEdit/ModalEdit"),
);
const TechTable = lazy(
  () => import("@components/TechnologyComponent/Table/TechTable"),
);

export default function Technology() {
  const navigate = useNavigate();
  const { loadUserTechnology } = useTechnologyStore();
  const [editTechnology, setEditTechnology , addTechnology] = useState(null);
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
      <div className="clickable" onClick={() => addTechnology({})}>
        <h2>Add a Technology</h2>
      </div>
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
                    {pdfUrl ? (
                      <iframe
                        src={pdfUrl}
                        width="100%"
                        height="600px"
                        title="PDF Report"
                      ></iframe>
                    ) : (
                      <p>Loading PDF...</p>
                    )}
                  </PopUpModal>
                )}
    </div>
  );
}
