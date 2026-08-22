import s from "./ResourceCard.module.scss";
import ActionMenu from "@components/Dashboards/ActionMenu/ActionMenu";

export default function ResourceCard({ resource, onView }) {
  return (
    <article className={s.card}>
      <div className={s.info}>
        <span className={s.name}>{resource.name}</span>
      </div>

      <ActionMenu
        data={resource}
        actions={[
          {
            label: "View",
            onClick: onView,
          },
        ]}
      />
    </article>
  );
}
