import s from "./ActivityCard.module.scss";

export default function ActivityCard({ activity, onView }) {
  return (
    <article className={s.card}>
      <div className={s.info} onClick={onView}>
        <span className={s.name}>{activity.name}</span>
        <span className={s.entityName}>{activity.entityName}</span>
        <time className={s.date} dateTime={activity.createdAt}>
          {activity.createdAt}
        </time>
      </div>
    </article>
  );
}
