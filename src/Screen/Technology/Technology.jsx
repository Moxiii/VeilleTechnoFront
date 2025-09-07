import "./Technology.scss"
import {useTechnologyStore} from "@store/TechnologyStore"
import {useRessourcesStore} from "@store/RessourcesStore";
import {useCategoryStore} from "@store/CategoryStore";
import {lazy, Suspense, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


const PopUpModal = lazy(() => import("@components/Modal/PopUpModal/PopUpModal"));
export default function Technology() {
    const navigate = useNavigate();
  const {addTechnology , removeTechnology , updateTechnologyById , loadUserTechnology , technology} = useTechnologyStore();
  const { category , loadUserCategories } = useCategoryStore();
  const {loadUserRessources , ressources , setSelectedRessource} = useRessourcesStore();
  const [editTechnology, setEditTechnology] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [technologyName, setTechnologyName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState([]);
  const [selectedLinkedTechs, setSelectedLinkedTechs] = useState([]);
  const [customCategoryName, setCustomCategoryName] = useState("");
  const [customCategoryType, setCustomCategoryType] = useState("");
  useEffect(() => {
     loadUserCategories();
  },[loadUserCategories]);
  useEffect(() => {
    loadUserTechnology();
  },[])
    useEffect(() => {loadUserRessources();},[])
    useEffect(() => {
        if(editTechnology) {
            setTechnologyName(editTechnology.name);
            setSelectedCategoryId(editTechnology.category);
        }
    },[editTechnology]);
  const handleSubmitTechnology = async (e) => {
    e.preventDefault();
    const newTechno = {
        name: technologyName.trim(),
        categoryId:selectedCategoryId,
        subCategory:customCategoryName || null,
        linkedTechnologies:selectedLinkedTechs,
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
        setSelectedCategoryId(tech.category);
    }
  const handleDeleteTechnology = async(id) => {
    await removeTechnology(id)
  }
    const handleCloseModal = () => {
        if(editTechnology){
            setEditTechnology(null);
        }
        setTechnologyName("");
        setSelectedCategoryId(null)
        setIsModalOpen(false);
    }
    const handleNavigateToResssource = (res) =>{
      setSelectedRessource(res);
      navigate("/ressources");
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
              {category?.map(cat => (
                  <label key={cat.id}>
                    <input
                        type="radio"
                        name="category"
                        value={cat.id}
                        checked={selectedCategoryId === cat.id}
                        onChange={() => {
                            setSelectedCategoryId(cat.id);

                    }}
                    />
                      {cat.defaultCategory ? cat.type : cat.name}
                  </label>
              ))}
                {selectedCategoryId === "other" && (
                    <div className="custom-category">
                    <input type="text"
                           placeholder={"Custom cat name"}
                           value={customCategoryName}
                           onChange={(e) => setCustomCategoryName(e.target.value)}
                    />
                    <select
                        multiple
                        value={selectedLinkedTechs}
                        onChange={(e) => {
                            const values = Array.from(e.target.selectedOptions , opt => opt.value);
                            setSelectedLinkedTechs(values);
                        }}
                    >
                        {technology.map((tech)=>(
                            <option
                                key={tech.id || tech.name}
                                value={tech.id}>
                                {tech.name}
                            </option>
                        ))}
                    </select>
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
            <div key={tech.id}>
              <h3 ><strong>{tech.name}</strong> (
                  {tech.category?.defaultCategory
                      ? tech.category?.type
                      : tech.category?.name || "non catégorisé"
                  }
                  )</h3>
              <button onClick={()=> handleUpdateTechnology(tech.id)}>Update technology</button>
              <button onClick={()=> handleDeleteTechnology(tech.id)}>Delete technology</button>

              {tech.projects.length > 0 ? (
                  <div className="associate-projects">
                  <p>Associated project : </p>
                  <ul>
                    {tech.projects.map((project, i) => (
                        <li key={i}>{project.name}</li>
                    ))}
                  </ul>
    </div>) : (
                  <em>Aucun projet lié</em>
              )}
                { ressources.filter((res) => res.technology.id === tech.id).length>0 && <p>Ressources :</p>}

                            {ressources
                                .filter((res) => res.technology.id === tech.id)
                                .map((res) => (
                                            <div  key={res.id}>
                                                {res.name}
                                                {res.description && <p>Description rapide : {res.description}</p>}
                                                <button onClick={()=> window.open(res.url , "_blank", "noopener,noreferrer")}>
                                                    Visit
                                                </button>
                                                <button onClick={()=>handleNavigateToResssource(res)} > update </button>
                                            </div>
                                ))}



            </div>
        ))}
      </ul>
    </div>
  );
}