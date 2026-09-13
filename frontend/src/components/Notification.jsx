export default function Notification({ type, message, onClose }) {
  if (!message) return null;
  return <div className={`notification ${type}`} role="alert"><span>{message}</span><button type="button" onClick={onClose} aria-label="Dismiss notification">×</button></div>;
}
