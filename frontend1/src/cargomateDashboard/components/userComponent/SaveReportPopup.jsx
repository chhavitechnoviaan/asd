



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



export default function SaveReportPopup({ onClose, reportData, description = "", dataSource = "AI CargoMate Assistant" }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-6 overflow-y-auto "> 
     <div className="bg-white rounded-lg  px-3 py-2"> 
      <div className="flex items-start justify-between ">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Save Report
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiX size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Save this report for future reference.
      </p>
   </div>
     </div>
 
   
  );
}