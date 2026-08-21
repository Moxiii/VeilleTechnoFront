import s from "./ActivityDasboard.module.scss";
import ActivityCard from "../ActivityCard/ActivityCard";
export default function ActivityDashboard({ onView }) {
  const activities = [
    {
      id: 1,
      action: "created",
      entityType: "project",
      entityId: 12,
      entityName: "Portfolio",
      createdAt: "2026-08-21T09:30:00",
    },
    {
      id: 2,
      action: "updated",
      entityType: "project",
      entityId: 8,
      entityName: "VeilleTechno",
      createdAt: "2026-08-21T08:45:00",
    },
    {
      id: 3,
      action: "created",
      entityType: "resource",
      entityId: 23,
      entityName: "Three.js Journey",
      createdAt: "2026-08-20T17:20:00",
    },
    {
      id: 4,
      action: "deleted",
      entityType: "resource",
      entityId: 19,
      entityName: "Ancienne documentation",
      createdAt: "2026-08-20T15:10:00",
    },
  ];
  return (
    <section className={s.dashboard}>
      <header className={s.header}>
        <h2>Activity</h2>
      </header>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} onView={onView} />
      ))}
    </section>
  );
}
