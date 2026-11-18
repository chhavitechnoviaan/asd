// import API from "./axios";

// export const getDashboard = async () => {
//     return API.get("/b2b/export/dashboard");
// };

// export const getFilterOptions = async () => {
//     return API.get("/b2b/export/filters");
// };
// export const getExportTrend = async () => {
//     return API.get("/b2b/export/export-trend");
// };

// export const getCountryDistribution = async () => {
//     return API.get("/b2b/export/country-distribution");
// };

// export const getTopProducts = async () => {
//     return API.get("/b2b/export/top-products");
// };

// export const getTopExporters = async () => {
//     return API.get("/b2b/export/top-exporters");
// };

// export const getTopBuyers = async () => {
//     return API.get("/b2b/export/top-buyers");
// };

// export const getPortWiseExports = async () => {
//     return API.get("/b2b/export/port-wise-exports");
// };

// export const getRecentShipments = async () => {
//     return API.get("/b2b/export/recent-shipments");
// };


// mahima code //
import API from "./axios";

export const getDashboard = (params = {}) =>
  API.get("/b2b/export/dashboard", { params });

export const getFilterOptions = () =>
  API.get("/b2b/export/filters");

export const getExportTrend = (params = {}) =>
  API.get("/b2b/export/export-trend", { params });

export const getCountryDistribution = (params = {}) =>
  API.get("/b2b/export/country-distribution", { params });

export const getTopProducts = (params = {}) =>
  API.get("/b2b/export/top-products", { params });

export const getTopExporters = (params = {}) =>
  API.get("/b2b/export/top-exporters", { params });

export const getTopBuyers = (params = {}) =>
  API.get("/b2b/export/top-buyers", { params });

export const getPortWiseExports = (params = {}) =>
  API.get("/b2b/export/port-wise-exports", { params });

export const getRecentShipments = (params = {}) =>
  API.get("/b2b/export/recent-shipments", { params });