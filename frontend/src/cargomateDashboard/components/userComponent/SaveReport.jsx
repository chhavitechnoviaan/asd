



import ModalShell from "./ModalShell";
import { reportRequest } from "../../../lib/accountApi";
import { useState, useRef } from "react";
import {
  FiX,
  FiTruck,
  FiCalendar,
  FiChevronDown,
  FiInfo,
  FiWifi,
  FiMapPin,
  FiBox,
  FiCheck,
  FiDownload,
  FiAlertTriangle,
  FiEdit3,
  FiLink2,
  FiArrowLeft,
  FiSave,
  FiPlus,
  FiCopy,
  FiStar,
  FiTrendingUp,
  FiDatabase,
  FiAlertCircle,
  FiAnchor,
  FiCpu,
  FiHash,
  FiGift,
  FiMap,
  FiFile,
  FiPackage,
  FiRadio,
  FiFileText,
  FiUsers,
  FiBookmark,
  FiClipboard,
  FiBarChart2,
  FiCreditCard,
  FiBell,
  FiHelpCircle,
  FiSettings,
  FiChevronRight,
  FiShare2,
  FiSend,
  FiClock,
  FiDollarSign,
  FiAward,
  FiShoppingCart,
  FiFolder,
  FiPercent,
  FiShield,
  FiZap,
  FiEye,
  FiCheckCircle,
  FiExternalLink,
  FiUploadCloud,
  FiPhone,
  FiSearch,
  FiMail,
  FiSun,
  FiUser,
  FiGlobe,
  FiMessageSquare,
} from "react-icons/fi";



export default function SaveReportModal({ onClose, reportData, description = "", dataSource = "AI CargoMate Assistant" }) {
  const [reportName, setReportName] = useState("AI CargoMate Report");
  const [saveError, setSaveError] = useState("");
 
  const handleSave = async () => {
    try {
      if (!reportData) throw new Error("No report available. Generate the result before saving.");
      await reportRequest("", "POST", {reportName:reportName.trim()||"Saved Report", description, category:"Analytics & Trends", module:"Analytics", type:"Analytics", dataSource, reportData});
      window.dispatchEvent(new Event("cargomate:report-saved"));
      onClose();
    } catch (error) {
      setSaveError(error.message || "Unable to save report");
    }
  };
 
  return (
    <ModalShell>
      <div className="flex items-start justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Save Report
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiX size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Save this report to access it later from your Saved Reports.
      </p>
 
      {saveError && <p role="alert" className="mt-3 text-sm text-red-600">{saveError}</p>}
      <div className="mt-5">
        <label className="block text-sm font-semibold text-gray-900 mb-1.5">
          Report Name
        </label>
        <input
          type="text"
          value={reportName}
          onChange={(e) => setReportName(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
 
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onClose}
          className="w-full border border-gray-200 bg-white text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="w-full border border-gray-200 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-lg"
        >
          Save Report
        </button>
      </div>
    </ModalShell>
  );
}