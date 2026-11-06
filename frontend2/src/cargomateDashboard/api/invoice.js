import axiosInstance from "./axios";

export const createInvoice = (data) => {
  return axiosInstance.post("/trade-invoices", data);
};

export const getInvoiceById = (id) => {
  return axiosInstance.get(`/trade-invoices/${id}`);
};

export const updateInvoiceStatus = (id, status) => {
  return axiosInstance.put(`/trade-invoices/${id}/status`, {
    status,
  });
};