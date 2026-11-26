import axios from "axios";
import { getSession } from "../../lib/auth";

const API = axios.create({
  baseURL: ((import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/$/, "").replace(/\/api$/, "")) + "/api",
});

// const API = axios.create({
//   baseURL: ((import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/$/, "").replace(/\/api$/, "")) + "/api",
// });

// // token automatically attach hoga
// =======
// const getBaseUrl = () => {
//   const raw = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/$/, "");
//   return raw.endsWith("/api") ? raw : `${raw}/api`;
// };

// const API = axios.create({
//   baseURL: getBaseUrl(),
// });

// // token automatically attached
// token automatically attach hoga
API.interceptors.request.use((config) => {
  const token = getSession()?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export default API;
