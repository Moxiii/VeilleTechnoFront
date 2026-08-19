import s from "./ProjectCard.module.scss";

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <article className={s.card}>
      <div className={s.info}>
        <h3>{project.name}</h3>

        <span className={s.status}>{project.status}</span>
      </div>

      <div className={s.actions}>
        <button
          type="button"
          onClick={() => onEdit(project)}
          aria-label={`Edit ${project.name}`}
        >
          ⋮
        </button>
      </div>
    </article>
  );
}
