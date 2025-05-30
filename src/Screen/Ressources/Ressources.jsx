import "./Ressources.scss"
import {useUserData} from "../../DATA/Context/UserContext";
export default function Ressources() {
  const {userRessources} = useUserData();
  return (
    <div className="ressources">
    <h1>Ressources</h1>
      {userRessources.map((item, index) => (
          <div key={index} className="ressource">
            <p>{item.technology.name + " "}</p>
            <p>{item.label + " "}</p>
            <p>{item.url + " "}</p>
          </div>
      ))}
    </div>
  );
}