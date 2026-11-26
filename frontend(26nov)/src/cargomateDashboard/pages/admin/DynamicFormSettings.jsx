import {useEffect,useState} from "react";
import {FiPlus,FiTrash2,FiSave,FiRotateCcw} from "react-icons/fi";
import {loadShipmentFormConfig,saveShipmentFormConfig} from "../../api/shipmentFormConfig";
import {glassError,glassSuccess} from "../../utils/glassAlert";

const defaults={shipment:[
 ["shipmentType","Shipment Type","Dropdown","Export, Import"],
 ["shipmentMode","Shipment Mode","Dropdown","Air, Sea, Road"],
 ["shipmentPurpose","Shipment Purpose","Dropdown","Commercial, Sample, Personal"],
 ["companyName","Customer / Company Name","Text",""],
 ["contactPerson","Contact Person","Text",""],
 ["contactNumber","Contact Number","Text",""],
 ["referenceNumber","Reference No.","Text",""]
],documents:["Commercial Invoice","Packing List","MSDS","COO","IEC/GST","Purchase Order","Product Certificate","Other Documents"].map((x,i)=>[`doc_${i+1}`,x,"File",""])};
const starter=kind=>({title:kind==="shipment"?"Basic Shipment Details":"Documents Upload",description:"",enabled:true,buttons:{draft:"Save Draft",analyze:"Analyze Shipment",submit:"Submit to Admin"},sections:{origin:true,invoice:true,product:true,documents:true,aiOutput:true},fields:defaults[kind].map(([key,label,type,options])=>({key,label,type,enabled:true,required:false,options:options?options.split(", "):[]}))});
const textInput="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-teal-100";
export default function DynamicFormSettings({kind="shipment"}){
 const [form,setForm]=useState(()=>starter(kind));const [loading,setLoading]=useState(true),[saving,setSaving]=useState(false);
 useEffect(()=>{let active=true;setLoading(true);loadShipmentFormConfig().then(data=>{if(active)setForm(data[kind]||starter(kind));}).catch(()=>{glassError("Load failed","Current defaults are shown; changes are not saved yet.")}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[kind]);
 const patch=(key,val)=>setForm(prev=>({...prev,[key]:val}));
 const patchField=(index,key,val)=>setForm(prev=>({...prev,fields:prev.fields.map((f,i)=>i===index?{...f,[key]:val}:f)}));
 const add=()=>setForm(prev=>({...prev,fields:[...prev.fields,{key:`custom_${Date.now().toString(36)}`,label:kind==="documents"?"New Document":"New Field",type:kind==="documents"?"File":"Text",enabled:true,required:false,options:[]}]}));
 const save=async()=>{setSaving(true);try{await saveShipmentFormConfig(kind,form);await glassSuccess("Settings saved","Changes will appear in the shipment form after refresh.")}catch(e){await glassError("Unable to save",e.response?.data?.message||e.message)}finally{setSaving(false)}};
 return <div className="mx-auto max-w-5xl space-y-5 rounded-[28px] border border-teal-100 bg-white/90 p-5 md:p-8 shadow-[0_18px_55px_rgba(20,184,166,0.06)]">
 <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-[11px] font-bold tracking-widest text-teal-600">CARGOMATE CONFIGURATION</p><h2 className="text-xl font-bold text-[#002259]">{kind==="shipment"?"Shipment Form Settings":"Documents Upload Settings"}</h2><p className="text-sm text-slate-500">Control fields, labels and visibility across shipment forms.</p></div><button type="button" disabled={saving||loading} onClick={save} className="flex items-center gap-2 rounded-xl bg-[#14B8A6] px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-[#0D9488] disabled:opacity-50"><FiSave/>{saving?"Saving...":"Save Changes"}</button></div>
 {loading?<p className="text-sm text-slate-500">Loading configuration...</p>:<>
 <div className="grid gap-4 rounded-2xl bg-[#F9FAFB] p-5 md:grid-cols-2"><label className="text-sm font-medium text-slate-700">Section Title<input className={textInput+" mt-2"} value={form.title||""} onChange={e=>patch("title",e.target.value)}/></label><label className="text-sm font-medium text-slate-700">Description<input className={textInput+" mt-2"} value={form.description||""} onChange={e=>patch("description",e.target.value)}/></label><label className="col-span-full flex items-center gap-3 text-sm"><input type="checkbox" className="accent-teal-500" checked={form.enabled!==false} onChange={e=>patch("enabled",e.target.checked)}/> Show this section</label></div>
 {kind==="shipment"&&<div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-5 space-y-4"><h3 className="font-semibold text-[#002259]">Button labels & section visibility</h3><div className="grid gap-3 sm:grid-cols-3">{[["draft","Draft button"],["analyze","Analysis button"],["submit","Submit button"]].map(([key,label])=><label key={key} className="text-xs text-slate-600">{label}<input maxLength={60} className={textInput+" mt-1"} value={form.buttons?.[key]||""} onChange={e=>setForm(prev=>({...prev,buttons:{...prev.buttons,[key]:e.target.value}}))}/></label>)}</div><div className="flex flex-wrap gap-4">{[["origin","Origin & Destination"],["invoice","Invoice & Value"],["product","Product Details"],["documents","Documents Upload"],["aiOutput","AI Output"]].map(([key,label])=><label key={key} className="flex items-center gap-2 text-xs text-slate-700"><input type="checkbox" className="accent-teal-500" checked={form.sections?.[key]!==false} onChange={e=>setForm(prev=>({...prev,sections:{...prev.sections,[key]:e.target.checked}}))}/>{label}</label>)}</div></div>}
 <div className="space-y-3"><div className="flex items-center justify-between"><h3 className="font-semibold text-[#002259]">Fields ({form.fields.length})</h3><button type="button" onClick={add} className="flex items-center gap-1 rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-700"><FiPlus/> Add {kind==="documents"?"Document":"Field"}</button></div>
 {form.fields.map((field,index)=><div key={field.key} className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[minmax(0,2fr)_minmax(120px,1fr)_90px_auto] md:items-center">
 <label className="text-xs text-slate-500">Display Name<input className={textInput+" mt-1"} maxLength={100} value={field.label} onChange={e=>patchField(index,"label",e.target.value)}/></label>
 {kind==="shipment"?<label className="text-xs text-slate-500">Type<select className={textInput+" mt-1"} value={field.type} onChange={e=>patchField(index,"type",e.target.value)}><option>Text</option><option>Dropdown</option></select></label>:<span className="text-sm text-slate-500">File upload</span>}
 <label className="flex items-center gap-2 text-sm"><input className="accent-teal-500" type="checkbox" checked={field.enabled!==false} onChange={e=>patchField(index,"enabled",e.target.checked)}/>Visible</label>
 <label className="flex items-center gap-2 text-sm md:col-span-full"><input className="accent-teal-500" type="checkbox" checked={field.required===true} onChange={e=>patchField(index,"required",e.target.checked)}/>Required on the shipment form</label>
 <button type="button" title="Remove field" className="rounded-xl border border-rose-100 p-2 text-red-500" onClick={()=>setForm(prev=>({...prev,fields:prev.fields.filter((_,i)=>i!==index)}))}><FiTrash2/></button>
 {kind==="shipment"&&field.type==="Dropdown"&&<label className="text-xs text-slate-500 md:col-span-full">Options (comma separated)<input className={textInput+" mt-1"} value={(field.options||[]).join(", ")} onChange={e=>patchField(index,"options",e.target.value.split(",").map(v=>v.trim()).filter(Boolean))}/></label>}
 </div>)}
 </div><button type="button" className="flex items-center gap-2 text-sm text-red-500" onClick={()=>setForm(starter(kind))}><FiRotateCcw/> Reset to defaults (save to apply)</button></>}
 </div>
}
