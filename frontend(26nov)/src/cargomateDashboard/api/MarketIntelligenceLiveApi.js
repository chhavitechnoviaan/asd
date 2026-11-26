// import API from "./axios";
import axios from "axios";
const API = axios.create({
  baseURL: ((import.meta.env.VITE_AI_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "").replace(/\/api$/, "")) + "/api",
});
// Both endpoints use the same filter values; API expects "crore" or "usd".
export const fiscalYearForDate = (dateString) => {
  const year = Number(String(dateString).slice(0, 4));
  if (!Number.isFinite(year) || year < 1900) return `${new Date().getFullYear()-1}-${new Date().getFullYear()}`;
  return `${year-1}-${year}`;
};
export const defaultIntelligenceDate = () => `${new Date().getFullYear()}-01-01`;

export const loadMarketIntelligence = async (direction, hsCode, date, valuesIn) => {
  const base = direction === "import" ? "/import-intelligence" : "/export-intelligence";
  const year = fiscalYearForDate(date);
  const code = String(hsCode || "").trim();
  if (!/^\d{2,8}$/.test(code)) throw new Error("Enter a valid numeric HS code (2–8 digits).");
  const params = { hs_code: code, year, values_in: valuesIn, top_n: 10, include_trend: true };
  const [overview, products] = await Promise.allSettled([
    API.get(base, { params }),
    API.get(`${base}/top-products`, { params: { hs_codes: code, year, values_in: valuesIn } }),
  ]);
  if (overview.status === "rejected") throw overview.reason;
  return {
    overview: overview.value.data?.data ?? overview.value.data,
    products: products.status === "fulfilled" ? (products.value.data?.data ?? products.value.data) : null,
    productsError: products.status === "rejected" ? products.reason : null,
  };
};
