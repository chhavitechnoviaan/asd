import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./dialogs.css";
export const appAlert = message => Swal.fire({title:"ASD CargoMate",text:String(message ?? ""),icon:/success|completed|saved/i.test(String(message))?"success":/fail|error|unable/i.test(String(message))?"error":"info"});
export const appConfirm = async message => (await Swal.fire({title:"Please confirm",text:String(message),icon:"warning",showCancelButton:true,confirmButtonText:"Confirm",cancelButtonText:"Cancel",focusCancel:true})).isConfirmed;
export const appPrompt = async message => {const result=await Swal.fire({title:String(message),input:"text",showCancelButton:true,confirmButtonText:"Continue"});return result.isConfirmed?result.value:null;};
