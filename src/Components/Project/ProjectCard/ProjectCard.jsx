import s from "./ProjectCard.module.scss";

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <article className={s.card}>
      <div className={s.info}>
        <span className={s.name}>{project.name}</span>

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
