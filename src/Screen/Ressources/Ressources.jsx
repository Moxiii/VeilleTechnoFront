import "./Ressources.scss"
import {useRessourcesStore} from "@store/RessourcesStore";
import useGroupedRessources from "@memo/groupedByTechAndLabel";
import {lazy, Suspense, useEffect, useState} from "react";
import {useTechnologyStore} from "@store/TechnologyStore.js";
import {useCategoryStore} from "@store/CategoryStore.js";
const PopUpModal = lazy(() => import("@components/Modal/PopUpModal/PopUpModal"));

export default function Ressources() {
const {loadUserRessources, ressources ,addRessource, removeRessource, updateRessourceById  , label , setSelectedRessource , selectedRessource} = useRessourcesStore();
    const { technology} = useTechnologyStore();
    const {category} = useCategoryStore();
    const [editRessources, setEditRessources] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resourceUrl, setResourceUrl] = useState("");
    const [ressourceName, setRessourceName] = useState("");
    const [ressourceDescription, setRessourceDescription] = useState("");
    const [selectedLabel, setSelectedLabel] = useState("");
    const [selectedTechId, setSelectedTechId] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
function cleanUP() {
    setRessourceName("")
    setResourceUrl("");
    setSelectedLabel("");
    setSelectedTechId(null);
    setSelectedRessource(null);
    setRessourceDescription("");
    setSelectedTags([]);
    setSelectedCategoryId(null);
    }
  useEffect(() => {
      if(editRessources){
          setRessourceName(editRessources.name);
          setResourceUrl(editRessources.url);
          setSelectedLabel(editRessources.label);
          setSelectedTechId(editRessources.technology.id);
          setRessourceDescription(editRessources.description);
          setSelectedTags(editRessources.tags ?? []);
          setSelectedCategoryId(editRessources.categoryId);
      }
  },[editRessources]);
    useEffect(() => {
        if(selectedRessource){
            setEditRessources(selectedRessource);
            setRessourceName(selectedRessource.name);
            setResourceUrl(selectedRessource.url);
            setSelectedLabel(selectedRessource.label);
            setSelectedTechId(selectedRessource.technologyId);
            setRessourceDescription(selectedRessource.description)
            setSelectedTags(selectedRessource.tags ?? []);
            setSelectedCategoryId(selectedRessource.categoryId);
            setIsModalOpen(true);
        }
    }, [selectedCategoryId, selectedRessource]);
  const grouped = useGroupedRessources(ressources);
    const handleSubmitRessource = async (e) => {
        e.preventDefault();
        if (!selectedTechId || !selectedLabel || !resourceUrl.trim()) {
            alert("All fields are required");
            return;
        }
        const newRessource = {
            name: ressourceName,
            technologyId: selectedTechId,
            label: selectedLabel,
            url: resourceUrl.trim(),
            description: ressourceDescription,
            categoryId: selectedCategoryId,
            tags: selectedTags,
        };
        try{
           if(editRessources){
               await updateRessourceById(editRessources.id , newRessource)
               if(isModalOpen){
                   setIsModalOpen(false);
               }
           } else {
               await addRessource(newRessource);
           }
           cleanUP();

            await loadUserRessources()
        }catch  {
            alert("Ressources not added");
        }
    }
    const handleUpdateRessource = async (id) => {
        const ressource = ressources.find(r=>r.id === id);
        if (!ressource)return;
        setIsModalOpen(true);
        setEditRessources(ressource);
        setRessourceName(ressource.name);
        setResourceUrl(ressource.url);
        setSelectedLabel(ressource.label);
        setSelectedTechId(ressource.technologyId);
        setRessourceDescription(ressource.description);
        setSelectedTags(ressource.tags ?? []);
        setSelectedCategoryId(ressource.categoryId);
    }
    const handleCloseModal = () => {
        if(editRessources){
            setEditRessources(null);
        }
        cleanUP();
        setIsModalOpen(false);
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
                                  {res.name ? res.name : res.url}
                                </a>
                                  <p>Description : {res.description}</p>
                                  {res.tags.length > 0 &&
                                      <div>
                                          <p>Tags : </p>
                                          <ul>{res.tags.map((t , i)=> (<li key={i}>{t}</li>))}
                                          </ul></div>}
                                  <p>Type : {res.type}</p>
                                  <button onClick={()=> handleUpdateRessource(res.id)}>Update ressource</button>
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
            <PopUpModal isOpen={isModalOpen} onClose={handleCloseModal}  title={editRessources ? "udpate" : "add"} >
                <div className="ressource-modal">
                    <form>
                        <input type="text"
                               value={ressourceName}
                               placeholder="Enter ressource name"
                               onChange={(e)=>setRessourceName(e.target.value)}
                        />
                        <input
                            type="url"
                            value={resourceUrl}
                            placeholder="Url of the ressource"
                            onChange={(e) => setResourceUrl(e.target.value)}
                        />
                        <input
                            type="text"
                            value={ressourceDescription}
                            placeholder="Description of the ressource"
                            onChange={(e) => setRessourceDescription(e.target.value)}
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
                            <div className="res-cat">
                                <p>Select Category:</p>
                                <select
                                    value={selectedCategoryId ?? ""}
                                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                                >
                                    <option value="">--Select--</option>
                                    {category.map(category => (
                                        <option key={category.id} value={category.id}>{category.name} ({category.type})</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button onClick={handleSubmitRessource}>{editRessources ? "udpate" : "add"} </button>
                    </form>
                </div>
            </PopUpModal>

        </Suspense>
    </div>
  );
}