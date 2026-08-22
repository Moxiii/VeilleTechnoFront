import s from "./ProjectFrom.module.scss";
import { useTechnologyStore } from "@store/TechnologyStore";
import { useEffect, useState } from "react";
export default function ProjectForm({ project = null, onSubmit, onCancel }) {
  const [projectName, setProjectName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [links, setLinks] = useState([""]);
  const [selectedTechIds, setSelectedTechIds] = useState([]);
  const [pdfDescription, setPdfDescription] = useState("");
  const technologies = useTechnologyStore((state) => state.technology) ?? [];
  useEffect(() => {
    if (project) {
      setProjectName(project.name || "");
      setSelectedStatus(project.status || "");
      setStartDate(project.startDate || "");
      setEndDate(project.endDate || "");
      setLinks(project.links?.length ? [...project.links] : [""]);
      setSelectedTechIds(project.technology?.map((tech) => tech.id) || []);
      setPdfDescription(project.pdfDescription || "");
    } else {
      setProjectName("");
      setSelectedStatus("");
      setStartDate("");
      setEndDate("");
      setLinks([""]);
      setSelectedTechIds([]);
      setPdfDescription("");
    }
  }, [project]);
  const addLinkField = () => {
    setLinks([...links, ""]);
  };
  const handleLinkChange = (index, value) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };
  const removeLinkField = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };
  const handleSubmitProject = (e) => {
    e.preventDefault();

    const projectData = {
      name: projectName.trim(),
      status: selectedStatus || undefined,
      links: links.filter((link) => link.trim() !== ""),
      technology: selectedTechIds,
      startDate,
      endDate,
      pdfDescription,
    };

    onSubmit(projectData);
  };

  const handleTechnologyChange = (id) => {
    setSelectedTechIds((current) =>
      current.includes(id)
        ? current.filter((techId) => techId !== id)
        : [...current, id],
    );
  };

  return (
    <form className={s.form} onSubmit={handleSubmitProject}>
      <div className={s.field}>
        <label htmlFor="project-name">Project name</label>
        <input
          id="project-name"
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="My awesome project"
          required
        />
      </div>
      <div className={s.field}>
        <label htmlFor="project-status">Status</label>

        <select
          id="project-status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Select a status</option>

          <option value="prototype">Prototype</option>

          <option value="onGoing">En cours</option>

          <option value="production">Production</option>

          <option value="ended">Terminé</option>
        </select>
      </div>

      <div className={s.dates}>
        <div className={s.field}>
          <label htmlFor="start-date">Start date</label>

          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
      </div>

      <div className={s.field}>
        <label>Technologies</label>

        <div className={s.technologies}>
          {technologies.map((technology) => (
            <label key={technology.id} className={s.checkbox}>
              <input
                type="checkbox"
                checked={selectedTechIds.includes(technology.id)}
                onChange={() => handleTechnologyChange(technology.id)}
              />

              <span>{technology.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={s.field}>
        <label>Project links</label>

        {links.map((link, index) => (
          <div key={index} className={s.linkRow}>
            <input
              type="url"
              value={link}
              placeholder="https://..."
              onChange={(e) => handleLinkChange(index, e.target.value)}
            />

            {links.length > 1 && (
              <button type="button" onClick={() => removeLinkField(index)}>
                −
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addLinkField}>
          + Add link
        </button>
      </div>

      <div className={s.field}>
        <label htmlFor="pdf-description">Description</label>

        <textarea
          id="pdf-description"
          value={pdfDescription}
          onChange={(e) => setPdfDescription(e.target.value)}
          placeholder="Description used for the project presentation..."
        />
      </div>

      <div className={s.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>

        <button type="submit">
          {project ? "Update project" : "Create project"}
        </button>
      </div>
    </form>
  );
}
