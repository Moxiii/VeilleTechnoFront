import "./Technology.scss"
import {useTechnologyStore} from "@store/TechnologyStore"
import {useUserStore} from "@store/UserStore";
import {lazy, Suspense, useEffect, useState} from "react";
const PopUpModal = lazy(() => import("@components/Modal/PopUpModal/PopUpModal"));
export default function Technology() {
  const userTechnology = useUserStore(state => state.userTechnology);
  const addTechnology = useTechnologyStore(state => state.addTechnology);
  const getCat = useTechnologyStore(state=>state.getCategory)
  const category = useTechnologyStore(state=>state.category)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [technologyName, setTechnologyName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  useEffect(() => {
     getCat();
  },[getCat]);
  const handleAddTechnology = async (e) => {
    e.preventDefault();
    try{
      const newTechno = {
        name: technologyName.trim(),
      }
      await addTechnology(newTechno)
      setTechnologyName("");
    }catch  {
      alert("Project not added");
    }
  }
  console.log(userTechnology);
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
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              {category.map(c => (
                  <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button type="submit">Add</button>
          </form>
        </div>
      </PopUpModal>
      </Suspense>
      <ul>
        {userTechnology.map(tech => (
            <li key={tech.id}>
              <p><strong>{tech.name}</strong> ({tech.category?.type || "non catégorisé"})</p>
              {tech.projects.length > 0 ? (
                  <ul>
                    {tech.projects.map((project, i) => (
                        <li key={i}>{project.projectName}</li>
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