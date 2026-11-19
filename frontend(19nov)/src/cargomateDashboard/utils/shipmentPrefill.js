import { COUNTRIES } from "../../data/countries";
// Temporary per-tab handoff for existing Create Shipment actions. Never stores passwords/tokens.
const KEY = "cargomate:shipment-prefill:v1";
const first = (...values) => values.find((v) => v !== null && v !== undefined && v !== "");
const normalizeCountry = (value) => {
  if (typeof value !== "string") return undefined;
  const clean = value.trim();
  const aliases = { UAE: "United Arab Emirates", USA: "United States", UK: "United Kingdom" };
  const candidate = aliases[clean.toUpperCase()] || clean;
  return COUNTRIES.find(country => country.toLowerCase() === candidate.toLowerCase());
};

export function saveShipmentPrefill(rawResult, input = {}, selectedOption = null) {
  try {
    const result = rawResult?.data?.data ?? rawResult?.data ?? rawResult?.result ?? rawResult ?? {};
    const q = { ...(result.query || {}), ...(input && typeof input === "object" ? input : {}) };
    const best = result.best_match ?? result.hs_details ?? {};
    const shipment = result.shipment ?? result.shipment_details ?? {};
    const values = {
      shipmentType: first(q.shipment_type, q.trade, shipment.shipmentType),
      shipmentMode: first(selectedOption?.mode, result.best_mode, shipment.shipmentMode),
      originCountry: first(q.origin_country, q.export_country, q.originCountry, normalizeCountry(q.origin)),
      originCity: first(q.origin_port, q.origin_city, q.originCity, !normalizeCountry(q.origin) ? q.origin : undefined),
      destinationCountry: first(q.destination_country, q.import_country, q.destinationCountry, normalizeCountry(q.destination)),
      destinationCity: first(q.destination_city, q.destinationCity, !normalizeCountry(q.destination) ? q.destination : undefined),
      destinationPort: first(q.destination_port, q.destinationPort),
      incoterm: first(q.incoterm, result.incoterm),
      etd: first(selectedOption?.est_departure, result.est_departure),
      eta: first(selectedOption?.est_arrival, result.est_arrival),
      productName: first(q.commodity, q.product, q.product_name, result.product),
      productDescription: first(q.product_description, q.commodity, q.product, q.query),
      hsCode: first(q.hs_code, q.hsCode, best.hs_code, result.hs_code, result.hs_details?.hs_code),
      quantity: first(q.quantity, result.quantity),
      unit: first(q.unit, result.unit),
      weight: first(q.weight_kg, result.weight_kg),
      currency: q.product_value_inr !== undefined && q.product_value_inr !== null ? "INR" : first(q.currency, result.currency, result.result_summary?.currency),
      amount: first(q.product_value_inr, q.invoice_value, q.product_value, shipment.amount),
    };
    // Normalize API terminology to the form's actual dropdown options.
    if (values.shipmentType) {
      const kind = String(values.shipmentType).toLowerCase();
      values.shipmentType = kind.includes("export") ? (kind.includes("re-") ? "Re-export" : "Export") : kind.includes("import") ? "Import" : undefined;
    }
    if (values.shipmentMode) {
      const mode = String(values.shipmentMode).toLowerCase();
      values.shipmentMode = mode.includes("air") ? "Air" : mode.includes("sea") ? "Sea" : mode.includes("road") ? "Road" : mode.includes("rail") ? "Rail" : undefined;
    }
    const cleaned = Object.fromEntries(Object.entries(values).filter(([,v])=>v!==null && v!==undefined && v!==""));
    if (Object.keys(cleaned).length) sessionStorage.setItem(KEY, JSON.stringify({ savedAt: Date.now(), values: cleaned }));
    else sessionStorage.removeItem(KEY);
  } catch (err) { console.warn("Shipment prefill could not be saved:", err); }
}

export function consumeShipmentPrefill() {
  try {
    const raw = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.savedAt || Date.now() - parsed.savedAt > 15 * 60 * 1000) return null;
    return parsed.values ?? null;
  } catch { return null; }
}
