import API from "./axios";

// Document Dashboard APIs
export const getDocumentDashboard = (params) => API.get("/document-dashboard/dashboard", { params });
export const getDashboardDocuments = (params) => API.get("/document-dashboard/documents", { params });
export const getDocumentsByType = (params) => API.get("/document-dashboard/documents-by-type", { params });
export const getDocumentStatusOverview = (params) => API.get("/document-dashboard/status-overview", { params });
export const getDocumentInsights = (params) => API.get("/document-dashboard/insights", { params });
export const getDashboardExpiringDocuments = (params) => API.get("/document-dashboard/expiring", { params });
export const getDashboardRecentUploads = (params) => API.get("/document-dashboard/recent-uploads", { params });
export const getDocumentFilterOptions = (params) => API.get("/document-dashboard/filters", { params });

// Document APIs
export const getDocuments = (params) => API.get("/documents", { params });
export const getDocumentsDashboard = (params) => API.get("/documents/dashboard", { params });
export const getRecentUploads = (params) => API.get("/documents/recent", { params });
export const getStorage = (params) => API.get("/documents/storage", { params });
export const getExpiringDocuments = (params) => API.get("/documents/expiring", { params });
export const uploadDocument = (formData) => API.post("/documents/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const downloadDocument = (id) => API.get(`/documents/${id}/download`, { responseType: "blob" });
export const deleteDocument = (id) => API.delete(`/documents/${id}`);