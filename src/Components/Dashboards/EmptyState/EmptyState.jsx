import s from "./EmptyState.module.scss";
export default function EmptyState({ title, description }) {
  return (
    <div className={s.emptyState}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
