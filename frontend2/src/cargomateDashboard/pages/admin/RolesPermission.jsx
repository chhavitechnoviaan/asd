import Swal from "sweetalert2";
import { useState } from "react";
import {
  FaPlus,
  FaUser,
  FaUserTie,
  FaUserGear,
  FaUserShield,
  FaUserCheck,
} from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import API from "../../api/axios";
import { glassSuccess, glassError } from "../../utils/glassAlert";
import { useEffect } from "react";

const Toggle = ({ checked, onChange }) => (
  <div
    onClick={() => onChange(!checked)}
    className={`w-6 h-6 rounded-md flex items-center justify-center cursor-pointer border transition ${
      checked ? "bg-teal-500 border-teal-500" : "bg-gray-100 border-gray-300"
    }`}
  >
    {checked && <span className="text-white text-xs">✓</span>}
  </div>
);

const moduleMap = {
  Dashboard: "dashboard",
  Users: "users",
  "Vendors / Partners": "vendors",
  "Plans / Subscription": "plans",
  "Master Data": "masterData",
  "HS Rules": "hsRules",
  "Country Rules": "countryRules",
  "DGFT Schemes": "dgftSchemes",
  Shipments: "shipment",
  Documents: "documents",
  "AI Assistant": "aiAssistant",
  "Ad Management": "ads",
  Support: "support",
  Settings: "settings",
  "Booking Requests": "booking",
  Tracking: "tracking",
  "Roles & Permissions": "roles",
  "Sub-admin Management": "subAdmins",
};
const modules = Object.keys(moduleMap);
const permKeys = ["view", "add", "edit", "delete"];

function AddUserModal({ onClose, onAdd }) {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState("");

  const [saving, setSaving] = useState(false);
  const handleAdd = async () => {
    if (!roleName.trim() || saving) return;
    setSaving(true);
    try {
      const created = await onAdd({
        roleName,
        description,
        users: parseInt(users) || 0,
      });
      if (created) onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-800">
            Add New Role
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Role Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
              placeholder="Enter role name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Description
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Users
            </label>
            <input
              type="number"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
              placeholder="Number of users"
              value={users}
              onChange={(e) => setUsers(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={saving}
            className="flex-1 px-4 py-2.5 text-sm text-white bg-teal-500 rounded-xl hover:bg-teal-600 font-medium transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Add Role"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RolesPermission({ openCreateIntent = 0 }) {
  const [roles, setRoles] = useState([]);
  const [selectedId, setSelectedId] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showRight, setShowRight] = useState(false);
  useEffect(() => {
    if (openCreateIntent > 0) setShowModal(true);
  }, [openCreateIntent]);

  const selected = roles.find((r) => r.id === selectedId);

  const fetchRoles = async () => {
    try {
      const res = await API.get("/roles");

      const roleColors = [
        "bg-blue-500",
        "bg-orange-400",
        "bg-gray-400",
        "bg-indigo-500",
        "bg-green-500",
        "bg-purple-500",
      ];

      const roleIcons = [
        <FaUserTie className="text-white text-lg" />,
        <FaUserShield className="text-white text-lg" />,
        <FaUserGear className="text-white text-lg" />,
        <FaUserCheck className="text-white text-lg" />,
        <FaUser className="text-white text-lg" />,
      ];

      const formatted = res.data.data.map((r, i) => ({
        id: r._id,
        name: r.name,
        users: r.userCount,
        permissions: r.permissions,
        color: roleColors[i % roleColors.length],
        icon: roleIcons[i % roleIcons.length],
        description: r.description || "Internal staff role",
        status: r.status || "active",
      }));

      setRoles(formatted);

      if (formatted.length > 0) {
        setSelectedId(formatted[0].id);
      }
    } catch (err) {
      glassError(
        "Unable to load roles",
        err?.response?.data?.message || "Please check your access",
      );
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const togglePerm = (mod, key) => {
    const backendKey = moduleMap[mod];

    setRoles((prev) =>
      prev.map((r) =>
        r.id === selectedId
          ? {
              ...r,
              permissions: {
                ...r.permissions,
                [backendKey]: {
                  ...(r.permissions?.[backendKey] || {}),
                  [key]: !(r.permissions?.[backendKey]?.[key] || false),
                },
              },
            }
          : r,
      ),
    );
  };

  const handleSave = async () => {
    try {
      const selectedRole = roles.find((r) => r.id === selectedId);

      await API.put(`/roles/${selectedId}`, {
        name: selectedRole.name,
        status: selectedRole.status,
        description: selectedRole.description,
        permissions: selectedRole.permissions,
      });

      await glassSuccess(
        "Permissions updated",
        "Role permissions saved successfully.",
      );
    } catch (err) {
      await glassError(
        "Unable to save permissions",
        err?.response?.data?.message || "Please try again",
      );
    }
  };

  const handleAddRole = async ({ roleName, description }) => {
    try {
      await API.post("/roles", {
        name: roleName,
        description,
        status: "active",
        permissions: {},
      });

      await glassSuccess(
        "Role created",
        "New staff role is available for assignment.",
      );

      await fetchRoles();
      return true;
    } catch (err) {
      await glassError(
        "Unable to create role",
        err?.response?.data?.message || "Please try again",
      );
      return false;
    }
  };

  const handleDeleteRole = async () => {
    if (!selected) return;
    const decision = await Swal.fire({
      title: `Delete ${selected.name}?`,
      text: "Roles assigned to staff cannot be deleted until employees are reassigned.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete Role",
      confirmButtonColor: "#0D9488",
      cancelButtonColor: "#64748b",
    });
    if (!decision.isConfirmed) return;
    try {
      await API.delete(`/roles/${selectedId}`);
      await glassSuccess("Role deleted", "Role removed successfully.");
      setSelectedId(null);
      await fetchRoles();
    } catch (error) {
      await glassError(
        "Cannot delete role",
        error.response?.data?.message || "Please try again",
      );
    }
  };

  const handleRoleClick = (id) => {
    setSelectedId(id);
    setShowRight(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-1 sm:p-1">
      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddRole}
        />
      )}

      <div className="max-w-6xl mx-auto ">
        <div className="mb-6 flex w-full items-center justify-end ">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0A8981] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#08756F]"
          >
            <FaPlus />
            Create Role
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* LEFT - ROLES LIST */}
          <div
            className={`w-full lg:w-72 xl:w-80 flex-shrink-0 ${showRight ? "hidden lg:block" : "block"}`}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                Roles
              </h2>
              <div className="flex flex-col gap-2">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => handleRoleClick(role.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                      selectedId === role.id
                        ? "border-teal-200 bg-teal-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {/* ICON */}
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${role.color}`}
                    >
                      {role.icon}
                    </div>

                    {/* TEXT */}
                    <div className="flex flex-col">
                      <p className="text-lg font-medium text-gray-800">
                        {role.name}
                      </p>

                      <p className="text-xs text-gray-400">
                        {role.description}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {role.users} sub-admins · {role.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - PERMISSIONS TABLE */}
          <div
            className={`flex-1 min-w-0 ${showRight ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-2">
                  {showRight && (
                    <button
                      onClick={() => setShowRight(false)}
                      className="lg:hidden w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <FaTimes />
                    </button>
                  )}
                  <h2 className="text-xl font-semibold text-gray-800">
                    {selected?.name}
                  </h2>
                  {selected && (
                    <select
                      aria-label="Role status"
                      value={selected.status || "active"}
                      onChange={(e) =>
                        setRoles((prev) =>
                          prev.map((r) =>
                            r.id === selectedId
                              ? { ...r, status: e.target.value }
                              : r,
                          ),
                        )
                      }
                      className="text-xs border rounded-lg p-2"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    type="button"
                    disabled={!selected}
                    onClick={handleDeleteRole}
                    className="border border-rose-200 text-rose-600 hover:bg-rose-50 text-sm px-3 py-2 rounded-xl"
                  >
                    Delete
                  </button>
                  <button
                    disabled={!selected}
                    onClick={handleSave}
                    className="bg-teal-500 hover:bg-teal-600 text-sm text-white px-3 py-2 rounded-xl"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[380px]">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="text-left text-sm font-semibold text-[#0D9488] px-4 py-3 w-1/2">
                        MODULE
                      </th>

                      {permKeys.map((k) => (
                        <th
                          key={k}
                          className="text-left text-sm font-semibold text-[#0D9488] px-4 py-3 uppercase"
                        >
                          {k}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((mod) => (
                      <tr
                        key={mod}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        {/* MODULE NAME */}
                        <td className="text-sm text-gray-700 px-4 py-4 font-medium">
                          {mod}
                        </td>

                        {/* PERMISSIONS */}
                        {permKeys.map((key) => (
                          <td key={key} className="text-center py-3">
                            <div className="flex justify-center">
                              <Toggle
                                checked={
                                  selected?.permissions[moduleMap[mod]]?.[
                                    key
                                  ] || false
                                }
                                onChange={() => togglePerm(mod, key)}
                              />
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 border border-teal-200 bg-teal-50/50 rounded-xl p-4">
                <p className="text-xs text-gray-600">
                  <span className="font-semibold text-gray-700">
                    Permission changes:{" "}
                  </span>
                  Saved updates apply on the next protected backend request.
                  Sub-admin permissions do not change customer subscription
                  quotas. Other operations remain restricted until their API
                  permission checks are implemented.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
