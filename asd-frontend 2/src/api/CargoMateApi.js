import axios from "axios";

// AI API service. Set VITE_AI_API_BASE_URL in .env for other environments.
const baseURL = (import.meta.env.VITE_AI_API_BASE_URL || import.meta.env.VITE_CARGOMATE_API_URL || "http://187.127.140.51:8034/api").replace(/\/$/, "");
const CargoMateAPI = axios.create({
  baseURL,
  timeout: 45000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

CargoMateAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const sendTradeChat = ({ message, session_id, user_role } = {}) =>
  CargoMateAPI.post("/chat", { message, session_id, user_role });

// These AI endpoints use JSON POST bodies as shown in the API docs.
export const lookupHsCode = (payload = {}) => CargoMateAPI.post("/lookup", payload);
export const estimateIncentives = (payload = {}) => CargoMateAPI.post("/incentive/estimate", payload);
export const calculateMeis = (payload = {}) => CargoMateAPI.post("/incentive/meis", payload);

export const getAiApiBaseUrl = () => baseURL;
export default CargoMateAPI;
