// import API from "./axios";

// export const getDashboard = async () => {
//     return API.get("/shipment-database/dashboard");
// };

// export const getShipments = async () => {
//     return API.get("/shipment-database/shipments");
// };

// export const getFilterOptions = async () => {
//     return API.get("/shipment-database/filters");
// };

// export const exportReport = async () => {
//     return API.get("/shipment-database/export-report");
// };

// mahima code //

import api from "./axios"; // apne existing axios path ke according adjust karna

export const getDashboard = (params = {}) =>
  api.get("/shipment-database/dashboard", { params });

export const getFilterOptions = () =>
  api.get("/shipment-database/filters");

export const getShipments = (params = {}) =>
  api.get("/shipment-database/shipments", { params });

export const exportReport = (params = {}) =>
  api.get("/shipment-database/export-report", { params });