import s from "./ProjectDashboard.module.scss";
import { useProjectStore } from "@store/ProjectStore";
import ProjectCard from "../ProjectCard/ProjectCard";
import FeatureTimeline from "@components/Chart/Timeline/FeatureTimeline/FeatureTimeline.jsx";
export default function ProjectDashboard({ onAdd, onEdit, onDelete }) {
  const projects = useProjectStore((state) => state.projects);

  return (
    <section className={s.dashboard}>
      <header className={s.header}>
        <h2>Projects</h2>
        <button
          type="button"
          className={s.addButton}
          onClick={onAdd}
          aria-label="Add project"
        >
          +
        </button>
      </header>
      <div className={s.projectList}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}
