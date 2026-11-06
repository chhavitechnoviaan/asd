// mahima code //

import { useEffect, useState } from "react";
import {
  MapPin,
  Pencil,
  FileText,
  FileSignature,
  Share2,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  Lock,
  X,
  ExternalLink,
  ChevronRight,
  User,
  Building,
  Mail,
  Phone,
  Calendar,
  Box,
  Truck,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import {
  FaPlus,
  FaMagnifyingGlass,
  FaXmark,
  FaChevronDown,
  FaStar,
  FaTruck,
  FaBoxOpen,
  FaWarehouse,
  FaFileContract,
} from "react-icons/fa6";

const tabs = [
  "Shipment Details",
  "Parties & Contacts",
  "Cargo Details",
  "Documents",
  "Charges",
];

import PartiesContact from "./Parties&Contact";
import CargoDetails from "./CargoDetails";
import Documents from "./Documents";
import Charges from "./Charges";
import ShipmentDetails from "./ShipmentDetails";
import CreateNewInvoice from "./CreateNewInvoice";
import QuotationModal from "./Quotation";
import ViewInvoiceModal from "../../components/b2bComponent/viewInvoice";
import API from "../../api/axios";
import {
  getShipmentDetails,
  getQuotationByShipment,
  approveShipment,
  rejectShipment,
  holdShipment,
  updateShipment,

} from "../../services/shipmentApi";

export default function ReviewShipment({ shipmentId, onClose }) {
  const [activeTab, setActiveTab] = useState("Shipment Details");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null); // { type: 'success' | 'error' | 'warning', message: '' }

  const [viewShipmentDetail, setViewShipmentDetail] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState(false);
  const [quotation, setQuotation] = useState(null);
  const [quotationHistory, setQuotationHistory] = useState([]);
  const [showSavedQuotation, setShowSavedQuotation] = useState(false);
  const [selectedSavedQuotation, setSelectedSavedQuotation] = useState(null);
  const [existingInvoice, setExistingInvoice] = useState(null);
  const [showExistingInvoice, setShowExistingInvoice] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [quotationUpdating, setQuotationUpdating] = useState(false);

  // Edit States
  const [editBasicInfo, setEditBasicInfo] = useState(false);
  const [editRoute, setEditRoute] = useState(false);
  const [editCargo, setEditCargo] = useState(false);
  const [editAdditionalInfo, setEditAdditionalInfo] = useState(false);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const formatDateForInput = (date) => {
    if (!date) return "";
    try {
      return new Date(date).toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const formatDateForDisplay = (date) => {
    if (!date) return "-";
  
    const parsedDate = new Date(date);
  
    if (Number.isNaN(parsedDate.getTime())) return "-";
  
    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // State forms
  const [basicInfo, setBasicInfo] = useState({
    shipmentType: "",
    transportMode: "",
    incoterm: "",
    priority: "Medium",
    referenceNo: "",
    bookingNo: "",
    etd: "",
    eta: "",
  });

  const initialRoute = {
    origin: "",
    destination: "",
    placeOfReceipt: "",
    finalDelivery: "",
  };
  const [route, setRoute] = useState(initialRoute);
  const [originalRoute, setOriginalRoute] = useState(initialRoute);

  const initialCargo = {
    productName: "",
    hsCode: "",
    packagingType: "",
    totalPackages: "",
    netWeight: "",
    grossWeight: "",
    volume: "",
    volumetricWeight: "",
    cargoDescription: "",
  };
  const [cargo, setCargo] = useState(initialCargo);
  const [originalCargo, setOriginalCargo] = useState(initialCargo);

  const initialAdditionalInfo = {
    specialInstructions: "",
    insuranceRequired: "No",
    inspectionRequired: "No",
    remarks: "",
  };
  const [additionalInfo, setAdditionalInfo] = useState(initialAdditionalInfo);
  const [originalAdditionalInfo, setOriginalAdditionalInfo] =
    useState(initialAdditionalInfo);

  // Sync Data Helper
  const syncShipmentState = (data) => {
    setShipment(data);
  
    const cleanNumStr = (val) => {
      if (val === null || val === undefined || val === "") return "";
      return String(val);
    };
  
    const cargoData = data.cargo || {};
  
    // HS Code: manually entered value first, then populated HSCode reference
    const hsCodeValue =
    cargoData.hsCodeText ||
    cargoData.hsCode?.hsCode ||
    cargoData.hsCode?.code ||
    cargoData.hsCode?.hsCodeCode ||
    cargoData.hsCode?.name ||
    (typeof cargoData.hsCode === "string"
      ? cargoData.hsCode
      : "") ||
    "";
  
    // Basic Information
    setBasicInfo({
      shipmentType: data.shipmentType || "-",
      transportMode: data.shipmentMode || data.route?.mode || "-",
      incoterm: data.incoterm || "-",
      priority: data.priority || "Medium",
      referenceNo: data.referenceNumber || data.sbNumber || "-",
      bookingNo: data.bookingNo || "",
      etd: formatDateForInput(data.etd),
      eta: formatDateForInput(data.eta || data.expectedEta),
    });
  
    // Route
    const routeData = {
      origin:
        [data.route?.originCity, data.route?.originCountry]
          .filter(Boolean)
          .join(", ") || "-",
      destination:
        [data.route?.destinationCity, data.route?.destinationCountry]
          .filter(Boolean)
          .join(", ") || "-",
      placeOfReceipt: data.route?.originCity || "",
      finalDelivery: data.route?.destinationCity || "",
    };
  
    setRoute(routeData);
    setOriginalRoute(routeData);
  
    // Cargo
    // CBM and volumetric weight are different measurements.
    // Keep CBM sourced only from the saved CBM fields; never use KG as CBM.
    const rawVolume =
      cargoData.volumeCBM ??
      cargoData.volume ??
      "";
    const rawVolumetricWeight = cargoData.volumetricWeight ?? "";
  
    const rawNetWeight = cargoData.netWeight ?? cargoData.weight ?? "";
    const rawGrossWeight = cargoData.grossWeight ?? "";
    const rawPackages =
      cargoData.packages ??
      cargoData.quantity ??
      cargoData.totalPackages ??
      "";
  
    const cargoState = {
      productName: cargoData.productName || cargoData.name || "",
      hsCode: hsCodeValue,
      packagingType:
        cargoData.packingType ||
        cargoData.packagingType ||
        data.additionalInformation?.packagingType ||
        "",
      totalPackages: cleanNumStr(rawPackages),
      netWeight: cleanNumStr(rawNetWeight),
      grossWeight: cleanNumStr(rawGrossWeight),
      volume: cleanNumStr(rawVolume),
      volumetricWeight: cleanNumStr(rawVolumetricWeight),
      cargoDescription:
        cargoData.productDescription || cargoData.description || "",
    };
  
    setCargo(cargoState);
    setOriginalCargo(cargoState);
  
    // Additional Information
    const additionalData = {
      specialInstructions:
        data.notes || data.additionalInformation?.specialHandling || "",
      insuranceRequired: data.insuranceRequired ? "Yes" : "No",
      inspectionRequired: data.additionalInformation?.inspectionRequired
        ? "Yes"
        : "No",
      remarks: data.additionalInformation?.remarks || "",
    };
  
    setAdditionalInfo(additionalData);
    setOriginalAdditionalInfo(additionalData);
  };

  // Always load the saved quotation from MongoDB; React state is not persistent.
  const fetchExistingQuotation = async () => {
    try {
      const res = await getQuotationByShipment(shipmentId);
      const list = res.data?.data || res.data?.quotations || [];
      const latestQuotation = Array.isArray(list)
        ? [...list].sort(
            (a, b) =>
              new Date(b.createdAt || b.updatedAt || 0).getTime() -
              new Date(a.createdAt || a.updatedAt || 0).getTime()
          )[0] || null
        : list || null;
      setQuotationHistory(Array.isArray(list) ? list : latestQuotation ? [latestQuotation] : []);
      setQuotation(latestQuotation);
      return latestQuotation;
    } catch (err) {
      console.error("Failed to fetch shipment quotation:", err);
      setQuotation(null);
      setQuotationHistory([]);
      return null;
    }
  };

  // Load the persisted invoice whenever this shipment is reopened/refreshed.
  const fetchExistingInvoice = async (data = shipment) => {
    const invoiceId =
      data?.invoiceId?._id ||
      data?.invoiceId ||
      data?.invoice?._id ||
      null;

    if (!invoiceId || typeof invoiceId !== "string" && typeof invoiceId !== "object") {
      setExistingInvoice(null);
      return null;
    }

    const id = typeof invoiceId === "object" ? invoiceId._id : invoiceId;
    if (!id) return null;

    try {
      setInvoiceLoading(true);
      const response = await API.get(`/trade-invoices/${id}`);
      const savedInvoice = response.data?.data || response.data?.invoice || null;
      setExistingInvoice(savedInvoice);
      return savedInvoice;
    } catch (err) {
      console.error("Failed to fetch saved invoice:", err);
      setExistingInvoice(null);
      return null;
    } finally {
      setInvoiceLoading(false);
    }
  };

  const fetchShipment = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError("");

      const res = await getShipmentDetails(shipmentId);

      console.log("GET SHIPMENT API RESPONSE:", res.data);
      console.log("GET SHIPMENT CARGO:", res.data?.data?.cargo);
      
      const data = res.data.data || res.data.shipment || res.data;
      
      syncShipmentState(data);
      await Promise.all([fetchExistingQuotation(), fetchExistingInvoice(data)]);
    } catch (err) {
      console.error("Review shipment error:", err);
      setError("Failed to load shipment details.");
      showToast("error", "Failed to fetch latest shipment details.");
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    if (!shipmentId) {
      setError("Shipment ID is missing.");
      setLoading(false);
      return;
    }
    fetchShipment();
  }, [shipmentId]);

  // Handle Basic Info Changes
  const handleBasicInfoChange = (key) => (e) => {
    setBasicInfo((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const saveBaseInfo = async () => {
    try {
      const payload = {
        shipmentType: basicInfo.shipmentType,
        shipmentMode: basicInfo.transportMode,
        incoterm: basicInfo.incoterm,
        priority: basicInfo.priority,
        etd: basicInfo.etd || null,
        eta: basicInfo.eta || null,
      };

      await updateShipment(shipmentId, payload);
      await fetchShipment(true);
      setEditBasicInfo(false);
      showToast("success", "Basic information updated successfully!");
    } catch (err) {
      console.error("Failed to save basic information:", err);
      showToast("error", "Failed to save basic information.");
    }
  };

  // Route Handlers
  const handleRouteChange = (key) => (e) => {
    setRoute((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleRouteSave = async () => {
    try {
      const currentRoute = shipment?.route || {};
      await updateShipment(shipmentId, {
        route: {
          originCity: route.placeOfReceipt.trim(),
          destinationCity: route.finalDelivery.trim(),
          originCountry: currentRoute.originCountry || "",
          destinationCountry: currentRoute.destinationCountry || "",
          mode: currentRoute.mode || basicInfo.transportMode || "",
          warehouse: currentRoute.warehouse || "",
        },
      });
      await fetchShipment(true);
      setEditRoute(false);
      showToast("success", "Route details updated successfully!");
    } catch (err) {
      console.error("Failed to save route:", err);
      showToast("error", err.response?.data?.message || "Failed to save route details.");
    }
  };

  // Cargo Handlers
  const handleCargoChange = (key) => (e) => {
    setCargo((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleCargoSave = async () => {
    try {
      const cleanNum = (value) => {
        if (value === "" || value === "-" || value === null || value === undefined) {
          return null;
        }
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
      };

      const packages = cleanNum(cargo.totalPackages);
      const netWeight = cleanNum(cargo.netWeight);
      const grossWeight = cleanNum(cargo.grossWeight);
      const volumeCBM = cleanNum(cargo.volume);

      await updateShipment(shipmentId, {
        cargo: {
          productName: cargo.productName.trim(),
      
          // Manually entered HS Code
          hsCodeText: String(cargo.hsCode || "").trim(),
      
          packages,
          quantity: packages,
          netWeight,
          grossWeight,
          volumeCBM,
          packingType: cargo.packagingType.trim(),
          productDescription: cargo.cargoDescription.trim(),
        },
      
        additionalInformation: {
          packagingType: cargo.packagingType.trim(),
        },
      });

      await fetchShipment(true);
      setEditCargo(false);
      showToast("success", "Cargo details updated successfully!");
    } catch (err) {
      console.error("Failed to save cargo:", err);
      showToast("error", err.response?.data?.message || "Failed to save cargo details.");
    }
  };

  // Additional Info Handlers
  const handleAdditionalInfoChange = (key) => (e) => {
    setAdditionalInfo((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleAdditionalInfoSave = async () => {
    try {
      await updateShipment(shipmentId, {
        notes: additionalInfo.specialInstructions,
        insuranceRequired: additionalInfo.insuranceRequired === "Yes",
        additionalInformation: {
          inspectionRequired: additionalInfo.inspectionRequired === "Yes",
          remarks: additionalInfo.remarks,
        },
      });
      await fetchShipment(true);
      setEditAdditionalInfo(false);
      showToast("success", "Additional information updated successfully!");
    } catch (err) {
      console.error("Failed to save additional information:", err);
      showToast("error", err.response?.data?.message || "Failed to save additional info.");
    }
  };

  // Status Change Handler
  const handleStatusChange = async (newStatus) => {
    try {
      setStatusUpdating(true);
      if (newStatus === "Approved") {
        await approveShipment(shipmentId);
      } else if (newStatus === "Rejected") {
        await rejectShipment(shipmentId, { reason: "Status updated by admin" });
      } else if (newStatus === "Hold") {
        await holdShipment(shipmentId);
      } else {
        await updateShipment(shipmentId, {
          workflowStatus: newStatus,
          approvalStatus: newStatus,
          shipmentStatus: newStatus,
        });
      }

      await fetchShipment(true);
      setShowStatusModal(false);
      showToast("success", `Shipment status updated to "${newStatus}"!`);
    } catch (err) {
      console.error("Status update error:", err);
      showToast("error", "Failed to update shipment status.");
    } finally {
      setStatusUpdating(false);
    }
  };

  // Client Details helper
// Applicant Details
// ==========================================
// DYNAMIC APPLICANT PROFILE
// ==========================================

// ==========================================
// DYNAMIC APPLICANT PROFILE
// ==========================================

// ==========================================
// DYNAMIC APPLICANT PROFILE
// ==========================================

const applicant =
  shipment?.exporter ||
  shipment?.parties?.exporter ||
  shipment?.applicant ||
  {};

const user =
  shipment?.userId && typeof shipment.userId === "object"
    ? shipment.userId
    : {};

const getValue = (...values) =>
  values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      typeof value !== "object" &&
      String(value).trim() !== ""
  ) || "-";

const clientName = getValue(
  applicant?.contactPerson,
  applicant?.name,
  user?.name,
  shipment?.customerName
);

const companyName = getValue(
  applicant?.companyName,
  applicant?.company,
  user?.companyName
);

const clientEmail = getValue(
  applicant?.email,
  user?.email
);

const clientPhone = getValue(
  applicant?.phone,
  applicant?.mobile,
  user?.phone
);

const applicantAddress = getValue(
  applicant?.address,
  user?.address
);

const applicantCountry = getValue(
  applicant?.country,
  user?.country
);

const applicantCity = getValue(
  applicant?.city,
  user?.city
);

const applicantGST = getValue(
  applicant?.gstNumber,
  applicant?.gstin,
  user?.gstNumber,
  user?.gstin
);

const applicantIEC = getValue(
  applicant?.importExportId,
  user?.importExportId
);

const applicantBusinessType = getValue(
  applicant?.businessType,
  user?.businessType,
  user?.accountType
);

const initials =
  clientName !== "-"
    ? clientName
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "CL";

  // Identify the source using explicit shipment metadata.
  // B2B markers always take priority; never assume "User" when the role is missing.
  const shipmentCreatorRole = String(shipment?.createdByRole || "").trim().toLowerCase();
  const shipmentCustomerType = String(shipment?.customerType || "").trim().toLowerCase();
  const isB2BShipment =
    shipmentCreatorRole === "b2b" ||
    shipmentCustomerType === "b2b" ||
    Boolean(shipment?.b2bCompanyId);
  // Admin-created non-B2B shipments follow the same internal workflow as
  // Normal User shipments: quotation/invoice are created and downloaded by Admin,
  // and invoice creation does not wait for customer quotation acceptance.
  // Explicit B2B markers always take priority so the existing B2B flow is preserved.
  const isAdminCreatedShipment = shipmentCreatorRole === "admin" && !isB2BShipment;
  const isAdminOnlyShipment =
    !isB2BShipment &&
    (
      shipmentCreatorRole === "user" ||
      shipmentCustomerType === "individual" ||
      isAdminCreatedShipment
    );

  // For Normal User shipments, use the quotation record returned by the quotation API.
  // Preserve the shipment metadata fallback for B2B and other existing flows.
  const quotationStatus = quotation?.status || (
    isAdminOnlyShipment ? "" : shipment?.quotationStatus || ""
  );
  const quotationExists = isAdminOnlyShipment
    ? Boolean(
        quotation?._id ||
        quotation?.quotationNumber ||
        quotation?.id ||
        ["Draft", "Shared", "Accepted", "Rejected", "Expired"].includes(quotation?.status)
      )
    : Boolean(
        quotation?._id || quotation?.quotationNumber || quotation?.id ||
        shipment?.quotationId || shipment?.quotation || shipment?.quotationNumber ||
        ["Draft", "Shared", "Accepted", "Rejected", "Expired"].includes(quotationStatus)
      );
  const quotationAccepted = quotationStatus === "Accepted";
  const quotationRejected = quotationStatus === "Rejected";
  const quotationCanBeRecreated = quotationRejected;
  const invoiceAlreadyGenerated = Boolean(
    shipment?.invoiceId || shipment?.invoice?._id ||
    ["Generated", "Sent"].includes(shipment?.invoiceStatus)
  );

  // Admin-only PDF download for Normal User quotations.
  // This opens the browser print dialog; choose "Save as PDF".
  const downloadPrintableDocument = (elementId, documentTitle) => {
    const element = document.getElementById(elementId);
    if (!element) {
      showToast("error", "Quotation preview is not available.");
      return;
    }

    const printWindow = window.open("", "_blank", "width=1100,height=850");
    if (!printWindow) {
      showToast("warning", "Please allow pop-ups to download the quotation PDF.");
      return;
    }

    const styles = Array.from(
      document.querySelectorAll('link[rel="stylesheet"], style')
    ).map((node) => node.outerHTML).join("\\n");

    const safeTitle = String(documentTitle || "Quotation").replace(/[<>]/g, "");
    printWindow.document.open();
    printWindow.document.write(`<!doctype html>
      <html><head><meta charset="utf-8" />
      <title>${safeTitle}</title>
      ${styles}
      <style>
        @page { size: A4; margin: 12mm; }
        html, body { margin:0; padding:0; background:#fff; color:#172b4d;
          -webkit-print-color-adjust:exact; print-color-adjust:exact; }
        body { font-family:Arial,Helvetica,sans-serif; }
        #${elementId} { display:block!important; width:100%!important;
          max-width:none!important; max-height:none!important; overflow:visible!important;
          margin:0!important; padding:0!important; box-shadow:none!important; }
        #${elementId} * { visibility:visible!important; }
        #${elementId} { color:#172b4d!important; background:#f8fafc!important;
          font-family:Arial,Helvetica,sans-serif!important; }
        #${elementId} table { width:100%!important; border-collapse:collapse!important; }
        #${elementId} th, #${elementId} td { padding:8px 10px!important; }
        #${elementId} tr, #${elementId} .rounded-2xl, #${elementId} .rounded-xl {
          break-inside:avoid; page-break-inside:avoid; }
        #${elementId} .overflow-x-auto, #${elementId} .overflow-y-auto {
          overflow:visible!important; }
        .no-print { display:none!important; }
      </style></head><body>${element.outerHTML}
      <script>
        window.addEventListener("load", () => setTimeout(() => {
          window.focus(); window.print();
        }, 350));
        window.addEventListener("afterprint", () => window.close());
      </script></body></html>`);
    printWindow.document.close();
  };

  // Actions list (Strictly ordered: Quotation, Invoice, Share, Change Status)
  const actionList = [
    {
      title: isAdminOnlyShipment && quotationExists && !quotationCanBeRecreated
        ? "Download Quotation"
        : quotationRejected
        ? "Create Revised Quotation"
        : quotationExists
        ? `Quotation ${quotationStatus || "Created"}`
        : "Create Quotation",
      desc: isAdminOnlyShipment && quotationExists && !quotation
        ? "Quotation details are linked to this shipment, but could not be loaded. Refresh to try again."
        : isAdminOnlyShipment && quotationExists && !quotationCanBeRecreated
        ? "View and download the saved quotation PDF. It remains Admin-only."
        : quotationRejected
        ? "Review the customer's rejection reason and prepare a revised quotation."
        : quotationExists
        ? `Quotation status: ${quotationStatus || "Created"}.`
        : "Generate commercial freight quotation.",
      icon: FileSignature,
      color: quotationExists
        ? "text-emerald-700 bg-emerald-50 border-emerald-200/80"
        : "text-indigo-600 bg-indigo-50 border-indigo-200/80 hover:bg-indigo-100/60",
      disabled: quotationUpdating || (quotationExists && !quotationCanBeRecreated && !(isAdminOnlyShipment && quotation)),
      action: () => {
        if (isAdminOnlyShipment && quotationExists && !quotationCanBeRecreated) {
          if (quotation) {
            setSelectedSavedQuotation(quotation);
            setShowSavedQuotation(true);
          } else {
            showToast("warning", "Quotation details could not be loaded. Please refresh the shipment.");
          }
          return;
        }
        if (quotationExists && !quotationCanBeRecreated) {
          showToast("warning", "A quotation is already active. Please wait for the customer's response.");
          return;
        }
        setShowQuotationModal(true);
      },
    },
    {
      title: invoiceAlreadyGenerated ? "Invoice Generated" : "Create Invoice",
      desc: invoiceAlreadyGenerated
        ? "An invoice already exists for this shipment."
        : isAdminOnlyShipment
        ? quotationExists
          ? "You can generate invoice after quotation is created."
          : "Create a quotation first to generate the invoice."
        : quotationAccepted
        ? "The customer has accepted the quotation. You can now generate the invoice."
        : "Invoice can be generated only after the customer accepts the quotation.",
      icon: FileText,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200/80 hover:bg-emerald-100/60",
      disabled: !(quotationExists && (quotationAccepted || isAdminOnlyShipment)) || invoiceAlreadyGenerated,
      action: () => {
        if (!quotationExists) {
          showToast("warning", "Please create the quotation first before generating the invoice.");
          return;
        }
        if (!(quotationAccepted || isAdminOnlyShipment)) {
          showToast("warning", "Invoice can be generated only after the customer accepts the quotation.");
          return;
        }
        if (invoiceAlreadyGenerated) {
          showToast("warning", "An invoice has already been generated for this shipment.");
          return;
        }
        setNewInvoice(true);
      },
    },
    ...(isAdminOnlyShipment && invoiceAlreadyGenerated ? [{
      title: "View Invoice",
      desc: "Open the saved Admin-only invoice and download its PDF.",
      icon: FileText,
      color: "text-sky-700 bg-sky-50 border-sky-200/80 hover:bg-sky-100/60",
      disabled: invoiceLoading,
      action: async () => {
        const saved = existingInvoice || await fetchExistingInvoice(shipment);
        if (saved) setShowExistingInvoice(true);
        else showToast("warning", "Saved invoice could not be loaded. Please refresh and try again.");
      },
    }] : []),
    // {
    //   title: "Share Quotation",
    //   desc: "Send quotation PDF link to client.",
    //   icon: Share2,
    //   color: "text-purple-600 bg-purple-50 border-purple-200/80 hover:bg-purple-100/60",
    //   action: () => {
    //     if (!quotationExists) {
    //       showToast("warning", "No active quotation found to share. Please create one first.");
    //       return;
    //     }
    //     showToast("success", "Quotation shared successfully with client email!");
    //   },
    // },
    // ...(invoiceAlreadyGenerated ? [{
    //   title: "View Saved Invoice",
    //   desc: "Open the invoice saved for this shipment.",
    //   icon: FileText,
    //   color: "text-sky-700 bg-sky-50 border-sky-200/80 hover:bg-sky-100/60",
    //   disabled: invoiceLoading || !existingInvoice,
    //   action: async () => {
    //     if (!existingInvoice) {
    //       const saved = await fetchExistingInvoice(shipment);
    //       if (saved) setShowExistingInvoice(true);
    //       return;
    //     }
    //     setShowExistingInvoice(true);
    //   },
    // }] : []),
    {
      title: "Refresh Status",
      desc: "Fetch the latest shipment, quotation and invoice status.",
      icon: RefreshCcw,
      color: "text-sky-600 bg-sky-50 border-sky-200/80 hover:bg-sky-100/60",
      disabled: statusUpdating,
      action: async () => {
        try {
          setStatusUpdating(true);
          await fetchShipment(true);
          showToast("success", "Latest status refreshed successfully!");
        } catch (err) {
          showToast("error", "Failed to refresh status.");
        } finally {
          setStatusUpdating(false);
        }
      },
    },
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-700">
            Loading Shipment Details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center mb-3">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-base font-bold text-slate-900">Unable to Load</h3>
          <p className="text-xs text-slate-500 mt-1 mb-5">
            {error || "Shipment record could not be found."}
          </p>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-all"
          >
            Close Modal
          </button>
        </div>
      </div>
    );
  }

  const currentShipmentStatus =
  shipment?.invoiceStatus === "Sent"
    ? "Invoice Sent"
    : shipment?.invoiceStatus === "Generated"
    ? "Invoice Generated"
    : quotationStatus === "Accepted"
    ? "Quotation Accepted"
    : quotationStatus === "Rejected"
    ? "Quotation Rejected"
    : quotationStatus === "Expired"
    ? "Quotation Expired"
    : quotationStatus === "Shared"
    ? "Quotation Sent"
    : quotationStatus === "Draft"
    ? "Quotation Draft"
    : shipment?.workflowStatus ||
      shipment?.approvalStatus ||
      (shipment?.shipmentStatus === "Submitted"
        ? "Pending Review"
        : shipment?.shipmentStatus) ||
      "Pending Review";

   

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-5 overflow-hidden">
      {!viewShipmentDetail && (
        <div className="w-full max-w-7xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* TOAST NOTIFICATION BANNER */}
          {toast && (
            <div
              className={`px-6 py-3 text-xs font-semibold flex items-center justify-between border-b transition-all ${
                toast.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : toast.type === "warning"
                  ? "bg-amber-50 text-amber-800 border-amber-200"
                  : "bg-rose-50 text-rose-800 border-rose-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {toast.type === "success" && <CheckCircle2 size={16} />}
                {toast.type === "warning" && <AlertTriangle size={16} />}
                {toast.type === "error" && <AlertCircle size={16} />}
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => setToast(null)}
                className="text-current opacity-60 hover:opacity-100"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* STATIC TOP HEADER */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-2xs">
                <MapPin size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    Review Consignment
                  </h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                    {shipment.referenceNumber || shipment.sbNumber || "REF"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verify cargo specifications, generate quotation, invoice, and track workflow.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* TOP METRIC / STATUS STRIP */}
          <div className="px-6 py-3 bg-slate-50/70 border-b border-slate-200/80 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs shrink-0">
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase">
                Shipment ID
              </p>
              <p className="font-bold text-slate-900 mt-0.5">
                {shipment.referenceNumber || shipment.sbNumber || "-"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase">
                Submitted By
              </p>
              <p className="font-bold text-slate-900 mt-0.5 truncate">
                {shipment.exporter?.contactPerson || clientName || "-"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase">
                Company / Exporter
              </p>
              <p className="font-bold text-slate-900 mt-0.5 truncate">
                {shipment.exporter?.companyName || companyName || "-"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase">
                Submitted On
              </p>
              <p className="font-bold text-slate-900 mt-0.5">
                {shipment.createdAt
                  ? new Date(shipment.createdAt).toLocaleDateString("en-GB")
                  : "-"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase">
                  Current Status
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="font-bold text-amber-700">
                    {currentShipmentStatus}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => fetchShipment(true)}
                title="Refresh Status"
                className="p-1 rounded-lg hover:bg-slate-200/70 text-slate-500 transition-all"
              >
                <RefreshCcw size={13} />
              </button>
            </div>
          </div>

          {/* MAIN MODAL SCROLLABLE BODY */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* =======================================================
                  LEFT AREA (COLUMNS 1 TO 8): TABS & FORM SECTIONS
                 ======================================================= */}
              <div className="lg:col-span-8 space-y-5">
                {/* Clean Tab Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-100">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        activeTab === tab
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === "Shipment Details" && (
                  <div className="space-y-4">
                    {/* SECTION 1: BASIC INFORMATION */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center">
                            1
                          </span>
                          <h3 className="text-sm font-bold text-slate-900">
                            Basic Information
                          </h3>
                        </div>

                        {!editBasicInfo ? (
                          <button
                            type="button"
                            onClick={() => setEditBasicInfo(true)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200/60 rounded-xl px-3 py-1.5 transition-all"
                          >
                            <Pencil size={12} />
                            Edit Section
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setBasicInfo({
                                  shipmentType: shipment.shipmentType || "-",
                                  transportMode: shipment.shipmentMode || shipment.route?.mode || "-",
                                  incoterm: shipment.incoterm || "-",
                                  priority: shipment.priority || "Medium",
                                  referenceNo: shipment.referenceNumber || shipment.sbNumber || "-",
                                  bookingNo: shipment.bookingNo || "",
                                  etd: formatDateForInput(shipment.etd),
                                  eta: formatDateForInput(shipment.eta),
                                });
                                setEditBasicInfo(false);
                              }}
                              className="text-xs font-semibold text-slate-600 border border-slate-200 rounded-xl px-3 py-1.5 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={saveBaseInfo}
                              className="text-xs font-semibold text-white bg-indigo-600 rounded-xl px-3.5 py-1.5 hover:bg-indigo-700 shadow-xs"
                            >
                              Save Changes
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Shipment Type
                          </p>
                          {editBasicInfo ? (
                            <select
                              value={basicInfo.shipmentType}
                              onChange={handleBasicInfoChange("shipmentType")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            >
                              <option value="Export">Export</option>
                              <option value="Import">Import</option>
                            </select>
                          ) : (
                            <p className="font-bold text-slate-900">
                              {basicInfo.shipmentType}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Mode of Transport
                          </p>
                          {editBasicInfo ? (
                            <select
                              value={basicInfo.transportMode}
                              onChange={handleBasicInfoChange("transportMode")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            >
                              <option value="Air">Air</option>
                              <option value="Sea">Sea</option>
                              <option value="Road">Road</option>
                            </select>
                          ) : (
                            <p className="font-bold text-slate-900">
                              {basicInfo.transportMode}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">Incoterm</p>
                          {editBasicInfo ? (
                            <input
                              value={basicInfo.incoterm}
                              onChange={handleBasicInfoChange("incoterm")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {basicInfo.incoterm}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">Priority</p>
                          {editBasicInfo ? (
                            <select
                              value={basicInfo.priority}
                              onChange={handleBasicInfoChange("priority")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            >
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                            </select>
                          ) : (
                            <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                              {basicInfo.priority}
                            </span>
                          )}
                        </div>

                        {/* Reference No (Read-Only) */}
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <p className="text-slate-400 font-medium">Reference No.</p>
                            <Lock size={10} className="text-slate-400" />
                          </div>
                          <p className="font-bold text-slate-600 bg-slate-100/80 px-2.5 py-1.5 rounded-lg border border-slate-200/60 inline-block">
                            {basicInfo.referenceNo}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Booking Number
                          </p>
                          {editBasicInfo ? (
                            <input
                              value={basicInfo.bookingNo}
                              placeholder="e.g. BKG-9921"
                              onChange={handleBasicInfoChange("bookingNo")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                            {basicInfo.bookingNo || shipment.bookingNo || "Generating..."}
                          </p>
                          )}
                        </div>

                        <div>
  <p className="text-slate-400 font-medium mb-1">
    Expected ETD
  </p>

  {editBasicInfo ? (
    <input
      type="date"
      value={basicInfo.etd}
      onChange={handleBasicInfoChange("etd")}
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
    />
  ) : (
    <p className="font-bold text-slate-900">
      {formatDateForDisplay(shipment.etd)}
    </p>
  )}
</div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Expected ETA
                          </p>
                          {editBasicInfo ? (
                            <input
                              type="date"
                              value={basicInfo.eta}
                              onChange={handleBasicInfoChange("eta")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                            {formatDateForDisplay(shipment.eta || shipment.expectedEta)}
                          </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: ROUTE */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center">
                            2
                          </span>
                          <h3 className="text-sm font-bold text-slate-900">
                            Transit & Port Route
                          </h3>
                        </div>

                        {!editRoute ? (
                          <button
                            type="button"
                            onClick={() => setEditRoute(true)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200/60 rounded-xl px-3 py-1.5 transition-all"
                          >
                            <Pencil size={12} />
                            Edit Section
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setRoute(originalRoute);
                                setEditRoute(false);
                              }}
                              className="text-xs font-semibold text-slate-600 border border-slate-200 rounded-xl px-3 py-1.5 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleRouteSave}
                              className="text-xs font-semibold text-white bg-indigo-600 rounded-xl px-3.5 py-1.5 hover:bg-indigo-700 shadow-xs"
                            >
                              Save Changes
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Origin Country/Port
                          </p>
                          <p className="font-bold text-slate-900">{route.origin}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Destination Country/Port
                          </p>
                          <p className="font-bold text-slate-900">
                            {route.destination}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Place of Receipt (City)
                          </p>
                          {editRoute ? (
                            <input
                              value={route.placeOfReceipt}
                              onChange={handleRouteChange("placeOfReceipt")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {route.placeOfReceipt}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Final Delivery (City)
                          </p>
                          {editRoute ? (
                            <input
                              value={route.finalDelivery}
                              onChange={handleRouteChange("finalDelivery")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {route.finalDelivery}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: CARGO SPECIFICATIONS */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center">
                            3
                          </span>
                          <h3 className="text-sm font-bold text-slate-900">
                            Cargo & Volume Information
                          </h3>
                        </div>

                        {!editCargo ? (
                          <button
                            type="button"
                            onClick={() => setEditCargo(true)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200/60 rounded-xl px-3 py-1.5 transition-all"
                          >
                            <Pencil size={12} />
                            Edit Section
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setCargo(originalCargo);
                                setEditCargo(false);
                              }}
                              className="text-xs font-semibold text-slate-600 border border-slate-200 rounded-xl px-3 py-1.5 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleCargoSave}
                              className="text-xs font-semibold text-white bg-indigo-600 rounded-xl px-3.5 py-1.5 hover:bg-indigo-700 shadow-xs"
                            >
                              Save Changes
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Product Name
                          </p>
                          {editCargo ? (
                            <input
                              value={cargo.productName}
                              onChange={handleCargoChange("productName")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {cargo.productName || "-"}
                            </p>
                          )}
                        </div>

                        {/* HS Code */}
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <p className="text-slate-400 font-medium">HS Code</p>
                            <Lock size={10} className="text-slate-400" />
                          </div>
                          <p className="font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-md inline-block">
                            {cargo.hsCode || "-"}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Packaging Type
                          </p>
                          {editCargo ? (
                            <input
                              value={cargo.packagingType}
                              onChange={handleCargoChange("packagingType")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {cargo.packagingType || "-"}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Total Packages
                          </p>
                          {editCargo ? (
                            <input
                              value={cargo.totalPackages}
                              onChange={handleCargoChange("totalPackages")}
                              placeholder="e.g. 50"
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {cargo.totalPackages || "-"}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Net Weight (KG)
                          </p>
                          {editCargo ? (
                            <input
                              value={cargo.netWeight}
                              onChange={handleCargoChange("netWeight")}
                              placeholder="Net wt in KG"
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {cargo.netWeight ? `${cargo.netWeight} KG` : "-"}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Gross Weight (KG)
                          </p>
                          {editCargo ? (
                            <input
                              value={cargo.grossWeight}
                              onChange={handleCargoChange("grossWeight")}
                              placeholder="Gross wt in KG"
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {cargo.grossWeight ? `${cargo.grossWeight} KG` : "-"}
                            </p>
                          )}
                        </div>

                        {/* Volume Field (Fixed sync bug!) */}
                        {/* <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Volume (CBM)
                          </p>
                          {editCargo ? (
                            <input
                              value={cargo.volume}
                              onChange={handleCargoChange("volume")}
                              placeholder="e.g. 200"
                              className="w-full rounded-xl border border-indigo-300 bg-indigo-50/40 px-2.5 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:border-indigo-600 focus:outline-none"
                            />
                          ) : (
                            <p className="font-extrabold text-indigo-700 bg-indigo-50/80 px-2 py-0.5 rounded-md inline-block">
                              {cargo.volume ? `${cargo.volume} CBM` : "-"}
                            </p>
                          )}
                        </div> */}

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Volumetric Weight (KG)
                          </p>
                          <p className="font-extrabold text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-md inline-block">
                            {cargo.volumetricWeight !== "" && cargo.volumetricWeight !== null && cargo.volumetricWeight !== undefined
                              ? `${cargo.volumetricWeight} KG`
                              : "-"}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Cargo Description
                          </p>
                          {editCargo ? (
                            <input
                              value={cargo.cargoDescription}
                              onChange={handleCargoChange("cargoDescription")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900 truncate">
                              {cargo.cargoDescription || "-"}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: ADDITIONAL INFO */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center">
                            4
                          </span>
                          <h3 className="text-sm font-bold text-slate-900">
                            Compliance & Special Instructions
                          </h3>
                        </div>

                        {!editAdditionalInfo ? (
                          <button
                            type="button"
                            onClick={() => setEditAdditionalInfo(true)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200/60 rounded-xl px-3 py-1.5 transition-all"
                          >
                            <Pencil size={12} />
                            Edit Section
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setAdditionalInfo(originalAdditionalInfo);
                                setEditAdditionalInfo(false);
                              }}
                              className="text-xs font-semibold text-slate-600 border border-slate-200 rounded-xl px-3 py-1.5 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleAdditionalInfoSave}
                              className="text-xs font-semibold text-white bg-indigo-600 rounded-xl px-3.5 py-1.5 hover:bg-indigo-700 shadow-xs"
                            >
                              Save Changes
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Special Handling
                          </p>
                          {editAdditionalInfo ? (
                            <input
                              value={additionalInfo.specialInstructions}
                              onChange={handleAdditionalInfoChange(
                                "specialInstructions"
                              )}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {additionalInfo.specialInstructions}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Insurance Required
                          </p>
                          {editAdditionalInfo ? (
                            <select
                              value={additionalInfo.insuranceRequired}
                              onChange={handleAdditionalInfoChange(
                                "insuranceRequired"
                              )}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          ) : (
                            <p className="font-bold text-slate-900">
                              {additionalInfo.insuranceRequired}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Inspection Required
                          </p>
                          {editAdditionalInfo ? (
                            <select
                              value={additionalInfo.inspectionRequired}
                              onChange={handleAdditionalInfoChange(
                                "inspectionRequired"
                              )}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          ) : (
                            <p className="font-bold text-slate-900">
                              {additionalInfo.inspectionRequired}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Admin Remarks
                          </p>
                          {editAdditionalInfo ? (
                            <input
                              value={additionalInfo.remarks}
                              onChange={handleAdditionalInfoChange("remarks")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {additionalInfo.remarks}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* OTHER TABS */}
                {activeTab === "Parties & Contacts" && (
                  <PartiesContact
                    shipment={shipment}
                    shipmentId={shipmentId}
                    onUpdated={() => fetchShipment(true)}
                  />
                )}
{activeTab === "Cargo Details" && (
  <CargoDetails
    shipment={shipment}
    shipmentId={shipment?._id || shipment?.id}
    onUpdated={() => fetchShipment(true)}
  />
)}

                {activeTab === "Documents" && <Documents shipment={shipment} />}

                {activeTab === "Charges" && (
                  <Charges
                    shipment={shipment}
                    shipmentId={shipmentId}
                    onUpdated={() => fetchShipment(true)}
                  />
                )}
              </div>

              {/* =======================================================
                  RIGHT AREA (COLUMNS 9 TO 12): ACTIONS, SUMMARY & CLIENT
                 ======================================================= */}
              <div className="lg:col-span-4 space-y-5">
                {/* ACTIONS CARD (Edit Shipment Removed, strictly ordered!) */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Operations & Actions
                    </h3>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">
                      Admin Tasks
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {actionList.map((a) => {
                      const Icon = a.icon;
                      return (
                        <button
                          key={a.title}
                          type="button"
                          onClick={a.action}
                          disabled={a.disabled}
                          title={a.desc}
                          className={`group w-full flex items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-90 ${a.color}`}
                        >
                          <div className="w-8 h-8 rounded-xl bg-white shadow-2xs flex items-center justify-center shrink-0">
                            <Icon size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold leading-tight">
                              {a.title}
                            </p>
                            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 line-clamp-1 transition-all duration-200 group-hover:line-clamp-none group-hover:text-slate-700">
                              {a.desc}
                            </p>
                          </div>
                          <ChevronRight size={14} className="opacity-50" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SHIPMENT SUMMARY CARD */}
             {/* FINANCIAL SUMMARY CARD */}
<div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
  <h3 className="text-sm font-extrabold text-slate-900 mb-3 pb-2 border-b border-slate-100">
    Financial Summary
  </h3>

  {!quotation ? (
    <p className="text-xs text-slate-400 text-center py-5">
      No quotation generated yet.
    </p>
  ) : (
    <div className="space-y-3 text-xs">
      <div className="flex justify-between">
        <span className="font-semibold text-slate-700">
          Quotation No.
        </span>
        <span className="font-bold text-slate-900">
          {quotation.quotationNumber || "-"}
        </span>
      </div>

      <button
        type="button"
        onClick={() => { setSelectedSavedQuotation(quotation); setShowSavedQuotation(true); }}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-all"
      >
        <FileText size={14} /> View Saved Quotation
      </button>

      {quotation.status === "Rejected" && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
          <div className="flex items-center gap-2 text-rose-700">
            <AlertTriangle size={14} />
            <p className="text-xs font-bold">Customer rejected this quotation</p>
          </div>
          <p className="mt-2 text-[11px] font-semibold text-rose-800">Rejection reason</p>
          <p className="mt-1 whitespace-pre-wrap break-words text-xs leading-relaxed text-rose-700">
            {quotation.rejectionReason?.trim() || "No rejection reason was provided."}
          </p>
          <p className="mt-2 text-[10px] font-medium text-rose-600">
            You can create and share a revised quotation using the action above.
          </p>
        </div>
      )}

      {quotationHistory.length > 1 && (
        <div className="border-t border-slate-100 pt-3 space-y-2">
          <p className="font-bold text-slate-700">Saved Quotation Versions</p>
          {quotationHistory
            .slice()
            .sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0))
            .map((savedQuote, index) => (
              <div key={savedQuote._id || index} className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-700">
                    {savedQuote.quotationNumber || `Quotation ${index + 1}`}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {savedQuote.status || "Saved"} · {savedQuote.createdAt ? new Date(savedQuote.createdAt).toLocaleDateString("en-GB") : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="whitespace-nowrap font-semibold text-slate-800">
                    {savedQuote.currency || quotation.currency || "INR"} {Number(savedQuote.totalAmount || 0).toLocaleString("en-IN")}
                  </span>
                  <button
                    type="button"
                    onClick={() => { setSelectedSavedQuotation(savedQuote); setShowSavedQuotation(true); }}
                    className="rounded-lg border border-indigo-200 bg-white px-2.5 py-1.5 font-bold text-indigo-600 hover:bg-indigo-50"
                  >View</button>
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="border-t border-slate-100 pt-3 space-y-3">
        {quotation.charges?.map((charge, index) => (
          <div
            key={charge._id || index}
            className="flex justify-between items-start gap-3"
          >
            <div className="min-w-0">
              <p className="font-medium text-slate-700">
                {charge.name}
              </p>
              {charge.description && (
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {charge.description}
                </p>
              )}
            </div>

            <span className="font-semibold text-slate-900 whitespace-nowrap">
              {charge.currency || quotation.currency}{" "}
              {Number(charge.amount || 0).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 pt-3 space-y-2">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span>
            {quotation.currency}{" "}
            {Number(quotation.subtotal || 0).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Discount</span>
          <span>
            {quotation.currency}{" "}
            {Number(quotation.discount || 0).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Tax</span>
          <span>
            {quotation.currency}{" "}
            {Number(quotation.tax || 0).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between items-center border-t border-slate-200 pt-3 font-bold">
          <span className="text-slate-900">Grand Total</span>
          <span className="text-indigo-600 text-sm">
            {quotation.currency}{" "}
            {Number(quotation.totalAmount || 0).toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  )}

  {existingInvoice && (
    <div className="mt-4 border-t border-slate-200 pt-3 space-y-2 text-xs">
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-slate-900">Saved Invoice</span>
        <button
          type="button"
          onClick={() => setShowExistingInvoice(true)}
          className="font-semibold text-indigo-600 hover:text-indigo-800"
        >
          View Invoice
        </button>
      </div>
      <div className="flex justify-between text-slate-600">
        <span>Invoice No.</span>
        <span className="font-semibold text-slate-800">{existingInvoice.invoiceNumber || "-"}</span>
      </div>
      <div className="flex justify-between text-slate-600">
        <span>Invoice Status</span>
        <span className="font-semibold text-slate-800">{existingInvoice.status || "-"}</span>
      </div>
      <div className="flex justify-between border-t border-slate-100 pt-2 font-bold">
        <span className="text-slate-900">Final Invoice Amount</span>
        <span className="text-indigo-600">
          {existingInvoice.currency || "INR"} {Number(existingInvoice.totalAmount ?? existingInvoice.invoiceValue ?? 0).toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  )}
</div>

                {/* CLIENT DETAILS CARD */}
              {/* DYNAMIC APPLICANT PROFILE CARD */}
<div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
    <h3 className="text-sm font-extrabold text-slate-900">
      Applicant Profile
    </h3>

    <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
      Applicant
    </span>
  </div>

  {/* Applicant Basic Info */}
  <div className="flex items-center gap-3 mb-4">
    <span className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold text-sm flex items-center justify-center shrink-0">
      {initials}
    </span>

    <div className="min-w-0">
      <p className="font-bold text-slate-900 text-sm truncate">
        {clientName}
      </p>

      <p className="text-[11px] text-slate-500 truncate mt-0.5">
        {companyName}
      </p>
    </div>
  </div>

  {/* Applicant Contact Details */}
  <div className="space-y-3 text-xs">

    <div className="flex items-start gap-2.5">
      <Mail size={14} className="text-slate-400 shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className="text-[10px] text-slate-400 mb-0.5">
          Email Address
        </p>
        <p className="font-semibold text-slate-700 break-all">
          {clientEmail}
        </p>
      </div>
    </div>

    <div className="flex items-start gap-2.5">
      <Phone size={14} className="text-slate-400 shrink-0 mt-0.5" />
      <div>
        <p className="text-[10px] text-slate-400 mb-0.5">
          Phone Number
        </p>
        <p className="font-semibold text-slate-700">
          {clientPhone}
        </p>
      </div>
    </div>

 







   
  </div>

  {/* <div className="mt-4 pt-3 border-t border-slate-100">
    <button
      type="button"
      onClick={() => {
        setSelectedShipment(shipment);
        setViewShipmentDetail(true);
      }}
      className="w-full py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
    >
      <ExternalLink size={13} />
      View Full Account Details
    </button>
  </div> */}
</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW FULL SHIPMENT DETAIL MODAL */}
      {viewShipmentDetail && selectedShipment && (
        <ShipmentDetails
          shipment={selectedShipment}
          onClose={() => {
            setViewShipmentDetail(false);
            setSelectedShipment(null);
          }}
        />
      )}

      {/* CREATE QUOTATION MODAL */}
      {showQuotationModal && (
        <QuotationModal
          shipment={shipment}
          previousQuotation={quotation}
          isNormalUserShipment={isAdminOnlyShipment}
          onClose={() => setShowQuotationModal(false)}
          onSuccess={async () => {
            setShowQuotationModal(false);
            setQuotationUpdating(true);
            try {
              // The backend creates the quotation and links it to the shipment.
              await fetchShipment(true);
              await fetchExistingQuotation();
              showToast(
                "success",
                "Quotation saved successfully. You can now proceed to create the invoice."
              );
            } catch (err) {
              console.error("Failed to reload saved quotation:", err);
              showToast("warning", "Quotation was created. Please refresh the quotation details.");
            } finally {
              setQuotationUpdating(false);
            }
          }}
        />
      )}

      {/* CREATE NEW INVOICE MODAL */}
      {newInvoice && (
        <CreateNewInvoice
          shipment={shipment}
          quotation={quotation}
          onClose={() => setNewInvoice(false)}
          onSuccess={async (invoice) => {
            setNewInvoice(false);
            try {
              await fetchShipment(true);
              await fetchExistingQuotation();
              const saved = invoice?._id ? invoice : await fetchExistingInvoice(shipment);
              if (saved) {
                setExistingInvoice(saved);
                setShowExistingInvoice(true);
              }
              showToast("success", "Invoice generated and saved successfully. It is available only in Admin.");
            } catch (error) {
              console.error("Invoice saved but refresh failed:", error);
              showToast("warning", "Invoice was generated. Refresh shipment to view the saved invoice.");
            }
          }}
        />
      )}

      {showSavedQuotation && selectedSavedQuotation && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <div className="w-full max-w-6xl h-[92vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col">
            <div className="shrink-0 flex items-center justify-between gap-3 border-b border-slate-200 px-6 sm:px-8 py-4 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/25">
                  <FileText size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Freight Quotation</h3>
                  <p className="mt-0.5 text-[11px] text-slate-400 font-medium">{selectedSavedQuotation.quotationNumber || "Quotation"} · Admin copy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full border bg-blue-50 text-blue-700 border-blue-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {selectedSavedQuotation.status || "Draft"}
                </span>
                <button type="button" onClick={() => { setShowSavedQuotation(false); setSelectedSavedQuotation(null); }} className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500" aria-label="Close quotation">
                  <X size={17} />
                </button>
              </div>
            </div>

            <div id="saved-quotation-print" className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-4 bg-slate-50/30 text-sm">
              <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-600 p-5 sm:p-6 text-white shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
                  <div>
                    <p className="text-blue-200 text-[11px] font-semibold uppercase tracking-wider">Quotation No.</p>
                    <p className="font-black text-sm mt-1">{selectedSavedQuotation.quotationNumber || "-"}</p>
                    <p className="text-blue-200 text-[10px] mt-1.5">Issued: {selectedSavedQuotation.createdAt ? new Date(selectedSavedQuotation.createdAt).toLocaleDateString("en-GB") : selectedSavedQuotation.quotationDate ? new Date(selectedSavedQuotation.quotationDate).toLocaleDateString("en-GB") : "-"}</p>
                  </div>
                  <div className="sm:text-center">
                    <p className="text-blue-200 text-[11px] font-semibold uppercase tracking-wider mb-1">Total Amount</p>
                    <p className="text-3xl font-black tracking-tight">{selectedSavedQuotation.currency || "INR"} {Number(selectedSavedQuotation.totalAmount || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
                    <p className="text-blue-200 text-[10px] mt-1">Inclusive of applicable charges</p>
                  </div>
                  <div className="sm:text-right">
                    <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-xl px-3 py-2 text-left">
                      <Calendar size={14} className="text-blue-200" />
                      <div><p className="text-blue-200 text-[10px]">Valid Until</p><p className="font-bold text-xs">{selectedSavedQuotation.validUntil ? new Date(selectedSavedQuotation.validUntil).toLocaleDateString("en-GB") : "-"}</p></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-2 mb-3.5"><div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><Building size={14} /></div><span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">From (Freight Agent)</span></div>
                  <p className="text-sm font-extrabold text-slate-900">ASD Company</p>
                  <p className="text-xs text-slate-400 mt-0.5">Admin / Company Details</p>
                  <div className="mt-3 pt-3 border-t border-slate-100"><span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">✓ Verified Partner</span></div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-2 mb-3.5"><div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"><User size={14} /></div><span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">To (Exporter)</span></div>
                  <p className="text-sm font-extrabold text-slate-900">{getValue(applicant?.companyName, applicant?.name, applicant?.contactPerson, shipment?.customerName)}</p>
                  <div className="space-y-1 mt-1">
                    {(applicant?.contactPerson || clientName !== "-") && <p className="text-xs text-slate-500">Contact: {getValue(applicant?.contactPerson, clientName)}</p>}
                    {clientEmail !== "-" && <p className="text-xs text-slate-500">Email: {clientEmail}</p>}
                    {clientPhone !== "-" && <p className="text-xs text-slate-500">Phone: {clientPhone}</p>}
                    {applicantAddress !== "-" && <p className="text-xs text-slate-500">{applicantAddress}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center"><Truck size={14} /></div>
                  <h3 className="text-sm font-extrabold text-slate-900">Shipment Details</h3>
                  <div className="ml-auto text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full">{getValue(shipment?.route?.originCountry, shipment?.originCountry, route?.origin)} <span className="mx-1">→</span> {getValue(shipment?.route?.destinationCountry, shipment?.destinationCountry, route?.destination)}</div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    ["Shipment Route", `${getValue(shipment?.route?.originCity, route?.origin)} → ${getValue(shipment?.route?.destinationCity, route?.destination)}`],
                    ["Shipment Type", getValue(shipment?.shipmentInfo?.shipmentType, shipment?.shipmentType, basicInfo?.shipmentType)],
                    ["Shipment Mode", getValue(shipment?.shipmentInfo?.shipmentMode, shipment?.shipmentMode, basicInfo?.transportMode)],
                    ["Port of Loading", getValue(shipment?.route?.portOfLoading, shipment?.route?.loadingPort, shipment?.route?.originCity, shipment?.route?.origin?.city, shipment?.route?.origin?.name, shipment?.route?.origin, shipment?.portOfLoading, shipment?.originCity, shipment?.origin)],
                    ["Port of Discharge", getValue(shipment?.route?.portOfDischarge, shipment?.route?.dischargePort, shipment?.route?.destinationCity, shipment?.route?.destination?.city, shipment?.route?.destination?.name, shipment?.route?.destination, shipment?.portOfDischarge, shipment?.destinationCity, shipment?.destination)],
                    ["Incoterm", getValue(shipment?.shipmentInfo?.incoterm, shipment?.incoterm, basicInfo?.incoterm)],
                    ["Submitted On", formatDateForDisplay(shipment?.createdAt || shipment?.submittedAt)],
                    ["Reference ID", getValue(shipment?.header?.shipmentId, shipment?.shipmentId, shipment?._id)],
                  ].map(([label, value]) => <div key={label} className="bg-slate-50/70 rounded-xl p-3 border border-slate-100"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p><p className="text-xs font-bold text-slate-900 break-words">{value}</p></div>)}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between"><h3 className="text-sm font-extrabold text-slate-900">Charges Breakdown</h3><span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">{(selectedSavedQuotation.charges || selectedSavedQuotation.chargeDetails || []).length} Items</span></div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse min-w-[500px]">
                      <thead><tr className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider"><th className="py-3 px-4 text-left">#</th><th className="py-3 px-4 text-left">Charge Name</th><th className="py-3 px-4 text-left">Description</th><th className="py-3 px-4 text-right">Amount ({selectedSavedQuotation.currency || "INR"})</th></tr></thead>
                      <tbody className="divide-y divide-slate-100">
                        {(selectedSavedQuotation.charges || selectedSavedQuotation.chargeDetails || []).length ? (selectedSavedQuotation.charges || selectedSavedQuotation.chargeDetails).map((charge, idx) => <tr key={charge?._id || idx}><td className="py-3 px-4 text-slate-400 font-bold">{String(idx + 1).padStart(2, "0")}</td><td className="py-3 px-4 font-semibold text-slate-800">{charge?.name || charge?.chargeName || charge?.title || "-"}</td><td className="py-3 px-4 text-slate-500 whitespace-pre-line">{charge?.description || charge?.details || charge?.remark || "-"}</td><td className="py-3 px-4 text-right font-extrabold text-slate-900">{selectedSavedQuotation.currency || "INR"} {Number(charge?.amount ?? charge?.price ?? charge?.value ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td></tr>) : <tr><td colSpan={4} className="py-8 text-center text-slate-400">No charges available for this quotation.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5 bg-blue-600"><p className="text-white font-bold text-xs uppercase tracking-wider">Total {selectedSavedQuotation.currency || "INR"}</p><p className="text-white font-black text-sm">{selectedSavedQuotation.currency || "INR"} {Number(selectedSavedQuotation.totalAmount || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p></div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-5 h-fit">
                  <h3 className="text-sm font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100">Price Summary</h3>
                  <div className="space-y-3 text-xs">
                    {[["Sub Total", selectedSavedQuotation.subtotal], ["Discount", selectedSavedQuotation.discount], ["Tax / GST", selectedSavedQuotation.tax]].map(([label, value]) => <div key={label} className="flex justify-between gap-3 pb-3 border-b border-slate-50"><span className="text-slate-500">{label}</span><b className="text-slate-800">{selectedSavedQuotation.currency || "INR"} {Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</b></div>)}
                    <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-blue-600"><span className="text-white font-extrabold uppercase">Grand Total</span><span className="text-white font-black">{selectedSavedQuotation.currency || "INR"} {Number(selectedSavedQuotation.totalAmount || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {[["Version", selectedSavedQuotation.quoteVersion || "-"], ["Freight Amount", selectedSavedQuotation.freightQuote], ["Valid From", formatDateForDisplay(selectedSavedQuotation.validFrom)], ["Valid Until", formatDateForDisplay(selectedSavedQuotation.validUntil)]].map(([label, value]) => <div key={label} className="flex justify-between gap-3 text-[11px]"><span className="text-slate-400">{label}</span><b className="text-slate-700">{typeof value === "number" ? `${selectedSavedQuotation.currency || "INR"} ${value.toLocaleString("en-IN")}` : value || "-"}</b></div>)}
                  </div>
                </div>
              </div>

              {selectedSavedQuotation.notes && <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5"><p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-2">Notes</p><p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{selectedSavedQuotation.notes}</p></div>}
              {selectedSavedQuotation.termsAndConditions && <div className="bg-white rounded-2xl border border-slate-200 p-5"><div className="flex items-center gap-2 mb-3"><FileText size={15} className="text-slate-600" /><h3 className="text-sm font-extrabold text-slate-900">Terms & Conditions</h3></div><p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{selectedSavedQuotation.termsAndConditions}</p></div>}
              {selectedSavedQuotation.rejectionReason && <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4"><p className="text-xs font-bold text-rose-700">Rejection Reason</p><p className="mt-1 text-xs text-rose-700 whitespace-pre-line">{selectedSavedQuotation.rejectionReason}</p></div>}
              <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-slate-200">CargoMate · Generated for administrative use</div>
            </div>

            <div className="shrink-0 border-t border-slate-200 bg-white px-5 py-3 flex flex-wrap justify-end gap-2 no-print">
              <button type="button" onClick={() => downloadPrintableDocument("saved-quotation-print", `Quotation-${selectedSavedQuotation.quotationNumber || "Document"}`)} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700">
                <FileText size={14} /> Download PDF
              </button>
              <button type="button" onClick={() => { setShowSavedQuotation(false); setSelectedSavedQuotation(null); }} className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800">Close</button>
            </div>
          </div>
        </div>
      )}

      {showExistingInvoice && existingInvoice && (
        <ViewInvoiceModal
          invoice={existingInvoice}
          onClose={() => setShowExistingInvoice(false)}
        />
      )}

      {/* CHANGE STATUS DIALOG MODAL */}
      {showStatusModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/50 backdrop-blur-2xs p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">
                Change Shipment Status
              </h3>
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-slate-400 hover:text-slate-800"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Select the new workflow status to update the database and refresh the dashboard:
            </p>

            <div className="space-y-2">
              {[
                { label: "Pending Review", color: "text-amber-700 bg-amber-50" },
                { label: "Quotation Sent", color: "text-purple-700 bg-purple-50" },
                { label: "Approved", color: "text-emerald-700 bg-emerald-50" },
                { label: "Hold", color: "text-orange-700 bg-orange-50" },
                { label: "Rejected", color: "text-rose-700 bg-rose-50" },
              ].map((st) => (
                <button
                  key={st.label}
                  disabled={statusUpdating}
                  onClick={() => handleStatusChange(st.label)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-all hover:scale-[1.01] ${st.color}`}
                >
                  <span>{st.label}</span>
                  {currentShipmentStatus === st.label && (
                    <CheckCircle2 size={14} />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                fetchShipment(true);
                setShowStatusModal(false);
                showToast("success", "Shipment status refreshed from database!");
              }}
              className="w-full mt-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 flex items-center justify-center gap-1.5"
            >
              <RefreshCcw size={12} />
              Just Refresh from Server
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
