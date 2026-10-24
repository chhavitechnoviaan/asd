



// // import axios from "axios";

// // const baseURL = (
// //   import.meta.env.VITE_AI_API_BASE_URL ||
// //   import.meta.env.VITE_CARGOMATE_API_URL ||
// //   "http://187.127.140.51:8034/api"
// // ).replace(/\/+$/, "");

// // const CargoMateAPI = axios.create({
// //   baseURL,
// //   timeout: 45000,
// //   headers: {
// //     Accept: "application/json",
// //     "Content-Type": "application/json",
// //   },
// // });

// // CargoMateAPI.interceptors.request.use((config) => {
// //   const token =
// //     localStorage.getItem("token") ||
// //     localStorage.getItem("accessToken");

// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }

// //   return config;
// // });

// // export const sendTradeChat = ({
// //   message,
// //   session_id,
// //   user_role,
// // } = {}) =>
// //   CargoMateAPI.post("/chat", {
// //     message,
// //     session_id,
// //     user_role,
// //   });

// // export const lookupHsCode = (payload = {}) => {
// //   const params = {
// //     product: payload.product ?? payload.product_description ?? "",
// //     export_country:
// //       payload.export_country ?? payload.country_of_export ?? "India",
// //     import_country:
// //       payload.import_country ??
// //       payload.country_of_import ??
// //       "United Arab Emirates",
// //     quantity: Number(payload.quantity ?? 1),
// //     unit: payload.unit ?? "KG",
// //     shipment_type: payload.shipment_type ?? "general_export",
// //     include_tariff: payload.include_tariff ?? true,
// //   };

// //   return CargoMateAPI.get("/lookup", { params });
// // };

// // export const estimateIncentives = (payload = {}) =>
// //   CargoMateAPI.get("/incentive/estimate", payload);

// // export const calculateMeis = (payload = {}) =>
// //   CargoMateAPI.get("/incentive/meis", payload);

// // export const getCommodityCountryTrend = (params = {}) =>
// //   CargoMateAPI.get("/commodity-country-trend", { params });

// // export const getAiApiBaseUrl = () => baseURL;

// // export default CargoMateAPI;



// import axios from "axios";

// const baseURL = (
//   import.meta.env.VITE_AI_API_BASE_URL ||
//   import.meta.env.VITE_CARGOMATE_API_URL ||
//   "http://187.127.140.51:8034/api"
// ).replace(/\/+$/, "");

// const CargoMateAPI = axios.create({
//   baseURL,
//   timeout: 45000,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// CargoMateAPI.interceptors.request.use((config) => {
//   const token =
//     localStorage.getItem("token") ||
//     localStorage.getItem("accessToken");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export const sendTradeChat = ({
//   message,
//   session_id,
//   user_role,
// } = {}) =>
//   CargoMateAPI.post("/chat", {
//     message,
//     session_id,
//     user_role,
//   });

// export const lookupHsCode = (payload = {}) =>
//   CargoMateAPI.get("/lookup", {
//     params: {
//       product: payload.product ?? payload.product_description ?? "",
//       export_country:
//         payload.export_country ?? payload.country_of_export ?? "India",
//       import_country:
//         payload.import_country ??
//         payload.country_of_import ??
//         "United Arab Emirates",
//       quantity: Number(payload.quantity ?? 1),
//       unit: payload.unit ?? "KG",
//       shipment_type: payload.shipment_type ?? "general_export",
//       include_tariff: payload.include_tariff ?? true,
//     },
//   });


// export const estimateIncentives = (payload = {}) =>
//   CargoMateAPI.get("/incentives/estimate", {
//     params: {
//       hs_code: payload.hs_code,
//       fob_value: Number(payload.fob_value),
//       quantity: Number(payload.quantity),
//       meis_rate_pct: Number(payload.meis_rate_pct),
//     },
//   });

// export const calculateMeis = (payload = {}) =>
//   CargoMateAPI.get("/incentives/meis", {
//     params: {
//       hs_code: payload.hs_code,
//       fob_value: Number(payload.fob_value),
//       quantity: Number(payload.quantity),
//       meis_rate_pct: Number(payload.meis_rate_pct),
//     },
//   });

// export const getCommodityCountryTrend = (params = {}) =>
//   CargoMateAPI.get("/tradestat/commodity-country-trend", { params });

// export const getAiApiBaseUrl = () => baseURL;

// export default CargoMateAPI;


import axios from "axios";

const baseURL = (
  import.meta.env.VITE_AI_API_BASE_URL ||
  import.meta.env.VITE_CARGOMATE_API_URL ||
  "http://187.127.140.51:8034/api"
).replace(/\/+$/, "");

const CargoMateAPI = axios.create({
  baseURL,
  timeout: 45000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

CargoMateAPI.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const sendTradeChat = ({
  message,
  session_id,
  user_role,
} = {}) =>
  CargoMateAPI.post("/chat", {
    message,
    session_id,
    user_role,
  });

export const lookupHsCode = (payload = {}) =>
  CargoMateAPI.get("/lookup", {
    params: {
      product: payload.product ?? payload.product_description ?? "",
      export_country:
        payload.export_country ?? payload.country_of_export ?? "India",
      import_country:
        payload.import_country ??
        payload.country_of_import ??
        "United Arab Emirates",
      quantity: Number(payload.quantity ?? 1),
      unit: payload.unit ?? "KG",
      shipment_type: payload.shipment_type ?? "general_export",
      include_tariff: payload.include_tariff ?? true,
    },
  });

export const estimateIncentives = (payload = {}) =>
  CargoMateAPI.get("/incentives/estimate", {
    params: {
      hs_code: payload.hs_code,
      fob_value: Number(payload.fob_value),
      quantity: Number(payload.quantity),
      meis_rate_pct: Number(payload.meis_rate_pct),
    },
  });

export const calculateMeis = (payload = {}) =>
  CargoMateAPI.get("/incentives/meis", {
    params: {
      hs_code: payload.hs_code,
      fob_value: Number(payload.fob_value),
      quantity: Number(payload.quantity),
      meis_rate_pct: Number(payload.meis_rate_pct),
    },
  });

// Existing trade trend API
export const getCommodityCountryTrend = (params = {}) =>
  CargoMateAPI.get("/tradestat/commodity-country-trend", {
    params: {
      ...params,
      values_in: params.values_in ?? "₹ Crore",
    },
  });

// Import Intelligence API
export const getImportIntelligence = (payload = {}) =>
  CargoMateAPI.get("/import-intelligence", {
    params: {
      hs_code: payload.hs_code,
      year: payload.year,
      top_n: Number(payload.top_n ?? 10),
      include_trend: payload.include_trend ?? true,
      values_in: payload.values_in ?? "₹ Crore",
    },
  });

// Export Intelligence API
export const getExportIntelligence = (payload = {}) =>
  CargoMateAPI.get("/export-intelligence", {
    params: {
      hs_code: payload.hs_code,
      year: payload.year,
      top_n: Number(payload.top_n ?? 10),
      include_trend: payload.include_trend ?? true,
      values_in: payload.values_in ?? "₹ Crore",
    },
  });

// Commodity trade API
export const getCommodityTrade = (payload = {}) =>
  CargoMateAPI.get("/tradestat/commodity-trade", {
    params: {
      ...payload,
      values_in: payload.values_in ?? "₹ Crore",
    },
  });

export const getAiApiBaseUrl = () => baseURL;

export default CargoMateAPI;
