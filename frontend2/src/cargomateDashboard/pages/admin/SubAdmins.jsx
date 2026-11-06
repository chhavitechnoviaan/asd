import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import API from "../../api/axios";
const initial = {
  name: "",
  email: "",
  password: "",
  roleId: "",
  status: "active",
};
export default function SubAdmins() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [employees, setEmployees] = useState([]),
    [roles, setRoles] = useState([]),
    [form, setForm] = useState(initial),
    [editing, setEditing] = useState(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const load = async () => {
    try {
      const [a, b] = await Promise.all([
        API.get("/admin/sub-admins"),
        API.get("/roles"),
      ]);
      setEmployees(a.data.data || []);
      setRoles((b.data.data || []).filter((r) => r.internalOnly));
    } catch (e) {
      setError(e.response?.data?.message || "Unable to load staff");
    }
  };
  useEffect(() => {
    load();
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (editing) {
        const payload = { ...form };
        if (!payload.password) delete payload.password;
        await API.patch(`/admin/sub-admins/${editing}`, payload);
      } else await API.post("/admin/sub-admins", form);
      setEditing(null);
      setForm(initial);
      await load();
    } catch (e) {
      setError(e.response?.data?.message || "Unable to save employee");
    } finally {
      setBusy(false);
    }
  };
  const edit = (e) => {
    setEditing(e.id);
    setForm({
      name: e.name,
      email: e.email,
      password: "",
      roleId: e.roleId?._id || "",
      status: e.status,
    });
  };
  return (
    <div className="p-1 md:p-1 bg-[#F7F9FC] min-h-screen space-y-5">
      {/* <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Sub-admin Management
        </h1>
        <p className="text-sm text-slate-500">
          Internal staff accounts only. User and B2B customer accounts remain
          separate.
        </p>
      </div> */}
      {error && (
        <p role="alert" className="text-red-600 p-3 bg-red-50 rounded-xl">
          {error}
        </p>
      )}
      <form
        onSubmit={submit}
        className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <h2 className="font-semibold col-span-full">
          {editing ? "Update Sub-admin" : "Create Sub-admin"}
        </h2>
        <label className="text-sm">
          Name
          <input
            required
            className="w-full mt-1 p-3 border rounded-lg"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label className="text-sm">
          Email
          <input
            type="email"
            required
            className="w-full mt-1 p-3 border rounded-lg"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label className="text-sm">
          {editing ? "New password (optional)" : "Password (12+ characters)"}
          <span className="relative block">
            <input
              type={passwordVisible ? "text" : "password"}
              minLength={12}
              required={!editing}
              className="w-full mt-1 p-3 pr-12 border rounded-lg"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              aria-label={passwordVisible ? "Hide password" : "Show password"}
              onClick={() => setPasswordVisible((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600"
            >
              {passwordVisible ? <FiEyeOff /> : <FiEye />}
            </button>
          </span>
        </label>
        <label className="text-sm">
          Assigned Role
          <select
            required
            className="w-full mt-1 p-3 border rounded-lg"
            value={form.roleId}
            onChange={(e) => setForm({ ...form, roleId: e.target.value })}
          >
            <option value="">Choose role</option>
            {roles.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name} ({r.status || "active"})
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Status
          <select
            className="w-full mt-1 p-3 border rounded-lg"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <div className="flex gap-2 items-end">
          <button
            disabled={busy}
            className="bg-teal-600 text-white rounded-lg py-3 px-5 text-sm font-semibold"
          >
            {busy ? "Saving..." : editing ? "Update" : "Create Account"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm(initial);
              }}
              className="border rounded-lg px-4 py-3 text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto">
        <table className="min-w-[620px] w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              {["Employee", "Email", "Role", "Status", "Action"].map((x) => (
                <th className="text-left p-4" key={x}>
                  {x}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr className="border-t" key={e.id}>
                <td className="p-4 font-semibold">{e.name}</td>
                <td className="p-4">{e.email}</td>
                <td className="p-4">{e.roleId?.name || "—"}</td>
                <td className="p-4 capitalize">{e.status}</td>
                <td className="p-4">
                  <button
                    className="text-teal-700 font-semibold"
                    onClick={() => edit(e)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!employees.length && (
          <p className="p-5 text-sm text-slate-500">
            No sub-admins created yet.
          </p>
        )}
      </div>
    </div>
  );
}
