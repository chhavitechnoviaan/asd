// import axios from "./axios";

// // CREATE QUOTATION
// export const createQuotation = (data) => {
//   return axios.post("/quotations", data);
// };

// // GET QUOTATION BY SHIPMENT
// export const getQuotationByShipment = (shipmentId) => {
//   return axios.get(`/quotations/shipment/${shipmentId}`);
// };

// // GET SINGLE QUOTATION
// export const getQuotationById = (id) => {
//   return axios.get(`/quotations/${id}`);
// };

// // SHARE QUOTATION
// export const shareQuotation = (quotationId) => {
//   return axios.put(`/quotations/${quotationId}/share`);
// };

// // UPDATE QUOTATION CHARGES
// export const updateQuotationCharges = (quotationId, data) => {
//   return axios.put(`/quotations/${quotationId}/charges`, data);
// };

// // ACCEPT QUOTATION
// export const acceptQuotation = (id) => {
//   return axios.put(`/quotations/${id}/accept`);
// };

// // REJECT QUOTATION
// export const rejectQuotation = (id, rejectionReason) => {
//   return axios.put(`/quotations/${id}/reject`, {
//     rejectionReason,
//   });
// };

// mahima code //

import axios from "./axios";

// CREATE QUOTATION
export const createQuotation = (data) => {
  return axios.post("/quotations", data);
};

// GET QUOTATION BY SHIPMENT
export const getQuotationByShipment = (shipmentId) => {
  return axios.get(`/quotations/shipment/${shipmentId}`);
};

// GET SINGLE QUOTATION
export const getQuotationById = (id) => {
  return axios.get(`/quotations/${id}`);
};

// SHARE QUOTATION
export const shareQuotation = (quotationId) => {
  return axios.put(`/quotations/${quotationId}/share`);
};

// UPDATE QUOTATION CHARGES
export const updateQuotationCharges = (quotationId, data) => {
  return axios.put(`/quotations/${quotationId}/charges`, data);
};

// ACCEPT QUOTATION
export const acceptQuotation = (id) => {
  return axios.put(`/quotations/${id}/accept`);
};

// REJECT QUOTATION
export const rejectQuotation = (id, rejectionReason) => {
  return axios.put(`/quotations/${id}/reject`, {
    rejectionReason,
  });
};