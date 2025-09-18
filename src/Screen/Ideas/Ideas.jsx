import "./Ideas.scss"
import {useIdeasStore} from "@store/IdeasStore";
import {lazy, useEffect, useState} from "react";
import {deleteIdeas} from "@fetch/IdeasFetch.js";
const PopUpModal = lazy(() => import("@components/Modal/PopUpModal/PopUpModal"));

export default function Ideas() {
    const {ideas , addIdeas ,updateIdeasById , removeIdeas , loadUserIdeas} = useIdeasStore();
    const [isModalOpen , setIsModalOpen] = useState(false);
    const [editIdeas, setEditIdeas] = useState(null);
    const [selectedRessourceIds, setSelectedRessourceIds] = useState([]);
    const[ideasTitle, setIdeasTitle] = useState("");
    const[ideasDescription, setIdeasDescritpion] = useState("");
    const [ideaLinks, setIdeaLinks] = useState([""]);

    useEffect(() => {loadUserIdeas()},[loadUserIdeas]);
    const cleanUp = () => {
        setIdeasTitle("");
        setIdeasDescritpion("");
        setIdeaLinks([])
    }
    const handleCloseModal = () => {
        if(editIdeas){
            setEditIdeas(null);

        }
        cleanUp();
        setIsModalOpen(false);
    }
    const handleSubmitIdeas = async (e) => {
        e.preventDefault();
        const ideasData = {
            description:ideasDescription,
            title:ideasTitle,

        }
        try{
            if(editIdeas){
                await updateIdeasById(editIdeas.id , ideasData)
            } else {
                await addIdeas(ideasData)
            }

            cleanUp();
            setIsModalOpen(false);
        }catch  {
            alert("Ideas not submitted");
        }
    }
    const handleUpdateIdea = async (id) => {
        const idea = ideas.find(i => i.id === id);
        if(!idea)return;
        setIsModalOpen(true);
        setEditIdeas(idea);
        setIdeasTitle(idea.title);
        setIdeasDescritpion(idea.description);
    }
    const handleDeleteIdea = async (id)=> {
        await deleteIdeas(id);
    }
  return (
    <div className="ideas">
    <h1>Ideas</h1>
        <div className="clickable" onClick={()=> {
            setIsModalOpen(true)
            setEditIdeas(null);
        }}
        ><h2>Add an Idea</h2></div>
        <PopUpModal isOpen={isModalOpen} onClose={handleCloseModal} title={editIdeas ? "update" : "add"}>
            <div className="ideas-modal">
                <input type="text"
                       value={ideasTitle}
                       placeholder="Ideas title"
                       onChange={(e) => setIdeasTitle(e.target.value)}
                />
                <input type="text"
                       value={ideasDescription}
                       placeholder="Ideas description"
                       onChange={(e) => setIdeasDescritpion(e.target.value)}
                />
                <button onClick={handleSubmitIdeas}>{editIdeas ? "update" : "add"}</button>
            </div>
        </PopUpModal>
            {ideas.map(idea => (
                <div key={idea.id}>
                    <h3>{idea.title}</h3>
                    <p>{idea.description}</p>
                    <ul>
                        {idea.tags.length>0 && <p>Tags:</p>}
                        {idea.tags.map((t, i) => (<li key={i}>{t}</li>))}
                    </ul>
                    <button onClick={()=>handleUpdateIdea(idea.id)}>Update Idea</button>
                    <button onClick={()=>handleDeleteIdea(idea.id)}>Delete Idea</button>
                </div>
            ))}
    </div>
  );
}