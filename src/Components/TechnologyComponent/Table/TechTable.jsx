import "./TechTable.scss";
import {useTechnologyStore} from "@store/TechnologyStore";
import { useRessourcesStore } from "@src/DATA/Store/RessourcesStore";
import { useMemo } from "react";
export default function TechTable({onView , onEdit}){
    const {technology} = useTechnologyStore();
    const {ressources} = useRessourcesStore();

    const parents = useMemo(
        ()=> technology.filter(t=> !t.parentId)
    ,[technology])

    const children = useMemo(
        ()=> technology.filter(t=>t.parent)
    ,[technology])

    const  getChildCount = (parentId) => {
        children.filter(c=>c.parent?.id === parentId).length
    }
    const getResourceCount = (techId) => {
        ressources.filter(r=>r.technology?.id === techId).length
    }
    const getProjectCount = (tech) =>
    tech.projects?.length ?? 0;
    
return (
    <table className="tech-table">
      <thead>
        <tr>
          <th>Technologie</th>
          <th>Parent</th>
          <th>Ressources</th>
          <th>Sous-tech</th>
          <th>Projets</th>
          <th>Training</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {technology.map((tech) => (
          <tr key={tech.id}>
            <td onClick={() => onView(tech)} className="clickable">
              {tech.name}
            </td>
            <td>{tech.parent?.name ?? "—"}</td>
            <td>{getResourceCount(tech.id)}</td>
            <td>{getChildCount(tech.id)}</td>
            <td>{getProjectCount(tech)}</td>
            <td>{tech.trainingTime}</td>
            <td>
              <button onClick={() => onEdit(tech)}>edit</button>
              <button onClick={() => onEdit(tech)}>delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
