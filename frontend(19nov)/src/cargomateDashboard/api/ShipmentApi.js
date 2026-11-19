// import API from "./axios";

// // ShipmentDashboard API functions 
// export const getShipments = (params = {}) => {
//   return API.get("/shipment-dashboard/shipments", { params });
// };

// export const getDashboard= () => {
//   return API.get("/shipment-dashboard/dashboard");
// };

// export const getShipmentTracker = (id) => {
//   return API.get(`/shipment-dashboard/tracker/${id}`);
// };

// export const getShipmentStatusOverview = () => {
//   return API.get("/shipment-dashboard/status-overview");
// };

// export const getShipmentsByMode = () => {
//   return API.get("/shipment-dashboard/shipment-modes");
// };


// export const getTopOriginCountries = () => {
//   return API.get("/shipment-dashboard/origin-countries");
// };

// export const getRecentAlerts = () => {
//   return API.get("/shipment-dashboard/recent-alerts");
// };

// export const getTopDestinationCountries = () => {
//   return API.get("/shipment-dashboard/destination-countries");
// };

// export const getFilterOptions = () => {
//   return API.get("/shipment-dashboard/filters");
// };

// // Shipment API functions
// export const getShipmentDetails = (id) => {
//   return API.get(`/shipments/${id}/details`);
// };

// export const saveShipmentStep1 = (data) => {
//   return API.post("/shipments/step1", data);
// };

// export const saveShipmentStep2 = (id, data) => {
//   return API.put(`/shipments/step2/${id}`, data);
// };

// export const saveShipmentStep3 = (id, data) => {
//   return API.put(`/shipments/step3/${id}`, data);
// };

// export const uploadShipmentDocuments = (formData) => {
//   return API.post("/shipments/upload-docs", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// export const updateShipmentStatus = (id, data) => {
//   return API.patch(`/shipments/${id}/status`, data);
// };

// export const saveShipmentDraft = (id, data) => {
//   return API.patch(`/shipments/${id}/save-draft`, data);
// };

// export const submitShipment = (id) => {
//   return API.post(`/shipments/${id}/submit`);
// };

// export const analyzeShipment = (id) => {
//   return API.post(`/shipments/${id}/analyze`);
// };

// export const approveShipment = (id, data = {}) => {
//   return API.post(`/shipments/${id}/approve`, data);
// };

// export const rejectShipment = (id, data) => {
//   return API.post(`/shipments/${id}/reject`, data);
// };

// export const holdShipment = (id, data) => {
//   return API.post(`/shipments/${id}/hold`, data);
// };

// export const getAllShipmentsForAdmin = () => {
//   return API.get("/shipments/admin/all");
// };

// export const assignCarrier = (id, data) => {
//   return API.post(`/shipments/${id}/assign-carrier`, data);
// };

// export const addTrackingUpdate = (id, data) => {
//   return API.post(`/shipments/${id}/tracking`, data);
// };

// export const getShipmentTracking = (id) =>
//   API.get(`/shipments/${id}/tracking`);


// mahima code //
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

// export const getShipments = (params = {}) => {
//   return API.get("/shipment-dashboard/shipments", { params });
// };

// export const getDashboard= () => {
//   return API.get("/shipment-dashboard/dashboard");
// };

// export const getShipmentTracker = (id) => {
//   return API.get(`/shipment-dashboard/tracker/${id}`);
// };

// export const getShipmentStatusOverview = () => {
//   return API.get("/shipment-dashboard/status-overview");
// };

export const getShipmentsByMode = () => {
  return API.get("/shipment-dashboard/shipment-modes");
};


export const getTopOriginCountries = () => {
  return API.get("/shipment-dashboard/origin-countries");
};

// export const getRecentAlerts = () => {
//   return API.get("/shipment-dashboard/recent-alerts");
// };

export const getTopDestinationCountries = () => {
  return API.get("/shipment-dashboard/destination-countries");
};

// export const getFilterOptions = () => {
//   return API.get("/shipment-dashboard/filters");
// };

// // Shipment API functions
// export const getShipmentDetails = (id) => {
//   return API.get(`/shipments/${id}/details`);
// };

// export const saveShipmentStep1 = (data) => {
//   return API.post("/shipments/step1", data);
// };

// export const saveShipmentStep2 = (id, data) => {
//   return API.put(`/shipments/step2/${id}`, data);
// };

// export const saveShipmentStep3 = (id, data) => {
//   return API.put(`/shipments/step3/${id}`, data);
// };

// export const uploadShipmentDocuments = (formData) => {
//   return API.post("/shipments/upload-docs", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// export const updateShipmentStatus = (id, data) => {
//   return API.patch(`/shipments/${id}/status`, data);
// };

// export const saveShipmentDraft = (id, data) => {
//   return API.patch(`/shipments/${id}/save-draft`, data);
// };

// export const submitShipment = (id) => {
//   return API.post(`/shipments/${id}/submit`);
// };

// export const analyzeShipment = (id) => {
//   return API.post(`/shipments/${id}/analyze`);
// };

// export const approveShipment = (id, data = {}) => {
//   return API.post(`/shipments/${id}/approve`, data);
// };

// export const rejectShipment = (id, data) => {
//   return API.post(`/shipments/${id}/reject`, data);
// };

// export const holdShipment = (id, data) => {
//   return API.post(`/shipments/${id}/hold`, data);
// };

// export const getAllShipmentsForAdmin = () => {
//   return API.get("/shipments/admin/all");
// };

// export const assignCarrier = (id, data) => {
//   return API.post(`/shipments/${id}/assign-carrier`, data);
// };

// export const addTrackingUpdate = (id, data) => {
//   return API.post(`/shipments/${id}/tracking`, data);
// };

// export const getShipmentTracking = (id) =>
//   API.get(`/shipments/${id}/tracking`);

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
export const getShipmentTracker = (id) => {
  return API.get(`/shipment-dashboard/tracker/${id}`);
};
export const getRecentAlerts = () => {
  return API.get("/shipment-dashboard/recent-alerts");
};
export const getDashboard= () => {
  return API.get("/shipment-dashboard/dashboard");
};
export const getFilterOptions = () => {
  return API.get("/shipment-dashboard/filters");
};

export const getShipmentStatusOverview = () => {
  return API.get("/shipment-dashboard/status-overview");
};
// ==========================================
// SETTINGS APIs
// ==========================================

export const getShipmentFormSettings = () => API.get("/settings/shipment-form");

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