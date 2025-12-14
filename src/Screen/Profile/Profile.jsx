import "./Profile.scss";
import { useUserStore } from "@store/UserStore";
import { useProjectStore } from "@store/ProjectStore";
import { useTechnologyStore } from "@store/TechnologyStore";
import { useRessourcesStore } from "@store/RessourcesStore";

import { useAuthStore } from "@store/AUTH/AuthStore";

import StatCard from "@components/Card/StatCard/StatCard";
import BarChart from "@components/Chart/BarChart/BarChart.jsx";
import { useItemsPerMonth } from "@hook/memo/useItemPerMonth.js";
import PopUpModal from "@components/Modal/PopUpModal/PopUpModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userProjects = useProjectStore((state) => state.projects);
  const userRessources = useRessourcesStore((state) => state.ressources);
  const userTechnology = useTechnologyStore((state) => state.technology);
  const logout = useAuthStore((state) => state.logout);
  const { getPdfReport, userData } = useUserStore();
  const navigate = useNavigate();
  const handleclick = async () => {
    logout();
    navigate("/");
  };
  const [pdfUrl, setPdfUrl] = useState(null);
  const totalProjects = userProjects.length;
  const totalRessources = userRessources.length;
  const totalTechnology = userTechnology.length;
  const { data: projectData, labels: projectLabels } =
    useItemsPerMonth(userProjects);
  const { data: techData, labels: techLabels } =
    useItemsPerMonth(userTechnology);
  const { data: ressourcesData, labels: ressourcesLabels } =
    useItemsPerMonth(userRessources);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPdfUrl(null);
  };
  const handleViewPdf = async () => {
    const pdfBlob = await getPdfReport({
      download: false,
      username: userData.username,
    });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
    setIsModalOpen(true);
  };
  return (
    <div className="profile">
      <h1>Profile</h1>
      {userData && (
        <>
          <p>Hello {userData.username} !</p>
          <div className="stat project">
            <StatCard label="Projets" value={totalProjects} />
            <BarChart
              name="Projets par mois"
              label="Projects"
              value={{ labels: projectLabels, data: projectData }}
            />
          </div>
          <div className="stat tech">
            <StatCard label="Technologies" value={totalTechnology} />
            <BarChart
              name="Technologies par mois"
              label="Technologies"
              value={{ labels: techLabels, data: techData }}
            />
          </div>
          <div className="stat ressources">
            <StatCard label="Ressources" value={totalRessources} />
            <BarChart
              name="Ressources par mois"
              label="Ressources"
              value={{ labels: ressourcesLabels, data: ressourcesData }}
            />
          </div>
          <button onClick={() => getPdfReport({ download: true })}>
            Télécharger le PDF
          </button>

          <button onClick={handleViewPdf}>Voir le PDF</button>
          <button onClick={handleclick}>Logout</button>
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
        </>
      )}
    </div>
  );
}
