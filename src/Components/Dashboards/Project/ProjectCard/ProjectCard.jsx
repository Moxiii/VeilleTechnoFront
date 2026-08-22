import s from "./ProjectCard.module.scss";
import ActionMenu from "@components/Dashboards/ActionMenu/ActionMenu";
export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  onFeatures,
  onDetails,
  onResources,
}) {
  return (
    <article className={s.card}>
      <div className={s.info}>
        <span className={s.name}>{project.name}</span>

        <span className={s.status}>{project.status}</span>
      </div>

      <ActionMenu
        data={project}
        onEdit={onEdit}
        onDelete={onDelete}
        actions={[
          {
            label: "Features",
            onClick: onFeatures,
          },
          {
            label: "Details",
            onClick: onDetails,
          },
          {
            label: "Resources",
            onClick: onResources,
          },
        ]}
      />
    </article>
  );
}
