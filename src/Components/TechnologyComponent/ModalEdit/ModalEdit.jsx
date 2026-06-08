const PopUpModal = lazy(() => import("@components/Modal/PopUpModal/PopUpModal"));
const {addTechnology , removeTechnology , updateTechnologyById , loadUserTechnology , technology} = useTechnologyStore();
  const [editTechnology, setEditTechnology] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [technologyName, setTechnologyName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState([]);
  const [selectedLinkedTechs, setSelectedLinkedTechs] = useState([]);
  const [customCategoryName, setCustomCategoryName] = useState("");
  const [customCategoryType, setCustomCategoryType] = useState("");
export default function ModalEdit(){
useEffect(() => {
          if(editTechnology) {
              setTechnologyName(editTechnology.name);
              setSelectedCategoryId(editTechnology.category);
          }
      },[editTechnology]);
      function cleanUp(){
          setTechnologyName("");
          setSelectedCategoryId(null)
          setIsModalOpen(false);
      }
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
              if(isModalOpen){
                  setIsModalOpen(false);
              }
          } else {
              await addTechnology(newTechno);
          }
        cleanUp()
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
          cleanUp()
      }

      
}
      

