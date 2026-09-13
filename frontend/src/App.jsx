import { useEffect, useState } from "react";
import RateForm from "./components/RateForm";
import RateTable from "./components/RateTable";
import DeleteConfirm from "./components/DeleteConfirm";
import Notification from "./components/Notification";
import { createRate, deleteRate, getRates, updateRate } from "./services/api";
import "./styles/App.css";

function extractError(error) {
  const data = error?.response?.data;
  if (!data) return error.message || "Unknown error";
  if (typeof data === "string") return data;
  return Object.entries(data).map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`).join(" | ");
}

export default function App() {
  const [rates, setRates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const notify = (type, message) => setNotification({ type, message });
  const refresh = async () => { setLoading(true); try { const response = await getRates(); setRates(response.data.results || response.data); } catch (error) { notify("error", extractError(error)); } finally { setLoading(false); } };
  useEffect(() => { refresh(""); }, []);
  const save = async (formData) => { try { if (selected) { await updateRate(selected.id, formData); notify("success", "Record updated successfully."); } else { await createRate(formData); notify("success", "Record created successfully."); } setSelected(null); refresh(); } catch (error) { notify("error", extractError(error)); } };
  const remove = async () => { try { await deleteRate(deleting.id); notify("success", "Record deleted successfully."); setDeleting(null); refresh(); } catch (error) { notify("error", extractError(error)); } };
  return <div className="app-shell"><header className="topbar"><div className="brand-mark">MI<span>/</span>RATES</div><div className="topbar-meta">Management information <span className="live-dot" /> Live register</div></header><main className="page"><section className="intro"><div><p className="eyebrow">Service catalog · 2026</p><h1>Product rates<br /><em>with clarity.</em></h1><p className="intro-copy">Keep every service rate current, searchable, and ready for the next decision.</p></div><div className="summary"><strong>{rates.length.toString().padStart(2, "0")}</strong><span>rates in register</span></div></section><section className="workspace"><div className="register-panel"><div className="panel-toolbar"><div><p className="eyebrow">Rate register</p><h2>All product rates</h2></div></div><RateTable records={rates} loading={loading} onEdit={setSelected} onDelete={setDeleting} /></div><aside><RateForm editing={selected} onSubmit={save} onCancel={() => setSelected(null)} /></aside></section></main><Notification {...notification} onClose={() => setNotification({ type: "", message: "" })} /><DeleteConfirm record={deleting} onCancel={() => setDeleting(null)} onConfirm={remove} /></div>;
}
