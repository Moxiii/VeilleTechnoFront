import "./Technology.scss"
import {useTechnologyStore} from "@store/TechnologyStore"

import {lazy, Suspense, useEffect, useState} from "react";

const PopUpModal = lazy(() => import("@components/Modal/PopUpModal/PopUpModal"));
export default function Technology() {
  const {addTechnology , removeTechnology , updateTechnologyById , category, getCategory , loadUserTechnology , userTechnology} = useTechnologyStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [technologyName, setTechnologyName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  useEffect(() => {
     getCategory();
  },[getCategory]);
  useEffect(() => {
    loadUserTechnology();
  },[])
  const handleAddTechnology = async (e) => {
    e.preventDefault();
    try{
      const newTechno = {
        name: technologyName.trim(),
        category: selectedCategory.trim()
      }
      console.log(newTechno);
      await addTechnology(newTechno)
      setTechnologyName("");
      await loadUserTechnology()
    }catch  {
      alert("Technology not added");
    }
  }

  const handleDeleteTechnology = async(id) => {
    await removeTechnology(id)
  }

  return (
    <div className="technology">
    <h1>Technology</h1>
      <div className="clickable" onClick={()=>setIsModalOpen(true)}><h2>Add a Technology</h2></div>
      <Suspense fallback={<div>Loading...</div>}>
      <PopUpModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}  title="Add Technology" >
        <div className="technology-modal">
          <form onSubmit={handleAddTechnology}>
            <input
                type="text"
                value={technologyName}
                placeholder="Name of the technology"
                onChange={(e) => setTechnologyName(e.target.value)}
            />
            <div className="tech-checkbox-group">
              <p>Select Category:</p>
              {category.map(cat => (
                  <label key={cat.id}>
                    <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    {cat}
                  </label>
              ))}
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      </PopUpModal>
      </Suspense>
      <ul>
        {userTechnology.map(tech => (
            <li key={tech.id}>
              <h3><strong>{tech.name}</strong> ({tech.category?.type || "non catégorisé"})</h3>
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
            </li>
        ))}
      </ul>
    </div>
  );
}