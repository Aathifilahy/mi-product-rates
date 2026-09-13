import React from "react";

export default function FileUpload({
  file,
  onChange,
  existingUrl,
  removeAttachment,
  onRemoveToggle,
}) {
  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemoveToggle();
  };

  return (
    <div className="file-field">
      <label>
        Attachment (optional)
        <span className="file-picker">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.xlsx"
            onChange={(e) => onChange(e.target.files[0] || null)}
          />
          {file ? file.name : "Choose a file"}
        </span>
      </label>

      {existingUrl && (
        <div className="file-meta">
          {!removeAttachment ? (
            <>
              <a href={existingUrl} target="_blank" rel="noreferrer">
                View file
              </a>
              <button type="button" className="remove" onClick={handleToggle}>
                Remove
              </button>
            </>
          ) : (
            <>
              <span className="warning">Will be removed on save</span>
              <button type="button" className="undo" onClick={handleToggle}>
                Undo
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}