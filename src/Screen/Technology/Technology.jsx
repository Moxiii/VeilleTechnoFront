import "./Technology.scss"
import {useUserData} from "../../DATA/Context/UserContext";
export default function Technology() {
  const {userTechnology} = useUserData();
  return (
    <div className="technology">
    <h1>Technology</h1>
      <ul>
        {userTechnology && userTechnology.map(tech => (
            <li key={tech.id}>
              <p><strong>{tech.name}</strong> ({tech.category || "non catégorisé"})</p>
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