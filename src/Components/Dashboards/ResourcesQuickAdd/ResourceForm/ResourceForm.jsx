import { useEffect, useState } from "react";
import s from "./ResourceForm.module.scss";
import { useTechnologyStore } from "@src/DATA/Store/TechnologyStore";
export default function ResourceForm({ resource = null, onSubmit, onCancel }) {
  const technologies = useTechnologyStore((state) => state.technology) ?? [];

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([""]);
  const [type, setType] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [technologyId, setTechnologyId] = useState("");
  useEffect(() => {
    if (resource) {
      setName(resource.name || "");
      setUrl(resource.url || "");
      setLabel(resource.label || "");
      setDescription(resource.description || "");
      setTags(resource.tags?.length ? [...resource.tags] : [""]);
      setType(resource.type || "");
      setCategoryId(resource.categoryId || "");
      setTechnologyId(resource.technology?.id || "");
    } else {
      setName("");
      setUrl("");
      setLabel("");
      setDescription("");
      setTags([""]);
      setType("");
      setCategoryId("");
      setTechnologyId("");
    }
  }, [resource]);
  const addTagField = () => {
    setTags((current) => [...current, ""]);
  };
  const handleTagChange = (index, value) => {
    setTags((current) => current.map((tag, i) => (i === index ? value : tag)));
  };

  const removeTagField = (index) => {
    setTags((current) => current.filter((_, i) => i !== index));
  };
  const handleSubmitResource = (e) => {
    e.preventDefault();

    const resourceData = {
      name: name.trim(),
      url: url.trim(),
      label: label.trim(),
      description: description.trim(),
      tags: tags.map((tag) => tag.trim()).filter(Boolean),
      type: type || undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
      technologyId: technologyId ? Number(technologyId) : undefined,
    };

    onSubmit(resourceData);
  };
  return (
    <form className={s.form} onSubmit={handleSubmitResource}>
      <div className={s.field}>
        <label htmlFor="resource-name">Name</label>
        <input
          type="text"
          id="resource-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Resource name"
          required
        />
      </div>
      <div className={s.field}>
        <label htmlFor="resource-url">URL</label>

        <input
          id="resource-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          required
        />
      </div>

      <div className={s.field}>
        <label htmlFor="resource-label">Label</label>

        <input
          id="resource-label"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Formation"
        />
      </div>

      <div className={s.field}>
        <label htmlFor="resource-type">Type</label>

        <input
          id="resource-type"
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Course"
        />
      </div>

      <div className={s.field}>
        <label htmlFor="resource-technology">Technology</label>

        <select
          id="resource-technology"
          value={technologyId}
          onChange={(e) => setTechnologyId(e.target.value)}
        >
          <option value="">Select a technology</option>

          {technologies.map((technology) => (
            <option key={technology.id} value={technology.id}>
              {technology.name}
            </option>
          ))}
        </select>
      </div>

      <div className={s.field}>
        <label htmlFor="resource-category">Category</label>

        <input
          id="resource-category"
          type="number"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          placeholder="Category ID"
        />
      </div>

      <div className={s.field}>
        <label>Tags</label>

        {tags.map((tag, index) => (
          <div key={index} className={s.tagRow}>
            <input
              type="text"
              value={tag}
              placeholder="React"
              onChange={(e) => handleTagChange(index, e.target.value)}
            />

            {tags.length > 1 && (
              <button type="button" onClick={() => removeTagField(index)}>
                −
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addTagField}>
          + Add tag
        </button>
      </div>

      <div className={s.field}>
        <label htmlFor="resource-description">Description</label>

        <textarea
          id="resource-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe this resource..."
        />
      </div>

      <div className={s.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>

        <button type="submit">
          {resource ? "Update resource" : "Create resource"}
        </button>
      </div>
    </form>
  );
}
