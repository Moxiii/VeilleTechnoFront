import s from "./ResourceDashboard.module.scss";
import { useRessourcesStore } from "@store/RessourcesStore";
import ResourceCard from "../ResourceCard/ResourceCard";
export default function ResourceDashboard({ onAdd, onView }) {
  const resources = useRessourcesStore((state) => state.ressources);
  return (
    <section className={s.dashboard}>
      <header className={s.header}>
        <h2>Ressources</h2>
        <button
          type="button"
          className={s.addButton}
          onClick={onAdd}
          aria-label="Add resource"
        >
          +
        </button>
      </header>
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          onView={onView}
        />
      ))}
    </section>
  );
}
