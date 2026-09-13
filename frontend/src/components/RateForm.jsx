import { useEffect, useState } from "react";
import FileUpload from "./FileUpload";

const emptyForm = {
  service: "",
  executive_level: "",
  rate: "",
  status: "Active",
  created_user: "admin",
  updated_user: "",
  comments: "",
};

export default function RateForm({ editing, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [removeAttachment, setRemoveAttachment] = useState(false);

  useEffect(() => {
    setForm(editing ? { ...emptyForm, ...editing, updated_user: "admin" } : emptyForm);
    setFile(null);
    setErrors({});
    setRemoveAttachment(false);
  }, [editing]);

  const handleChange = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const validate = () => {
    const next = {};
    if (!form.service.trim()) next.service = "Service is required.";
    if (!form.executive_level.trim())
      next.executive_level = "Executive Level is required.";
    if (!form.rate) next.rate = "Rate is required.";
    else if (
      Number(form.rate) <= 0 ||
      !/^\d+(\.\d{1,2})?$/.test(String(form.rate))
    )
      next.rate = "Rate must be a positive number with at most 2 decimal places.";
    setErrors(next);
    return !Object.keys(next).length;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const data = new FormData();

    // Send ONLY the editable fields — never the file path or read-only fields
    const fields = [
      "service",
      "executive_level",
      "rate",
      "status",
      "created_user",
      "updated_user",
      "comments",
    ];
    fields.forEach((key) => {
      const value = form[key];
      if (value !== null && value !== undefined) data.append(key, value);
    });

    // Attach a file only if the user actually picked one
    if (file) data.append("attachment", file);

    // Ask the backend to remove the existing file (only if no new file chosen)
    if (removeAttachment && !file) data.append("remove_attachment", "true");

    onSubmit(data);
  };

  return (
    <form className="rate-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="eyebrow">{editing ? "Update record" : "New record"}</p>
          <h2>{editing ? `Edit ${editing.sr_id}` : "Add new MI product rate"}</h2>
        </div>
        {editing && (
          <button
            type="button"
            className="close-button"
            onClick={onCancel}
            aria-label="Close form"
          >
            ×
          </button>
        )}
      </div>

      <label>
        Service *
        <input
          name="service"
          value={form.service}
          onChange={handleChange}
          placeholder="e.g. MI - Retail"
        />
        {errors.service && <span className="error">{errors.service}</span>}
      </label>

      <label>
        Executive level *
        <input
          name="executive_level"
          value={form.executive_level}
          onChange={handleChange}
          placeholder="e.g. Senior Manager"
        />
        {errors.executive_level && (
          <span className="error">{errors.executive_level}</span>
        )}
      </label>

      <label>
        Rate *
        <input
          name="rate"
          type="number"
          step="0.01"
          min="0"
          value={form.rate}
          onChange={handleChange}
          placeholder="e.g. 1500.00"
        />
        {errors.rate && <span className="error">{errors.rate}</span>}
      </label>

      <label>
        Status
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </label>

      <FileUpload
        file={file}
        onChange={setFile}
        existingUrl={editing?.attachment_url}
        removeAttachment={removeAttachment}
        onRemoveToggle={() => setRemoveAttachment((v) => !v)}
      />

      <label>
        Comments
        <input
          name="comments"
          value={form.comments}
          onChange={handleChange}
          placeholder="Optional remarks"
        />
      </label>

      <div className="form-actions">
        <button className="button primary" type="submit">
          {editing ? "Update" : "Create"}
        </button>
        {editing && (
          <button type="button" className="button quiet" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}