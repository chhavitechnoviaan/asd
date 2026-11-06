// // import { useState } from "react";
// // import { Copy } from "lucide-react";

// // export default function Documents() {
// //   const [editMode, setEditMode] = useState(false);
// //   const [formData, setFormData] = useState({
// //     shipperCompanyName: "ABC Exports Pvt. Ltd.",
// //     shipperContactPerson: "Aarav sharma",
// //     shipperEmail: "aarav.sharma@gmail.com",
// //     shipperPhone: "+91 74833 65549",
// //     consigneeCompanyName: "Global Imports Inc.",
// //     consigneeContactPerson: "John Williams",
// //     consigneeEmail: "john.williams@gmail.com",
// //     consigneePhone: "+1 202 555 0147",
// //   });

// //   const handleChange = (field) => (e) => {
// //     setFormData({ ...formData, [field]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await fetch("/api/shipment/documents", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       });
// //       const data = await res.json();
// //       setEditMode(false);
// //     } catch (err) {}
// //   };

// //   const inputClass =
// //     "w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 disabled:bg-gray-50";

// //   return (
// //     <form
// //       onSubmit={handleSubmit}
// //       className="w-full max-w-2xl mx-auto bg-white rounded-2xl  p-4 sm:p-6"
// //     >
// //       <div className="flex items-center justify-between mb-6 gap-3">
// //         <div className="flex items-center gap-3 min-w-0">
// //           <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
// //             <Copy className="w-6 h-6 text-blue-500" />
// //           </div>
// //           <div className="min-w-0">
// //             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Documents</h2>
// //             <p className="text-sm text-gray-500 truncate">View and manage shipment documents</p>
// //           </div>
// //         </div>
// //         <button
// //           type="button"
// //           onClick={() => setEditMode((v) => !v)}
// //           className="px-4 py-1.5 rounded-full border border-blue-300 text-blue-600 text-sm shrink-0"
// //         >
// //           {editMode ? "Cancel" : "Edit Details"}
// //         </button>
// //       </div>

// //       <div className="space-y-4">
// //         <h3 className="font-semibold text-gray-900 text-sm">Shipper</h3>
// //         <div className="grid sm:grid-cols-2 gap-4">
// //           <div>
// //               <label className="block text-sm text-gray-700 mb-1">Company Name</label>
// //             <input
// //               disabled={!editMode}
// //               value={formData.shipperCompanyName}
// //               onChange={handleChange("shipperCompanyName")}
// //               className={inputClass}
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Contact Person</label>
// //             <input
// //               disabled={!editMode}
// //               value={formData.shipperContactPerson}
// //               onChange={handleChange("shipperContactPerson")}
// //               className={inputClass}
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Category Name</label>
// //             <input
// //               disabled={!editMode}
// //               value={formData.shipperEmail}
// //               onChange={handleChange("shipperEmail")}
// //               className={inputClass}
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Category Name</label>
// //             <input
// //               disabled={!editMode}
// //               value={formData.shipperPhone}
// //               onChange={handleChange("shipperPhone")}
// //               className={inputClass}
// //             />
// //           </div>
// //         </div>

// //         <h3 className="font-semibold text-gray-900 text-sm">Consignee</h3>
// //         <div className="grid sm:grid-cols-2 gap-4">
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Company Name</label>
// //             <input
// //               disabled={!editMode}
// //               value={formData.consigneeCompanyName}
// //               onChange={handleChange("consigneeCompanyName")}
// //               className={inputClass}
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Contact Person</label>
// //             <input
// //               disabled={!editMode}
// //               value={formData.consigneeContactPerson}
// //               onChange={handleChange("consigneeContactPerson")}
// //               className={inputClass}
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Email</label>
// //             <input
// //               disabled={!editMode}
// //               value={formData.consigneeEmail}
// //               onChange={handleChange("consigneeEmail")}
// //               className={inputClass}
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Contact Person</label>
// //             <input
// //               disabled={!editMode}
// //               value={formData.consigneePhone}
// //               onChange={handleChange("consigneePhone")}
// //               className={inputClass}
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {editMode && (
// //         <div className="flex justify-end mt-6">
// //           <button
// //             type="submit"
// //             className="px-6 py-2 rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600"
// //           >
// //             Save
// //           </button>
// //         </div>
// //       )}
// //     </form>
// //   );
// // }



// import { useState } from "react";
// import { Copy } from "lucide-react";

// export default function Documents() {
//   const initialFormData = {
//     shipperCompanyName: "ABC Exports Pvt. Ltd.",
//     shipperContactPerson: "Aarav sharma",
//     shipperEmail: "aarav.sharma@gmail.com",
//     shipperPhone: "+91 74833 65549",
//     consigneeCompanyName: "Global Imports Inc.",
//     consigneeContactPerson: "John Williams",
//     consigneeEmail: "john.williams@gmail.com",
//     consigneePhone: "+1 202 555 0147",
//   };

//   const [editMode, setEditMode] = useState(false);

//   const [formData, setFormData] = useState(initialFormData);

//   const [savedData, setSavedData] = useState(initialFormData);

//   const handleChange = (field) => (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: e.target.value,
//     }));
//   };

//   const handleEdit = () => {
//     setSavedData(formData);
//     setEditMode(true);
//   };

//   const handleCancel = () => {
//     setFormData(savedData);
//     setEditMode(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Frontend save
//     setSavedData(formData);
//     setEditMode(false);
//   };

//   const inputClass =
//     "w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 disabled:bg-gray-50";

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full max-w-2xl mx-auto bg-white rounded-2xl  p-4 sm:p-6"
//     >
//       <div className="flex items-center justify-between mb-6 gap-3">
//         <div className="flex items-center gap-3 min-w-0">
//           <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
//             <Copy className="w-6 h-6 text-blue-500" />
//           </div>

//           <div className="min-w-0">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//               Documents
//             </h2>

//             <p className="text-sm text-gray-500 truncate">
//               View and manage shipment documents
//             </p>
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={editMode ? handleCancel : handleEdit}
//           className="px-4 py-1.5 rounded-full border border-blue-300 text-blue-600 text-sm shrink-0"
//         >
//           {editMode ? "Cancel" : "Edit Details"}
//         </button>
//       </div>

//       <div className="space-y-4">
//         <h3 className="font-semibold text-gray-900 text-sm">Shipper</h3>

//         <div className="grid sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               Company Name
//             </label>

//             <input
//               disabled={!editMode}
//               value={formData.shipperCompanyName}
//               onChange={handleChange("shipperCompanyName")}
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               Contact Person
//             </label>

//             <input
//               disabled={!editMode}
//               value={formData.shipperContactPerson}
//               onChange={handleChange("shipperContactPerson")}
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               Category Name
//             </label>

//             <input
//               disabled={!editMode}
//               value={formData.shipperEmail}
//               onChange={handleChange("shipperEmail")}
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               Category Name
//             </label>

//             <input
//               disabled={!editMode}
//               value={formData.shipperPhone}
//               onChange={handleChange("shipperPhone")}
//               className={inputClass}
//             />
//           </div>
//         </div>

//         <h3 className="font-semibold text-gray-900 text-sm">Consignee</h3>

//         <div className="grid sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               Company Name
//             </label>

//             <input
//               disabled={!editMode}
//               value={formData.consigneeCompanyName}
//               onChange={handleChange("consigneeCompanyName")}
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               Contact Person
//             </label>

//             <input
//               disabled={!editMode}
//               value={formData.consigneeContactPerson}
//               onChange={handleChange("consigneeContactPerson")}
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               Email
//             </label>

//             <input
//               disabled={!editMode}
//               value={formData.consigneeEmail}
//               onChange={handleChange("consigneeEmail")}
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               Contact Person
//             </label>

//             <input
//               disabled={!editMode}
//               value={formData.consigneePhone}
//               onChange={handleChange("consigneePhone")}
//               className={inputClass}
//             />
//           </div>
//         </div>
//       </div>

//       {editMode && (
//         <div className="flex justify-end mt-6">
//           <button
//             type="submit"
//             className="px-6 py-2 rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600"
//           >
//             Save
//           </button>
//         </div>
//       )}
//     </form>
//   );
// }


import { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  ExternalLink,
  X,
  FileCheck,
  Calendar,
  AlertCircle,
  FileSpreadsheet,
  FileImage,
  FileQuestion,
} from "lucide-react";

export default function Documents({ shipment }) {
  const documents = shipment?.documents || [];

  const [previewDoc, setPreviewDoc] = useState(null);
  const [previewError, setPreviewError] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // DOCUMENT NAME
  const getDocumentName = (doc) => {
    return (
      doc.documentName ||
      doc.fileName ||
      doc.name ||
      doc.documentType ||
      "Shipment Document"
    );
  };

  // DOCUMENT URL
  const getDocumentUrl = (doc) => {
    let rawUrl =
      doc.fileUrl ||
      doc.documentUrl ||
      doc.url ||
      doc.filePath ||
      doc.path ||
      doc.file ||
      doc.secure_url ||
      doc.location ||
      "";

    if (!rawUrl) return "";

    if (/^(https?:\/\/|blob:|data:)/i.test(rawUrl)) {
      return rawUrl;
    }

    const backendBase = (
      import.meta.env.VITE_API_URL ||
      import.meta.env.VITE_BACKEND_URL ||
      "http://localhost:5002"
    ).replace(/\/$/, "");

    const cleanPath = rawUrl.replace(/^\/+/, "");

    // If stored path already contains uploads/
    if (cleanPath.startsWith("uploads/")) {
      return `${backendBase}/${cleanPath}`;
    }

    if (cleanPath.startsWith("api/uploads/")) {
      return `${backendBase}/${cleanPath}`;
    }

    return `${backendBase}/api/uploads/${cleanPath}`;
  };

  // FILE TYPE
  const getFileTypeInfo = (url, name = "", mimeType = "") => {
    let extension = "";

    try {
      const pathname = new URL(url, window.location.origin).pathname;
      extension = pathname.split(".").pop()?.toLowerCase() || "";
    } catch {
      extension = name.split(".").pop()?.toLowerCase() || "";
    }

    if (!extension.includes("/") && extension.includes("?")) {
      extension = extension.split("?")[0];
    }

    extension = extension || name.split(".").pop()?.toLowerCase() || "";

    const mime = (mimeType || "").toLowerCase();

    if (extension === "pdf" || mime === "application/pdf") {
      return {
        type: "pdf",
        icon: FileText,
        color: "text-rose-600 bg-rose-50 border-rose-100",
      };
    }

    if (
      ["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(extension) ||
      mime.startsWith("image/")
    ) {
      return {
        type: "image",
        icon: FileImage,
        color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      };
    }

    if (["xls", "xlsx", "csv"].includes(extension)) {
      return {
        type: "sheet",
        icon: FileSpreadsheet,
        color: "text-teal-600 bg-teal-50 border-teal-100",
      };
    }

    return {
      type: "other",
      icon: FileQuestion,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    };
  };

  // OPEN PREVIEW
  const handleOpenPreview = (doc) => {
    const url = getDocumentUrl(doc);
    const name = getDocumentName(doc);

    if (!url) {
      alert("Document URL is missing.");
      return;
    }

    const fileInfo = getFileTypeInfo(
      url,
      name,
      doc.mimeType || doc.mimetype
    );

    setPreviewError(false);
    setPreviewLoading(true);

    setPreviewDoc({
      url,
      name,
      type: fileInfo.type,
      isPdf: fileInfo.type === "pdf",
      isImage: fileInfo.type === "image",
    });
  };

  // DOWNLOAD DOCUMENT
  const handleDownload = async (url, name, id) => {
    if (!url) return;

    try {
      setDownloadingId(id);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = name || "shipment-document";

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 1500);
    } catch (error) {
      console.error("Document download error:", error);

      // Fallback
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setDownloadingId(null);
    }
  };

  // CLOSE PREVIEW
  const closePreview = () => {
    setPreviewDoc(null);
    setPreviewError(false);
    setPreviewLoading(false);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 space-y-6">

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">

        <div className="flex items-center gap-3.5">

          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <FileText size={20} />
          </div>

          <div>
            <div className="flex items-center gap-2">

              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Consignment Documents
              </h2>

              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700 border border-slate-200">
                {documents.length} Files
              </span>

            </div>

            <p className="text-xs text-slate-500 mt-1">
              Shipment invoices, packing lists and compliance documents.
            </p>
          </div>

        </div>

      </div>

      {/* DOCUMENT LIST */}

      {documents.length === 0 ? (

        <div className="rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center bg-slate-50">

          <FileQuestion size={30} className="text-slate-400 mx-auto mb-3" />

          <h3 className="text-sm font-bold text-slate-800">
            No Documents Uploaded Yet
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            Uploaded shipment documents will appear here.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 gap-3.5">

          {documents.map((doc, index) => {

            const name = getDocumentName(doc);
            const url = getDocumentUrl(doc);
            const docId = doc._id || index;

            const fileInfo = getFileTypeInfo(
              url,
              name,
              doc.mimeType || doc.mimetype
            );

            const Icon = fileInfo.icon;
            const isDownloading = downloadingId === docId;

            return (

              <div
                key={docId}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-200 p-4 transition-all"
              >

                {/* FILE DETAILS */}

                <div className="flex items-center gap-3.5 min-w-0">

                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${fileInfo.color}`}
                  >
                    <Icon size={20} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-sm font-bold text-slate-900 truncate">
                      {name}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-1">

                      {doc.documentType && (
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                          {doc.documentType}
                        </span>
                      )}

                      {(doc.uploadedDate || doc.createdAt) && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Calendar size={11} />

                          {new Date(
                            doc.uploadedDate || doc.createdAt
                          ).toLocaleDateString("en-GB")}
                        </span>
                      )}

                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <FileCheck size={11} />
                        Uploaded
                      </span>

                    </div>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">

                  {url ? (

                    <>

                      <button
                        type="button"
                        onClick={() => handleOpenPreview(doc)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold"
                      >
                        <Eye size={14} />
                        Preview
                      </button>

                      <button
                        type="button"
                        disabled={isDownloading}
                        onClick={() =>
                          handleDownload(url, name, docId)
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold disabled:opacity-50"
                      >
                        <Download size={14} />

                        {isDownloading ? "Downloading..." : "Download"}
                      </button>

                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-800"
                        title="Open in new tab"
                      >
                        <ExternalLink size={14} />
                      </a>

                    </>

                  ) : (

                    <span className="text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle size={13} />
                      File path unavailable
                    </span>

                  )}

                </div>

              </div>

            );

          })}

        </div>

      )}

      {/* PREVIEW MODAL */}

      {previewDoc && (

        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-3 sm:p-6">

          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">

            {/* MODAL HEADER */}

            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">

              <div className="flex items-center gap-2 min-w-0">

                <FileText size={18} className="text-indigo-600 shrink-0" />

                <h3 className="text-sm font-bold text-slate-900 truncate">
                  {previewDoc.name}
                </h3>

              </div>

              <div className="flex items-center gap-2 shrink-0">

                <a
                  href={previewDoc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-lg border bg-white text-xs font-semibold text-slate-600 flex items-center gap-1"
                >
                  <ExternalLink size={13} />
                  New Tab
                </a>

                <button
                  type="button"
                  onClick={closePreview}
                  className="w-9 h-9 rounded-lg border bg-white text-slate-500 hover:text-slate-900 flex items-center justify-center"
                >
                  <X size={17} />
                </button>

              </div>

            </div>

            {/* VIEWER */}

            <div className="flex-1 overflow-auto p-3 sm:p-5 bg-slate-100 flex items-center justify-center min-h-[400px] relative">

              {previewLoading && !previewError && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10 pointer-events-none">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-xs text-slate-500">
                      Loading document...
                    </p>
                  </div>
                </div>
              )}

              {previewError ? (

                <div className="text-center p-8 bg-white rounded-2xl border border-rose-200 max-w-md">

                  <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />

                  <h4 className="text-sm font-bold text-slate-900">
                    Unable to Preview Document
                  </h4>

                  <p className="text-xs text-slate-500 mt-2">
                    The document could not be loaded. Please check the server file URL.
                  </p>

                  <a
                    href={previewDoc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold"
                  >
                    Open Document
                  </a>

                </div>

              ) : previewDoc.isPdf ? (

                <iframe
                  src={previewDoc.url}
                  title={previewDoc.name}
                  onLoad={() => setPreviewLoading(false)}
                  onError={() => {
                    setPreviewLoading(false);
                    setPreviewError(true);
                  }}
                  className="w-full h-[72vh] rounded-xl border border-slate-200 bg-white"
                />

              ) : previewDoc.isImage ? (

                <img
                  src={previewDoc.url}
                  alt={previewDoc.name}
                  onLoad={() => setPreviewLoading(false)}
                  onError={() => {
                    setPreviewLoading(false);
                    setPreviewError(true);
                  }}
                  className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-md bg-white"
                />

              ) : (

                <div className="text-center p-8 bg-white rounded-2xl border max-w-md">

                  <FileQuestion className="w-12 h-12 text-indigo-500 mx-auto mb-3" />

                  <h4 className="text-sm font-bold text-slate-900">
                    Preview Not Available
                  </h4>

                  <p className="text-xs text-slate-500 mt-2">
                    Download this file to view it.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleDownload(
                        previewDoc.url,
                        previewDoc.name,
                        "preview"
                      )
                    }
                    className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold"
                  >
                    Download Document
                  </button>

                </div>

              )}

            </div>

            {/* FOOTER */}

            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">

              <span className="text-xs text-slate-500">
                Secure Document Viewer
              </span>

              <button
                type="button"
                onClick={closePreview}
                className="px-4 py-2 rounded-lg border text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close Preview
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}