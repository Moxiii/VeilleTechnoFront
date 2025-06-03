import "./Ressources.scss"
import {useUserStore} from "@store/UserStore";
import useGroupedRessources from "@memo/groupedByTechAndLabel";

export default function Ressources() {
  const userRessources = useUserStore().userRessources;
  const grouped = useGroupedRessources(userRessources);
  return (
    <div className="ressources">
    <h1>Ressources</h1>
          <div className="ressource">
            {Array.from(grouped.entries()).map(([tech, labelMap]) => (
                <div key={tech}>
                  <h2>{tech}</h2>
                  {Array.from(labelMap.entries()).map(([label, items]) => (
                      <div key={label}>
                        <h4>{label}</h4>
                        <ul>
                          {items.map((res, i) => (
                              <li key={i}>
                                <a href={res.url} target="_blank" rel="noreferrer">
                                  {res.url}
                                </a>
                              </li>
                          ))}
                        </ul>
                      </div>
                  ))}
                </div>
            ))}
          </div>

    </div>
  );
}