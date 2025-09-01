import "./Ressources.scss"
import {useRessourcesStore} from "@store/RessourcesStore";
import useGroupedRessources from "@memo/groupedByTechAndLabel";
import {lazy, Suspense, useEffect, useState} from "react";
import {useTechnologyStore} from "@store/TechnologyStore.js";
const PopUpModal = lazy(() => import("@components/Modal/PopUpModal/PopUpModal"));

export default function Ressources() {
const {loadUserRessources , ressources ,addRessource, removeRessource, updateRessourceById , getLabel , label} = useRessourcesStore();
    const { technology , loadUserTechnology} = useTechnologyStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resourceUrl, setResourceUrl] = useState("");
    const [selectedLabel, setSelectedLabel] = useState("");
    const [selectedTechId, setSelectedTechId] = useState(null);
  useEffect(() => {loadUserRessources();}, []);
  useEffect(() => {getLabel();}, []);
  useEffect(() => {loadUserTechnology();}, []);
  const grouped = useGroupedRessources(ressources);
    const handleAddRessource = async (e) => {
        e.preventDefault();
        if (!selectedTechId || !selectedLabel || !resourceUrl.trim()) {
            alert("All fields are required");
            return;
        }
        try{
            const newRessource = {
                technologyId: selectedTechId,
                label: selectedLabel,
                url: resourceUrl.trim(),
            };
            await addRessource(newRessource)
            setResourceUrl("");
            setSelectedLabel("");
            setSelectedTechId(null);
            await loadUserRessources()
        }catch  {
            alert("Ressources not added");
        }
    }

    const handleDeleteRessource = async(id) => {
        await removeRessource(id)
    }
  return (
    <div className="ressources">
    <h1>Ressources</h1>

          <div className="ressource">
              <div className="clickable" onClick={()=>setIsModalOpen(true)}><h2>Add a Ressource</h2></div>
            {Array.from(grouped.entries()).map(([tech, labelMap]) => (
                <div key={tech}>
                  <h2>{tech}</h2>
                  {Array.from(labelMap.entries()).map(([label, items]) => (
                      <div key={label}>
                        <h4>{label}</h4>
                        <ul>
                          {items.map((res) => (
                              <li key={res.id}>
                                <a href={res.url} target="_blank" rel="noreferrer">
                                  {res.url}
                                </a>
                                  <button onClick={()=> handleDeleteRessource(res.id)}>Delete ressource</button>
                              </li>
                          ))}
                        </ul>
                      </div>
                  ))}

                </div>
            ))}
          </div>

        <Suspense fallback={<div>Loading...</div>}>
            <PopUpModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}  title="Add Ressource" >
                <div className="ressource-modal">
                    <form onSubmit={handleAddRessource}>
                        <input
                            type="url"
                            value={resourceUrl}
                            placeholder="Url of the ressource"
                            onChange={(e) => setResourceUrl(e.target.value)}
                        />
                        <div className="res-input-container">
                            <div className="res-label">
                            <p>Select label:</p>
                            {label.map(lab => (
                                <label key={lab}>
                                    <input
                                        type="radio"
                                        name="label"
                                        value={lab}
                                        checked={selectedLabel === lab}
                                        onChange={(e) => setSelectedLabel(e.target.value)}
                                    />
                                    {lab}
                                </label>
                            ))}</div>
                            <div className="res-tech">
                                <p>Select Technology :</p>
                                <select
                                    value={selectedTechId ?? ""}
                                    onChange={(e) => setSelectedTechId(e.target.value)}
                                >
                                    <option value="">--Select--</option>
                                    {technology.map(tech => (
                                        <option key={tech.id} value={tech.id}>{tech.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button type="submit">Add</button>
                    </form>
                </div>
            </PopUpModal>
        </Suspense>
    </div>
  );
}