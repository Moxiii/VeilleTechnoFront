import "./Technology.scss";
import { useTechnologyStore } from "@store/TechnologyStore";
import { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [editTechnology, setEditTechnology] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);

  useEffect(() => {
    loadUserTechnology();
  }, []);

  const handleNavigateToResssource = (res) => {
    setSelectedRessource(res);
    navigate("/ressources");
  };
  return (
    <div className="technology">
      <h1>Technology</h1>
      <div className="clickable" onClick={() => setEditTechnology({})}>
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
    </div>
  );
}
