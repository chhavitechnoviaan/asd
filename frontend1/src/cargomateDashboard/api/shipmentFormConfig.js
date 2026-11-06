import API from "./axios";
export async function loadShipmentFormConfig(){const response=await API.get("/shipment-form-config");return response.data.data;}
export async function saveShipmentFormConfig(section, data){const response=await API.put(`/shipment-form-config/${section}`,data);return response.data.data;}
