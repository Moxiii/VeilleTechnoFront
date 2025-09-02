import "./Technology.scss"
import {useTechnologyStore} from "@store/TechnologyStore"
import {useRessourcesStore} from "@store/RessourcesStore";
import {lazy, Suspense, useEffect, useState} from "react";


const PopUpModal = lazy(() => import("@components/Modal/PopUpModal/PopUpModal"));
export default function Technology() {
  const {addTechnology , removeTechnology , updateTechnologyById , category, getCategory , loadUserTechnology , technology} = useTechnologyStore();
  const {loadUserRessources , ressources} = useRessourcesStore();
  const [editTechnology, setEditTechnology] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [technologyName, setTechnologyName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [customCategoryName, setCustomCategoryName] = useState("");
  const [customCategoryType, setCustomCategoryType] = useState("");
  useEffect(() => {
     getCategory();
  },[getCategory]);
  useEffect(() => {
    loadUserTechnology();
  },[])
    useEffect(() => {loadUserRessources();},[])
    useEffect(() => {
        if(editTechnology) {
            setTechnologyName(editTechnology.name);
            setSelectedCategory(editTechnology.category);
        }
    },[editTechnology]);
  const handleSubmitTechnology = async (e) => {
    e.preventDefault();
    const newTechno = {
          name: technologyName.trim(),
          category: selectedCategory.trim()
      }
    try{
        if(editTechnology) {
            await updateTechnologyById( editTechnology.id, newTechno);
        } else {
            await addTechnology(newTechno);
        }
      setTechnologyName("");
      await loadUserTechnology()
    }catch  {
      alert("Technology not added");
    }
  }
    const handleUpdateTechnology = async (id) => {
        const tech = technology.find(t=>t.id === id);
        if (!tech)return;
        setIsModalOpen(true);
        setEditTechnology(tech);
        setTechnologyName(tech.name);
        setSelectedCategory(tech.category);
    }
  const handleDeleteTechnology = async(id) => {
    await removeTechnology(id)
  }
    const handleCloseModal = () => {
        if(editTechnology){
            setEditTechnology(null);
        }
        setTechnologyName("");
        setSelectedCategory(null)
        setIsModalOpen(false);
    }

  return (
    <div className="technology">
    <h1>Technology</h1>
      <div className="clickable" onClick={()=>setIsModalOpen(true)}><h2>Add a Technology</h2></div>
      <Suspense fallback={<div>Loading...</div>}>
      <PopUpModal isOpen={isModalOpen} onClose={handleCloseModal}  title={editTechnology ? "Udpate" : "Add"} >
        <div className="technology-modal">
          <form>
            <input
                type="text"
                value={technologyName}
                placeholder="Name of the technology"
                onChange={(e) => setTechnologyName(e.target.value)}
            />
            <div className="tech-checkbox-group">
              <p>Select Category:</p>
              {category.map(cat => (
                  <label key={cat}>
                    <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            if (e.target.value !== "Other") {
                                setCustomCategoryName(null);
                                setCustomCategoryType(null);
                            }

                    }}
                    />
                    {cat}
                  </label>
              ))}
                {selectedCategory === "other" && (
                    <div className="custom-category">
                    <input type="text"
                           placeholder={"Custom cat name"}
                           value={customCategoryName}
                           onChange={(e) => setCustomCategoryName(e.target.value)}
                    />
                    <input type="text"
                           placeholder={"Custom cat type"}
                           value={customCategoryType}
                           onChange={(e) => setCustomCategoryType(e.target.value)}
                    />
                    </div>
                )}
            </div>
            <button onClick={handleSubmitTechnology}>{editTechnology ? "submit" : "add"}</button>
          </form>
        </div>
      </PopUpModal>
      </Suspense>
      <ul>
        {technology.map(tech => (
            <li key={tech.id || tech.name}>
              <h3 ><strong>{tech.name}</strong> ({tech.category?.type || "non catégorisé"})</h3>
              <button onClick={()=> handleUpdateTechnology(tech.id)}>Update technology</button>
              <button onClick={()=> handleDeleteTechnology(tech.id)}>Delete technology</button>
              <p>Associated project : </p>
              {tech.projects.length > 0 ? (
                  <ul>
                    {tech.projects.map((project, i) => (
                        <li key={i}>{project.name}</li>
                    ))}
                  </ul>
              ) : (
                  <em>Aucun projet lié</em>
              )}

                {ressources.filter((res)=> res.technology?.id === tech.id) && <p>Ressources : </p>}

                {ressources
                    .filter((res)=> res.technology?.id === tech.id)
                    .map((res) => (
                    <li key={res.id}>
                        <a href={res.url} target="_blank" rel="noreferrer">{res.name} </a>
                    </li>
                ))}
            </li>
        ))}
      </ul>
    </div>
  );
}