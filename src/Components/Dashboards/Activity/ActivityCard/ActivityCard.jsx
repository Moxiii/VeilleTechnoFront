import s from "./ActivityCard.module.scss";

export default function ActivityCard({ activity, onView }) {
  const relativeTime = new Intl.RelativeTimeFormat("en", {
    numeric: "always",
  });
  function formatRelativeTime(date) {
    const now = new Date();
    const target = new Date(date);

    const diffInSeconds = (target - now) / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInMonths = diffInDays / 30;
    const diffInYears = diffInDays / 365;

    if (Math.abs(diffInMinutes) < 60) {
      return relativeTime.format(Math.round(diffInMinutes), "minute");
    }

    if (Math.abs(diffInHours) < 24) {
      return relativeTime.format(Math.round(diffInHours), "hour");
    }

    if (Math.abs(diffInDays) < 30) {
      return relativeTime.format(Math.round(diffInDays), "day");
    }

    if (Math.abs(diffInMonths) < 12) {
      return relativeTime.format(Math.round(diffInMonths), "month");
    }

    return relativeTime.format(Math.round(diffInYears), "year");
  }
  return (
    <article className={s.card}>
      <div className={s.info} onClick={onView}>
        <span className={s.action}>{activity.action}</span>
        <span className={s.entityName}>{activity.entityName}</span>

        <time className={s.date} dateTime={activity.createdAt}>
          {formatRelativeTime(activity.createdAt)}
        </time>
      </div>
    </article>
  );
}
