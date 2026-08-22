import s from "./ActivityDasboard.module.scss";
import ActivityCard from "../ActivityCard/ActivityCard";
import EmptyState from "@dashboards/EmptyState/EmptyState";
export default function ActivityDashboard({ onView, activities = [] }) {
  activities = [
    {
      id: 1,
      action: "created",
      entityType: "project",
      entityId: 12,
      entityName: "Portfolio",
      createdAt: "2026-08-21T09:30:00Z",
    },
    {
      id: 2,
      action: "updated",
      entityType: "project",
      entityId: 8,
      entityName: "VeilleTechno",
      createdAt: "2026-08-21T08:45:00Z",
    },
    {
      id: 3,
      action: "created",
      entityType: "resource",
      entityId: 23,
      entityName: "Three.js Journey",
      createdAt: "2026-08-20T17:20:00Z",
    },
  ];
  return (
    <section className={s.dashboard}>
      <header className={s.header}>
        <h2>Activity</h2>
      </header>
      <div className={s.content} data-lenis-prevent>
        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onView={onView}
            />
          ))
        ) : (
          <EmptyState
            title="No activity yet"
            description="Your recent actions will appear here."
          />
        )}
      </div>
    </section>
  );
}
