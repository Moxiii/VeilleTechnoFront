import "./Ressources.scss"
import {useUserStore} from "@/DATA/Store/UserStore";
export default function Ressources() {
  const userRessources = useUserStore().userRessources;
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