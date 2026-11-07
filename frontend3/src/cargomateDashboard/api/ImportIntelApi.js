// import API from "./axios";

// export const getDashboard = async () => {
//     return API.get("/b2b/import/dashboard");
// };

// export const getFilterOptions = async () => {
//     return API.get("/b2b/import/filters");
// }

// export const getImportTrend = async () => {
//     return API.get("/b2b/import/import-trend");
// };

// export const getCountryDistribution = async () => {
//     return API.get("/b2b/import/country-distribution");
// };

// export const getTopProducts = async () => {
//     return API.get("/b2b/import/top-products");
// };

// export const getTopSuppliers = async () => {
//     return API.get("/b2b/import/top-suppliers");
// };

// export const getTopImporters = async () => {
//     return API.get("/b2b/import/top-importers");
// };

// export const getPortWiseImports = async () => {
//     return API.get("/b2b/import/port-wise-imports");
// };

// export const getRecentShipments = async () => {
//     return API.get("/b2b/import/recent-shipments");
// };


// mahima code //

import API from "./axios";

export const getDashboard = (params = {}) =>
  API.get("/b2b/import/dashboard", { params });

export const getFilterOptions = () =>
  API.get("/b2b/import/filters");

export const getImportTrend = (params = {}) =>
  API.get("/b2b/import/import-trend", { params });

export const getCountryDistribution = (params = {}) =>
  API.get("/b2b/import/country-distribution", { params });

export const getTopProducts = (params = {}) =>
  API.get("/b2b/import/top-products", { params });

export const getTopSuppliers = (params = {}) =>
  API.get("/b2b/import/top-suppliers", { params });

export const getTopImporters = (params = {}) =>
  API.get("/b2b/import/top-importers", { params });

export const getPortWiseImports = (params = {}) =>
  API.get("/b2b/import/port-wise-imports", { params });

export const getRecentShipments = (params = {}) =>
  API.get("/b2b/import/recent-shipments", { params });