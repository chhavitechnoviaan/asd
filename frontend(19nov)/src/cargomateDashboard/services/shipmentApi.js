import API from "../api/axios";

// ==========================================
// SHIPMENT APIs
// ==========================================

export const createShipment = (data) => API.post("/shipments/step1", data);
export const updateShipmentStep2 = (id, data) => API.put(`/shipments/step2/${id}`, data);
export const updateShipmentStep3 = (id, data) => API.put(`/shipments/step3/${id}`, data);
export const updateShipment = (id, data) => API.put(`/shipments/${id}`, data);

export const saveDraft = (id) => API.patch(`/shipments/${id}/save-draft`);
export const analyzeShipment = (id) => API.post(`/shipments/${id}/analyze`);
export const submitShipment = (id) => API.post(`/shipments/${id}/submit`);

export const getMyShipments = () => API.get("/shipments");
export const getShipments = (params = {}) => API.get("/shipments", { params });
export const getShipmentDetails = (id) => API.get(`/shipments/${id}/details`);
export const getShipmentTracking = (id) => API.get(`/shipments/${id}/tracking`);
export const getShipmentStats = () => API.get("/shipments/stats");

export const saveShipmentStep1 = (data) => API.post("/shipments/step1", data);
export const saveShipmentStep2 = (id, data) => API.put(`/shipments/step2/${id}`, data);
export const saveShipmentStep3 = (id, data) => API.put(`/shipments/step3/${id}`, data);

// ==========================================
// DOCUMENT UPLOAD APIs
// ==========================================

export const uploadShipmentDocument = (formData) =>
  API.post("/shipments/upload-docs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const uploadShipmentDocuments = (formData) =>
  API.post("/shipments/upload-docs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ==========================================
// SHIPMENT STATUS & ADMIN APIs
// ==========================================

export const updateShipmentStatus = (id, data) => API.patch(`/shipments/${id}/status`, data);
export const saveShipmentDraft = (id, data) => API.patch(`/shipments/${id}/save-draft`, data);
export const approveShipment = (id, data = {}) => API.post(`/shipments/${id}/approve`, data);
export const rejectShipment = (id, data) => API.post(`/shipments/${id}/reject`, data);
export const holdShipment = (id, data) => API.post(`/shipments/${id}/hold`, data);
export const getAllShipmentsForAdmin = (params = {}) => API.get("/shipments/admin/all", { params });
export const assignCarrier = (id, data) => API.post(`/shipments/${id}/assign-carrier`, data);
export const addTrackingUpdate = (id, data) => API.post(`/shipments/${id}/tracking`, data);

// ==========================================
// SETTINGS APIs
// ==========================================

export const getShipmentFormSettings = () => API.get("/settings/shipment-form");
export const updateShipmentFormSettings = (data) => API.put("/settings/shipment-form", data);
export const resetShipmentFormSettings = () => API.post("/settings/shipment-form/reset");

export const resetDocumentsUploadSettings = () =>
  API.post("/settings/documents-upload-settings/reset");

export const getDocumentsUploadSettings = () =>
  API.get("/settings/documents-upload-settings");

export const updateDocumentsUploadSettings = (data) =>
  API.put("/settings/documents-upload-settings", data);

// ==========================================
// HS CODE & QUOTATION APIs
// ==========================================

export const getHSCodes = () => API.get("/hs");

export const getQuotationByShipment = (shipmentId) =>
  API.get(`/quotations/shipment/${shipmentId}`);

export const deleteShipmentDocument = (shipmentId, documentId) =>
  API.delete(`/shipments/${shipmentId}/documents/${documentId}`);