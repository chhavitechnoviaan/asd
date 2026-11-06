import { useCallback, useEffect, useState } from "react";
import { FiBell, FiRefreshCw, FiCheck, FiArrowLeft } from "react-icons/fi";
import API from "../../api/axios";

export default function AdminNotifications({ onBack, onChanged }) {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await API.get("/notifications");
      setItems(Array.isArray(data?.data) ? data.data : []);
    } catch (e) {
      setError(
        e.response?.data?.message || "Notifications could not be loaded",
      );
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    reload();
  }, [reload]);
  const markRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      setItems((old) =>
        old.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      );
      onChanged?.();
    } catch (e) {
      setError(
        e.response?.data?.message || "Unable to mark notification as read",
      );
    }
  };
  const markAll = async () => {
    try {
      await API.put("/notifications/read-all");
      setItems((old) => old.map((n) => ({ ...n, isRead: true })));
      onChanged?.();
    } catch (e) {
      setError(e.response?.data?.message || "Unable to update notifications");
    }
  };
  const unread = items.filter((n) => !n.isRead).length;
  const filtered = items.filter(
    (n) => filter === "all" || (filter === "unread" ? !n.isRead : n.isRead),
  );
  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <header className="flex flex-wrap items-center justify-end gap-3">
        {/* <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-50 rounded-2xl text-[#0D9488]">
            <FiBell size={23} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#002259]">Notifications</h1>
            <p className="text-sm text-slate-500">
              {unread} unread · {items.length} total
            </p>
          </div>
        </div> */}
        <div className="flex items-center ju gap-2">
          <button
            onClick={onBack}
            className="rounded-xl border px-3 py-2 flex gap-2 items-center text-sm"
          >
            <FiArrowLeft /> Dashboard
          </button>
          <button
            onClick={reload}
            className="rounded-xl border px-3 py-2 flex gap-2 items-center text-sm"
          >
            <FiRefreshCw /> Refresh
          </button>
          <button
            onClick={markAll}
            disabled={!unread}
            className="rounded-xl bg-[#14B8A6] disabled:opacity-40 px-4 py-2 text-white text-sm"
          >
            Mark all read
          </button>
        </div>
      </header>
      <div className="rounded-2xl bg-white border border-teal-100 p-3 flex gap-2">
        {["all", "unread", "read"].map((v) => (
          <button
            key={v}
            onClick={() => setFilter(v)}
            className={`capitalize rounded-xl px-4 py-2 text-sm font-semibold ${filter === v ? "bg-[#14B8A6] text-white" : "bg-slate-50 text-slate-600 hover:bg-teal-50"}`}
          >
            {v}
          </button>
        ))}
      </div>
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-100 bg-red-50 p-4 text-red-700"
        >
          {error}
        </div>
      )}
      <section className="space-y-3">
        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center text-slate-500">
            Loading notifications…
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl bg-white border p-10 text-center text-slate-500">
            No notifications in this category.
          </div>
        ) : (
          filtered.map((n) => (
            <article
              key={n._id}
              className={`rounded-2xl border p-5 shadow-sm ${n.isRead ? "bg-white border-slate-200" : "bg-gradient-to-r from-[#EFFCF9] to-white border-teal-200"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-semibold text-[#002259]">{n.title}</h3>
                <time className="text-xs text-slate-500">
                  {n.createdAt
                    ? new Date(n.createdAt).toLocaleString("en-IN")
                    : ""}
                </time>
              </div>
              <p className="text-sm text-slate-600 mt-2">{n.message}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs rounded-full bg-teal-50 text-teal-700 px-2 py-1">
                  {n.category || "Activity"}
                </span>
                {!n.isRead && (
                  <button
                    onClick={() => markRead(n._id)}
                    className="flex gap-1 items-center text-sm font-medium text-teal-700"
                  >
                    <FiCheck /> Mark read
                  </button>
                )}
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
