import "./glassAlert.css";
import Swal from "sweetalert2";

export const glassAlert = (icon, title, text = "") => Swal.fire({
  icon, title, text, confirmButtonText: "OK", confirmButtonColor: "#0D9488",
  background: "#f8fbff", color: "#10223b", backdrop: "rgba(11, 25, 48, 0.57)",
  customClass: {
    popup: "cargomate-glass-alert",
    confirmButton: "cargomate-glass-button",
  },
});
export const glassSuccess = (title, text) => glassAlert("success", title, text);
export const glassError = (title, text) => glassAlert("error", title, text);
