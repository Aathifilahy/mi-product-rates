export default function DeleteConfirm({ record, onConfirm, onCancel }) {
  if (!record) return null;
  return <div className="modal-backdrop"><section className="modal" role="dialog" aria-modal="true" aria-labelledby="delete-title"><h3 id="delete-title">Confirm Delete</h3><p>Are you sure you want to delete <strong>{record.sr_id}</strong> - {record.service} ({record.executive_level})?</p><div className="modal-actions"><button className="button quiet" onClick={onCancel}>Cancel</button><button className="button danger" onClick={onConfirm}>Delete</button></div></section></div>;
}
