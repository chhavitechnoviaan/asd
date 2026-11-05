// // // import React, { useState, useEffect, useRef } from "react";
// // // import { loadShipmentFormConfig } from "../api/shipmentFormConfig";
// // // import {
// // //   FiChevronDown,
// // //   FiFileText,
// // //   FiClipboard,
// // //   FiAward,
// // //   FiCreditCard,
// // //   FiShoppingCart,
// // //   FiFolder,
// // //   FiTruck,
// // //   FiZap,
// // //   FiUploadCloud,
// // //   FiEye,
// // //   FiSend,
// // //   FiCheckCircle,
// // //   FiExternalLink,
// // //   FiCalendar,
// // // } from "react-icons/fi";

// // // import {
// // //   createShipment,
// // //   updateShipmentStep2,
// // //   updateShipmentStep3,
// // //   saveDraft,
// // //   analyzeShipment,
// // //   submitShipment,
// // //   getHSCodes,
// // //   uploadShipmentDocument,
// // //   getShipmentDetails,
// // // } from "../services/shipmentApi";

// // // function Label({ children, required = true }) {
// // //   return (
// // //     <label className="block text-[13px] font-semibold text-slate-700 mb-2 leading-tight">
// // //       {children}
// // //       {required && <span className="text-red-500 ml-0.5">*</span>}
// // //     </label>
// // //   );
// // // }

// // // function Input({
// // //   label,
// // //   placeholder,
// // //   value,
// // //   name,
// // //   onChange,
// // //   required = true,
// // //   disabled = false,
// // // }) {
// // //   return (
// // //     <div>
// // //       <Label required={required}>{label}</Label>
// // //       <input
// // //         type="text"
// // //         name={name}
// // //         value={value || ""}
// // //         onChange={onChange}
// // //         placeholder={placeholder}
// // //         disabled={disabled}
// // //         className="w-full min-w-0 h-10 border border-slate-200 bg-white rounded-xl px-3 text-[13px] text-slate-700 placeholder-slate-400 shadow-sm transition focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50 disabled:text-slate-400 overflow-hidden text-ellipsis whitespace-nowrap"
// // //       />
// // //     </div>
// // //   );
// // // }

// // // function DateInput({ label, value, name, onChange, required = false }) {
// // //   return (
// // //     <div>
// // //       <Label required={required}>{label}</Label>
// // //       <div className="relative">
// // //         <input
// // //           type="date"
// // //           name={name}
// // //           value={value || ""}
// // //           onChange={onChange}
// // //           className="w-full h-10 border border-slate-200 bg-white rounded-xl px-3 text-sm text-slate-700 placeholder-slate-400 shadow-sm transition focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
// // //         />
// // //         <FiCalendar
// // //           size={14}
// // //           className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function Select({
// // //   label,
// // //   placeholder,
// // //   value,
// // //   name,
// // //   onChange,
// // //   children,
// // //   required = true,
// // // }) {
// // //   return (
// // //     <div>
// // //       <Label  required={required}>{label}</Label>
// // //       <div className="relative">
// // //         <select
// // //           name={name}
// // //           value={value || ""}
// // //           onChange={onChange}
// // //           className="w-full min-w-0 h-10 appearance-none border border-slate-200 bg-white rounded-xl px-3 pr-9 text-[13px] text-slate-700 shadow-sm transition focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 overflow-hidden text-ellipsis whitespace-nowrap"
// // //         >
// // //           <option value="">{placeholder}</option>
// // //           {children}
// // //         </select>
// // //         <FiChevronDown
// // //           size={14}
// // //           className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function RadioGroup({ label, name, value, onChange, required = true }) {
// // //   return (
// // //     <div>
// // //       <Label required={required}>{label}</Label>
// // //       <div className="flex items-center gap-5 mt-2.5">
// // //         <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
// // //           <input
// // //             type="radio"
// // //             name={name}
// // //             checked={value === true || value === "yes"}
// // //             onChange={() => onChange(name, true)}
// // //             className="accent-blue-600"
// // //           />
// // //           Yes
// // //         </label>
// // //         <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
// // //           <input
// // //             type="radio"
// // //             name={name}
// // //             checked={value === false || value === "no"}
// // //             onChange={() => onChange(name, false)}
// // //             className="accent-blue-600"
// // //           />
// // //           No
// // //         </label>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function Grid2({ children }) {
// // //   return <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">{children}</div>;
// // // }

// // // function SectionCard({ number, title, subtitle, children }) {
// // //   return (
// // //     <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_4px_18px_rgba(15,23,42,0.05)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)] transition-shadow">
// // //       <div className="flex items-center gap-2">
// // //         <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-sm shadow-blue-200">
// // //           {number}
// // //         </span>
// // //         <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
// // //       </div>
// // //       {subtitle && <p className="text-[13px] text-slate-500 mt-1 ml-9">{subtitle}</p>}
// // //       <div className="mt-5 space-y-4">{children}</div>
// // //     </section>
// // //   );
// // // }

// // // const docTypes = [
// // //   { label: "Commercial Invoice", icon: FiFileText, color: "text-blue-600 bg-blue-50" },
// // //   { label: "Packing List", icon: FiClipboard, color: "text-orange-600 bg-orange-50" },
// // //   { label: "MSDS", icon: FiAward, color: "text-purple-600 bg-purple-50" },
// // //   { label: "COO", icon: FiAward, color: "text-green-600 bg-green-50" },
// // //   { label: "IEC / GST", icon: FiCreditCard, color: "text-blue-600 bg-blue-50" },
// // //   { label: "Purchase Order", icon: FiShoppingCart, color: "text-orange-600 bg-orange-50" },
// // //   { label: "Product Certificate", icon: FiAward, color: "text-purple-600 bg-purple-50" },
// // //   { label: "Other Documents", icon: FiFolder, color: "text-gray-500 bg-gray-100" },
// // // ];

// // // function DocumentsUpload({ uploadedDocs, handleDocumentUpload, fileInputRef, config }) {
// // //   return (
// // //     <SectionCard number={5} title={config?.title || "Documents Upload"} subtitle={config?.description || "Upload all relevant documents"}>
// // //       <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
// // //         {(config?.fields?.filter(f=>f.enabled!==false).map(f=>({label:f.label, key:f.key, icon:FiFileText, color:"text-teal-700 bg-teal-50", required:f.required})) || docTypes).map((d) => {
// // //           const Icon = d.icon;
// // //           return (
// // //             <div
// // //               key={d.label}
// // //               className="border border-slate-200 bg-slate-50/50 items-center rounded-xl p-2.5 text-center hover:bg-white hover:border-blue-200 transition-colors"
// // //             >
// // //               <div className={`w-9 h-9 rounded-xl mx-auto flex items-center justify-center ${d.color}`}>
// // //                 <Icon size={14} />
// // //               </div>
// // //               <div>
// // //                 <p className="text-sm font-semibold text-slate-700 mt-2 leading-[1.15] min-h-[23px] flex items-center justify-center">
// // //                   {d.label}
// // //                 </p>
// // //                 <>
// // //                   <input
// // //                     type="file"
// // //                     hidden
// // //                     ref={(el) => (fileInputRef.current[d.label] = el)}
// // //                     onChange={(e) => {
// // //                       if (e.target.files.length) {
// // //                         handleDocumentUpload(d.label, e.target.files[0], d.required === true);
// // //                       }
// // //                     }}
// // //                   />

// // //                   <button
// // //                     type="button"
// // //                     onClick={() => fileInputRef.current[d.label].click()}
// // //                     className="text-xs text-blue-600 font-semibold mt-1"
// // //                   >
// // //                     {uploadedDocs[d.label] ? "Uploaded ✔" : "Upload"}
// // //                   </button>
// // //                 </>
// // //               </div>
// // //             </div>
// // //           );
// // //         })}
// // //       </div>
// // //       <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
// // //         Accepted formats: PDF, JPG, PNG (Max size: 10MB per file)
// // //       </p>
// // //     </SectionCard>
// // //   );
// // // }

// // // function AIOutputAnalysis({ analysis }) {
// // //   const aiTopStats = [
// // //     { label: "Suggested HS Code", value: analysis?.hsCode || "--", color: "bg-blue-50 text-blue-700" },
// // //     { label: "Required Documents", value: analysis?.requiredDocs ? `${analysis.requiredDocs} Documents` : "--", color: "bg-green-50 text-green-700" },
// // //     { label: "Freight Estimate", value: analysis?.freightEstimate ? `₹${analysis.freightEstimate}` : "--", color: "bg-orange-50 text-orange-700" },
// // //     { label: "RoDTEP / Incentive", value: analysis?.incentive || "N/A", color: "bg-purple-50 text-purple-700" },
// // //   ];

// // //   const aiBottomStats = [
// // //     { label: "Compliance Requirements", value: analysis?.complianceCount || "--", sub: "Requirements" },
// // //     { label: "Risk Score", value: analysis?.riskScore || "--", sub: analysis?.riskSub || "", green: true },
// // //     { label: "Estimated Timeline", value: analysis?.timeline || "--" },
// // //     { label: "Recommended Action", value: analysis?.recommendation || "--", green: true },
// // //   ];

// // //   return (
// // //     <SectionCard number={6} title="AI Output After Analysis">
// // //       <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 ">
// // //         {aiTopStats.map((s) => (
// // //           <div key={s.label} className={`flex flex-col justify-around rounded-xl p-3 ${s.color} border border-white shadow-sm`}>
// // //             <p className="text-xs  font-medium">{s.label}</p>
// // //             <p className="text-xs  font-bold mt-0.5">{s.value}</p>
// // //           </div>
// // //         ))}
// // //       </div>
// // //       <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
// // //         {aiBottomStats.map((s) => (
// // //           <div key={s.label} className="rounded-xl p-3 bg-slate-50 border border-slate-100">
// // //             <p className="text-sm text-gray-500">{s.label}</p>
// // //             <p className={`text-sm font-bold mt-0.5 ${s.green ? "text-green-600" : "text-gray-900"}`}>
// // //               {s.value}
// // //             </p>
// // //             {s.sub && <p className="text-xs  text-gray-400">{s.sub}</p>}
// // //           </div>
// // //         ))}
// // //       </div>
// // //       <button type="button" className="w-full flex items-center justify-center gap-2 border border-blue-100 bg-blue-50/50 rounded-xl py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition">
// // //         <FiExternalLink size={13} />
// // //         View Full Analysis Report
// // //       </button>
// // //     </SectionCard>
// // //   );
// // // }

// // // function BasicShipmentDetails({ formData, handleDirectChange, handleNestedChange, referenceNumber, config, customFields, onCustomChange }) {
// // //   const defs = [
// // //     {key:"shipmentType",label:"Shipment Type",type:"Dropdown",options:["Export","Import"]},
// // //     {key:"shipmentMode",label:"Shipment Mode",type:"Dropdown",options:["Air","Sea","Road"]},
// // //     {key:"shipmentPurpose",label:"Shipment Purpose",type:"Dropdown",options:["Commercial","Sample","Personal"]},
// // //     {key:"companyName",label:"Customer / Company Name",type:"Text"},
// // //     {key:"contactPerson",label:"Contact Person",type:"Text"},
// // //     {key:"contactNumber",label:"Contact Number",type:"Text"},
// // //     {key:"referenceNumber",label:"Reference No.",type:"Text"},
// // //   ];
// // //   const fields = config?.fields || defs;
// // //   const makeField=(field)=>{
// // //     const key=field.key;
// // //     if(field.enabled===false)return null;
// // //     const value=key==="companyName"?formData.exporter.companyName:key==="contactPerson"?formData.exporter.contactPerson:key==="contactNumber"?formData.exporter.mobile:key==="referenceNumber"?(referenceNumber||"Auto Generated on Draft/Submit"):(key in formData?formData[key]:customFields[key]||"");
// // //     const change=event=>{
// // //       if(["companyName","contactPerson","contactNumber"].includes(key))handleNestedChange("exporter",key==="contactNumber"?"mobile":key,event.target.value);
// // //       else if(key in formData)handleDirectChange(event);
// // //       else onCustomChange(key,event.target.value);
// // //     };
// // //     if(field.type==="Dropdown")return <Select key={key} label={field.label} required={field.required!==false} placeholder={`Select ${field.label}`} name={key} value={value} onChange={change}>{(field.options||[]).map(option=><option value={option} key={option}>{option}</option>)}</Select>;
// // //     return <Input key={key} label={field.label} required={field.required===true} name={key} value={value} onChange={change} disabled={key==="referenceNumber"} />;
// // //   };
// // //   return <SectionCard number={1} title={config?.title||"Basic Shipment Details"} subtitle={config?.description||""}>
// // //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{fields.map(makeField)}</div>
// // //   </SectionCard>;
// // // }

// // // function OriginDestination({ formData, handleDirectChange, handleNestedChange }) {
// // //   return (
// // //     <SectionCard number={2} title="Origin & Destination">
// // //       <Grid2>
// // //         <Select
// // //           label="Origin Country"
// // //           placeholder="Select Country"
// // //           value={formData.route.originCountry}
// // //           onChange={(e) => handleNestedChange("route", "originCountry", e.target.value)}
// // //         >
// // //           <option value="India">India</option>
// // //           <option value="China">China</option>
// // //           <option value="USA">USA</option>
// // //         </Select>
// // //         <Input
// // //           label="Origin City / Port / Airport"
// // //           value={formData.route.originCity}
// // //           onChange={(e) => handleNestedChange("route", "originCity", e.target.value)}
// // //         />
// // //       </Grid2>
// // //       <Grid2>
// // //         <Select
// // //           label="Destination Country"
// // //           placeholder="Select Country"
// // //           value={formData.route.destinationCountry}
// // //           onChange={(e) => handleNestedChange("route", "destinationCountry", e.target.value)}
// // //         >
// // //           <option value="India">India</option>
// // //           <option value="Singapore">Singapore</option>
// // //           <option value="Dubai">Dubai</option>
// // //         </Select>
// // //         <Input
// // //           label="Destination City / Port / Airport"
// // //           value={formData.route.destinationCity}
// // //           onChange={(e) => handleNestedChange("route", "destinationCity", e.target.value)}
// // //         />
// // //       </Grid2>
// // //       <Grid2>
// // //         <Input
// // //           label="Consignee / Buyer Name"
// // //           value={formData.importer.companyName}
// // //           onChange={(e) => handleNestedChange("importer", "companyName", e.target.value)}
// // //         />
// // //         <Input
// // //           label="Consignee Address"
// // //           value={formData.importer.address}
// // //           onChange={(e) => handleNestedChange("importer", "address", e.target.value)}
// // //         />
// // //       </Grid2>
// // //       <Grid2>
// // //         <Select
// // //           label="Incoterm"
// // //           required={false}
// // //           placeholder="Select Incoterm"
// // //           value={formData.incoterm}
// // //           onChange={(e) => handleDirectChange(e)}
// // //           name="incoterm"
// // //         >
// // //           <option value="FOB">FOB</option>
// // //           <option value="CIF">CIF</option>
// // //           <option value="EXW">EXW</option>
// // //         </Select>
// // //         <DateInput label="Expected Shipment Date" name="etd" value={formData.etd} onChange={handleDirectChange} />
// // //       </Grid2>
// // //     </SectionCard>
// // //   );
// // // }

// // // function InvoiceValue({ formData, handleDirectChange, handleRadioChange }) {
// // //   return (
// // //     <SectionCard number={3} title="Invoice & Value">
// // //       <Grid2>
// // //         <Input label="Invoice Value" placeholder="Enter invoice value" name="amount" value={formData.amount} onChange={handleDirectChange} />
// // //         <Select label="Currency" placeholder="Select currency" name="currency" value={formData.currency} onChange={handleDirectChange}>
// // //           <option value="USD">USD</option>
// // //           <option value="INR">INR</option>
// // //           <option value="EUR">EUR</option>
// // //         </Select>
// // //       </Grid2>
// // //       <Select label="Payment Terms" placeholder="Select payment terms" name="paymentTerms" value={formData.paymentTerms} onChange={handleDirectChange}>
// // //         <option value="Advance">Advance</option>
// // //         <option value="LC">Letter of Credit (LC)</option>
// // //         <option value="Net 30">Net 30</option>
// // //       </Select>
// // //       <RadioGroup label="Insurance Required" name="insuranceRequired" value={formData.insuranceRequired} onChange={handleRadioChange} />
// // //       <RadioGroup label="Export Incentive" name="exportIncentive" value={formData.exportIncentive} onChange={handleRadioChange} />
// // //     </SectionCard>
// // //   );
// // // }

// // // function ProductDetails({ formData, handleNestedChange, handleRadioChange, hsCodes }) {
// // //   const cargo = formData.cargo;

// // //   const updateDimension = (key, value) => {
// // //     handleNestedChange("cargo", "dimensions", { ...cargo.dimensions, [key]: value });
// // //   };

// // //   return (
// // //     <SectionCard number={4} title="Product Details">
// // //       <div className="space-y-5">
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
// // //           <div className="min-w-0">
// // //             <Input label="Product Details" placeholder="Enter product name" value={cargo.productName} onChange={(e) => handleNestedChange("cargo", "productName", e.target.value)} />
// // //           </div>
// // //           <div className="min-w-0">
// // //             <Input label="Product Description" placeholder="Enter product description" value={cargo.productDescription} onChange={(e) => handleNestedChange("cargo", "productDescription", e.target.value)} />
// // //           </div>
// // //           <div className="min-w-0">
// // //             <Select label="HS Code" placeholder="Select HS Code" value={cargo.hsCode} onChange={(e) => handleNestedChange("cargo", "hsCode", e.target.value)}>
// // //               {hsCodes.map((item) => (
// // //                 <option key={item._id} value={item._id}>
// // //                   {item.hsCode}
// // //                 </option>
// // //               ))}
// // //             </Select>
// // //           </div>
// // //           <div className="min-w-0">
// // //             <Select label="Product Category" placeholder="Select category" value={cargo.category} onChange={(e) => handleNestedChange("cargo", "category", e.target.value)}>
// // //               <option value="Electronics">Electronics</option>
// // //               <option value="Textiles">Textiles</option>
// // //               <option value="General">General Cargo</option>
// // //             </Select>
// // //           </div>
// // //         </div>

// // //         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
// // //           <div className="min-w-0">
// // //             <Input label="Quantity" placeholder="Enter quantity" value={cargo.quantity} onChange={(e) => handleNestedChange("cargo", "quantity", e.target.value)} />
// // //           </div>
// // //           <div className="min-w-0">
// // //             <Select label="Unit" placeholder="Select unit" value={cargo.unit} onChange={(e) => handleNestedChange("cargo", "unit", e.target.value)}>
// // //               <option value="PCS">PCS</option>
// // //               <option value="KG">KG</option>
// // //               <option value="BOX">BOX</option>
// // //             </Select>
// // //           </div>
// // //           <div className="min-w-0 rounded-xl bg-slate-50/70 border border-slate-100 px-3 py-2.5">
// // //             <RadioGroup label="Dangerous Goods (DG)" name="isDangerous" value={cargo.isDangerous} onChange={(name, val) => handleNestedChange("cargo", name, val)} />
// // //           </div>
// // //           <div className="min-w-0 rounded-xl bg-slate-50/70 border border-slate-100 px-3 py-2.5">
// // //             <RadioGroup label="Temperature Controlled" name="isTemperatureControlled" value={cargo.isTemperatureControlled} onChange={(name, val) => handleNestedChange("cargo", name, val)} />
// // //           </div>
// // //         </div>

// // //         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
// // //           <div className="min-w-0">
// // //             <Input label="Net Weight (Kg)" placeholder="Enter net weight" value={cargo.weight} onChange={(e) => handleNestedChange("cargo", "weight", e.target.value)} />
// // //           </div>
// // //           <div className="min-w-0">
// // //             <Input label="Gross Weight (Kg)" placeholder="Enter gross weight" value={cargo.grossWeight} onChange={(e) => handleNestedChange("cargo", "grossWeight", e.target.value)} />
// // //           </div>
// // //           <div className="xl:col-span-2 min-w-0">
// // //             <Label>Dimensions (L × W × H)</Label>
// // //             <div className="grid grid-cols-[1fr_1fr_1fr_82px] gap-2 mt-1.5">
// // //               <input type="text" placeholder="Length" value={cargo.dimensions?.length || ""} onChange={(e) => updateDimension("length", e.target.value)} className="min-w-0 w-full h-10 border border-slate-200 rounded-xl px-3 text-sm text-slate-700 placeholder-slate-400 bg-white shadow-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />
// // //               <input type="text" placeholder="Width" value={cargo.dimensions?.width || ""} onChange={(e) => updateDimension("width", e.target.value)} className="min-w-0 w-full h-10 border border-slate-200 rounded-xl px-3 text-sm text-slate-700 placeholder-slate-400 bg-white shadow-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />
// // //               <input type="text" placeholder="Height" value={cargo.dimensions?.height || ""} onChange={(e) => updateDimension("height", e.target.value)} className="min-w-0 w-full h-10 border border-slate-200 rounded-xl px-3 text-sm text-slate-700 placeholder-slate-400 bg-white shadow-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />
// // //               <div className="relative min-w-0">
// // //                 <select value={cargo.dimensions?.unit || "CM"} onChange={(e) => updateDimension("unit", e.target.value)} className="w-full h-10 appearance-none border border-slate-200 rounded-xl px-3 pr-7 text-sm text-slate-700 bg-white shadow-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10">
// // //                   <option value="CM">CM</option>
// // //                   <option value="INCH">INCH</option>
// // //                 </select>
// // //                 <FiChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
// // //           <div className="min-w-0">
// // //             <Input label="Volumetric Weight" placeholder="Auto Calculate" value={cargo.volumetricWeight} onChange={(e) => handleNestedChange("cargo", "volumetricWeight", e.target.value)} />
// // //           </div>
// // //           <div className="min-w-0">
// // //             <Input label="No. of Packages" placeholder="Enter number" value={cargo.packages} onChange={(e) => handleNestedChange("cargo", "packages", e.target.value)} />
// // //           </div>
// // //           <div className="min-w-0">
// // //             <Select label="Packing Type" placeholder="Select type" value={cargo.packingType} onChange={(e) => handleNestedChange("cargo", "packingType", e.target.value)}>
// // //               <option value="Carton">Carton</option>
// // //               <option value="Pallet">Pallet</option>
// // //               <option value="Wooden Crate">Wooden Crate</option>
// // //             </Select>
// // //           </div>
// // //           <div className="min-w-0 rounded-xl bg-slate-50/70 border border-slate-100 px-3 py-2.5">
// // //             <RadioGroup label="Stackable" name="isStackable" value={cargo.isStackable} onChange={(name, val) => handleNestedChange("cargo", name, val)} />
// // //           </div>
// // //         </div>

// // //         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
// // //           <div className="min-w-0 rounded-xl bg-slate-50/70 border border-slate-100 px-3 py-2.5">
// // //             <RadioGroup label="Fragile" name="isFragile" value={cargo.isFragile} onChange={(name, val) => handleNestedChange("cargo", name, val)} />
// // //           </div>
// // //           <div className="min-w-0 rounded-xl bg-slate-50/70 border border-slate-100 px-3 py-2.5">
// // //             <RadioGroup label="Battery Included" name="hasBattery" value={cargo.hasBattery} onChange={(name, val) => handleNestedChange("cargo", name, val)} />
// // //           </div>
// // //           <div className="min-w-0 rounded-xl bg-slate-50/70 border border-slate-100 px-3 py-2.5">
// // //             <RadioGroup label="Lithium Battery" name="isLithium" value={cargo.isLithium} onChange={(name, val) => handleNestedChange("cargo", name, val)} />
// // //           </div>
// // //           <div className="min-w-0" />
// // //         </div>

// // //         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-1 border-t border-slate-100">
// // //           <Input label="UN Number (if DG)" placeholder="Enter UN number" required={false} value={cargo.unNumber} onChange={(e) => handleNestedChange("cargo", "unNumber", e.target.value)} />
// // //           <Input label="Package Marks & Numbers" placeholder="Enter marks & numbers" required={false} value={cargo.packageMarks} onChange={(e) => handleNestedChange("cargo", "packageMarks", e.target.value)} />
// // //         </div>
// // //       </div>
// // //     </SectionCard>
// // //   );
// // // }

// // // const quickTips = [
// // //   "Fill all mandatory fields marked with *",
// // //   "Upload clear and valid documents",
// // //   "Use Analyze Shipment to get AI insights",
// // //   "Submit to admin for review and quotation",
// // // ];

// // // function QuickTipsCard() {
// // //   return (
// // //     <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 rounded-2xl p-5 shadow-sm">
// // //       <h3 className="text-[15px] font-bold text-slate-900 mb-3">Quick Tips</h3>
// // //       <ul className="space-y-2.5">
// // //         {quickTips.map((t) => (
// // //           <li key={t} className="text-xs text-slate-600 flex gap-2 leading-relaxed">
// // //             <span>•</span>
// // //             <span>{t}</span>
// // //           </li>
// // //         ))}
// // //       </ul>
// // //     </div>
// // //   );
// // // }

// // // function Header({ setActiveTab, setShipment, handleSaveDraft, handleAnalyze, handleSubmit, loading, currentTab, isEdit, config }) {
// // //   return (
// // //     <div>
// // //       <p className="text-xs text-gray-500">
// // //         Dashboard <span className="mx-1 text-gray-300">›</span> Shipment Operations{" "}
// // //         <span className="mx-1 text-gray-300">›</span> My Shipments{" "}
// // //         <span className="mx-1 text-gray-300">›</span>
// // //         <span className="text-slate-600 font-semibold">{isEdit ? "Edit Shipment" : "New Shipment"}</span>
// // //       </p>
// // //       <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mt-2">
// // //         <div>
// // //           <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
// // //             {isEdit ? "Edit Shipment" : "New Shipment Form"}
// // //           </h1>
// // //           <p className="text-sm text-slate-500 mt-1.5">
// // //             {isEdit
// // //               ? "Update shipment details below and save your changes."
// // //               : "Enter shipment details to generate HS code, freight estimate, document checklist and risk score."}
// // //           </p>
// // //         </div>
// // //         <div className="flex flex-wrap gap-2 shrink-0">
// // //           <button
// // //             type="button"
// // //             onClick={handleSaveDraft}
// // //             disabled={loading}
// // //             className="h-10 border border-slate-200 bg-white text-slate-700 text-sm font-semibold px-4 rounded-xl shadow-sm hover:bg-slate-50 hover:border-slate-300 transition disabled:opacity-50"
// // //           >
// // //             {isEdit ? "Save Changes" : (config?.buttons?.draft||"Save Draft")}
// // //           </button>
// // //           <button
// // //             type="button"
// // //             onClick={handleAnalyze}
// // //             disabled={loading}
// // //             className="h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 rounded-xl shadow-sm shadow-blue-200 transition disabled:opacity-50"
// // //           >
// // //             {config?.buttons?.analyze||"Analyze Shipment"}
// // //           </button>
// // //           <button
// // //             type="button"
// // //             onClick={handleSubmit}
// // //             disabled={loading}
// // //             className="h-10 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 rounded-xl shadow-sm shadow-emerald-200 transition disabled:opacity-50"
// // //           >
// // //             {config?.buttons?.submit||"Submit to Admin"}
// // //           </button>
// // //           <button
// // //             type="button"
// // //             onClick={() => {
// // //               // Cancel never saves anything - it just navigates away.
// // //               setShipment("");
// // //               setActiveTab(currentTab);
// // //             }}
// // //             className="h-10 border border-red-200 text-red-600 bg-white text-sm font-semibold px-4 rounded-xl hover:bg-red-50 transition"
// // //           >
// // //             Cancel
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function Footer() {
// // //   return (
// // //     <div className="border-t border-slate-200 mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
// // //       <p>2025 ASC CargoMatrix. All rights reserved</p>
// // //       <div className="flex items-center gap-4">
// // //         <span>Privacy Policy</span>
// // //         <span>Terms of Uses</span>
// // //         <span>Support</span>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // -------- helpers for prefilling from an unpredictable API shape --------
// // // const pickVal = (...candidates) => {
// // //   for (const c of candidates) {
// // //     if (c !== undefined && c !== null && c !== "") return c;
// // //   }
// // //   return undefined;
// // // };

// // // const formatDateForInput = (value) => {
// // //   if (!value) return "";
// // //   const d = new Date(value);
// // //   if (Number.isNaN(d.getTime())) return "";
// // //   return d.toISOString().split("T")[0];
// // // };

// // // const emptyFormData = {
// // //   shipmentType: "",
// // //   shipmentMode: "",
// // //   shipmentPurpose: "",
// // //   customerType: "Individual",
// // //   exporter: {
// // //     companyName: "",
// // //     contactPerson: "",
// // //     mobile: "",
// // //   },
// // //   route: {
// // //     originCountry: "",
// // //     originCity: "",
// // //     destinationCountry: "",
// // //     destinationCity: "",
// // //   },
// // //   importer: {
// // //     companyName: "",
// // //     address: "",
// // //   },
// // //   incoterm: "",
// // //   etd: "",
// // //   eta: "",
// // //   cargo: {
// // //     productName: "",
// // //     productDescription: "",
// // //     hsCode: "",
// // //     category: "",
// // //     quantity: "",
// // //     unit: "",
// // //     weight: "",
// // //     grossWeight: "",
// // //     volumetricWeight: "",
// // //     packages: "",
// // //     packingType: "",
// // //     unNumber: "",
// // //     packageMarks: "",
// // //     isDangerous: false,
// // //     isTemperatureControlled: false,
// // //     isStackable: false,
// // //     isFragile: false,
// // //     hasBattery: false,
// // //     isLithium: false,
// // //     dimensions: {
// // //       length: "",
// // //       width: "",
// // //       height: "",
// // //       unit: "CM",
// // //     },
// // //   },
// // //   amount: "",
// // //   currency: "",
// // //   paymentTerms: "",
// // //   insuranceRequired: false,
// // //   exportIncentive: false,
// // //   additionalInformation: {
// // //     packagingType: "",
// // //     packages: 0,
// // //     marksNumbers: "",
// // //     dangerousGoods: false,
// // //     specialHandling: false,
// // //     temperatureControl: false,
// // //   },
// // // };

// // // export default function Shipment({ setActiveTab, setShipment, currentTab, editId, prefill }) {
// // //   const isEdit = Boolean(editId);

// // //   const [shipmentId, setShipmentId] = useState(editId || "");
// // //   const [referenceNumber, setReferenceNumber] = useState("");
// // //   const [currentStatus, setCurrentStatus] = useState("Draft");
// // //   const [loading, setLoading] = useState(false);
// // //   const [prefillLoading, setPrefillLoading] = useState(isEdit);
// // //   const [hsCodes, setHsCodes] = useState([]);
// // //   const [analysis, setAnalysis] = useState(null);
// // //   const [uploadedDocs, setUploadedDocs] = useState({});
// // //   const fileInputRef = useRef({});

// // //   const [formConfig,setFormConfig] = useState(null);
// // //   const [customFields,setCustomFields] = useState({});
// // //   useEffect(()=>{
// // //     let active=true;
// // //     loadShipmentFormConfig().then(data=>{if(active)setFormConfig(data);}).catch(error=>{console.warn("Shipment form configuration unavailable; using defaults",error?.message);});
// // //     return()=>{active=false};
// // //   },[]);
// // //   const [formData, setFormData] = useState(emptyFormData);
// // //   useEffect(()=>{if(!prefill || editId)return;const q=prefill.query?.parsed||{};const hs=prefill.recommended?.hs_code||{};const freight=prefill.recommended?.freight||{};const detail=prefill.freight_detail?.options?.[0]||{};setFormData(prev=>({...prev,shipmentMode:/air/i.test(q.mode||freight.mode||"")?"Air":/sea/i.test(q.mode||freight.mode||"")?"Sea":prev.shipmentMode,route:{...prev.route,originCountry:"India",originCity:q.origin||"",destinationCountry:q.destination_country||"",destinationCity:q.destination||""},incoterm:q.incoterm||"",cargo:{...prev.cargo,productName:q.product||"",productDescription:hs.description||"",hsCode:hs.hs_code||"",weight:q.weight_kg?.toString()||"",grossWeight:q.weight_kg?.toString()||""},amount:q.product_value_inr?.toString()||"",currency:prefill.currency||"INR",etd:detail.est_departure||"",eta:detail.est_arrival||""}));},[prefill,editId]);


// // //   const fetchHsCodes = async () => {
// // //     try {
// // //       const res = await getHSCodes();
// // //       setHsCodes(res.data.data);
// // //     } catch (err) {
// // //       console.log(err);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchHsCodes();
// // //   }, []);

// // //   // ---- Keep shipmentId in sync with the editId prop at all times. ----
// // //   // This is the critical fix: useState(editId || "") only runs on the very
// // //   // first render. If editId ever arrives late/changes, shipmentId would be
// // //   // stuck at "" forever and saveAllSteps() would wrongly create a NEW
// // //   // shipment instead of updating the one being edited.
// // //   useEffect(() => {
// // //     if (editId) {
// // //       setShipmentId(editId);
// // //     }
// // //   }, [editId]);

// // //   // ---- EDIT MODE: fetch existing shipment and prefill the form ----
// // //   useEffect(() => {
// // //     if (!editId) return;

// // //     const loadExisting = async () => {
// // //       try {
// // //         setPrefillLoading(true);
// // //         const res = await getShipmentDetails(editId);
// // //         const data = res.data?.data || res.data;
// // //         setCustomFields(data.customFields||{});

// // //         console.log("Edit mode - fetched shipment data:", data);

// // //         // `raw` is the exact shipment document from the DB (added by the
// // //         // backend patch) - it matches 1:1 what step1/step2/step3 write,
// // //         // so prefill is reliable. header is used only as a fallback.
// // //         const raw = data.raw || {};
// // //         const header = data.header || {};
// // //         const info = data.shipmentInfo || {};

// // //         const route = raw.route || header.route || {};
// // //         const cargo = raw.cargo || {};
// // //         const exporter = raw.exporter || {};
// // //         const importer = raw.importer || {};

// // //         setReferenceNumber(
// // //           pickVal(raw.referenceNumber, header.referenceNumber, raw.sbNumber, header.shipmentId) || ""
// // //         );

// // //         const hsCodeId =
// // //           (cargo.hsCode && typeof cargo.hsCode === "object" && cargo.hsCode._id) ||
// // //           (typeof cargo.hsCode === "string" ? cargo.hsCode : "") ||
// // //           (info.hsCode && typeof info.hsCode === "object" && info.hsCode._id) ||
// // //           "";

// // //         setFormData({
// // //           shipmentType: pickVal(raw.shipmentType) || "",
// // //           shipmentMode: pickVal(raw.shipmentMode, route.mode, info.mode) || "",
// // //           shipmentPurpose: pickVal(raw.shipmentPurpose) || "",
// // //           customerType: pickVal(raw.customerType) || "Individual",
// // //           exporter: {
// // //             companyName: pickVal(exporter.companyName) || "",
// // //             contactPerson: pickVal(exporter.contactPerson) || "",
// // //           },
// // //           route: {
// // //             originCountry: pickVal(route.originCountry) || "",
// // //             originCity: pickVal(route.originCity) || "",
// // //             destinationCountry: pickVal(route.destinationCountry) || "",
// // //             destinationCity: pickVal(route.destinationCity) || "",
// // //           },
// // //           importer: {
// // //             companyName: pickVal(importer.companyName) || "",
// // //             address: pickVal(importer.address) || "",
// // //           },
// // //           incoterm: pickVal(raw.incoterm) || "",
// // //           etd: formatDateForInput(pickVal(raw.etd, header.etd)),
// // //           eta: formatDateForInput(pickVal(raw.eta, header.eta)),
// // //           cargo: {
// // //             productName: pickVal(cargo.productName, info.goods) || "",
// // //             productDescription: pickVal(cargo.productDescription) || "",
// // //             hsCode: hsCodeId || "",
// // //             category: pickVal(cargo.category) || "",
// // //             quantity: pickVal(cargo.quantity, info.quantity) || "",
// // //             unit: pickVal(cargo.unit) || "",
// // //             weight: pickVal(cargo.weight, info.weight) || "",
// // //             grossWeight: pickVal(cargo.grossWeight) || "",
// // //             volumetricWeight: pickVal(cargo.volumetricWeight) || "",
// // //             packages: pickVal(cargo.packages) || "",
// // //             packingType: pickVal(cargo.packingType) || "",
// // //             unNumber: pickVal(cargo.unNumber) || "",
// // //             packageMarks: pickVal(cargo.packageMarks) || "",
// // //             isDangerous: cargo.isDangerous ?? false,
// // //             isTemperatureControlled: cargo.isTemperatureControlled ?? false,
// // //             isStackable: cargo.isStackable ?? false,
// // //             isFragile: cargo.isFragile ?? false,
// // //             hasBattery: cargo.hasBattery ?? false,
// // //             isLithium: cargo.isLithium ?? false,
// // //             dimensions: {
// // //               length: cargo.dimensions?.length || "",
// // //               width: cargo.dimensions?.width || "",
// // //               height: cargo.dimensions?.height || "",
// // //               unit: cargo.dimensions?.unit || "CM",
// // //             },
// // //           },
// // //           amount: pickVal(raw.amount, header.estimatedCost) || "",
// // //           currency: pickVal(raw.currency) || "",
// // //           paymentTerms: pickVal(raw.paymentTerms) || "",
// // //           insuranceRequired: raw.insuranceRequired ?? false,
// // //           exportIncentive: raw.exportIncentive ?? false,
// // //           additionalInformation: {
// // //             ...emptyFormData.additionalInformation,
// // //             ...(raw.additionalInformation || {}),
// // //           },
// // //         });

// // //         // Belt-and-braces: also set it here (in addition to the sync
// // //         // effect above) right after prefill succeeds.
// // //         setShipmentId(editId);
// // //       } catch (err) {
// // //         console.error("Failed to load shipment for edit:", err);
// // //         alert(err.response?.data?.message || err.message || "Failed to load shipment data for editing.");
// // //       } finally {
// // //         setPrefillLoading(false);
// // //       }
// // //     };

// // //     loadExisting();
// // //   }, [editId]);

// // //   const handleDirectChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleNestedChange = (parentKey, childKey, value) => {
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       [parentKey]: { ...prev[parentKey], [childKey]: value },
// // //     }));
// // //   };

// // //   const handleRadioChange = (name, value) => {
// // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const saveAllSteps = async () => {
// // //     let currentId = shipmentId || editId; // fall back to the prop directly, just in case

// // //     if (!currentId) {
// // //       // Edit mode me shipmentId missing hona ek bug hai -
// // //       // isse duplicate/naya shipment ban jaata, isliye yahan explicitly rok rahe hain.
// // //       if (isEdit) {
// // //         throw new Error(
// // //           "Shipment ID nahi mila edit mode me. Page reload karke dobara Edit try karein."
// // //         );
// // //       }

// // //       // Sirf tabhi naya shipment banega jab genuinely "+ Shipment" se aaya ho
// // //       const step1Res = await createShipment({
// // //         shipmentType: formData.shipmentType,
// // //         shipmentMode: formData.shipmentMode,
// // //         shipmentPurpose: formData.shipmentPurpose,
// // //         customerType: formData.customerType,
// // //         exporter: formData.exporter,
// // //       });

// // //       const resData = step1Res.data?.data || step1Res.data;
// // //       currentId = resData._id;
// // //       setShipmentId(currentId);
// // //       if (resData.referenceNumber) {
// // //         setReferenceNumber(resData.referenceNumber);
// // //       }
// // //     }

// // //     await updateShipmentStep2(currentId, {
// // //       route: formData.route,
// // //       importer: formData.importer,
// // //       eta: formData.eta,
// // //       etd: formData.etd,
// // //       incoterm: formData.incoterm,
// // //     });

// // //     // Clean cargo before sending: an empty hsCode ("") crashes Mongoose
// // //     // with "Cast to ObjectId failed" - only include it when it has a value.
// // //     const { hsCode, ...restCargo } = formData.cargo;
// // //     const cleanCargo = {
// // //       ...restCargo,
// // //       ...(hsCode ? { hsCode } : {}),
// // //     };

// // //     await updateShipmentStep3(currentId, {
// // //       cargo: cleanCargo,
// // //       amount: formData.amount,
// // //       paymentTerms: formData.paymentTerms,
// // //       insuranceRequired: formData.insuranceRequired,
// // //       currency: formData.currency,
// // //       additionalInformation: formData.additionalInformation,
// // //       customFields,
// // //     });

// // //     return currentId;
// // //   };

// // //   const handleSaveDraft = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const id = await saveAllSteps();
// // //       await saveDraft(id);
// // //       setCurrentStatus("Draft");
// // //       alert(isEdit ? "Shipment updated successfully!" : "Draft saved successfully!");

// // //       // Go back to the dashboard list so the updated/new shipment is visible
// // //       setShipment("");
// // //       setActiveTab(currentTab);
// // //     } catch (err) {
// // //       console.error("Save Draft Error:", err);
// // //       alert(err.response?.data?.message || err.message || "Failed to save.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleAnalyze = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const id = await saveAllSteps();
// // //       const res = await analyzeShipment(id);
// // //       const data = res.data?.data || res.data;
// // //       setAnalysis(data);
// // //       setCurrentStatus("AI Analyzed");
// // //       alert("Shipment analyzed successfully!");
// // //       // Intentionally stay on the form so the user can see the AI Output section.
// // //     } catch (err) {
// // //       console.error("Analyze Error:", err);
// // //       alert(err.response?.data?.message || err.message || "Failed to analyze shipment.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleSubmit = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const id = await saveAllSteps();
// // //       await submitShipment(id);
// // //       setCurrentStatus("Submitted");
// // //       alert("Shipment submitted to admin successfully!");

// // //       setShipment("");
// // //       setActiveTab(currentTab);
// // //     } catch (err) {
// // //       console.error("Submit Error:", err);
// // //       alert(err.response?.data?.message || err.message || "Failed to submit shipment.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDocumentUpload = async (documentName, file, isRequired = false) => {
// // //     try {
// // //       const id = await saveAllSteps();

// // //       const form = new FormData();
// // //       form.append("shipmentId", id);
// // //       form.append("documentType", documentName);
// // //       form.append("required", String(isRequired));
// // //       form.append("file", file);

// // //       const res = await uploadShipmentDocument(form);

// // //       setUploadedDocs((prev) => ({
// // //         ...prev,
// // //         [documentName]: res.data.data,
// // //       }));

// // //       alert("Uploaded Successfully");
// // //     } catch (err) {
// // //       console.log(err);
// // //       alert(err.response?.data?.message || err.message || "Upload Failed");
// // //     }
// // //   };

// // //   if (prefillLoading) {
// // //     return (
// // //       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="w-9 h-9 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
// // //           <p className="text-sm text-slate-500">Loading shipment for editing...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
// // //       <div className="max-w-[1440px] mx-auto">
// // //         <Header
// // //           setActiveTab={setActiveTab}
// // //           setShipment={setShipment}
// // //           handleSaveDraft={handleSaveDraft}
// // //           handleAnalyze={handleAnalyze}
// // //           handleSubmit={handleSubmit}
// // //           loading={loading}
// // //           currentTab={currentTab}
// // //           isEdit={isEdit}
// // //           config={formConfig?.shipment}
// // //         />

// // //         <div className="mt-7 grid grid-cols-1  gap-5 items-start">
// // //           <div className="xl:col-span-9 grid grid-cols-1 xl:grid-cols-9 gap-5 items-start">
// // //             <div className="xl:col-span-3">
// // //               {formConfig?.shipment?.enabled!==false && <BasicShipmentDetails
// // //                 formData={formData}
// // //                 handleDirectChange={handleDirectChange}
// // //                 handleNestedChange={handleNestedChange}
// // //                 referenceNumber={referenceNumber}
// // //                 config={formConfig?.shipment}
// // //                 customFields={customFields}
// // //                 onCustomChange={(key,value)=>setCustomFields(prev=>({...prev,[key]:value}))}
// // //               />}
// // //             </div>

// // //             <div className="xl:col-span-6">
// // //               <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
// // //                 {formConfig?.shipment?.sections?.origin!==false && <OriginDestination formData={formData} handleDirectChange={handleDirectChange} handleNestedChange={handleNestedChange} />}
// // //                 {formConfig?.shipment?.sections?.invoice!==false && <InvoiceValue formData={formData} handleDirectChange={handleDirectChange} handleRadioChange={handleRadioChange} />}
// // //               </div>
// // //             </div>

// // //             <div className="xl:col-span-9">
// // //               {formConfig?.shipment?.sections?.product!==false && <ProductDetails formData={formData} handleNestedChange={handleNestedChange} handleRadioChange={handleRadioChange} hsCodes={hsCodes} />}
// // //             </div>
// // //           </div>

         
// // //         </div>
// // //          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4">
// // //             {/* <QuickTipsCard /> */}
             
// // //             {formConfig?.documents?.enabled!==false && formConfig?.shipment?.sections?.documents!==false && <DocumentsUpload uploadedDocs={uploadedDocs} handleDocumentUpload={handleDocumentUpload} fileInputRef={fileInputRef} config={formConfig?.documents} />}
             
// // //              {formConfig?.shipment?.sections?.aiOutput!==false && <AIOutputAnalysis analysis={analysis} />}
// // //           </div>

// // //         <Footer />
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // mahima code 

// // import React, { useState, useEffect, useRef } from "react";
// // import {
// //   FiChevronDown,
// //   FiFileText,
// //   FiClipboard,
// //   FiAward,
// //   FiCreditCard,
// //   FiShoppingCart,
// //   FiFolder,
// //   FiTruck,
// //   FiZap,
// //   FiUploadCloud,
// //   FiEye,
// //   FiSend,
// //   FiCheckCircle,
// //   FiExternalLink,
// //   FiCalendar,
// //   FiBookmark,
// //   FiX,
// //   FiInfo,
// //   FiBox,
// //   FiCheck,
// //   FiShield,
// //   FiArrowRight,
// // } from "react-icons/fi";

// // import {
// //   createShipment,
// //   updateShipmentStep2,
// //   updateShipmentStep3,
// //   saveDraft,
// //   analyzeShipment,
// //   submitShipment,
// //   getShipmentFormSettings,
// //   getDocumentsUploadSettings,
// //   uploadShipmentDocument,
// //   updateShipment,
// // } from "../services/shipmentApi";
// // import { CloudCog } from "lucide-react";

// // /* ==========================================================================
// //    REUSABLE FORM ATOMS
// //    ========================================================================== */

// // function Label({ children, required = true }) {
// //   return (
// //     <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-wide">
// //       {children}
// //       {required && <span className="text-rose-500 ml-1 font-bold">*</span>}
// //     </label>
// //   );
// // }

// // function Input({
// //   label,
// //   placeholder,
// //   value,
// //   name,
// //   onChange,
// //   required = true,
// //   disabled = false,
// // }) {
// //   return (
// //     <div className="w-full">
// //       <Label required={required}>{label}</Label>
// //       <input
// //         type="text"
// //         name={name}
// //         value={value || ""}
// //         onChange={onChange}
// //         placeholder={placeholder}
// //         disabled={disabled}
// //         className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all duration-150 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
// //       />
// //     </div>
// //   );
// // }

// // function DateInput({ label, value, name, onChange, required = false }) {
// //   return (
// //     <div className="w-full">
// //       <Label required={required}>{label}</Label>
// //       <div className="relative">
// //         <input
// //           type="date"
// //           name={name}
// //           value={value || ""}
// //           onChange={onChange}
// //           className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all duration-150 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
// //         />
// //         <FiCalendar
// //           size={16}
// //           className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// // function Select({
// //   label,
// //   placeholder,
// //   value,
// //   name,
// //   onChange,
// //   children,
// //   required = true,
// // }) {
// //   return (
// //     <div className="w-full">
// //       <Label required={required}>{label}</Label>
// //       <div className="relative">
// //         <select
// //           name={name}
// //           value={value || ""}
// //           onChange={onChange}
// //           className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 transition-all duration-150 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
// //         >
// //           <option value="">{placeholder}</option>
// //           {children}
// //         </select>
// //         <FiChevronDown
// //           size={16}
// //           className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// // function RadioGroup({ label, name, value, onChange, required = true }) {
// //   const isYes = value === true || value === "yes";
// //   const isNo = value === false || value === "no";

// //   return (
// //     <div className="w-full">
// //       <Label required={required}>{label}</Label>
// //       <div className="flex items-center gap-2 mt-1.5">
// //         <button
// //           type="button"
// //           onClick={() => onChange(name, true)}
// //           className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-150 ${
// //             isYes
// //               ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-xs"
// //               : "bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100"
// //           }`}
// //         >
// //           <span
// //             className={`w-2 h-2 rounded-full ${
// //               isYes ? "bg-indigo-600 ring-2 ring-indigo-200" : "bg-slate-300"
// //             }`}
// //           />
// //           Yes
// //         </button>
// //         <button
// //           type="button"
// //           onClick={() => onChange(name, false)}
// //           className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-150 ${
// //             isNo
// //               ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-xs"
// //               : "bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100"
// //           }`}
// //         >
// //           <span
// //             className={`w-2 h-2 rounded-full ${
// //               isNo ? "bg-indigo-600 ring-2 ring-indigo-200" : "bg-slate-300"
// //             }`}
// //           />
// //           No
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // function Grid2({ children }) {
// //   return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
// // }

// // function SectionCard({ number, title, subtitle, badge, children }) {
// //   return (
// //     <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.05)] transition-all duration-200 p-5 sm:p-6">
// //       <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-5">
// //         <div className="flex items-center gap-3">
// //           <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
// //             {number}
// //           </span>
// //           <div>
// //             <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
// //               {title}
// //             </h3>
// //             {subtitle && (
// //               <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
// //             )}
// //           </div>
// //         </div>
// //         {badge && (
// //           <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
// //             {badge}
// //           </span>
// //         )}
// //       </div>
// //       <div className="space-y-4">{children}</div>
// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    DOCUMENT UPLOAD COMPONENT
// //    ========================================================================== */

// // const DEFAULT_DOCUMENT_FIELDS = [
// //   { key: "commercial-invoice", label: "Commercial Invoice", enabled: true },
// //   { key: "packing-list", label: "Packing List", enabled: true },
// //   { key: "msds", label: "MSDS", enabled: true },
// //   { key: "coo", label: "COO", enabled: true },
// //   { key: "iec-gst", label: "IEC/GST", enabled: true },
// //   { key: "purchase-order", label: "Purchase Order", enabled: true },
// //   { key: "product-certificate", label: "Product Certificate", enabled: true },
// //   { key: "other-documents", label: "Other Documents", enabled: true },
// // ];

// // const DOCUMENT_ICON_STYLES = [
// //   "text-blue-600 bg-blue-50 border-blue-100",
// //   "text-amber-600 bg-amber-50 border-amber-100",
// //   "text-purple-600 bg-purple-50 border-purple-100",
// //   "text-emerald-600 bg-emerald-50 border-emerald-100",
// //   "text-indigo-600 bg-indigo-50 border-indigo-100",
// //   "text-rose-600 bg-rose-50 border-rose-100",
// //   "text-teal-600 bg-teal-50 border-teal-100",
// //   "text-slate-600 bg-slate-50 border-slate-200",
// // ];

// // function DocumentsUpload({
// //   uploadedDocs,
// //   handleDocumentUpload,
// //   fileInputRef,
// //   config,
// //   loading = false,
// //   loadError = false,
// //   onRetry,
// // }) {
// //   const visibleDocuments = (Array.isArray(config?.fields)
// //     ? config.fields
// //     : []
// //   ).filter((document) => document.enabled !== false);

// //   return (
// //     <SectionCard
// //       number={4}
// //       title={config?.sectionTitle || "Documents Uploaded"}
// //       subtitle={config?.sectionDesc || "Upload all relevant documents"}
// //     >
// //       {loading ? (
// //         <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-8 text-center">
// //           <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
// //           <p className="mt-2 text-sm font-semibold text-slate-700">
// //             Loading document requirements...
// //           </p>
// //         </div>
// //       ) : loadError ? (
// //         <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-6 text-center">
// //           <p className="text-sm font-semibold text-rose-700">
// //             Unable to load document requirements
// //           </p>
// //           <p className="mt-1 text-xs text-rose-600">
// //             Please try again. The form will use the latest shared settings saved by Admin.
// //           </p>
// //           {onRetry && (
// //             <button
// //               type="button"
// //               onClick={onRetry}
// //               className="mt-3 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 border border-rose-200 hover:bg-rose-100"
// //             >
// //               Retry
// //             </button>
// //           )}
// //         </div>
// //       ) : visibleDocuments.length > 0 ? (
// //         <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
// //           {visibleDocuments.map((document, index) => {
// //             const documentKey =
// //               document.key ||
// //               String(document.label || `document-${index}`)
// //                 .toLowerCase()
// //                 .replace(/[^a-z0-9]+/g, "-")
// //                 .replace(/^-|-$/g, "");

// //             const documentLabel = document.label || "Document";
// //             const isUploaded = !!uploadedDocs[documentKey];
// //             const Icon = index === 1 ? FiClipboard : FiFileText;
// //             const iconStyle =
// //               DOCUMENT_ICON_STYLES[index % DOCUMENT_ICON_STYLES.length];

// //             return (
// //               <div
// //                 key={documentKey}
// //                 className={`group flex flex-col justify-between rounded-xl border p-3.5 text-center transition-all duration-150 ${
// //                   isUploaded
// //                     ? "border-emerald-200 bg-emerald-50/30"
// //                     : "border-slate-200 bg-slate-50/30 hover:border-indigo-200 hover:bg-indigo-50/20"
// //                 }`}
// //               >
// //                 <div>
// //                   <div
// //                     className={`w-9 h-9 rounded-xl mx-auto flex items-center justify-center border shadow-2xs ${iconStyle}`}
// //                   >
// //                     <Icon size={16} />
// //                   </div>

// //                   <p className="text-xs font-semibold text-slate-800 mt-2.5 break-words">
// //                     {documentLabel}
// //                   </p>
// //                 </div>

// //                 <div className="mt-3">
// //                   <input
// //                     type="file"
// //                     hidden
// //                     accept=".pdf,.jpg,.jpeg,.png"
// //                     ref={(element) => {
// //                       fileInputRef.current[documentKey] = element;
// //                     }}
// //                     onChange={(event) => {
// //                       const file = event.target.files?.[0];

// //                       if (file) {
// //                         handleDocumentUpload(
// //                           documentKey,
// //                           documentLabel,
// //                           file
// //                         );
// //                       }

// //                       // Allows selecting the same file again after replacing it.
// //                       event.target.value = "";
// //                     }}
// //                   />

// //                   <button
// //                     type="button"
// //                     onClick={() =>
// //                       fileInputRef.current[documentKey]?.click()
// //                     }
// //                     className={`w-full py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all duration-150 ${
// //                       isUploaded
// //                         ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
// //                         : "bg-white border border-slate-200 text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 shadow-2xs"
// //                     }`}
// //                   >
// //                     {isUploaded ? "Uploaded ✓" : "+ Upload"}
// //                   </button>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       ) : (
// //         <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
// //           <FiFolder className="mx-auto text-slate-400" size={26} />
// //           <p className="mt-2 text-sm font-semibold text-slate-700">
// //             No documents available
// //           </p>
// //           <p className="mt-1 text-xs text-slate-500">
// //             The administrator has not enabled any document upload fields.
// //           </p>
// //         </div>
// //       )}

// //       <div className="flex items-center gap-2 mt-4 pt-3 text-xs text-slate-500 border-t border-slate-100">
// //         <FiInfo size={14} className="text-slate-400 shrink-0" />
// //         <span>
// //           Accepted formats: PDF, JPG, PNG (Max file size: 10MB per document)
// //         </span>
// //       </div>
// //     </SectionCard>
// //   );
// // }

// // /* ==========================================================================
// //    AI ANALYSIS CARD
// //    ========================================================================== */

// // function AIOutputAnalysis({ analysis }) {
// //   const aiTopStats = [
// //     { label: "Suggested HS Code", value: analysis?.hsCode || "--", color: "bg-blue-50/70 border-blue-200/80 text-blue-700" },
// //     { label: "Required Docs", value: analysis?.requiredDocs ? `${analysis.requiredDocs} Files` : "--", color: "bg-emerald-50/70 border-emerald-200/80 text-emerald-700" },
// //     { label: "Freight Estimate", value: analysis?.freightEstimate ? `₹${analysis.freightEstimate}` : "--", color: "bg-amber-50/70 border-amber-200/80 text-amber-700" },
// //     { label: "RoDTEP Incentive", value: analysis?.incentive || "N/A", color: "bg-purple-50/70 border-purple-200/80 text-purple-700" },
// //   ];

// //   const aiBottomStats = [
// //     { label: "Compliance Checklist", value: analysis?.complianceCount || "--", sub: "Requirements" },
// //     { label: "Risk Score Assessment", value: analysis?.riskScore || "--", sub: analysis?.riskSub || "", green: true },
// //     { label: "Estimated Transit Time", value: analysis?.timeline || "--" },
// //     { label: "Recommended Next Step", value: analysis?.recommendation || "--", green: true },
// //   ];

// //   return (
// //     <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
// //       <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
// //         <div className="flex items-center gap-2">
// //           <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
// //             <FiZap size={14} />
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">5</span>
// //             <h3 className="text-sm font-bold text-slate-900">AI Output After Analysis</h3>
// //           </div>
// //         </div>
// //         <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/70">
// //           Smart Engine
// //         </span>
// //       </div>

// //       <div className="grid grid-cols-2 gap-2.5">
// //         {aiTopStats.map((s) => (
// //           <div key={s.label} className={`rounded-xl border p-2.5 flex flex-col justify-between ${s.color}`}>
// //             <p className="text-[11px] font-medium opacity-80">{s.label}</p>
// //             <p className="text-sm font-bold mt-1 tracking-tight">{s.value}</p>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="grid grid-cols-2 gap-2.5 mt-2.5">
// //         {aiBottomStats.map((s) => (
// //           <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
// //             <p className="text-[11px] text-slate-500 font-medium">{s.label}</p>
// //             <p className={`text-xs font-bold mt-1 ${s.green ? "text-emerald-600" : "text-slate-800"}`}>
// //               {s.value}
// //             </p>
// //             {s.sub && <p className="text-[10px] text-slate-400 mt-0.5">{s.sub}</p>}
// //           </div>
// //         ))}
// //       </div>

// //       <button
// //         type="button"
// //         className="w-full mt-3.5 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-all shadow-2xs"
// //       >
// //         <FiExternalLink size={13} />
// //         View Full Analysis Report
// //       </button>
// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    FORM STEP SECTIONS
// //    ========================================================================== */


// //    function BasicShipmentDetails({
// //   formData,
// //   handleDirectChange,
// //   handleNestedChange,
// //   referenceNumber,
// //   config,
// // }) {
// //   const fallbackFields = [
// //     {
// //       key: "shipmentType",
// //       label: "Shipment Type",
// //       useDropdown: true,
// //       options: ["Export", "Import", "Re-export"],
// //     },
// //     {
// //       key: "shipmentMode",
// //       label: "Shipment Mode",
// //       useDropdown: true,
// //       options: ["Air", "Sea", "Road", "Rail"],
// //     },
// //     {
// //       key: "shipmentPurpose",
// //       label: "Shipment Purpose",
// //       useDropdown: true,
// //       options: ["Commercial", "Sample", "Personal"],
// //     },
// //     {
// //       key: "companyName",
// //       label: "Customer / Company Name",
// //       useDropdown: false,
// //     },
// //     {
// //       key: "contactPerson",
// //       label: "Contact Person",
// //       useDropdown: false,
// //     },
// //   ];

// //   const configuredFields = Array.isArray(config?.fields) ? config.fields : [];
// //   const fields = [...configuredFields];

// //   // Keep the exact five Basic Shipment fields shown in the approved form.
// //   fallbackFields.forEach((fallback) => {
// //     if (!fields.some((field) => field.key === fallback.key)) {
// //       fields.push(fallback);
// //     }
// //   });

// //   const getValue = (key) => {
// //     switch (key) {
// //       case "companyName":
// //         return formData.exporter?.companyName || "";
// //       case "contactPerson":
// //         return formData.exporter?.contactPerson || "";
// //       case "shipmentType":
// //       case "shipmentMode":
// //       case "shipmentPurpose":
// //         return formData[key] || "";
// //       default:
// //         return formData.customFields?.[key] ?? "";
// //     }
// //   };

// //   const handleFieldChange = (key, value) => {
// //     switch (key) {
// //       case "companyName":
// //       case "contactPerson":
// //         handleNestedChange("exporter", key, value);
// //         break;

// //       case "shipmentType":
// //       case "shipmentMode":
// //       case "shipmentPurpose":
// //         handleDirectChange({
// //           target: { name: key, value },
// //         });
// //         break;

// //       default:
// //         handleNestedChange("customFields", key, value);
// //         break;
// //     }
// //   };

// //   return (
// //     <SectionCard
// //       number={1}
// //       title={config?.title || "Basic Shipment Details"}
// //       subtitle={
// //         config?.description ||
// //         "General shipment classification and exporter contact"
// //       }
// //     >
// //       <Grid2>
// //         {fields.map((field) => {
// //           const value = getValue(field.key);

// //           return (
// //             <div key={field.key} className="w-full">
// //               {field.useDropdown ? (
// //                 <Select
// //                   label={field.label}
// //                   placeholder={`Select ${field.label}`}
// //                   name={field.key}
// //                   value={value}
// //                   onChange={(event) =>
// //                     handleFieldChange(field.key, event.target.value)
// //                   }
// //                 >
// //                   {(field.options || []).map((option) => (
// //                     <option key={option} value={option}>
// //                       {option}
// //                     </option>
// //                   ))}
// //                 </Select>
// //               ) : (
// //                 <div className="w-full">
// //                   <Label required={false}>{field.label}</Label>
// //                   <input
// //                     type="text"
// //                     value={value}
// //                     onChange={(event) =>
// //                       handleFieldChange(field.key, event.target.value)
// //                     }
// //                     placeholder={`Enter ${field.label}`}
// //                     className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
// //                   />
// //                 </div>
// //               )}
// //             </div>
// //           );
// //         })}

// //         <Input
// //           label="Reference No"
// //           value={referenceNumber || "Auto Generated on Draft/Submit"}
// //           disabled={true}
// //           required={false}
// //         />
// //       </Grid2>
// //     </SectionCard>
// //   );
// // }

// // function OriginDestination({ formData, handleDirectChange, handleNestedChange }) {
// //   return (
// //     <SectionCard number={2} title="Origin & Destination" subtitle="">
// //       <Grid2>
// //         <Select
// //           label="Origin Country"
// //           placeholder="Select Country"
// //           value={formData.route.originCountry}
// //           onChange={(e) => handleNestedChange("route", "originCountry", e.target.value)}
// //         >
// //           <option value="India">India</option>
// //           <option value="China">China</option>
// //           <option value="USA">USA</option>
// //         </Select>
// //         <Input
// //           label="Origin City / Port / Airport"
// //           placeholder="e.g. Mumbai Port (INBOM)"
// //           value={formData.route.originCity}
// //           onChange={(e) => handleNestedChange("route", "originCity", e.target.value)}
// //         />
// //       </Grid2>
// //       <Grid2>
// //         <Select
// //           label="Destination Country"
// //           placeholder="Select Country"
// //           value={formData.route.destinationCountry}
// //           onChange={(e) => handleNestedChange("route", "destinationCountry", e.target.value)}
// //         >
// //           <option value="India">India</option>
// //           <option value="Singapore">Singapore</option>
// //           <option value="Dubai">Dubai</option>
// //         </Select>
// //         <Input
// //           label="Destination City / Port / Airport"
// //           placeholder="e.g. Jebel Ali Port (AEJEA)"
// //           value={formData.route.destinationCity}
// //           onChange={(e) => handleNestedChange("route", "destinationCity", e.target.value)}
// //         />
// //       </Grid2>
// //       <Grid2>
// //         <Input
// //           label="Consignee / Buyer Name"
// //           placeholder="Buyer legal company name"
// //           value={formData.importer.companyName}
// //           onChange={(e) => handleNestedChange("importer", "companyName", e.target.value)}
// //         />
// //         <Input
// //           label="Consignee Address"
// //           placeholder="Warehouse or delivery address"
// //           value={formData.importer.address}
// //           onChange={(e) => handleNestedChange("importer", "address", e.target.value)}
// //         />
// //       </Grid2>
// //       <Grid2>
// //         <Select
// //           label="Incoterm"
// //           required={false}
// //           placeholder="Select Incoterm"
// //           value={formData.incoterm}
// //           onChange={(e) => handleDirectChange(e)}
// //           name="incoterm"
// //         >
// //           <option value="FOB">FOB - Free on Board</option>
// //           <option value="CIF">CIF - Cost, Insurance & Freight</option>
// //           <option value="EXW">EXW - Ex Works</option>
// //         </Select>
// //         <DateInput
// //           label="Expected Shipment Date"
// //           name="etd"
// //           value={formData.etd}
// //           onChange={handleDirectChange}
// //         />
// //       </Grid2>
// //     </SectionCard>
// //   );
// // }

// // function ProductDetails({
// //   formData,
// //   handleNestedChange,
// //   handleRadioChange,
// //   analysis,
// // }) {
// //   return (
// //     <SectionCard number={6} title="Product Details" subtitle="">
// //       <Grid2>
// //         <Input
// //           label="Product Name"
// //           placeholder="e.g. High Density Polymer Resins"
// //           value={formData.cargo.productName}
// //           onChange={(e) => handleNestedChange("cargo", "productName", e.target.value)}
// //         />
// //         <Input
// //           label="Product Description"
// //           placeholder="Brief technical or commercial description"
// //           value={formData.cargo.productDescription}
// //           onChange={(e) => handleNestedChange("cargo", "productDescription", e.target.value)}
// //         />
// //       </Grid2>

// //       <Grid2>
// //         <Input
// //           label="HS Code"
// //           placeholder="Enter HS Code manually"
// //           value={formData.cargo.hsCodeText || ""}
// //           onChange={(e) =>
// //             handleNestedChange("cargo", "hsCodeText", e.target.value)
// //           }
// //         />
// //         <Select
// //           label="Product Category"
// //           placeholder="Select category"
// //           value={formData.cargo.category}
// //           onChange={(e) => handleNestedChange("cargo", "category", e.target.value)}
// //         >
// //           <option value="Electronics">Electronics</option>
// //           <option value="Textiles">Textiles</option>
// //           <option value="General">General Cargo</option>
// //         </Select>
// //       </Grid2>

// //       <Grid2>
// //         <div className="grid grid-cols-2 gap-3">
// //           <Input
// //             label="Quantity"
// //             placeholder="e.g. 500"
// //             value={formData.cargo.quantity}
// //             onChange={(e) => handleNestedChange("cargo", "quantity", e.target.value)}
// //           />
// //           <Select
// //             label="Unit"
// //             placeholder="Unit"
// //             value={formData.cargo.unit}
// //             onChange={(e) => handleNestedChange("cargo", "unit", e.target.value)}
// //           >
// //             <option value="PCS">PCS</option>
// //             <option value="KG">KG</option>
// //             <option value="BOX">BOX</option>
// //           </Select>
// //         </div>
// //         <div className="grid grid-cols-2 gap-3">
// //           <Input
// //             label="Net Weight (Kg)"
// //             placeholder="Net Wt"
// //             value={formData.cargo.netWeight || formData.cargo.weight}
// //             onChange={(e) => handleNestedChange("cargo", "netWeight", e.target.value)}
// //           />
// //           <Input
// //             label="Gross Weight (Kg)"
// //             placeholder="Gross Wt"
// //             value={formData.cargo.grossWeight}
// //             onChange={(e) => handleNestedChange("cargo", "grossWeight", e.target.value)}
// //           />
// //         </div>
// //       </Grid2>

// //       {/* DIMENSIONS ROW */}
// //       <div className="rounded-xl border border-slate-200/90 bg-slate-50/40 p-4">
// //         <div className="flex items-center justify-between mb-2">
// //           <Label required={true}>Package Dimensions (L × W × H)</Label>
// //           <span className="text-[11px] font-medium text-slate-400">Unit of measurement</span>
// //         </div>
// //         <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
// //           <div className="relative">
// //             <input
// //               placeholder="Length"
// //               value={formData.cargo.dimensions?.length || ""}
// //               onChange={(e) =>
// //                 handleNestedChange("cargo", "dimensions", {
// //                   ...formData.cargo.dimensions,
// //                   length: e.target.value,
// //                 })
// //               }
// //               className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
// //             />
// //             <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 pointer-events-none">L</span>
// //           </div>
// //           <div className="relative">
// //             <input
// //               placeholder="Width"
// //               value={formData.cargo.dimensions?.width || ""}
// //               onChange={(e) =>
// //                 handleNestedChange("cargo", "dimensions", {
// //                   ...formData.cargo.dimensions,
// //                   width: e.target.value,
// //                 })
// //               }
// //               className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
// //             />
// //             <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 pointer-events-none">W</span>
// //           </div>
// //           <div className="relative">
// //             <input
// //               placeholder="Height"
// //               value={formData.cargo.dimensions?.height || ""}
// //               onChange={(e) =>
// //                 handleNestedChange("cargo", "dimensions", {
// //                   ...formData.cargo.dimensions,
// //                   height: e.target.value,
// //                 })
// //               }
// //               className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
// //             />
// //             <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 pointer-events-none">H</span>
// //           </div>
// //           <div className="relative">
// //             <select
// //               value={formData.cargo.dimensions?.unit || "CM"}
// //               onChange={(e) =>
// //                 handleNestedChange("cargo", "dimensions", {
// //                   ...formData.cargo.dimensions,
// //                   unit: e.target.value,
// //                 })
// //               }
// //               className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
// //             >
// //               <option value="CM">CM</option>
// //               <option value="INCH">INCH</option>
// //             </select>
// //             <FiChevronDown
// //               size={14}
// //               className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       <Grid2>
// //         <Input
// //           label="Volumetric Weight"
// //           placeholder="Auto calculated"
// //           value={formData.cargo.volumetricWeight}
// //           onChange={(e) => handleNestedChange("cargo", "volumetricWeight", e.target.value)}
// //         />
// //         <Input
// //           label="No. of Packages"
// //           placeholder="Total cartons or pallets"
// //           value={formData.cargo.packages}
// //           onChange={(e) => handleNestedChange("cargo", "packages", e.target.value)}
// //         />
// //       </Grid2>

// //       <Grid2>
// //         <Select
// //           label="Packing Type"
// //           placeholder="Select packing type"
// //           value={formData.cargo.packingType}
// //           onChange={(e) => handleNestedChange("cargo", "packingType", e.target.value)}
// //         >
// //           <option value="Carton">Standard Carton</option>
// //           <option value="Pallet">Wooden / Plastic Pallet</option>
// //           <option value="Wooden Crate">Industrial Wooden Crate</option>
// //         </Select>
// //         <Input
// //           label="UN Number (if DG)"
// //           placeholder="e.g. UN1993"
// //           required={false}
// //           value={formData.cargo.unNumber}
// //           onChange={(e) => handleNestedChange("cargo", "unNumber", e.target.value)}
// //         />
// //       </Grid2>

// //       <Input
// //         label="Package Marks & Numbers"
// //         placeholder="Shipping mark inscriptions on carton"
// //         required={false}
// //         value={formData.cargo.packageMarks}
// //         onChange={(e) => handleNestedChange("cargo", "packageMarks", e.target.value)}
// //       />

// //       <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
// //         <RadioGroup
// //           label="Dangerous Goods (DG)"
// //           name="isDangerous"
// //           value={formData.cargo.isDangerous}
// //           onChange={(name, val) => handleNestedChange("cargo", name, val)}
// //         />
// //         <RadioGroup
// //           label="Temperature Controlled"
// //           name="isTemperatureControlled"
// //           value={formData.cargo.isTemperatureControlled}
// //           onChange={(name, val) => handleNestedChange("cargo", name, val)}
// //         />
// //         <RadioGroup
// //           label="Stackable"
// //           name="isStackable"
// //           value={formData.cargo.isStackable}
// //           onChange={(name, val) => handleNestedChange("cargo", name, val)}
// //         />
// //         <RadioGroup
// //           label="Fragile"
// //           name="isFragile"
// //           value={formData.cargo.isFragile}
// //           onChange={(name, val) => handleNestedChange("cargo", name, val)}
// //         />
// //         <RadioGroup
// //           label="Battery Included"
// //           name="hasBattery"
// //           value={formData.cargo.hasBattery}
// //           onChange={(name, val) => handleNestedChange("cargo", name, val)}
// //         />
// //         <RadioGroup
// //           label="Lithium Battery"
// //           name="isLithium"
// //           value={formData.cargo.isLithium}
// //           onChange={(name, val) => handleNestedChange("cargo", name, val)}
// //         />
// //       </div>
// //     </SectionCard>
// //   );
// // }

// // function InvoiceValue({ formData, handleDirectChange, handleRadioChange }) {
// //   return (
// //     <SectionCard number={3} title="Invoice & Value" subtitle="">
// //       <Grid2>
// //         <Input
// //           label="Invoice Value"
// //           placeholder="Total invoice amount"
// //           name="amount"
// //           value={formData.amount}
// //           onChange={handleDirectChange}
// //         />
// //         <Select
// //           label="Currency"
// //           placeholder="Select currency"
// //           name="currency"
// //           value={formData.currency}
// //           onChange={handleDirectChange}
// //         >
// //           <option value="USD">USD ($)</option>
// //           <option value="INR">INR (₹)</option>
// //           <option value="EUR">EUR (€)</option>
// //         </Select>
// //       </Grid2>
// //       <Select
// //         label="Payment Terms"
// //         placeholder="Select payment terms"
// //         name="paymentTerms"
// //         value={formData.paymentTerms}
// //         onChange={handleDirectChange}
// //       >
// //         <option value="Advance">100% Advance Payment</option>
// //         <option value="LC">Letter of Credit (LC at Sight)</option>
// //         <option value="Net 30">Net 30 Days Terms</option>
// //       </Select>
// //       <Grid2>
// //         <RadioGroup
// //           label="Insurance Required"
// //           name="insuranceRequired"
// //           value={formData.insuranceRequired}
// //           onChange={handleRadioChange}
// //         />
// //         <RadioGroup
// //           label="Export Incentive"
// //           name="exportIncentive"
// //           value={formData.exportIncentive}
// //           onChange={handleRadioChange}
// //         />
// //       </Grid2>
// //     </SectionCard>
// //   );
// // }

// // /* ==========================================================================
// //    SIDEBAR METRIC CARDS
// //    ========================================================================== */

// // function DimensionsCard({ calculatedMetrics }) {
// //   const dimensionRows = [
// //     { label: "Volume Total (CBM)", value: calculatedMetrics?.cbm ? `${calculatedMetrics.cbm} CBM` : "--" },
// //     { label: "Volumetric Wt (Air)", value: calculatedMetrics?.volumetricWeight ? `${calculatedMetrics.volumetricWeight} Kg` : "--" },
// //     { label: "Ocean Volume (CBM)", value: calculatedMetrics?.cbm ? `${calculatedMetrics.cbm} CBM` : "--" },
// //     { label: "Chargeable Weight", value: calculatedMetrics?.chargeableWeight ? `${calculatedMetrics.chargeableWeight} Kg` : "--" },
// //   ];

// //   return (
// //     <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
// //       <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
// //         <div className="flex items-center gap-2">
// //           <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
// //             <FiBox size={14} />
// //           </div>
// //           <h3 className="text-sm font-bold text-slate-900">Cargo & Weight Metrics</h3>
// //         </div>
// //         <span className="text-[10px] text-slate-400">Live Calc</span>
// //       </div>

// //       <div className="space-y-2.5">
// //         {dimensionRows.map((r) => (
// //           <div key={r.label} className="flex items-center justify-between text-xs py-1">
// //             <span className="text-slate-500 font-medium">{r.label}</span>
// //             <span className="font-bold text-slate-800">{r.value}</span>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between bg-emerald-50/60 -mx-5 -mb-5 p-4 rounded-b-2xl border-emerald-100/60">
// //         <div>
// //           <span className="text-[11px] font-semibold text-emerald-800 block">Estimated Freight</span>
// //           <span className="text-[10px] text-emerald-600">Standard market rate</span>
// //         </div>
// //         <span className="text-base font-extrabold text-emerald-700">
// //           {calculatedMetrics?.estimatedFreight ? `₹ ${calculatedMetrics.estimatedFreight}` : "--"}
// //         </span>
// //       </div>
// //     </div>
// //   );
// // }

// // function StatusFlowCard({ currentStatus = "Draft" }) {
// //   const statusFlow = [
// //     { label: "Draft", sub: "Saved as draft", icon: FiFileText },
// //     { label: "AI Analyzed", sub: "AI compliance check", icon: FiZap },
// //     { label: "Submitted", sub: "Ready for admin", icon: FiUploadCloud },
// //     { label: "Admin Review", sub: "Verification", icon: FiEye },
// //     { label: "Quotation Sent", sub: "Awaiting rate approval", icon: FiSend },
// //     { label: "Accepted", sub: "Booking confirmed", icon: FiCheckCircle },
// //     { label: "Shipment Active", sub: "Cargo in transit", icon: FiTruck },
// //     { label: "Completed", sub: "Customs cleared & delivered", icon: FiCheckCircle },
// //   ];

// //   return (
// //     <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
// //       <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
// //         <h3 className="text-sm font-bold text-slate-900">Workflow Pipeline</h3>
// //         <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
// //           {currentStatus}
// //         </span>
// //       </div>

// //       <div className="space-y-3.5">
// //         {statusFlow.map((s, idx) => {
// //           const Icon = s.icon;
// //           const isActive = currentStatus === s.label;

// //           return (
// //             <div key={s.label} className="flex items-center gap-3 relative">
// //               <div
// //                 className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
// //                   isActive
// //                     ? "bg-indigo-600 text-white shadow-xs ring-4 ring-indigo-500/15"
// //                     : "bg-slate-100 text-slate-400 border border-slate-200/60"
// //                 }`}
// //               >
// //                 <Icon size={13} />
// //               </div>
// //               <div className="flex-1 min-w-0">
// //                 <p
// //                   className={`text-xs font-semibold truncate ${
// //                     isActive ? "text-indigo-950 font-bold" : "text-slate-700"
// //                   }`}
// //                 >
// //                   {s.label}
// //                 </p>
// //                 <p className="text-[11px] text-slate-400 truncate">{s.sub}</p>
// //               </div>
// //               {isActive && (
// //                 <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse shrink-0" />
// //               )}
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }

// // const quickTips = [
// //   "Fill all required fields marked with * for swift processing.",
// //   "Ensure invoices and packing lists match net/gross weight.",
// //   "Run 'Analyze Shipment' to verify HS Code validity with AI.",
// //   "Submit to Admin only after verifying all customs declarations.",
// // ];

// // function QuickTipsCard() {
// //   return (
// //     <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/50 border border-amber-200/60 rounded-2xl p-5 shadow-2xs">
// //       <div className="flex items-center gap-2 mb-2.5">
// //         <div className="w-6 h-6 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
// //           <FiInfo size={13} />
// //         </div>
// //         <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
// //           Compliance Guidelines
// //         </h3>
// //       </div>
// //       <ul className="space-y-2 text-xs text-amber-900/80">
// //         {quickTips.map((t, idx) => (
// //           <li key={idx} className="flex items-start gap-2">
// //             <span className="text-amber-500 font-bold mt-0.5">•</span>
// //             <span className="leading-relaxed">{t}</span>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    HEADER & FOOTER
// //    ========================================================================== */

// // function Header({
// //   setActiveTab,
// //   setShipment,
// //   handleSaveDraft,
// //   handleAnalyze,
// //   handleSubmit,
// //   loading,
// //   currentTab,
// //   currentStatus,
// // }) {
// //   return (
// //     <div className="bg-white mt-10 rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] mb-6">
// //       {/* Breadcrumb */}
      

// //       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
// //         <div>
// //           <div className="flex items-center gap-3">
// //             <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
// //               New Shipment Form
// //             </h1>
// //             <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
// //               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
// //               {currentStatus || "Draft"}
// //             </span>
// //           </div>
// //           <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
// //             Specify origin, destination, cargo dimensions, and trade documents.
// //             Our logistics intelligence engine will compute HS code compliance, risk evaluation, and estimated freight.
// //           </p>
// //         </div>

// //         {/* Action Buttons */}
// //         <div className="flex flex-wrap items-center gap-2.5 shrink-0">
// //           <button
// //             type="button"
// //             onClick={handleSaveDraft}
// //             disabled={loading}
// //             className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs transition-all disabled:opacity-50"
// //           >
// //             <FiBookmark size={14} className="text-slate-500" />
// //             Save Draft
// //           </button>

// //           <button
// //             type="button"
// //             onClick={handleAnalyze}
// //             disabled={loading}
// //             className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-all disabled:opacity-50"
// //           >
// //             <FiZap size={14} />
// //             Analyze Shipment
// //           </button>

// //           <button
// //             type="button"
// //             onClick={handleSubmit}
// //             disabled={loading}
// //             className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-all disabled:opacity-50"
// //           >
// //             <FiSend size={14} />
// //             Submit to Admin
// //           </button>

// //           <button
// //             type="button"
// //             onClick={() => {
// //               setShipment("");
// //               setActiveTab(currentTab);
// //             }}
// //             className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50/50 px-3 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-100/70 transition-all"
// //           >
// //             <FiX size={14} />
// //             Cancel
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function Footer() {
// //   return (
// //     <div className="border-t border-slate-200/80 mt-10 pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
// //       <p>© 2025 ASC CargoMatrix Logistics Hub. All rights reserved.</p>
// //       <div className="flex items-center gap-5">
// //         <span className="hover:text-slate-600 cursor-pointer transition-colors">Privacy Policy</span>
// //         <span className="hover:text-slate-600 cursor-pointer transition-colors">Terms of Operations</span>
// //         <span className="hover:text-slate-600 cursor-pointer transition-colors">Customs Support</span>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    MAIN EXPORT COMPONENT
// //    ========================================================================== */

// // export default function Shipment({ setActiveTab, setShipment, currentTab }) {
// //   const [shipmentId, setShipmentId] = useState("");
// //   const [referenceNumber, setReferenceNumber] = useState("");
// //   const [currentStatus, setCurrentStatus] = useState("Draft");
// //   const [loading, setLoading] = useState(false);
// //   const [analysis, setAnalysis] = useState(null);
// //   const [uploadedDocs, setUploadedDocs] = useState({});
// //   const fileInputRef = useRef({});

// //   const [shipmentFormConfig, setShipmentFormConfig] = useState(null);
// //   const [documentsUploadConfig, setDocumentsUploadConfig] = useState(null);
// //   const [documentsSettingsLoading, setDocumentsSettingsLoading] = useState(true);
// //   const [documentsSettingsError, setDocumentsSettingsError] = useState(false);

// //   const fetchDocumentsSettings = async (isMountedCheck = () => true) => {
// //     try {
// //       setDocumentsSettingsLoading(true);
// //       setDocumentsSettingsError(false);

// //       const response = await getDocumentsUploadSettings();
// //       if (!isMountedCheck()) return;

// //       // Shared endpoint response: { status: 1, data: { sectionTitle, sectionDesc, fields } }
// //       let data = response?.data;
// //       data = data?.data ?? data;
// //       data = data?.data ?? data;
// //       data = data?.documentsUpload ?? data;

// //       if (Array.isArray(data?.fields)) {
// //         setDocumentsUploadConfig({
// //           sectionTitle: data.sectionTitle || "Documents Uploaded",
// //           sectionDesc: data.sectionDesc || "Upload all relevant documents",
// //           fields: data.fields,
// //         });
// //       } else {
// //         setDocumentsUploadConfig({ fields: [] });
// //       }
// //     } catch (error) {
// //       console.error("Shared document settings fetch error:", error);
// //       if (isMountedCheck()) {
// //         setDocumentsUploadConfig(null);
// //         setDocumentsSettingsError(true);
// //       }
// //     } finally {
// //       if (isMountedCheck()) setDocumentsSettingsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     let isMounted = true;

// //     const fetchFormSettings = async () => {
// //       try {
// //         const shipmentResponse = await getShipmentFormSettings();
// //         if (!isMounted) return;

// //         let shipmentData = shipmentResponse?.data;
// //         shipmentData = shipmentData?.data ?? shipmentData;
// //         shipmentData = shipmentData?.data ?? shipmentData;

// //         if (shipmentData?.sections?.length) {
// //           setShipmentFormConfig(shipmentData.sections[0]);
// //         }
// //       } catch (error) {
// //         console.error("Shipment form settings fetch error:", error);
// //       }
// //     };

// //     fetchFormSettings();
// //     fetchDocumentsSettings(() => isMounted);

// //     return () => {
// //       isMounted = false;
// //     };
// //   }, []);


// //   const [formData, setFormData] = useState({
// //     // Step 1
// //     shipmentType: "",
// //     shipmentMode: "",
// //     shipmentPurpose: "",
// //     customerType: "Individual",
// //     exporter: {
// //       companyName: "",
// //       contactPerson: "",
// //     },
// //     customFields: {},

// //     // Step 2
// //     route: {
// //       originCountry: "",
// //       originCity: "",
// //       destinationCountry: "",
// //       destinationCity: "",
// //     },
// //     importer: {
// //       companyName: "",
// //       address: "",
// //     },
// //     incoterm: "",
// //     etd: "",
// //     eta: "",

// //     // Step 3
// //     cargo: {
// //       productName: "",
// //       productDescription: "",
// //       hsCode: "",
// //       hsCodeText: "",
// //       category: "",
// //       quantity: "",
// //       unit: "",
// //       weight: "",
// //       netWeight: "",
// //       grossWeight: "",
// //       volumetricWeight: "",
// //       packages: "",
// //       packingType: "",
// //       unNumber: "",
// //       packageMarks: "",
// //       isDangerous: false,
// //       isTemperatureControlled: false,
// //       isStackable: false,
// //       isFragile: false,
// //       hasBattery: false,
// //       isLithium: false,
// //       dimensions: {
// //         length: "",
// //         width: "",
// //         height: "",
// //         unit: "CM",
// //       },
// //     },
// //     amount: "",
// //     currency: "",
// //     paymentTerms: "",
// //     insuranceRequired: false,
// //     exportIncentive: false,
// //     additionalInformation: {
// //       packagingType: "",
// //       packages: 0,
// //       marksNumbers: "",
// //       dangerousGoods: false,
// //       specialHandling: false,
// //       temperatureControl: false,
// //     },
// //   });

// //   const handleDirectChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleNestedChange = (parentKey, childKey, value) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [parentKey]: {
// //         ...prev[parentKey],
// //         [childKey]: value,
// //       },
// //     }));
// //   };

// //   const handleRadioChange = (name, value) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

 
// // const saveAllSteps = async () => {
// //   let currentId = shipmentId;

// //   const shipmentPayload = {
// //     shipmentType: formData.shipmentType,
// //     shipmentMode: formData.shipmentMode,
// //     shipmentPurpose: formData.shipmentPurpose,
// //     customerType: formData.customerType,

// //     exporter: {
// //       ...formData.exporter,
// //     },

// //     customFields: formData.customFields || {},

// //     currency: formData.currency || "INR",

// //     paymentTerms: formData.paymentTerms || "",

// //     amount: formData.amount === ""
// //       ? undefined
// //       : Number(formData.amount),

// //     insuranceRequired: Boolean(formData.insuranceRequired),
// //     exportIncentive: Boolean(formData.exportIncentive),
// //   };

// //   const step2Payload = {
// //     route: {
// //       ...formData.route,
// //       mode: formData.shipmentMode || "",
// //     },

// //     importer: {
// //       ...formData.importer,
// //     },

// //     shipmentMode: formData.shipmentMode,

// //     etd: formData.etd || null,
// //     eta: formData.eta || null,
// //     incoterm: formData.incoterm || "",
// //   };

// //   const step3Payload = {
// //     cargo: {
// //       ...formData.cargo,

// //       hsCode: formData.cargo.hsCode || null,
// //       hsCodeText: formData.cargo.hsCodeText || "",

// //       quantity: formData.cargo.quantity === ""
// //         ? undefined
// //         : Number(formData.cargo.quantity),

// //       weight: formData.cargo.weight === ""
// //         ? undefined
// //         : Number(formData.cargo.weight),

// //       netWeight: formData.cargo.netWeight === ""
// //         ? undefined
// //         : Number(formData.cargo.netWeight),

// //       grossWeight: formData.cargo.grossWeight === ""
// //         ? undefined
// //         : Number(formData.cargo.grossWeight),

// //       packages: formData.cargo.packages === ""
// //         ? undefined
// //         : Number(formData.cargo.packages),

// //       volumetricWeight: formData.cargo.volumetricWeight === ""
// //         ? undefined
// //         : Number(formData.cargo.volumetricWeight),

// //       dimensions: {
// //         ...formData.cargo.dimensions,
// //         length: formData.cargo.dimensions.length === ""
// //           ? undefined
// //           : Number(formData.cargo.dimensions.length),
// //         width: formData.cargo.dimensions.width === ""
// //           ? undefined
// //           : Number(formData.cargo.dimensions.width),
// //         height: formData.cargo.dimensions.height === ""
// //           ? undefined
// //           : Number(formData.cargo.dimensions.height),
// //       },
// //     },

// //     paymentTerms: formData.paymentTerms || "",
// //     insuranceRequired: Boolean(formData.insuranceRequired),
// //     exportIncentive: Boolean(formData.exportIncentive),
// //     additionalInformation: {
// //       ...formData.additionalInformation,
// //     },
// //   };

// //   if (!currentId) {
// //     const response = await createShipment(shipmentPayload);

// //     const data = response.data?.data || response.data;

// //     currentId = data._id;

// //     if (!currentId) {
// //       throw new Error("Shipment ID was not returned by server");
// //     }

// //     setShipmentId(currentId);

// //     if (data.referenceNumber) {
// //       setReferenceNumber(data.referenceNumber);
// //     }
// //   } else {
// //     await updateShipment(currentId, shipmentPayload);
// //   }

// //   await updateShipmentStep2(currentId, step2Payload);

// //   await updateShipmentStep3(currentId, step3Payload);

// //   return currentId;
// // };


// //   const handleSaveDraft = async () => {
// //     setLoading(true);
// //     try {
// //       const id = await saveAllSteps();
// //       await saveDraft(id);
// //       setCurrentStatus("Draft");
// //       alert("Draft saved successfully!");
// //     } catch (err) {
// //       console.error("Save Draft Error:", err);
// //       alert(err.response?.data?.message || "Failed to save draft.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAnalyze = async () => {
// //     setLoading(true);
// //     try {
// //       const id = await saveAllSteps();
// //       const res = await analyzeShipment(id);
// //       const data = res.data?.data || res.data;
// //       setAnalysis(data);
// //       setCurrentStatus("AI Analyzed");
// //       alert("Shipment analyzed successfully!");
// //     } catch (err) {
// //       console.error("Analyze Error:", err);
// //       alert(err.response?.data?.message || "Failed to analyze shipment.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     setLoading(true);
// //     try {
// //       const id = await saveAllSteps();
// //       await submitShipment(id);
// //       setCurrentStatus("Submitted");
// //       alert("Shipment submitted to admin successfully!");
// //     } catch (err) {
// //       console.error("Submit Error:", err);
// //       alert(err.response?.data?.message || "Failed to submit shipment.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDocumentUpload = async (documentKey, documentName, file) => {
// //     try {
// //       const id = await saveAllSteps();

// //       const form = new FormData();
// //       form.append("shipmentId", id);
// //       // Keep the configured document label as documentType for compatibility
// //       // with the existing shipment document upload backend.
// //       form.append("documentType", documentName);
// //       form.append("required", true);
// //       form.append("file", file);

// //       const res = await uploadShipmentDocument(form);

// //       setUploadedDocs((prev) => ({
// //         ...prev,
// //         [documentKey]: res.data.data,
// //       }));

// //       alert("Uploaded Successfully");
// //     } catch (err) {
// //       console.log(err);
// //       alert(err.response?.data?.message || "Upload Failed");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-slate-50/70 p-3 sm:p-6 lg:p-8 text-slate-800">
// //       <div className="max-w-[1520px] mx-auto">
// //         {/* TOP HEADER */}
// //         <Header
// //           setActiveTab={setActiveTab}
// //           setShipment={setShipment}
// //           handleSaveDraft={handleSaveDraft}
// //           handleAnalyze={handleAnalyze}
// //           handleSubmit={handleSubmit}
// //           loading={loading}
// //           currentTab={currentTab}
// //           currentStatus={currentStatus}
// //         />

// //         {/* FULL-WIDTH SHIPMENT FORM */}
// //         <div className="w-full">
// //           <div className="w-full space-y-6">
// //           <BasicShipmentDetails
// //   formData={formData}
// //   handleDirectChange={handleDirectChange}
// //   handleNestedChange={handleNestedChange}
// //   referenceNumber={referenceNumber}
// //   config={shipmentFormConfig}
// // />

// //             <OriginDestination
// //               formData={formData}
// //               handleDirectChange={handleDirectChange}
// //               handleNestedChange={handleNestedChange}
// //             />

// //             <InvoiceValue
// //               formData={formData}
// //               handleDirectChange={handleDirectChange}
// //               handleRadioChange={handleRadioChange}
// //             />

// //             <DocumentsUpload
// //               uploadedDocs={uploadedDocs}
// //               handleDocumentUpload={handleDocumentUpload}
// //               fileInputRef={fileInputRef}
// //               config={documentsUploadConfig}
// //               loading={documentsSettingsLoading}
// //               loadError={documentsSettingsError}
// //               onRetry={() => fetchDocumentsSettings()}
// //             />

// //             <AIOutputAnalysis analysis={analysis} />

// //             <ProductDetails
// //               formData={formData}
// //               handleNestedChange={handleNestedChange}
// //               handleRadioChange={handleRadioChange}
// //               analysis={analysis}
// //             />
// //           </div>
// //         </div>

// //         {/* FOOTER */}
// //         <Footer />
// //       </div>
// //     </div>
// //   );
// // }

// // mahima code //
// // import React, { useState, useEffect, useRef } from "react";
// // import {
// //   FiChevronDown,
// //   FiFileText,
// //   FiClipboard,
// //   FiAward,
// //   FiCreditCard,
// //   FiShoppingCart,
// //   FiFolder,
// //   FiTruck,
// //   FiZap,
// //   FiUploadCloud,
// //   FiEye,
// //   FiSend,
// //   FiCheckCircle,
// //   FiExternalLink,
// //   FiCalendar,
// //   FiBookmark,
// //   FiX,
// //   FiInfo,
// //   FiBox,
// //   FiCheck,
// //   FiShield,
// //   FiArrowRight,
// // } from "react-icons/fi";

// // import {
// //   createShipment,
// //   updateShipmentStep2,
// //   updateShipmentStep3,
// //   saveDraft,
// //   analyzeShipment,
// //   submitShipment,
// //   getShipmentFormSettings,
// //   getDocumentsUploadSettings,
// //   uploadShipmentDocument,
// //   updateShipment,
// //   getShipmentDetails,
// //   deleteShipmentDocument,
// // } from "../services/shipmentApi";
// // import { CloudCog } from "lucide-react";

// // // Convert stored upload paths into absolute backend URLs.
// // // VITE_API_URL is expected to contain the API base, e.g. https://api.example.com/api.
// // const getShipmentDocumentUrl = (fileUrl) => {
// //   if (!fileUrl) return "";
// //   if (/^https?:\/\//i.test(fileUrl) || fileUrl.startsWith("data:")) return fileUrl;

// //   const apiBase = String(import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
// //   const backendBase = apiBase.replace(/\/api$/i, "");
// //   const base = backendBase || window.location.origin;
// //   return new URL(fileUrl.startsWith("/") ? fileUrl : `/${fileUrl}`, base).toString();
// // };

// // const normalizeDocumentName = (value) =>
// //   String(value || "")
// //     .toLowerCase()
// //     .trim()
// //     .replace(/[^a-z0-9]+/g, "-")
// //     .replace(/^-|-$/g, "");

// // /* ==========================================================================
// //    REUSABLE FORM ATOMS
// //    ========================================================================== */

// // function Label({ children, required = true }) {
// //   return (
// //     <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-wide">
// //       {children}
// //       {required && <span className="text-rose-500 ml-1 font-bold">*</span>}
// //     </label>
// //   );
// // }

// // function Input({
// //   label,
// //   placeholder,
// //   value,
// //   name,
// //   onChange,
// //   required = true,
// //   disabled = false,
// // }) {
// //   return (
// //     <div className="w-full">
// //       <Label required={required}>{label}</Label>
// //       <input
// //         type="text"
// //         name={name}
// //         value={value || ""}
// //         onChange={onChange}
// //         placeholder={placeholder}
// //         disabled={disabled}
// //         className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all duration-150 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
// //       />
// //     </div>
// //   );
// // }

// // function DateInput({ label, value, name, onChange, required = false }) {
// //   return (
// //     <div className="w-full">
// //       <Label required={required}>{label}</Label>
// //       <div className="relative">
// //         <input
// //           type="date"
// //           name={name}
// //           value={value || ""}
// //           onChange={onChange}
// //           className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all duration-150 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
// //         />
// //         <FiCalendar
// //           size={16}
// //           className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// // function Select({
// //   label,
// //   placeholder,
// //   value,
// //   name,
// //   onChange,
// //   children,
// //   required = true,
// // }) {
// //   return (
// //     <div className="w-full">
// //       <Label required={required}>{label}</Label>
// //       <div className="relative">
// //         <select
// //           name={name}
// //           value={value || ""}
// //           onChange={onChange}
// //           className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 transition-all duration-150 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
// //         >
// //           <option value="">{placeholder}</option>
// //           {children}
// //         </select>
// //         <FiChevronDown
// //           size={16}
// //           className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// // function RadioGroup({ label, name, value, onChange, required = true }) {
// //   const isYes = value === true || value === "yes";
// //   const isNo = value === false || value === "no";

// //   return (
// //     <div className="w-full">
// //       <Label required={required}>{label}</Label>
// //       <div className="flex items-center gap-2 mt-1.5">
// //         <button
// //           type="button"
// //           onClick={() => onChange(name, true)}
// //           className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-150 ${
// //             isYes
// //               ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-xs"
// //               : "bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100"
// //           }`}
// //         >
// //           <span
// //             className={`w-2 h-2 rounded-full ${
// //               isYes ? "bg-indigo-600 ring-2 ring-indigo-200" : "bg-slate-300"
// //             }`}
// //           />
// //           Yes
// //         </button>
// //         <button
// //           type="button"
// //           onClick={() => onChange(name, false)}
// //           className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-150 ${
// //             isNo
// //               ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-xs"
// //               : "bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100"
// //           }`}
// //         >
// //           <span
// //             className={`w-2 h-2 rounded-full ${
// //               isNo ? "bg-indigo-600 ring-2 ring-indigo-200" : "bg-slate-300"
// //             }`}
// //           />
// //           No
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // function Grid2({ children }) {
// //   return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
// // }

// // function SectionCard({ number, title, subtitle, badge, children }) {
// //   return (
// //     <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.05)] transition-all duration-200 p-5 sm:p-6">
// //       <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-5">
// //         <div className="flex items-center gap-3">
// //           <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
// //             {number}
// //           </span>
// //           <div>
// //             <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
// //               {title}
// //             </h3>
// //             {subtitle && (
// //               <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
// //             )}
// //           </div>
// //         </div>
// //         {badge && (
// //           <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
// //             {badge}
// //           </span>
// //         )}
// //       </div>
// //       <div className="space-y-4">{children}</div>
// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    DOCUMENT UPLOAD COMPONENT
// //    ========================================================================== */

// // const DEFAULT_DOCUMENT_FIELDS = [
// //   { key: "commercial-invoice", label: "Commercial Invoice", enabled: true },
// //   { key: "packing-list", label: "Packing List", enabled: true },
// //   { key: "msds", label: "MSDS", enabled: true },
// //   { key: "coo", label: "COO", enabled: true },
// //   { key: "iec-gst", label: "IEC/GST", enabled: true },
// //   { key: "purchase-order", label: "Purchase Order", enabled: true },
// //   { key: "product-certificate", label: "Product Certificate", enabled: true },
// //   { key: "other-documents", label: "Other Documents", enabled: true },
// // ];

// // const DOCUMENT_ICON_STYLES = [
// //   "text-blue-600 bg-blue-50 border-blue-100",
// //   "text-amber-600 bg-amber-50 border-amber-100",
// //   "text-purple-600 bg-purple-50 border-purple-100",
// //   "text-emerald-600 bg-emerald-50 border-emerald-100",
// //   "text-indigo-600 bg-indigo-50 border-indigo-100",
// //   "text-rose-600 bg-rose-50 border-rose-100",
// //   "text-teal-600 bg-teal-50 border-teal-100",
// //   "text-slate-600 bg-slate-50 border-slate-200",
// // ];

// // function DocumentsUpload({
// //   uploadedDocs,
// //   handleDocumentUpload,
// //   fileInputRef,
// //   config,
// //   loading = false,
// //   loadError = false,
// //   onRetry,
// //   onPreview,
// //   onDelete,
// //   deletingDocumentKey = "",
// // }) {
// //   const visibleDocuments = (Array.isArray(config?.fields)
// //     ? config.fields
// //     : []
// //   ).filter((document) => document.enabled !== false);

// //   return (
// //     <SectionCard
// //       number={4}
// //       title={config?.sectionTitle || "Documents Uploaded"}
// //       subtitle={config?.sectionDesc || "Upload all relevant documents"}
// //     >
// //       {loading ? (
// //         <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-8 text-center">
// //           <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
// //           <p className="mt-2 text-sm font-semibold text-slate-700">
// //             Loading document requirements...
// //           </p>
// //         </div>
// //       ) : loadError ? (
// //         <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-6 text-center">
// //           <p className="text-sm font-semibold text-rose-700">
// //             Unable to load document requirements
// //           </p>
// //           <p className="mt-1 text-xs text-rose-600">
// //             Please try again. The form will use the latest shared settings saved by Admin.
// //           </p>
// //           {onRetry && (
// //             <button
// //               type="button"
// //               onClick={onRetry}
// //               className="mt-3 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 border border-rose-200 hover:bg-rose-100"
// //             >
// //               Retry
// //             </button>
// //           )}
// //         </div>
// //       ) : visibleDocuments.length > 0 ? (
// //         <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
// //           {visibleDocuments.map((document, index) => {
// //             const documentKey =
// //               document.key ||
// //               String(document.label || `document-${index}`)
// //                 .toLowerCase()
// //                 .replace(/[^a-z0-9]+/g, "-")
// //                 .replace(/^-|-$/g, "");

// //             const documentLabel = document.label || "Document";
// //             const uploadedDocument =
// //               uploadedDocs[documentKey] ||
// //               Object.values(uploadedDocs).find(
// //                 (doc) => normalizeDocumentName(doc.documentName || doc.documentLabel || doc.name) === normalizeDocumentName(documentLabel)
// //               );
// //             const isUploaded = !!uploadedDocument;
// //             const documentUrl =
// //               uploadedDocument?.resolvedFileUrl ||
// //               getShipmentDocumentUrl(uploadedDocument?.fileUrl || uploadedDocument?.url || uploadedDocument?.documentUrl || uploadedDocument?.path);
// //             const Icon = index === 1 ? FiClipboard : FiFileText;
// //             const iconStyle =
// //               DOCUMENT_ICON_STYLES[index % DOCUMENT_ICON_STYLES.length];

// //             return (
// //               <div
// //                 key={documentKey}
// //                 className={`group flex flex-col justify-between rounded-xl border p-3.5 text-center transition-all duration-150 ${
// //                   isUploaded
// //                     ? "border-emerald-200 bg-emerald-50/30"
// //                     : "border-slate-200 bg-slate-50/30 hover:border-indigo-200 hover:bg-indigo-50/20"
// //                 }`}
// //               >
// //                 <div>
// //                   <div
// //                     className={`w-9 h-9 rounded-xl mx-auto flex items-center justify-center border shadow-2xs ${iconStyle}`}
// //                   >
// //                     <Icon size={16} />
// //                   </div>

// //                   <p className="text-xs font-semibold text-slate-800 mt-2.5 break-words">
// //                     {documentLabel}
// //                   </p>
// //                 </div>

// //                 <div className="mt-3">
// //                   {isUploaded && documentUrl && (
// //                     <div className="mb-2 grid grid-cols-2 gap-1.5">
// //                       <button
// //                         type="button"
// //                         onClick={() => onPreview?.(uploadedDocument, documentLabel, documentUrl)}
// //                         className="inline-flex items-center justify-center gap-1 rounded-lg bg-white border border-indigo-200 px-2 py-1.5 text-[11px] font-semibold text-indigo-700 hover:bg-indigo-50"
// //                       >
// //                         <FiEye size={12} /> Preview
// //                       </button>
// //                       <a
// //                         href={documentUrl}
// //                         target="_blank"
// //                         rel="noopener noreferrer"
// //                         className="inline-flex items-center justify-center gap-1 rounded-lg bg-white border border-emerald-200 px-2 py-1.5 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50"
// //                       >
// //                         Open
// //                       </a>
// //                     </div>
// //                   )}
// //                   <input
// //                     type="file"
// //                     hidden
// //                     accept=".pdf,.jpg,.jpeg,.png"
// //                     ref={(element) => {
// //                       fileInputRef.current[documentKey] = element;
// //                     }}
// //                     onChange={(event) => {
// //                       const file = event.target.files?.[0];

// //                       if (file) {
// //                         handleDocumentUpload(
// //                           documentKey,
// //                           documentLabel,
// //                           file
// //                         );
// //                       }

// //                       // Allows selecting the same file again after replacing it.
// //                       event.target.value = "";
// //                     }}
// //                   />

// //                   <button
// //                     type="button"
// //                     onClick={() => fileInputRef.current[documentKey]?.click()}
// //                     className={`w-full py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all duration-150 ${
// //                       isUploaded
// //                         ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
// //                         : "bg-white border border-slate-200 text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 shadow-2xs"
// //                     }`}
// //                   >
// //                     {isUploaded ? "Replace file" : "+ Upload"}
// //                   </button>
// //                   {isUploaded && (
// //                     <button
// //                       type="button"
// //                       disabled={deletingDocumentKey === documentKey}
// //                       onClick={() => onDelete?.(documentKey, uploadedDocument)}
// //                       className="mt-1.5 w-full rounded-lg border border-rose-200 bg-rose-50 px-2 py-1.5 text-[11px] font-semibold text-rose-700 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
// //                     >
// //                       {deletingDocumentKey === documentKey ? "Deleting..." : "Delete"}
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       ) : (
// //         <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
// //           <FiFolder className="mx-auto text-slate-400" size={26} />
// //           <p className="mt-2 text-sm font-semibold text-slate-700">
// //             No documents available
// //           </p>
// //           <p className="mt-1 text-xs text-slate-500">
// //             The administrator has not enabled any document upload fields.
// //           </p>
// //         </div>
// //       )}

// //       <div className="flex items-center gap-2 mt-4 pt-3 text-xs text-slate-500 border-t border-slate-100">
// //         <FiInfo size={14} className="text-slate-400 shrink-0" />
// //         <span>
// //           Accepted formats: PDF, JPG, PNG (Max file size: 10MB per document)
// //         </span>
// //       </div>
// //     </SectionCard>
// //   );
// // }


// // function ShipmentValidationModal({ errors, onClose }) {
// //   if (!errors?.length) return null;

// //   const groups = [
// //     { title: "Basic Shipment Details", items: ["Shipment Type", "Shipment Mode", "Shipment Purpose"] },
// //     { title: "Origin & Destination", items: ["Origin Country", "Origin City / Port / Airport", "Destination Country", "Destination City / Port / Airport", "Consignee / Buyer Name", "Consignee Address"] },
// //     { title: "Invoice & Value", items: ["Invoice Value", "Invoice Value must be greater than 0", "Currency", "Payment Terms"] },
// //     { title: "Product & Cargo Details", items: ["Product Name", "Product Description", "Product Category", "Quantity", "Unit", "Net Weight (Kg)", "Gross Weight (Kg)", "No. of Packages", "Packing Type", "Package Length", "Package Width", "Package Height"] },
// //   ];

// //   const known = new Set(groups.flatMap((group) => group.items));
// //   const sections = groups
// //     .map((group) => ({ ...group, missing: errors.filter((item) => group.items.includes(item)) }))
// //     .filter((group) => group.missing.length > 0);
// //   const otherErrors = errors.filter((item) => !known.has(item));
// //   if (otherErrors.length) sections.push({ title: "Required Documents / Other Details", missing: otherErrors });

// //   return (
// //     <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4" onClick={onClose}>
// //       <div
// //         role="dialog"
// //         aria-modal="true"
// //         aria-labelledby="shipment-validation-title"
// //         className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
// //         onClick={(event) => event.stopPropagation()}
// //       >
// //         <div className="flex items-start gap-3 border-b border-amber-100 bg-amber-50 px-5 py-4">
// //           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
// //             <FiInfo size={20} />
// //           </div>
// //           <div className="min-w-0 flex-1">
// //             <h2 id="shipment-validation-title" className="text-base font-bold text-slate-900">Complete your shipment details</h2>
// //             <p className="mt-1 text-sm text-slate-600">
// //               Your shipment hasn’t been submitted yet. Please fill in the {errors.length} required {errors.length === 1 ? "field" : "fields"} below.
// //             </p>
// //           </div>
// //           <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-slate-700" aria-label="Close">
// //             <FiX size={19} />
// //           </button>
// //         </div>

// //         <div className="max-h-[55vh] space-y-4 overflow-y-auto px-5 py-4">
// //           {sections.map((section) => (
// //             <section key={section.title}>
// //               <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">{section.title}</h3>
// //               <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
// //                 {section.missing.map((item) => (
// //                   <li key={item} className="flex items-start gap-2 rounded-lg border border-rose-100 bg-rose-50/70 px-3 py-2 text-sm text-rose-800">
// //                     <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[10px] font-bold">!</span>
// //                     <span>{item}</span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </section>
// //           ))}
// //         </div>

// //         <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
// //           <p className="text-xs text-slate-500">Draft saving and document uploads are still available.</p>
// //           <button type="button" onClick={onClose} className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
// //             Okay, I’ll complete them
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function DocumentPreviewModal({ document, onClose }) {
// //   if (!document) return null;
// //   const url = document.url || "";
// //   const isImage = /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(
// //     `${document.fileName || ""} ${url}`
// //   ) || String(document.mimeType || "").startsWith("image/");
// //   const isPdf = /\.pdf(\?.*)?$/i.test(`${document.fileName || ""} ${url}`) ||
// //     document.mimeType === "application/pdf";

// //   return (
// //     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 sm:p-6" onClick={onClose}>
// //       <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
// //         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
// //           <div className="min-w-0">
// //             <h3 className="truncate text-sm font-bold text-slate-900">{document.title || "Document Preview"}</h3>
// //             <p className="truncate text-xs text-slate-500">{document.fileName || "Uploaded file"}</p>
// //           </div>
// //           <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900" aria-label="Close preview">
// //             <FiX size={18} />
// //           </button>
// //         </div>
// //         <div className="min-h-[260px] flex-1 overflow-auto bg-slate-100 p-3 sm:p-5">
// //           {isImage ? (
// //             <img src={url} alt={document.title || "Uploaded document"} className="mx-auto max-h-[72vh] max-w-full rounded-lg object-contain shadow-sm" />
// //           ) : isPdf ? (
// //             <iframe title={document.title || "PDF preview"} src={url} className="h-[72vh] w-full rounded-lg border border-slate-200 bg-white" />
// //           ) : (
// //             <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
// //               <FiFileText size={42} className="text-slate-400" />
// //               <p className="text-sm font-semibold text-slate-700">Preview is not available for this file type.</p>
// //               <a href={url} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700">Open document</a>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    AI ANALYSIS CARD
// //    ========================================================================== */

// // function AIOutputAnalysis({ analysis }) {
// //   const aiTopStats = [
// //     { label: "Suggested HS Code", value: analysis?.hsCode || "--", color: "bg-blue-50/70 border-blue-200/80 text-blue-700" },
// //     { label: "Required Docs", value: analysis?.requiredDocs ? `${analysis.requiredDocs} Files` : "--", color: "bg-emerald-50/70 border-emerald-200/80 text-emerald-700" },
// //     { label: "Freight Estimate", value: analysis?.freightEstimate ? `₹${analysis.freightEstimate}` : "--", color: "bg-amber-50/70 border-amber-200/80 text-amber-700" },
// //     { label: "RoDTEP Incentive", value: analysis?.incentive || "N/A", color: "bg-purple-50/70 border-purple-200/80 text-purple-700" },
// //   ];

// //   const aiBottomStats = [
// //     { label: "Compliance Checklist", value: analysis?.complianceCount || "--", sub: "Requirements" },
// //     { label: "Risk Score Assessment", value: analysis?.riskScore || "--", sub: analysis?.riskSub || "", green: true },
// //     { label: "Estimated Transit Time", value: analysis?.timeline || "--" },
// //     { label: "Recommended Next Step", value: analysis?.recommendation || "--", green: true },
// //   ];

// //   return (
// //     <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
// //       <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
// //         <div className="flex items-center gap-2">
// //           <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
// //             <FiZap size={14} />
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">5</span>
// //             <h3 className="text-sm font-bold text-slate-900">AI Output After Analysis</h3>
// //           </div>
// //         </div>
// //         <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/70">
// //           Smart Engine
// //         </span>
// //       </div>

// //       <div className="grid grid-cols-2 gap-2.5">
// //         {aiTopStats.map((s) => (
// //           <div key={s.label} className={`rounded-xl border p-2.5 flex flex-col justify-between ${s.color}`}>
// //             <p className="text-[11px] font-medium opacity-80">{s.label}</p>
// //             <p className="text-sm font-bold mt-1 tracking-tight">{s.value}</p>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="grid grid-cols-2 gap-2.5 mt-2.5">
// //         {aiBottomStats.map((s) => (
// //           <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
// //             <p className="text-[11px] text-slate-500 font-medium">{s.label}</p>
// //             <p className={`text-xs font-bold mt-1 ${s.green ? "text-emerald-600" : "text-slate-800"}`}>
// //               {s.value}
// //             </p>
// //             {s.sub && <p className="text-[10px] text-slate-400 mt-0.5">{s.sub}</p>}
// //           </div>
// //         ))}
// //       </div>

// //       <button
// //         type="button"
// //         className="w-full mt-3.5 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-all shadow-2xs"
// //       >
// //         <FiExternalLink size={13} />
// //         View Full Analysis Report
// //       </button>
// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    FORM STEP SECTIONS
// //    ========================================================================== */


// //    function BasicShipmentDetails({
// //   formData,
// //   handleDirectChange,
// //   handleNestedChange,
// //   referenceNumber,
// //   config,
// // }) {
// //   const fallbackFields = [
// //     {
// //       key: "shipmentType",
// //       label: "Shipment Type",
// //       useDropdown: true,
// //       options: ["Export", "Import", "Re-export"],
// //     },
// //     {
// //       key: "shipmentMode",
// //       label: "Shipment Mode",
// //       useDropdown: true,
// //       options: ["Air", "Sea", "Road", "Rail"],
// //     },
// //     {
// //       key: "shipmentPurpose",
// //       label: "Shipment Purpose",
// //       useDropdown: true,
// //       options: ["Commercial", "Sample", "Personal"],
// //     },
// //     {
// //       key: "companyName",
// //       label: "Customer / Company Name",
// //       useDropdown: false,
// //     },
// //     {
// //       key: "contactPerson",
// //       label: "Contact Person",
// //       useDropdown: false,
// //     },
// //   ];

// //   const configuredFields = Array.isArray(config?.fields) ? config.fields : [];
// //   const fields = [...configuredFields];

// //   // Keep the exact five Basic Shipment fields shown in the approved form.
// //   fallbackFields.forEach((fallback) => {
// //     if (!fields.some((field) => field.key === fallback.key)) {
// //       fields.push(fallback);
// //     }
// //   });

// //   const getValue = (key) => {
// //     switch (key) {
// //       case "companyName":
// //         return formData.exporter?.companyName || "";
// //       case "contactPerson":
// //         return formData.exporter?.contactPerson || "";
// //       case "shipmentType":
// //       case "shipmentMode":
// //       case "shipmentPurpose":
// //         return formData[key] || "";
// //       default:
// //         return formData.customFields?.[key] ?? "";
// //     }
// //   };

// //   const handleFieldChange = (key, value) => {
// //     switch (key) {
// //       case "companyName":
// //       case "contactPerson":
// //         handleNestedChange("exporter", key, value);
// //         break;

// //       case "shipmentType":
// //       case "shipmentMode":
// //       case "shipmentPurpose":
// //         handleDirectChange({
// //           target: { name: key, value },
// //         });
// //         break;

// //       default:
// //         handleNestedChange("customFields", key, value);
// //         break;
// //     }
// //   };

// //   return (
// //     <SectionCard
// //       number={1}
// //       title={config?.title || "Basic Shipment Details"}
// //       subtitle={
// //         config?.description ||
// //         "General shipment classification and exporter contact"
// //       }
// //     >
// //       <Grid2>
// //         {fields.map((field) => {
// //           const value = getValue(field.key);

// //           return (
// //             <div key={field.key} className="w-full">
// //               {field.useDropdown ? (
// //                 <Select
// //                   label={field.label}
// //                   placeholder={`Select ${field.label}`}
// //                   name={field.key}
// //                   value={value}
// //                   onChange={(event) =>
// //                     handleFieldChange(field.key, event.target.value)
// //                   }
// //                 >
// //                   {(field.options || []).map((option) => (
// //                     <option key={option} value={option}>
// //                       {option}
// //                     </option>
// //                   ))}
// //                 </Select>
// //               ) : (
// //                 <div className="w-full">
// //                   <Label required={false}>{field.label}</Label>
// //                   <input
// //                     type="text"
// //                     value={value}
// //                     onChange={(event) =>
// //                       handleFieldChange(field.key, event.target.value)
// //                     }
// //                     placeholder={`Enter ${field.label}`}
// //                     className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
// //                   />
// //                 </div>
// //               )}
// //             </div>
// //           );
// //         })}

// //         <Input
// //           label="Reference No"
// //           value={referenceNumber || "Auto Generated on Draft/Submit"}
// //           disabled={true}
// //           required={false}
// //         />
// //       </Grid2>
// //     </SectionCard>
// //   );
// // }

// // function OriginDestination({ formData, handleDirectChange, handleNestedChange }) {
// //   return (
// //     <SectionCard number={2} title="Origin & Destination" subtitle="">
// //       <Grid2>
// //         <Select
// //           label="Origin Country"
// //           placeholder="Select Country"
// //           value={formData.route.originCountry}
// //           onChange={(e) => handleNestedChange("route", "originCountry", e.target.value)}
// //         >
// //           <option value="India">India</option>
// //           <option value="China">China</option>
// //           <option value="USA">USA</option>
// //         </Select>
// //         <Input
// //           label="Origin City / Port / Airport"
// //           placeholder="e.g. Mumbai Port (INBOM)"
// //           value={formData.route.originCity}
// //           onChange={(e) => handleNestedChange("route", "originCity", e.target.value)}
// //         />
// //       </Grid2>
// //       <Grid2>
// //         <Select
// //           label="Destination Country"
// //           placeholder="Select Country"
// //           value={formData.route.destinationCountry}
// //           onChange={(e) => handleNestedChange("route", "destinationCountry", e.target.value)}
// //         >
// //           <option value="India">India</option>
// //           <option value="Singapore">Singapore</option>
// //           <option value="Dubai">Dubai</option>
// //         </Select>
// //         <Input
// //           label="Destination City / Port / Airport"
// //           placeholder="e.g. Jebel Ali Port (AEJEA)"
// //           value={formData.route.destinationCity}
// //           onChange={(e) => handleNestedChange("route", "destinationCity", e.target.value)}
// //         />
// //       </Grid2>
// //       <Grid2>
// //         <Input
// //           label="Consignee / Buyer Name"
// //           placeholder="Buyer legal company name"
// //           value={formData.importer.companyName}
// //           onChange={(e) => handleNestedChange("importer", "companyName", e.target.value)}
// //         />
// //         <Input
// //           label="Consignee Address"
// //           placeholder="Warehouse or delivery address"
// //           value={formData.importer.address}
// //           onChange={(e) => handleNestedChange("importer", "address", e.target.value)}
// //         />
// //       </Grid2>
// //       <Grid2>
// //         <Select
// //           label="Incoterm"
// //           required={false}
// //           placeholder="Select Incoterm"
// //           value={formData.incoterm}
// //           onChange={(e) => handleDirectChange(e)}
// //           name="incoterm"
// //         >
// //           <option value="FOB">FOB - Free on Board</option>
// //           <option value="CIF">CIF - Cost, Insurance & Freight</option>
// //           <option value="EXW">EXW - Ex Works</option>
// //         </Select>
// //         <DateInput
// //           label="Expected Shipment Date"
// //           name="etd"
// //           value={formData.etd}
// //           onChange={handleDirectChange}
// //         />
// //       </Grid2>
// //     </SectionCard>
// //   );
// // }

// // function ProductDetails({
// //   formData,
// //   handleNestedChange,
// //   handleRadioChange,
// //   analysis,
// // }) {
// //   return (
// //     <SectionCard number={6} title="Product Details" subtitle="">
// //       <Grid2>
// //         <Input
// //           label="Product Name"
// //           placeholder="e.g. High Density Polymer Resins"
// //           value={formData.cargo.productName}
// //           onChange={(e) => handleNestedChange("cargo", "productName", e.target.value)}
// //         />
// //         <Input
// //           label="Product Description"
// //           placeholder="Brief technical or commercial description"
// //           value={formData.cargo.productDescription}
// //           onChange={(e) => handleNestedChange("cargo", "productDescription", e.target.value)}
// //         />
// //       </Grid2>

// //       <Grid2>
// //         <Input
// //           label="HS Code"
// //           placeholder="Enter HS Code manually"
// //           value={formData.cargo.hsCodeText || ""}
// //           onChange={(e) =>
// //             handleNestedChange("cargo", "hsCodeText", e.target.value)
// //           }
// //         />
// //         <Select
// //           label="Product Category"
// //           placeholder="Select category"
// //           value={formData.cargo.category}
// //           onChange={(e) => handleNestedChange("cargo", "category", e.target.value)}
// //         >
// //           <option value="Electronics">Electronics</option>
// //           <option value="Textiles">Textiles</option>
// //           <option value="General">General Cargo</option>
// //         </Select>
// //       </Grid2>

// //       <Grid2>
// //         <div className="grid grid-cols-2 gap-3">
// //           <Input
// //             label="Quantity"
// //             placeholder="e.g. 500"
// //             value={formData.cargo.quantity}
// //             onChange={(e) => handleNestedChange("cargo", "quantity", e.target.value)}
// //           />
// //           <Select
// //             label="Unit"
// //             placeholder="Unit"
// //             value={formData.cargo.unit}
// //             onChange={(e) => handleNestedChange("cargo", "unit", e.target.value)}
// //           >
// //             <option value="PCS">PCS</option>
// //             <option value="KG">KG</option>
// //             <option value="BOX">BOX</option>
// //           </Select>
// //         </div>
// //         <div className="grid grid-cols-2 gap-3">
// //           <Input
// //             label="Net Weight (Kg)"
// //             placeholder="Net Wt"
// //             value={formData.cargo.netWeight || formData.cargo.weight}
// //             onChange={(e) => handleNestedChange("cargo", "netWeight", e.target.value)}
// //           />
// //           <Input
// //             label="Gross Weight (Kg)"
// //             placeholder="Gross Wt"
// //             value={formData.cargo.grossWeight}
// //             onChange={(e) => handleNestedChange("cargo", "grossWeight", e.target.value)}
// //           />
// //         </div>
// //       </Grid2>

// //       {/* DIMENSIONS ROW */}
// //       <div className="rounded-xl border border-slate-200/90 bg-slate-50/40 p-4">
// //         <div className="flex items-center justify-between mb-2">
// //           <Label required={true}>Package Dimensions (L × W × H)</Label>
// //           <span className="text-[11px] font-medium text-slate-400">Unit of measurement</span>
// //         </div>
// //         <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
// //           <div className="relative">
// //             <input
// //               placeholder="Length"
// //               value={formData.cargo.dimensions?.length || ""}
// //               onChange={(e) =>
// //                 handleNestedChange("cargo", "dimensions", {
// //                   ...formData.cargo.dimensions,
// //                   length: e.target.value,
// //                 })
// //               }
// //               className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
// //             />
// //             <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 pointer-events-none">L</span>
// //           </div>
// //           <div className="relative">
// //             <input
// //               placeholder="Width"
// //               value={formData.cargo.dimensions?.width || ""}
// //               onChange={(e) =>
// //                 handleNestedChange("cargo", "dimensions", {
// //                   ...formData.cargo.dimensions,
// //                   width: e.target.value,
// //                 })
// //               }
// //               className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
// //             />
// //             <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 pointer-events-none">W</span>
// //           </div>
// //           <div className="relative">
// //             <input
// //               placeholder="Height"
// //               value={formData.cargo.dimensions?.height || ""}
// //               onChange={(e) =>
// //                 handleNestedChange("cargo", "dimensions", {
// //                   ...formData.cargo.dimensions,
// //                   height: e.target.value,
// //                 })
// //               }
// //               className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
// //             />
// //             <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 pointer-events-none">H</span>
// //           </div>
// //           <div className="relative">
// //             <select
// //               value={formData.cargo.dimensions?.unit || "CM"}
// //               onChange={(e) =>
// //                 handleNestedChange("cargo", "dimensions", {
// //                   ...formData.cargo.dimensions,
// //                   unit: e.target.value,
// //                 })
// //               }
// //               className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
// //             >
// //               <option value="CM">CM</option>
// //               <option value="INCH">INCH</option>
// //             </select>
// //             <FiChevronDown
// //               size={14}
// //               className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       <Grid2>
// //         <Input
// //           label="Volumetric Weight"
// //           placeholder="Auto calculated"
// //           value={formData.cargo.volumetricWeight}
// //           onChange={(e) => handleNestedChange("cargo", "volumetricWeight", e.target.value)}
// //         />
// //         <Input
// //           label="No. of Packages"
// //           placeholder="Total cartons or pallets"
// //           value={formData.cargo.packages}
// //           onChange={(e) => handleNestedChange("cargo", "packages", e.target.value)}
// //         />
// //       </Grid2>

// //       <Grid2>
// //         <Select
// //           label="Packing Type"
// //           placeholder="Select packing type"
// //           value={formData.cargo.packingType}
// //           onChange={(e) => handleNestedChange("cargo", "packingType", e.target.value)}
// //         >
// //           <option value="Carton">Standard Carton</option>
// //           <option value="Pallet">Wooden / Plastic Pallet</option>
// //           <option value="Wooden Crate">Industrial Wooden Crate</option>
// //         </Select>
// //         <Input
// //           label="UN Number (if DG)"
// //           placeholder="e.g. UN1993"
// //           required={false}
// //           value={formData.cargo.unNumber}
// //           onChange={(e) => handleNestedChange("cargo", "unNumber", e.target.value)}
// //         />
// //       </Grid2>

// //       <Input
// //         label="Package Marks & Numbers"
// //         placeholder="Shipping mark inscriptions on carton"
// //         required={false}
// //         value={formData.cargo.packageMarks}
// //         onChange={(e) => handleNestedChange("cargo", "packageMarks", e.target.value)}
// //       />

// //       <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
// //         <RadioGroup
// //           label="Dangerous Goods (DG)"
// //           name="isDangerous"
// //           value={formData.cargo.isDangerous}
// //           onChange={(name, val) => handleNestedChange("cargo", name, val)}
// //         />
// //         <RadioGroup
// //           label="Temperature Controlled"
// //           name="isTemperatureControlled"
// //           value={formData.cargo.isTemperatureControlled}
// //           onChange={(name, val) => handleNestedChange("cargo", name, val)}
// //         />
// //         <RadioGroup
// //           label="Stackable"
// //           name="isStackable"
// //           value={formData.cargo.isStackable}
// //           onChange={(name, val) => handleNestedChange("cargo", name, val)}
// //         />
// //         <RadioGroup
// //           label="Fragile"
// //           name="isFragile"
// //           value={formData.cargo.isFragile}
// //           onChange={(name, val) => handleNestedChange("cargo", name, val)}
// //         />
// //         <RadioGroup
// //           label="Battery Included"
// //           name="hasBattery"
// //           value={formData.cargo.hasBattery}
// //           onChange={(name, val) => handleNestedChange("cargo", name, val)}
// //         />
// //         <RadioGroup
// //           label="Lithium Battery"
// //           name="isLithium"
// //           value={formData.cargo.isLithium}
// //           onChange={(name, val) => handleNestedChange("cargo", name, val)}
// //         />
// //       </div>
// //     </SectionCard>
// //   );
// // }

// // function InvoiceValue({ formData, handleDirectChange, handleRadioChange }) {
// //   return (
// //     <SectionCard number={3} title="Invoice & Value" subtitle="">
// //       <Grid2>
// //         <Input
// //           label="Invoice Value"
// //           placeholder="Total invoice amount"
// //           name="amount"
// //           value={formData.amount}
// //           onChange={handleDirectChange}
// //         />
// //         <Select
// //           label="Currency"
// //           placeholder="Select currency"
// //           name="currency"
// //           value={formData.currency}
// //           onChange={handleDirectChange}
// //         >
// //           <option value="USD">USD ($)</option>
// //           <option value="INR">INR (₹)</option>
// //           <option value="EUR">EUR (€)</option>
// //         </Select>
// //       </Grid2>
// //       <Select
// //         label="Payment Terms"
// //         placeholder="Select payment terms"
// //         name="paymentTerms"
// //         value={formData.paymentTerms}
// //         onChange={handleDirectChange}
// //       >
// //         <option value="Advance">100% Advance Payment</option>
// //         <option value="LC">Letter of Credit (LC at Sight)</option>
// //         <option value="Net 30">Net 30 Days Terms</option>
// //       </Select>
// //       <Grid2>
// //         <RadioGroup
// //           label="Insurance Required"
// //           name="insuranceRequired"
// //           value={formData.insuranceRequired}
// //           onChange={handleRadioChange}
// //         />
// //         <RadioGroup
// //           label="Export Incentive"
// //           name="exportIncentive"
// //           value={formData.exportIncentive}
// //           onChange={handleRadioChange}
// //         />
// //       </Grid2>
// //     </SectionCard>
// //   );
// // }

// // /* ==========================================================================
// //    SIDEBAR METRIC CARDS
// //    ========================================================================== */

// // function DimensionsCard({ calculatedMetrics }) {
// //   const dimensionRows = [
// //     { label: "Volume Total (CBM)", value: calculatedMetrics?.cbm ? `${calculatedMetrics.cbm} CBM` : "--" },
// //     { label: "Volumetric Wt (Air)", value: calculatedMetrics?.volumetricWeight ? `${calculatedMetrics.volumetricWeight} Kg` : "--" },
// //     { label: "Ocean Volume (CBM)", value: calculatedMetrics?.cbm ? `${calculatedMetrics.cbm} CBM` : "--" },
// //     { label: "Chargeable Weight", value: calculatedMetrics?.chargeableWeight ? `${calculatedMetrics.chargeableWeight} Kg` : "--" },
// //   ];

// //   return (
// //     <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
// //       <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
// //         <div className="flex items-center gap-2">
// //           <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
// //             <FiBox size={14} />
// //           </div>
// //           <h3 className="text-sm font-bold text-slate-900">Cargo & Weight Metrics</h3>
// //         </div>
// //         <span className="text-[10px] text-slate-400">Live Calc</span>
// //       </div>

// //       <div className="space-y-2.5">
// //         {dimensionRows.map((r) => (
// //           <div key={r.label} className="flex items-center justify-between text-xs py-1">
// //             <span className="text-slate-500 font-medium">{r.label}</span>
// //             <span className="font-bold text-slate-800">{r.value}</span>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between bg-emerald-50/60 -mx-5 -mb-5 p-4 rounded-b-2xl border-emerald-100/60">
// //         <div>
// //           <span className="text-[11px] font-semibold text-emerald-800 block">Estimated Freight</span>
// //           <span className="text-[10px] text-emerald-600">Standard market rate</span>
// //         </div>
// //         <span className="text-base font-extrabold text-emerald-700">
// //           {calculatedMetrics?.estimatedFreight ? `₹ ${calculatedMetrics.estimatedFreight}` : "--"}
// //         </span>
// //       </div>
// //     </div>
// //   );
// // }

// // function StatusFlowCard({ currentStatus = "Draft" }) {
// //   const statusFlow = [
// //     { label: "Draft", sub: "Saved as draft", icon: FiFileText },
// //     { label: "AI Analyzed", sub: "AI compliance check", icon: FiZap },
// //     { label: "Submitted", sub: "Ready for admin", icon: FiUploadCloud },
// //     { label: "Admin Review", sub: "Verification", icon: FiEye },
// //     { label: "Quotation Sent", sub: "Awaiting rate approval", icon: FiSend },
// //     { label: "Accepted", sub: "Booking confirmed", icon: FiCheckCircle },
// //     { label: "Shipment Active", sub: "Cargo in transit", icon: FiTruck },
// //     { label: "Completed", sub: "Customs cleared & delivered", icon: FiCheckCircle },
// //   ];

// //   return (
// //     <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
// //       <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
// //         <h3 className="text-sm font-bold text-slate-900">Workflow Pipeline</h3>
// //         <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
// //           {currentStatus}
// //         </span>
// //       </div>

// //       <div className="space-y-3.5">
// //         {statusFlow.map((s, idx) => {
// //           const Icon = s.icon;
// //           const isActive = currentStatus === s.label;

// //           return (
// //             <div key={s.label} className="flex items-center gap-3 relative">
// //               <div
// //                 className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
// //                   isActive
// //                     ? "bg-indigo-600 text-white shadow-xs ring-4 ring-indigo-500/15"
// //                     : "bg-slate-100 text-slate-400 border border-slate-200/60"
// //                 }`}
// //               >
// //                 <Icon size={13} />
// //               </div>
// //               <div className="flex-1 min-w-0">
// //                 <p
// //                   className={`text-xs font-semibold truncate ${
// //                     isActive ? "text-indigo-950 font-bold" : "text-slate-700"
// //                   }`}
// //                 >
// //                   {s.label}
// //                 </p>
// //                 <p className="text-[11px] text-slate-400 truncate">{s.sub}</p>
// //               </div>
// //               {isActive && (
// //                 <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse shrink-0" />
// //               )}
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }

// // const quickTips = [
// //   "Fill all required fields marked with * for swift processing.",
// //   "Ensure invoices and packing lists match net/gross weight.",
// //   "Run 'Analyze Shipment' to verify HS Code validity with AI.",
// //   "Submit to Admin only after verifying all customs declarations.",
// // ];

// // function QuickTipsCard() {
// //   return (
// //     <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/50 border border-amber-200/60 rounded-2xl p-5 shadow-2xs">
// //       <div className="flex items-center gap-2 mb-2.5">
// //         <div className="w-6 h-6 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
// //           <FiInfo size={13} />
// //         </div>
// //         <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
// //           Compliance Guidelines
// //         </h3>
// //       </div>
// //       <ul className="space-y-2 text-xs text-amber-900/80">
// //         {quickTips.map((t, idx) => (
// //           <li key={idx} className="flex items-start gap-2">
// //             <span className="text-amber-500 font-bold mt-0.5">•</span>
// //             <span className="leading-relaxed">{t}</span>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    HEADER & FOOTER
// //    ========================================================================== */

// // function Header({
// //   setActiveTab,
// //   setShipment,
// //   handleSaveDraft,
// //   handleAnalyze,
// //   handleSubmit,
// //   loading,
// //   currentTab,
// //   currentStatus,
// // }) {
// //   return (
// //     <div className="bg-white mt-10 rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] mb-6">
// //       {/* Breadcrumb */}
      

// //       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
// //         <div>
// //           <div className="flex items-center gap-3">
// //             <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
// //               New Shipment Form
// //             </h1>
// //             <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
// //               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
// //               {currentStatus || "Draft"}
// //             </span>
// //           </div>
// //           <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
// //             Specify origin, destination, cargo dimensions, and trade documents.
// //             Our logistics intelligence engine will compute HS code compliance, risk evaluation, and estimated freight.
// //           </p>
// //         </div>

// //         {/* Action Buttons */}
// //         <div className="flex flex-wrap items-center gap-2.5 shrink-0">
// //           <button
// //             type="button"
// //             onClick={handleSaveDraft}
// //             disabled={loading}
// //             className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs transition-all disabled:opacity-50"
// //           >
// //             <FiBookmark size={14} className="text-slate-500" />
// //             Save Draft
// //           </button>

// //           <button
// //             type="button"
// //             onClick={handleAnalyze}
// //             disabled={loading}
// //             className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-all disabled:opacity-50"
// //           >
// //             <FiZap size={14} />
// //             Analyze Shipment
// //           </button>

// //           <button
// //             type="button"
// //             onClick={handleSubmit}
// //             disabled={loading}
// //             className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-all disabled:opacity-50"
// //           >
// //             <FiSend size={14} />
// //             Submit to Admin
// //           </button>

// //           <button
// //             type="button"
// //             onClick={() => {
// //               setShipment("");
// //               setActiveTab(currentTab);
// //             }}
// //             className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50/50 px-3 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-100/70 transition-all"
// //           >
// //             <FiX size={14} />
// //             Cancel
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function Footer() {
// //   return (
// //     <div className="border-t border-slate-200/80 mt-10 pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
// //       <p>© 2025 ASC CargoMatrix Logistics Hub. All rights reserved.</p>
// //       <div className="flex items-center gap-5">
// //         <span className="hover:text-slate-600 cursor-pointer transition-colors">Privacy Policy</span>
// //         <span className="hover:text-slate-600 cursor-pointer transition-colors">Terms of Operations</span>
// //         <span className="hover:text-slate-600 cursor-pointer transition-colors">Customs Support</span>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    MAIN EXPORT COMPONENT
// //    ========================================================================== */

// // export default function Shipment({ setActiveTab, setShipment, currentTab, editShipmentId = null, onSaved }) {
// //   const [shipmentId, setShipmentId] = useState("");
// //   const [referenceNumber, setReferenceNumber] = useState("");
// //   const [currentStatus, setCurrentStatus] = useState("Draft");
// //   const [loading, setLoading] = useState(false);
// //   const [analysis, setAnalysis] = useState(null);
// //   const [uploadedDocs, setUploadedDocs] = useState({});
// //   const [previewDocument, setPreviewDocument] = useState(null);
// //   const [deletingDocumentKey, setDeletingDocumentKey] = useState("");
// //   const [validationErrors, setValidationErrors] = useState([]);
// //   const [showValidationModal, setShowValidationModal] = useState(false);
// //   const fileInputRef = useRef({});

// //   const [shipmentFormConfig, setShipmentFormConfig] = useState(null);
// //   const [documentsUploadConfig, setDocumentsUploadConfig] = useState(null);
// //   const [documentsSettingsLoading, setDocumentsSettingsLoading] = useState(true);
// //   const [documentsSettingsError, setDocumentsSettingsError] = useState(false);

// //   const fetchDocumentsSettings = async (isMountedCheck = () => true) => {
// //     try {
// //       setDocumentsSettingsLoading(true);
// //       setDocumentsSettingsError(false);

// //       const response = await getDocumentsUploadSettings();
// //       if (!isMountedCheck()) return;

// //       // Shared endpoint response: { status: 1, data: { sectionTitle, sectionDesc, fields } }
// //       let data = response?.data;
// //       data = data?.data ?? data;
// //       data = data?.data ?? data;
// //       data = data?.documentsUpload ?? data;

// //       if (Array.isArray(data?.fields)) {
// //         setDocumentsUploadConfig({
// //           sectionTitle: data.sectionTitle || "Documents Uploaded",
// //           sectionDesc: data.sectionDesc || "Upload all relevant documents",
// //           fields: data.fields,
// //         });
// //       } else {
// //         setDocumentsUploadConfig({ fields: [] });
// //       }
// //     } catch (error) {
// //       console.error("Shared document settings fetch error:", error);
// //       if (isMountedCheck()) {
// //         setDocumentsUploadConfig(null);
// //         setDocumentsSettingsError(true);
// //       }
// //     } finally {
// //       if (isMountedCheck()) setDocumentsSettingsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     let isMounted = true;

// //     const fetchFormSettings = async () => {
// //       try {
// //         const shipmentResponse = await getShipmentFormSettings();
// //         if (!isMounted) return;

// //         let shipmentData = shipmentResponse?.data;
// //         shipmentData = shipmentData?.data ?? shipmentData;
// //         shipmentData = shipmentData?.data ?? shipmentData;

// //         if (shipmentData?.sections?.length) {
// //           setShipmentFormConfig(shipmentData.sections[0]);
// //         }
// //       } catch (error) {
// //         console.error("Shipment form settings fetch error:", error);
// //       }
// //     };

// //     fetchFormSettings();
// //     fetchDocumentsSettings(() => isMounted);

// //     return () => {
// //       isMounted = false;
// //     };
// //   }, []);


// //   const [formData, setFormData] = useState({
// //     // Step 1
// //     shipmentType: "",
// //     shipmentMode: "",
// //     shipmentPurpose: "",
// //     customerType: "Individual",
// //     exporter: {
// //       companyName: "",
// //       contactPerson: "",
// //     },
// //     customFields: {},

// //     // Step 2
// //     route: {
// //       originCountry: "",
// //       originCity: "",
// //       destinationCountry: "",
// //       destinationCity: "",
// //     },
// //     importer: {
// //       companyName: "",
// //       address: "",
// //     },
// //     incoterm: "",
// //     etd: "",
// //     eta: "",

// //     // Step 3
// //     cargo: {
// //       productName: "",
// //       productDescription: "",
// //       hsCode: "",
// //       hsCodeText: "",
// //       category: "",
// //       quantity: "",
// //       unit: "",
// //       weight: "",
// //       netWeight: "",
// //       grossWeight: "",
// //       volumetricWeight: "",
// //       packages: "",
// //       packingType: "",
// //       unNumber: "",
// //       packageMarks: "",
// //       isDangerous: false,
// //       isTemperatureControlled: false,
// //       isStackable: false,
// //       isFragile: false,
// //       hasBattery: false,
// //       isLithium: false,
// //       dimensions: {
// //         length: "",
// //         width: "",
// //         height: "",
// //         unit: "CM",
// //       },
// //     },
// //     amount: "",
// //     currency: "",
// //     paymentTerms: "",
// //     insuranceRequired: false,
// //     exportIncentive: false,
// //     additionalInformation: {
// //       packagingType: "",
// //       packages: 0,
// //       marksNumbers: "",
// //       dangerousGoods: false,
// //       specialHandling: false,
// //       temperatureControl: false,
// //     },
// //   });

// //   // Load the selected draft into the existing multi-step form.
// //   useEffect(() => {
// //     if (!editShipmentId) return;
// //     let active = true;
// //     (async () => {
// //       try {
// //         setLoading(true);
// //         const response = await getShipmentDetails(editShipmentId);
// //         const data = response?.data?.data || response?.data?.shipment || response?.data;
// //         const shipment = data?.shipment || data;
// //         if (!active || !shipment?._id) return;
// //         setShipmentId(shipment._id);
// //         setReferenceNumber(shipment.referenceNumber || shipment.sbNumber || "");
// //         setCurrentStatus(shipment.shipmentStatus || "Draft");
// //         // Restore previously uploaded files so draft attachments remain visible in edit mode.
// //         const savedDocuments = Array.isArray(shipment.documents) ? shipment.documents : [];
// //         setUploadedDocs(savedDocuments.reduce((acc, doc) => {
// //           const label = doc.documentName || doc.documentLabel || doc.name || "Document";
// //           const key = normalizeDocumentName(doc.documentKey || label);
// //           acc[key] = {
// //             ...doc,
// //             resolvedFileUrl: getShipmentDocumentUrl(doc.fileUrl || doc.url || doc.documentUrl || doc.path),
// //           };
// //           return acc;
// //         }, {}));
// //         setFormData((prev) => ({
// //           ...prev,
// //           ...shipment,
// //           exporter: { ...prev.exporter, ...(shipment.exporter || {}) },
// //           route: { ...prev.route, ...(shipment.route || {}) },
// //           importer: { ...prev.importer, ...(shipment.importer || {}) },
// //           cargo: { ...prev.cargo, ...(shipment.cargo || {}), dimensions: { ...prev.cargo.dimensions, ...(shipment.cargo?.dimensions || {}) } },
// //           additionalInformation: { ...prev.additionalInformation, ...(shipment.additionalInformation || {}) },
// //           customFields: shipment.customFields || {},
// //           amount: shipment.amount ?? shipment.cargo?.value ?? "",
// //           currency: shipment.currency || shipment.cargo?.currency || "",
// //           etd: shipment.etd ? String(shipment.etd).slice(0, 10) : "",
// //           eta: shipment.eta ? String(shipment.eta).slice(0, 10) : "",
// //         }));
// //       } catch (error) {
// //         console.error("Load draft for editing failed:", error);
// //         alert(error?.response?.data?.message || "Unable to load this draft.");
// //       } finally {
// //         if (active) setLoading(false);
// //       }
// //     })();
// //     return () => { active = false; };
// //   }, [editShipmentId]);

// //   const handleDirectChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleNestedChange = (parentKey, childKey, value) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [parentKey]: {
// //         ...prev[parentKey],
// //         [childKey]: value,
// //       },
// //     }));
// //   };

// //   const handleRadioChange = (name, value) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

 
// // const saveAllSteps = async () => {
// //   let currentId = shipmentId;

// //   const shipmentPayload = {
// //     shipmentType: formData.shipmentType,
// //     shipmentMode: formData.shipmentMode,
// //     shipmentPurpose: formData.shipmentPurpose,
// //     customerType: formData.customerType,

// //     exporter: {
// //       ...formData.exporter,
// //     },

// //     customFields: formData.customFields || {},

// //     currency: formData.currency || "INR",

// //     paymentTerms: formData.paymentTerms || "",

// //     amount: formData.amount === ""
// //       ? undefined
// //       : Number(formData.amount),

// //     insuranceRequired: Boolean(formData.insuranceRequired),
// //     exportIncentive: Boolean(formData.exportIncentive),
// //   };

// //   const step2Payload = {
// //     route: {
// //       ...formData.route,
// //       mode: formData.shipmentMode || "",
// //     },

// //     importer: {
// //       ...formData.importer,
// //     },

// //     shipmentMode: formData.shipmentMode,

// //     etd: formData.etd || null,
// //     eta: formData.eta || null,
// //     incoterm: formData.incoterm || "",
// //   };

// //   const step3Payload = {
// //     cargo: {
// //       ...formData.cargo,

// //       hsCode: formData.cargo.hsCode || null,
// //       hsCodeText: formData.cargo.hsCodeText || "",

// //       quantity: formData.cargo.quantity === ""
// //         ? undefined
// //         : Number(formData.cargo.quantity),

// //       weight: formData.cargo.weight === ""
// //         ? undefined
// //         : Number(formData.cargo.weight),

// //       netWeight: formData.cargo.netWeight === ""
// //         ? undefined
// //         : Number(formData.cargo.netWeight),

// //       grossWeight: formData.cargo.grossWeight === ""
// //         ? undefined
// //         : Number(formData.cargo.grossWeight),

// //       packages: formData.cargo.packages === ""
// //         ? undefined
// //         : Number(formData.cargo.packages),

// //       volumetricWeight: formData.cargo.volumetricWeight === ""
// //         ? undefined
// //         : Number(formData.cargo.volumetricWeight),

// //       dimensions: {
// //         ...formData.cargo.dimensions,
// //         length: formData.cargo.dimensions.length === ""
// //           ? undefined
// //           : Number(formData.cargo.dimensions.length),
// //         width: formData.cargo.dimensions.width === ""
// //           ? undefined
// //           : Number(formData.cargo.dimensions.width),
// //         height: formData.cargo.dimensions.height === ""
// //           ? undefined
// //           : Number(formData.cargo.dimensions.height),
// //       },
// //     },

// //     paymentTerms: formData.paymentTerms || "",
// //     insuranceRequired: Boolean(formData.insuranceRequired),
// //     exportIncentive: Boolean(formData.exportIncentive),
// //     additionalInformation: {
// //       ...formData.additionalInformation,
// //     },
// //   };

// //   if (!currentId) {
// //     const response = await createShipment(shipmentPayload);

// //     const data = response.data?.data || response.data;

// //     currentId = data._id;

// //     if (!currentId) {
// //       throw new Error("Shipment ID was not returned by server");
// //     }

// //     setShipmentId(currentId);

// //     if (data.referenceNumber) {
// //       setReferenceNumber(data.referenceNumber);
// //     }
// //   } else {
// //     await updateShipment(currentId, shipmentPayload);
// //   }

// //   await updateShipmentStep2(currentId, step2Payload);

// //   await updateShipmentStep3(currentId, step3Payload);

// //   return currentId;
// // };


// //   const handleSaveDraft = async () => {
// //     setLoading(true);
// //     try {
// //       const id = await saveAllSteps();
// //       await saveDraft(id);
// //       setCurrentStatus("Draft");
// //       alert("Draft saved successfully!");
// //     } catch (err) {
// //       console.error("Save Draft Error:", err);
// //       alert(err.response?.data?.message || "Failed to save draft.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAnalyze = async () => {
// //     setLoading(true);
// //     try {
// //       const id = await saveAllSteps();
// //       const res = await analyzeShipment(id);
// //       const data = res.data?.data || res.data;
// //       setAnalysis(data);
// //       setCurrentStatus("AI Analyzed");
// //       alert("Shipment analyzed successfully!");
// //     } catch (err) {
// //       console.error("Analyze Error:", err);
// //       alert(err.response?.data?.message || "Failed to analyze shipment.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Validate the complete shipment before allowing final submission.
// //   // Draft saving and document uploads remain available even when the form is incomplete.
// //   const validateShipmentBeforeSubmit = () => {
// //     const missing = [];
// //     const addRequired = (label, value) => {
// //       if (value === undefined || value === null || String(value).trim() === "") {
// //         missing.push(label);
// //       }
// //     };

// //     // Basic shipment details
// //     addRequired("Shipment Type", formData.shipmentType);
// //     addRequired("Shipment Mode", formData.shipmentMode);
// //     addRequired("Shipment Purpose", formData.shipmentPurpose);

// //     // Origin, destination and consignee
// //     addRequired("Origin Country", formData.route?.originCountry);
// //     addRequired("Origin City / Port / Airport", formData.route?.originCity);
// //     addRequired("Destination Country", formData.route?.destinationCountry);
// //     addRequired("Destination City / Port / Airport", formData.route?.destinationCity);
// //     addRequired("Consignee / Buyer Name", formData.importer?.companyName);
// //     addRequired("Consignee Address", formData.importer?.address);

// //     // Invoice and payment
// //     addRequired("Invoice Value", formData.amount);
// //     addRequired("Currency", formData.currency);
// //     addRequired("Payment Terms", formData.paymentTerms);
// //     if (formData.amount !== "" && (!Number.isFinite(Number(formData.amount)) || Number(formData.amount) <= 0)) {
// //       missing.push("Invoice Value must be greater than 0");
// //     }

// //     // Product and cargo details
// //     addRequired("Product Name", formData.cargo?.productName);
// //     addRequired("Product Description", formData.cargo?.productDescription);
// //     addRequired("Product Category", formData.cargo?.category);
// //     addRequired("Quantity", formData.cargo?.quantity);
// //     addRequired("Unit", formData.cargo?.unit);
// //     addRequired("Net Weight (Kg)", formData.cargo?.netWeight || formData.cargo?.weight);
// //     addRequired("Gross Weight (Kg)", formData.cargo?.grossWeight);
// //     addRequired("No. of Packages", formData.cargo?.packages);
// //     addRequired("Packing Type", formData.cargo?.packingType);
// //     addRequired("Package Length", formData.cargo?.dimensions?.length);
// //     addRequired("Package Width", formData.cargo?.dimensions?.width);
// //     addRequired("Package Height", formData.cargo?.dimensions?.height);

// //     // Only documents explicitly marked required in Admin document settings are mandatory.
// //     const requiredDocumentFields = (documentsUploadConfig?.fields || []).filter(
// //       (field) => field.enabled !== false && field.required === true
// //     );
// //     requiredDocumentFields.forEach((field, index) => {
// //       const key = normalizeDocumentName(field.key || field.label || `document-${index}`);
// //       const label = field.label || "Required document";
// //       if (!uploadedDocs[key]) {
// //         const matchingDocument = Object.values(uploadedDocs).some(
// //           (doc) => normalizeDocumentName(doc.documentName || doc.documentLabel || doc.name) === normalizeDocumentName(label)
// //         );
// //         if (!matchingDocument) missing.push(`${label} document`);
// //       }
// //     });

// //     return missing;
// //   };

// //   const handleSubmit = async () => {
// //     const missingFields = validateShipmentBeforeSubmit();
// //     if (missingFields.length > 0) {
// //       setValidationErrors(missingFields);
// //       setShowValidationModal(true);
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const id = await saveAllSteps();
// //       await submitShipment(id);
// //       setCurrentStatus("Submitted");
// //       alert("Shipment submitted to admin successfully!");
// //       if (onSaved) onSaved();
// //     } catch (err) {
// //       console.error("Submit Error:", err);
// //       alert(err.response?.data?.message || "Failed to submit shipment.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDocumentUpload = async (documentKey, documentName, file) => {
// //     try {
// //       const id = await saveAllSteps();

// //       const form = new FormData();
// //       form.append("shipmentId", id);
// //       // Keep the configured document label as documentType for compatibility
// //       // with the existing shipment document upload backend.
// //       form.append("documentType", documentName);
// //       form.append("documentKey", documentKey);
// //       form.append("required", true);
// //       form.append("file", file);

// //       const res = await uploadShipmentDocument(form);

// //       setUploadedDocs((prev) => ({
// //         ...prev,
// //         [documentKey]: {
// //           ...res.data.data,
// //           resolvedFileUrl: getShipmentDocumentUrl(res.data.data?.fileUrl),
// //         },
// //       }));

// //       alert("Uploaded Successfully");
// //     } catch (err) {
// //       console.log(err);
// //       alert(err.response?.data?.message || "Upload Failed");
// //     }
// //   };

// //   const handleDeleteDocument = async (documentKey, document) => {
// //     if (!document?._id) {
// //       alert("Document record ID is missing. Please refresh the shipment and try again.");
// //       return;
// //     }
// //     const confirmed = window.confirm("Are you sure you want to delete this uploaded document?");
// //     if (!confirmed) return;

// //     try {
// //       setDeletingDocumentKey(documentKey);
// //       await deleteShipmentDocument(shipmentId, document._id);
// //       setUploadedDocs((prev) => {
// //         const next = { ...prev };
// //         delete next[documentKey];
// //         return next;
// //       });
// //       if (previewDocument?._id === document._id) setPreviewDocument(null);
// //       alert("Document deleted successfully.");
// //     } catch (error) {
// //       console.error("Delete shipment document failed:", error);
// //       alert(error?.response?.data?.message || "Unable to delete document.");
// //     } finally {
// //       setDeletingDocumentKey("");
// //     }
// //   };

// //   const handlePreviewDocument = (document, title, url) => {
// //     setPreviewDocument({
// //       ...document,
// //       title,
// //       url: document.resolvedFileUrl || getShipmentDocumentUrl(
// //         document.fileUrl || document.url || document.documentUrl || document.path
// //       ) || url,
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen bg-slate-50/70 p-3 sm:p-6 lg:p-8 text-slate-800">
// //       <div className="max-w-[1520px] mx-auto">
// //         {/* TOP HEADER */}
// //         <Header
// //           setActiveTab={setActiveTab}
// //           setShipment={setShipment}
// //           handleSaveDraft={handleSaveDraft}
// //           handleAnalyze={handleAnalyze}
// //           handleSubmit={handleSubmit}
// //           loading={loading}
// //           currentTab={currentTab}
// //           currentStatus={currentStatus}
// //         />

// //         {/* FULL-WIDTH SHIPMENT FORM */}
// //         <div className="w-full">
// //           <div className="w-full space-y-6">
// //           <BasicShipmentDetails
// //   formData={formData}
// //   handleDirectChange={handleDirectChange}
// //   handleNestedChange={handleNestedChange}
// //   referenceNumber={referenceNumber}
// //   config={shipmentFormConfig}
// // />

// //             <OriginDestination
// //               formData={formData}
// //               handleDirectChange={handleDirectChange}
// //               handleNestedChange={handleNestedChange}
// //             />

// //             <InvoiceValue
// //               formData={formData}
// //               handleDirectChange={handleDirectChange}
// //               handleRadioChange={handleRadioChange}
// //             />

// //             <DocumentsUpload
// //               uploadedDocs={uploadedDocs}
// //               handleDocumentUpload={handleDocumentUpload}
// //               fileInputRef={fileInputRef}
// //               config={documentsUploadConfig}
// //               loading={documentsSettingsLoading}
// //               loadError={documentsSettingsError}
// //               onRetry={() => fetchDocumentsSettings()}
// //               onPreview={handlePreviewDocument}
// //               onDelete={handleDeleteDocument}
// //               deletingDocumentKey={deletingDocumentKey}
// //             />

// //             <AIOutputAnalysis analysis={analysis} />

// //             <ProductDetails
// //               formData={formData}
// //               handleNestedChange={handleNestedChange}
// //               handleRadioChange={handleRadioChange}
// //               analysis={analysis}
// //             />
// //           </div>
// //         </div>

// //         <ShipmentValidationModal
// //           errors={showValidationModal ? validationErrors : []}
// //           onClose={() => setShowValidationModal(false)}
// //         />

// //         <DocumentPreviewModal
// //           document={previewDocument}
// //           onClose={() => setPreviewDocument(null)}
// //         />

// //         {/* FOOTER */}
// //         <Footer />
// //       </div>
// //     </div>
// //   );
// // }


// // mahima code //

// const mongoose = require("mongoose");
// const Shipment = require("../models/Shipment");
// const ShipmentTracking = require("../models/ShipmentTracking");
// const ShipmentDocument = require("../models/ShipmentDocument");
// const ShipmentParty = require("../models/ShipmentParty");
// const ShipmentCost = require("../models/ShipmentCost");
// const Activity = require("../models/Activity");
// const Shipment = require("../");
// const B2BQuotation = require("../models/quotationModel");
// const TradeInvoice = require("../models/TradeInvoice");

// const {
//   shipmentStatusFlow,
//   canMoveToStatus
// } = require("../utils/shipmentStatusFlow");

// exports.saveStep1 = async (req, res) => {
//   try {

    
//     const {
//       exporter,
//       shipmentType,
//       shipmentMode,
//       shipmentPurpose,
//       customerType,
//       userId
//     } = req.body;

//     let shipmentUserId = req.user._id;
//     console.log("REQ USER:", req.user);
// console.log("REQ USER ID:", req.user._id);
// console.log("MAPPED USER ID:", req.user.mappedUserId);
// console.log("SHIPMENT USER ID:", shipmentUserId); 

// // Agar admin nahi hai aur kisi mapped user ke liye shipment create kar raha hai
// if (userId) {

//   // Admin kisi ke liye bhi create kar sakta hai
//   if (req.user.roleName === "admin") {
//     shipmentUserId = userId;
//   }

//   // Other users sirf mapped users ke liye create kar sakte hain
//   else {

//     const hasAccess = (req.user.allowedUserIds || []).some(
//       id => id.toString() === userId.toString()
//     );
  
//     if (!hasAccess) {
//       return res.status(403).json({
//         status: 0,
//         message: "You are not authorized to create a shipment for this user"
//       });
//     }
  
//     shipmentUserId = userId;
//   }
// }

//     const referenceNumber = `REF-${Date.now()}`;
//     const sbNumber = `SB-${Date.now()}`;

//     const shipment = await Shipment.create({

//       userId: shipmentUserId,

//       createdByRole: req.user.role,

//       customerType: customerType || "Individual",

//       shipmentType,

//       shipmentMode,

//       shipmentPurpose,

//       exporter,

//       referenceNumber,

//       sbNumber,

//       shipmentStatus: "Draft",

//       approvalStatus: "Pending",

//       documentStatus: "Pending",

//       trackingStatus: "Not Started",

//       paymentStatus: "Pending",

//       exceptionStatus: "None",

//       currentStep: 2

//     });
//     await Activity.create({

//       userId: req.user._id,

//       shipmentId: shipment._id,

//       type: "SHIPMENT_CREATED",

//       message: `Shipment ${shipment.referenceNumber} created successfully.`,

//       meta: {
//         createdByRole: req.user.role,
//         shipmentStatus: shipment.shipmentStatus
//       }

//     });

//     return res.status(201).json({
//       status: 1,
//       message: "Shipment created successfully.",
//       data: shipment
//     });

//   } catch (error) {

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });

//   }
// };

// const Setting = require("../models/Setting");

// exports.saveStep2 = async (req, res) => {
//   try {
//     console.log("========== STEP 2 DEBUG ==========");

//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     console.log("PARAM ID:", req.params.id);
//     console.log("REQ USER ID:", req.user._id);
//     console.log("MAPPED USER ID:", mappedUserId);

//     // 1. Find shipment
//     const shipmentById = await Shipment.findById(req.params.id);

//     if (!shipmentById) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment ID does not exist"
//       });
//     }

//     // 2. Fetch shipment mode options from Settings
//     const settings = await Setting.findOne({
//       userId: req.user._id
//     }).lean();

//     const modeField = settings?.shipmentForm?.sections
//       ?.flatMap(section => section.fields || [])
//       .find(field => field.key === "shipmentMode");

//     const allowedModes = modeField?.useDropdown
//       ? (modeField.options || [])
//       : [];

//     // 3. Get requested mode
//     const requestedMode =
//       req.body.route?.mode ||
//       req.body.shipmentMode ||
//       "";

//     // 4. Validate mode dynamically
//     if (
//       requestedMode &&
//       modeField?.useDropdown &&
//       !allowedModes.includes(requestedMode)
//     ) {
//       return res.status(400).json({
//         status: 0,
//         message: `Invalid shipment mode. Allowed values: ${allowedModes.join(", ")}`
//       });
//     }

//     // 5. Prepare route data
//     const routeData = {
//       ...(req.body.route || {})
//     };

//     if (requestedMode) {
//       routeData.mode = requestedMode;
//     } else {
//       // Don't save empty string in route.mode
//       delete routeData.mode;
//     }

//     // 6. Update shipment
//     const shipment = await Shipment.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         ...(req.user.roleName === "admin"
//           ? {}
//           : { userId: mappedUserId })
//       },
//       {
//         $set: {
//           route: {
//             ...shipmentById.route?.toObject?.() || shipmentById.route || {},
//             ...routeData
//           },

//           importer: req.body.importer,
//           bookingNo: req.body.bookingNo,
//           eta: req.body.eta,
//           etd: req.body.etd,
//           incoterm: req.body.incoterm,

//           shipmentMode: requestedMode || shipmentById.shipmentMode || "",

//           currentStep: 3
//         }
//       },
//       {
//         new: true,
//         runValidators: true
//       }
//     );

//     console.log("UPDATED SHIPMENT:", shipment);

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found or access denied"
//       });
//     }

//     return res.json({
//       status: 1,
//       message: "Step 2 completed.",
//       data: shipment
//     });

//   } catch (error) {
//     console.log("STEP 2 ERROR:", error);

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });
//   }
// };
  
// exports.saveStep3 = async (req, res) => {
//   try {
//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     const query =
//       req.user.roleName === "admin"
//         ? { _id: req.params.id }
//         : {
//             _id: req.params.id,
//             userId: mappedUserId
//           };

//     // Copy cargo data before modifying it. Older shipments may have the
//     // invoice amount only at the shipment root, so use it as a fallback.
//     const cargoData = { ...(req.body.cargo || {}) };
//     const invoiceValue =
//       cargoData.value !== undefined && cargoData.value !== null && cargoData.value !== ""
//         ? Number(cargoData.value)
//         : req.body.amount !== undefined && req.body.amount !== null && req.body.amount !== ""
//           ? Number(req.body.amount)
//           : undefined;

//     const cargoCurrency =
//       cargoData.currency || req.body.currency || "INR";

//     if (invoiceValue !== undefined && Number.isFinite(invoiceValue)) {
//       cargoData.value = invoiceValue;
//     }
//     cargoData.currency = cargoCurrency;

//     // Handle HS Code safely
//     if (cargoData.hsCode !== undefined) {
//       const hsCodeValue = cargoData.hsCode;

//       if (
//         hsCodeValue &&
//         mongoose.Types.ObjectId.isValid(hsCodeValue)
//       ) {
//         // Existing HS Master Data reference
//         cargoData.hsCode = hsCodeValue;
//       } else {
//         // Manually entered HS Code
//         cargoData.hsCodeText = String(hsCodeValue || "");
//         delete cargoData.hsCode;
//       }
//     }

//     const shipment = await Shipment.findOneAndUpdate(
//       query,
//       {
//         cargo: cargoData,
//         amount: invoiceValue !== undefined ? invoiceValue : req.body.amount,
//         paymentTerms: req.body.paymentTerms,
//         insuranceRequired: req.body.insuranceRequired,
//         additionalInformation: req.body.additionalInformation,
//         exportIncentive: req.body.exportIncentive,
//         currentStep: 4
//       },
//       {
//         new: true,
//         runValidators: true
//       }
//     );

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found or access denied"
//       });
//     }

//     await Activity.create({
//       userId: req.user._id,
//       shipmentId: shipment._id,
//       type: "SHIPMENT_UPDATED",
//       message: "Cargo & Invoice details updated.",
//       meta: { step: 3 }
//     });

//     return res.json({
//       status: 1,
//       message: "Step 3 completed.",
//       data: shipment
//     });

//   } catch (error) {
//     console.log("STEP 3 ERROR:", error);

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });
//   }
// };


// exports.saveDraft = async (req, res) => {
//   try {

//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     const query =
//       req.user.roleName === "admin"
//         ? {
//             _id: req.params.id
//           }
//         : {
//             _id: req.params.id,
//             userId: mappedUserId
//           };

//     const shipment = await Shipment.findOneAndUpdate(
//       query,

//       {
//         shipmentStatus: "Draft",
//         lastStatusUpdatedAt: new Date()
//       },

//       {
//         new: true
//       }
//     );

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found or access denied"
//       });
//     }

//     await Activity.create({
//       userId: req.user._id,
//       shipmentId: shipment._id,
//       type: "SHIPMENT_UPDATED",
//       message: "Shipment saved as draft.",
//       meta: {
//         shipmentStatus: shipment.shipmentStatus
//       }
//     });

//     return res.json({
//       status: 1,
//       message: "Draft saved successfully.",
//       data: shipment
//     });

//   } catch (error) {

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });

//   }
// };

// exports.analyzeShipment = async (req, res) => {
//   try {

//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     const query =
//       req.user.roleName === "admin"
//         ? {
//             _id: req.params.id
//           }
//         : {
//             _id: req.params.id,
//             userId: mappedUserId
//           };

//     const shipment = await Shipment.findOne(query)
//       .populate("cargo.hsCode");

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found or access denied"
//       });
//     }

//     await Activity.create({
//       userId: req.user._id,

//       shipmentId: shipment._id,

//       type: "AI_QUERY",

//       message: "Shipment analyzed by AI.",

//       meta: {}
//     });

//     return res.json({
//       status: 1,
//       message: "Shipment analyzed successfully.",

//       data: {
//         riskLevel: "Low",

//         freightEstimate:
//           shipment.amount || 0,

//         estimatedTransit:
//           shipment.transitTime || "7-10 Days",

//         requiredDocuments: [
//           "Commercial Invoice",
//           "Packing List",
//           "Bill of Lading"
//         ]
//       }
//     });

//   } catch (error) {

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });

//   }
// };  

// exports.submitShipment = async (req, res) => {
//   try {

//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     const query =
//       req.user.roleName === "admin"
//         ? {
//             _id: req.params.id
//           }
//         : {
//             _id: req.params.id,
//             userId: mappedUserId
//           };

//     const shipment = await Shipment.findOne(query);

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found or access denied"
//       });
//     }

//     if (!canMoveToStatus(
//       shipment.shipmentStatus,
//       "Submitted"
//     )) {
//       return res.status(400).json({
//         status: 0,
//         message: `Shipment cannot move from "${shipment.shipmentStatus}" to "Submitted"`
//       });
//     }

//     shipment.shipmentStatus = "Submitted";
//     shipment.approvalStatus = "Pending";
//     shipment.currentStep = 5;
//     shipment.lastStatusUpdatedAt = new Date();

//     shipment.statusHistory.push({
//       status: "Submitted",
//       updatedBy: req.user._id,
//       remarks: "Shipment submitted for approval"
//     });

//     await shipment.save();

//     await Activity.create({
//       userId: req.user._id,

//       shipmentId: shipment._id,

//       type: "SHIPMENT_SUBMITTED",

//       message: "Shipment submitted for admin approval.",

//       meta: {
//         approvalStatus: "Pending"
//       }
//     });

//     return res.json({
//       status: 1,
//       message: "Shipment submitted successfully.",
//       data: shipment
//     });

//   } catch (error) {

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });

//   }
// };

// exports.approveShipment = async (req, res) => {
//   try {


  
//     const mappedUserId =
//     req.user.mappedUserId || req.user._id;
  
//   const query =
//     req.user.roleName === "admin"
//       ? { _id: req.params.id }
//       : {
//           _id: req.params.id,
//           userId: mappedUserId
//         };
  
//   const shipment = await Shipment.findOne(query);

//   if (!shipment) {
//     return res.status(404).json({
//       status: 0,
//       message: "Shipment not found or access denied"
//     });
//   } 

//     shipment.approvalStatus = "Approved";
//     if (!canMoveToStatus(shipment.shipmentStatus, "Approved")) {
//       return res.status(400).json({
//         status: 0,
//         message: `Shipment cannot move from "${shipment.shipmentStatus}" to "Approved"`
//       });
//     }
    
//     shipment.shipmentStatus = "Approved";
//     shipment.approvedAt = new Date();
//     shipment.lastStatusUpdatedAt = new Date();

//     shipment.statusHistory.push({
//       status: "Approved",
//       updatedBy: req.user._id,
//       remarks: "Shipment approved"
//     });

//     await shipment.save();

//     await Activity.create({
//       userId: req.user._id,
//       shipmentId: shipment._id,
//       type: "SHIPMENT_APPROVED",
//       message: "Shipment approved by admin.",
//       meta: {
//         approvedBy: req.user._id
//       }
//     });

//     return res.json({
//       status: 1,
//       message: "Shipment approved successfully.",
//       data: shipment
//     });

//   } catch (err) {

//     return res.status(500).json({
//       status: 0,
//       message: err.message
//     });

//   }
// };

// exports.rejectShipment = async (req, res) => {

//   try {

//     const mappedUserId =
//     req.user.mappedUserId || req.user._id;
  
//   const query =
//     req.user.roleName === "admin"
//       ? { _id: req.params.id }
//       : {
//           _id: req.params.id,
//           userId: mappedUserId
//         };
  
//   const shipment = await Shipment.findOne(query); 

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found"
//       });
//     }

//     shipment.approvalStatus = "Rejected";

//     shipment.lastStatusUpdatedAt = new Date();
//     shipment.statusHistory.push({
//       status: shipment.shipmentStatus,
//       updatedBy: req.user._id,
//       remarks: req.body.reason || "Shipment rejected by admin"
//     });
    
//     await shipment.save();


//     await Activity.create({
//       userId: req.user._id,
//       shipmentId: shipment._id,
//       type: "SHIPMENT_REJECTED",
//       message: "Shipment rejected by admin.",
//       meta: {
//         reason: req.body.reason || "",
//         rejectedBy: req.user._id
//       }
//     });

//     return res.json({
//       status: 1,
//       message: "Shipment rejected successfully.",
//       data: shipment
//     });

//   } catch (err) {

//     return res.status(500).json({
//       status: 0,
//       message: err.message
//     });

//   }

// };

// exports.holdShipment = async (req, res) => {

//   try {

//     const mappedUserId =
//   req.user.mappedUserId || req.user._id;

// const query =
//   req.user.roleName === "admin"
//     ? { _id: req.params.id }
//     : {
//         _id: req.params.id,
//         userId: mappedUserId
//       };

// const shipment = await Shipment.findOne(query);

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found"
//       });
//     }

//     shipment.approvalStatus = "Correction Required";

//     shipment.exceptionStatus = "On Hold";
    
//     shipment.lastStatusUpdatedAt = new Date();
    
//     shipment.statusHistory.push({
//       status: shipment.shipmentStatus,
//       updatedBy: req.user._id,
//       remarks: req.body.reason || "Shipment placed on hold"
//     });

//     shipment.lastStatusUpdatedAt = new Date();

    

//     await shipment.save();

//     await Activity.create({
//       userId: req.user._id,
//       shipmentId: shipment._id,
//       type: "SHIPMENT_ON_HOLD",
//       message: "Shipment put on hold.",
//       meta: {
//         reason: req.body.reason || "",
//         holdBy: req.user._id
//       }
//     });

//     return res.json({
//       status: 1,
//       message: "Shipment placed on hold.",
//       data: shipment
//     });

//   } catch (err) {

//     return res.status(500).json({
//       status: 0,
//       message: err.message
//     });

//   }

// };

// exports.getAllShipmentsForAdmin = async (req, res) => {
//   try {
//     const {
//       page = 1,
//       limit = 100,
//       search,
//       shipmentStatus,
//       approvalStatus,
//       shipmentMode,
//       shipmentType,
//     } = req.query;

//     const query = {};

//     // =========================
//     // ROLE BASED FILTER
//     // =========================

//     if (req.user?.roleName !== "admin") {
//       const mappedUserId =
//         req.user?.mappedUserId || req.user?._id;

//       query.userId = mappedUserId;
//     }

//     // =========================
//     // SEARCH
//     // =========================

//     if (search) {
//       query.$or = [
//         {
//           referenceNumber: {
//             $regex: search,
//             $options: "i",
//           },
//         },
//         {
//           sbNumber: {
//             $regex: search,
//             $options: "i",
//           },
//         },
//         {
//           "exporter.companyName": {
//             $regex: search,
//             $options: "i",
//           },
//         },
//       ];
//     }

//     if (shipmentStatus) {
//       query.shipmentStatus = shipmentStatus;
//     }

//     if (approvalStatus) {
//       query.approvalStatus = approvalStatus;
//     }

//     if (shipmentMode) {
//       query["route.mode"] = shipmentMode;
//     }

//     if (shipmentType) {
//       query.shipmentType = shipmentType;
//     }

//     const total = await Shipment.countDocuments(query);

//     const shipments = await Shipment.find(query)
//       .populate("userId", "name email role")
//       .sort({ createdAt: -1 })
//       .skip((Number(page) - 1) * Number(limit))
//       .limit(Number(limit))
//       .lean();

//     // =========================================
//     // GET QUOTATIONS + INVOICES FOR SHIPMENTS
//     // =========================================

//     const shipmentIds = shipments.map(
//       (shipment) => shipment._id
//     );

//     const quotations = await B2BQuotation.find({
//       shipmentId: {
//         $in: shipmentIds,
//       },
//     })
//       .sort({ createdAt: -1 })
//       .lean();

//     const invoices = await TradeInvoice.find({
//       shipment: {
//         $in: shipmentIds,
//       },
//     })
//       .sort({ createdAt: -1 })
//       .lean();

//     // =========================================
//     // MAP LATEST QUOTATION
//     // =========================================

//     const quotationMap = new Map();

//     quotations.forEach((quotation) => {
//       const shipmentId = quotation.shipmentId.toString();

//       // sorted latest first
//       if (!quotationMap.has(shipmentId)) {
//         quotationMap.set(shipmentId, quotation);
//       }
//     });

//     // =========================================
//     // MAP LATEST INVOICE
//     // =========================================

//     const invoiceMap = new Map();

//     invoices.forEach((invoice) => {
//       const shipmentId = invoice.shipment.toString();

//       // sorted latest first
//       if (!invoiceMap.has(shipmentId)) {
//         invoiceMap.set(shipmentId, invoice);
//       }
//     });

//     // =========================================
//     // CREATE DYNAMIC WORKFLOW STATUS
//     // =========================================

//     const shipmentData = shipments.map((shipment) => {
//       const shipmentId = shipment._id.toString();

//       const quotation =
//         quotationMap.get(shipmentId);

//       const invoice =
//         invoiceMap.get(shipmentId);

//       let workflowStatus = "Pending Review";

//       // -----------------------------
//       // SHIPMENT REJECTED
//       // -----------------------------

//       if (shipment.approvalStatus === "Rejected") {
//         workflowStatus = "Rejected";
//       }

//       // -----------------------------
//       // CORRECTION REQUIRED
//       // -----------------------------

//       else if (
//         shipment.approvalStatus ===
//         "Correction Required"
//       ) {
//         workflowStatus = "Correction Required";
//       }

//       // -----------------------------
//       // PENDING ADMIN REVIEW
//       // -----------------------------

//       else if (
//         shipment.approvalStatus === "Pending"
//       ) {
//         workflowStatus = "Pending Review";
//       }

//       // -----------------------------
//       // APPROVED
//       // -----------------------------

//       else if (
//         shipment.approvalStatus === "Approved"
//       ) {
//         workflowStatus = "Approved";
//       }

//       // =================================
//       // QUOTATION STATUS
//       // =================================

//       if (quotation) {
//         if (quotation.status === "Draft") {
//           workflowStatus = "Quotation Draft";
//         }

//         if (quotation.status === "Shared") {
//           workflowStatus = "Quotation Sent";
//         }

//         if (quotation.status === "Accepted") {
//           workflowStatus =
//             "Quotation Accepted";
//         }

//         if (quotation.status === "Rejected") {
//           workflowStatus =
//             "Quotation Rejected";
//         }

//         if (quotation.status === "Expired") {
//           workflowStatus =
//             "Quotation Expired";
//         }
//       }

//       // =================================
//       // INVOICE STATUS
//       // INVOICE HAS HIGHER PRIORITY
//       // =================================

//       if (invoice) {
//         if (invoice.status === "Pending") {
//           workflowStatus = "Invoice Generated";
//         }

//         if (invoice.status === "Paid") {
//           workflowStatus = "Invoice Paid";
//         }

//         if (invoice.status === "Overdue") {
//           workflowStatus = "Invoice Overdue";
//         }

//         if (invoice.status === "Cancelled") {
//           workflowStatus =
//             "Invoice Cancelled";
//         }
//       }

//       return {
//         ...shipment,

//         workflowStatus,

//         quotation: quotation
//           ? {
//               _id: quotation._id,
//               quotationNumber:
//                 quotation.quotationNumber,
//               status: quotation.status,
//               totalAmount:
//                 quotation.totalAmount,
//               currency:
//                 quotation.currency,
//             }
//           : null,

//         invoice: invoice
//           ? {
//               _id: invoice._id,
//               invoiceNumber:
//                 invoice.invoiceNumber,
//               status: invoice.status,
//               totalAmount:
//                 invoice.totalAmount,
//               invoiceValue:
//                 invoice.invoiceValue,
//             }
//           : null,
//       };
//     });

//     // =========================================
//     // DYNAMIC STATS
//     // =========================================

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const stats = {
//       total: shipmentData.length,
//       pendingReview: 0,
//       newToday: 0,
//       quotationSent: 0,
//       quotationAccepted: 0,
//       invoiceGenerated: 0,
//       invoicePaid: 0,
//     };

//     shipmentData.forEach((shipment) => {
//       if (shipment.workflowStatus === "Pending Review") {
//         stats.pendingReview++;
//       }

//       if (
//         shipment.workflowStatus === "Quotation Sent"
//       ) {
//         stats.quotationSent++;
//       }

//       if (
//         shipment.workflowStatus ===
//         "Quotation Accepted"
//       ) {
//         stats.quotationAccepted++;
//       }

//       if (
//         shipment.workflowStatus ===
//         "Invoice Generated"
//       ) {
//         stats.invoiceGenerated++;
//       }

//       if (
//         shipment.workflowStatus ===
//         "Invoice Paid"
//       ) {
//         stats.invoicePaid++;
//       }

//       const createdDate = new Date(
//         shipment.createdAt
//       );
//       createdDate.setHours(0, 0, 0, 0);

//       if (
//         createdDate.getTime() ===
//         today.getTime()
//       ) {
//         stats.newToday++;
//       }
//     });

//     return res.json({
//       status: 1,

//       total,

//       page: Number(page),

//       totalPages: Math.ceil(
//         total / Number(limit)
//       ),

//       stats,

//       data: shipmentData,
//     });
//   } catch (err) {
//     console.error(
//       "GET ALL SHIPMENTS ERROR:",
//       err
//     );

//     return res.status(500).json({
//       status: 0,
//       message: err.message,
//     });
//   }
// };

// exports.assignCarrier = async (req, res) => {
//   try {

//     const {
//       name,
//       code,
//       contactPerson,
//       mobile,
//       email
//     } = req.body;

//     const mappedUserId =
//     req.user.mappedUserId || req.user._id;
  
//   const query =
//     req.user.roleName === "admin"
//       ? { _id: req.params.id }
//       : {
//           _id: req.params.id,
//           userId: mappedUserId
//         };
  
//   const shipment = await Shipment.findOne(query);

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found"
//       });
//     }

//     shipment.carrier = {
//       name,
//       code,
//       contactPerson,
//       mobile,
//       email
//     };

//     shipment.assignedCarrierAt = new Date();
//     shipment.assignedBy = req.user._id;

//     if (!canMoveToStatus(shipment.shipmentStatus, "Carrier Assigned")) {
//       return res.status(400).json({
//         status: 0,
//         message: `Shipment cannot move from "${shipment.shipmentStatus}" to "Carrier Assigned"`
//       });
//     }
    
//     shipment.shipmentStatus = "Carrier Assigned";
//     shipment.lastStatusUpdatedAt = new Date();
//     shipment.statusHistory.push({
//       status: "Carrier Assigned",
//       updatedBy: req.user._id,
//       remarks: "Carrier assigned"
//     });

//     await shipment.save();

//     await Activity.create({

//       userId: req.user._id,

//       shipmentId: shipment._id,

//       type: "SHIPMENT_STATUS_CHANGED",

//       message: "Carrier assigned successfully.",

//       meta: {
//         carrier: shipment.carrier
//       }

//     });

//     return res.json({

//       status: 1,

//       message: "Carrier assigned successfully.",

//       data: shipment

//     });

//   } catch (err) {

//     return res.status(500).json({
//       status: 0,
//       message: err.message
//     });

//   }
// };

// exports.uploadDocs = async (req, res) => {
//   try {

//     const { shipmentId, documentType, required } = req.body;

//     if (!req.file) {
//       return res.status(400).json({
//         status: 0,
//         message: "Please upload a file."
//       });
//     }

//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     const query =
//       req.user.roleName === "admin"
//         ? {
//             _id: shipmentId
//           }
//         : {
//             _id: shipmentId,
//             userId: mappedUserId
//           };

//     const shipment = await Shipment.findOne(query);

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found or access denied."
//       });
//     }

//     const document = await ShipmentDocument.create({
//       shipmentId: shipment._id,

//       documentName: documentType,

//       documentType:
//         required === "true"
//           ? "Required"
//           : "If Applicable",

//       status: "Uploaded",

//       fileUrl: `/uploads/documents/${req.file.filename}`,

//       fileName: req.file.originalname,

//       fileSize: req.file.size.toString(),

//       uploadedBy: req.user._id,

//       required: required === "true"
//     });

//     await Activity.create({
//       userId: req.user._id,
//       shipmentId: shipment._id,
//       type: "DOCUMENT_UPLOADED",
//       message: `${documentType} uploaded successfully.`
//     });

//     return res.status(200).json({
//       status: 1,
//       message: "Document uploaded successfully.",
//       data: document
//     });

//   } catch (err) {

//     return res.status(500).json({
//       status: 0,
//       message: err.message
//     });

//   }
// };

// const getMappedUserId = (req) => {
//   return req.user.mappedUserId || req.user._id;
// };

// exports.getShipments = async (req, res) => {
//   try {
//     const { status, mode, search } = req.query;

//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     let query =
//       req.user.roleName === "admin"
//         ? {}
//         : {
//             userId: mappedUserId
//           };

//     if (status) {
//       query.shipmentStatus = status;
//     }

//     if (mode) {
//       query.$or = [
//         { shipmentMode: mode },
//         { transportMode: mode },
//         { "route.mode": mode }
//       ];
//     }

//     if (search) {
//       query.$or = [
//         {
//           sbNumber: {
//             $regex: search,
//             $options: "i"
//           }
//         },
//         {
//           referenceNumber: {
//             $regex: search,
//             $options: "i"
//           }
//         },
//         {
//           "exporter.companyName": {
//             $regex: search,
//             $options: "i"
//           }
//         },
//         {
//           "importer.companyName": {
//             $regex: search,
//             $options: "i"
//           }
//         }
//       ];
//     }

//     const shipments = await Shipment.find(query)
//       .populate("cargo.hsCode")
//       .populate("userId", "name email role")
//       .sort({ createdAt: -1 });

//     // SAFE NORMALIZED RESPONSE
//     const data = shipments.map((shipment) => {

//       const shipmentObj = shipment.toObject();

//       return {
//         ...shipmentObj,

//         // MODE
//         shipmentMode:
//           shipmentObj.shipmentMode ||
//           shipmentObj.transportMode ||
//           shipmentObj.route?.mode ||
//           "-",

//         // SAFE ROUTE
//         route: {
//           ...(shipmentObj.route || {}),

//           originCountry:
//             shipmentObj.route?.originCountry ||
//             shipmentObj.originCountry ||
//             "-",

//           originCity:
//             shipmentObj.route?.originCity ||
//             shipmentObj.originCity ||
//             "-",

//           destinationCountry:
//             shipmentObj.route?.destinationCountry ||
//             shipmentObj.destinationCountry ||
//             "-",

//           destinationCity:
//             shipmentObj.route?.destinationCity ||
//             shipmentObj.destinationCity ||
//             "-",

//           mode:
//             shipmentObj.route?.mode ||
//             shipmentObj.shipmentMode ||
//             shipmentObj.transportMode ||
//             "-"
//         },

//         // SAFE EXPORTER
//         exporter: {
//           ...(shipmentObj.exporter || {}),
//           companyName:
//             shipmentObj.exporter?.companyName ||
//             shipmentObj.exporter?.name ||
//             "-"
//         },

//         // SAFE IMPORTER
//         importer: {
//           ...(shipmentObj.importer || {}),
//           companyName:
//             shipmentObj.importer?.companyName ||
//             shipmentObj.importer?.name ||
//             "-"
//         },

//         // SAFE CARGO: keep manually entered HS Code and all cargo measurements.
//         cargo: {
//           ...(shipmentObj.cargo || {}),
//           hsCode: shipmentObj.cargo?.hsCode || null,
//           hsCodeText: shipmentObj.cargo?.hsCodeText || "",
//           quantity: shipmentObj.cargo?.quantity ?? 0,
//           weight: shipmentObj.cargo?.weight ?? shipmentObj.weight ?? 0,
//           grossWeight: shipmentObj.cargo?.grossWeight ?? shipmentObj.grossWeight ?? 0,
//           netWeight: shipmentObj.cargo?.netWeight ?? shipmentObj.netWeight ?? 0,
//           volumetricWeight: shipmentObj.cargo?.volumetricWeight ?? shipmentObj.volumetricWeight ?? 0,
//           volumeCBM: shipmentObj.cargo?.volumeCBM ?? shipmentObj.totalVolume ?? 0,
//           value: shipmentObj.cargo?.value ?? shipmentObj.value ?? shipmentObj.invoice?.invoiceValue ?? 0,
//           currency: shipmentObj.cargo?.currency || shipmentObj.currency || shipmentObj.invoice?.currency || "INR"
//         }
//       };
//     });

//     return res.json({
//       status: 1,
//       total: data.length,
//       data
//     });

//   } catch (error) {

//     console.error("GET SHIPMENTS ERROR:", error);

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });
//   }
// };

// exports.getStats = async (req, res) => {
//   try {

//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     // Admin ke liye saare shipments
//     const baseQuery =
//       req.user.roleName === "admin"
//         ? {}
//         : { userId: mappedUserId };


//     const total = await Shipment.countDocuments(
//       baseQuery
//     );

//     const inTransit = await Shipment.countDocuments({
//       ...baseQuery,
//       shipmentStatus: "In Transit"
//     });

//     const delivered = await Shipment.countDocuments({
//       ...baseQuery,
//       shipmentStatus: "Delivered"
//     });

//     const pendingDocs = await Shipment.countDocuments({
//       ...baseQuery,
//       documentStatus: "Pending"
//     });

//     const customHold = await Shipment.countDocuments({
//       ...baseQuery,
//       exceptionStatus: "On Hold"
//     });


//     const revenueAgg = await Shipment.aggregate([
//       {
//         $match: baseQuery
//       },
//       {
//         $group: {
//           _id: null,
//           total: {
//             $sum: "$revenue"
//           }
//         }
//       }
//     ]);


//     return res.json({
//       status: 1,
//       data: {
//         total,
//         inTransit,
//         delivered,
//         pendingDocs,
//         customHold,
//         revenue: revenueAgg[0]?.total || 0
//       }
//     });

//   } catch (error) {

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });

//   }
// };

// exports.updateShipmentStatus = async (req, res) => {
//   try {

//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     const query =
//       req.user.roleName === "admin"
//         ? {
//             _id: req.params.id
//           }
//         : {
//             _id: req.params.id,
//             userId: mappedUserId
//           };

//     const shipment = await Shipment.findOne(query);

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found or access denied"
//       });
//     }

//     const currentStatus = shipment.shipmentStatus;
//     const nextStatus = req.body.status;

//     if (!canMoveToStatus(currentStatus, nextStatus)) {
//       return res.status(400).json({
//         status: 0,
//         message: `Invalid transition from ${currentStatus} to ${nextStatus}`
//       });
//     }

//     if (
//       nextStatus === "Approved" &&
//       req.user.roleName !== "admin"
//     ) {
//       return res.status(403).json({
//         status: 0,
//         message: "Only admin can approve shipments."
//       });
//     }

//     shipment.shipmentStatus = nextStatus;
//     shipment.lastStatusUpdatedAt = new Date();

//     shipment.statusHistory.push({
//       status: nextStatus,
//       updatedBy: req.user._id,
//       remarks: `Status changed from ${currentStatus} to ${nextStatus}`
//     });

//     await shipment.save();

//     await Activity.create({
//       userId: req.user._id,
//       shipmentId: shipment._id,
//       type: "SHIPMENT_STATUS_CHANGED",
//       message: `Shipment moved from ${currentStatus} to ${nextStatus}`,
//       meta: {
//         from: currentStatus,
//         to: nextStatus
//       }
//     });

//     return res.json({
//       status: 1,
//       message: "Shipment status updated.",
//       data: shipment
//     });

//   } catch (err) {

//     return res.status(500).json({
//       status: 0,
//       message: err.message
//     });

//   }
// };

// exports.getShipmentDetails = async (req, res) => {
//   try {
//     const shipment = await Shipment.findById(req.params.id)
//   .populate("cargo.hsCode", "hsCode")
//   .populate(
//     "userId",
//     "name email phone companyName address country city gstNumber importExportId businessType accountType profileImage"
//   );

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found"
//       });
//     }

//     // Admin can access all shipments
//     if (req.user.roleName !== "admin") {
//       const isOwner =
//         shipment.userId.toString() === req.user._id.toString();

//       const hasMappedAccess = (req.user.allowedUserIds || []).some(
//         id => id.toString() === shipment.userId.toString()
//       );

//       if (!isOwner && !hasMappedAccess) {
//         return res.status(403).json({
//           status: 0,
//           message: "Access denied"
//         });
//       }
//     }

//     // =========================
//     // FETCH SHIPMENT DOCUMENTS
//     // =========================
//     const documents = await ShipmentDocument.find({
//       shipmentId: shipment._id
//     }).sort({ createdAt: -1 });

//     // Shipment ko plain object banao
//     const shipmentData = shipment.toObject();

//     // Keep manually entered HS Code and cargo measurements available to CargoDetails.
//     shipmentData.cargo = {
//       ...(shipmentData.cargo || {}),
//       hsCodeText: shipmentData.cargo?.hsCodeText || "",
//       weight: shipmentData.cargo?.weight ?? "",
//       grossWeight: shipmentData.cargo?.grossWeight ?? "",
//       netWeight: shipmentData.cargo?.netWeight ?? "",
//       volumetricWeight: shipmentData.cargo?.volumetricWeight ?? "",
//       volumeCBM: shipmentData.cargo?.volumeCBM ?? shipmentData.totalVolume ?? "",
//       value: shipmentData.cargo?.value ?? shipmentData.invoice?.invoiceValue ?? "",
//       currency: shipmentData.cargo?.currency || shipmentData.currency || "INR"
//     };

//     // Documents attach karo
//     shipmentData.documents = documents;

//     return res.json({
//       status: 1,
//       message: "Shipment details fetched successfully",
//       data: shipmentData
//     });

//   } catch (error) {
//     console.error("GET SHIPMENT DETAILS ERROR:", error);

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });
//   }
// };



//   exports.getShipmentTracking = async (req, res) => {
//     try {
  
//       const shipmentId = req.params.id;

//       const mappedUserId =
//         req.user.mappedUserId || req.user._id;
  
//       const query =
//         req.user.roleName === "admin"
//           ? {
//               _id: shipmentId
//             }
//           : {
//               _id: shipmentId,
//               userId: mappedUserId
//             };
  
//       const shipment = await Shipment.findOne(query)
//         .populate("cargo.hsCode");
  
  
//       if (!shipment) {
//         return res.status(404).json({
//           status: 0,
//           message: "Shipment not found"
//         });
//       }
//       const trackingTimeline = await ShipmentTracking.find({
//         shipmentId
//       }).sort({ createdAt: 1 });
//       const currentLocation = trackingTimeline.find(
//         item => item.current === true
//       );
//       const parties = await ShipmentParty.find({
//         shipmentId
//       });
//       const documents = await ShipmentDocument.find({
//         shipmentId
//       });
//       const notifications = await Activity.find({
//         shipmentId
//       })
//         .sort({ createdAt: -1 })
//         .limit(5);
//       const exporter =
//         parties.find(x => x.type === "Exporter") || null;
//       const importer =
//         parties.find(x => x.type === "Importer") || null;
//       const notifyParty =
//         parties.find(x => x.type === "Notify") || null;
//       const header = {
//         shipmentId: shipment.sbNumber,
//         referenceNumber: shipment.referenceNumber,
      
//         shipmentStatus: shipment.shipmentStatus,
//         approvalStatus: shipment.approvalStatus,
//         trackingStatus: shipment.trackingStatus,
      
//         mode: shipment.route.mode,
      
//         route: {
//           origin: {
//             country: shipment.route.originCountry,
//             city: shipment.route.originCity
//           },
//           destination: {
//             country: shipment.route.destinationCountry,
//             city: shipment.route.destinationCity
//           }
//         },
      
//         etd: shipment.etd,
//         eta: shipment.eta,
//         transitTime: shipment.transitTime,
//         estimatedCost: shipment.estimatedCost
//       };
//       const liveTracking = {
//         location: currentLocation?.location || null,
//         currentStatus: currentLocation?.status || shipment.shipmentStatus,
//         lastUpdate: currentLocation?.createdAt || null
//       };
//       const shipmentInfo = {
//         shipmentId: shipment.sbNumber,
//         carrier: shipment.carrier,
//         route: shipment.route,
//         quantity: shipment.cargo.quantity,
//         weight: shipment.cargo.weight,
//         volume: shipment.cargo.volumeCBM
//       };
//       const transportInfo = {
//         awbNumber: shipment.awbNumber,
//         incoterm: shipment.incoterm,
//         carrier: shipment.carrier,
//         etd: shipment.etd,
//         eta: shipment.eta,
//         transitTime: shipment.transitTime
//       };
  
//       res.json({
//         status: 1,
//         message: "Shipment tracking fetched successfully",
  
//         data: {
  
//           header,
  
//           trackingTimeline,
  
//           liveTracking,
  
//           shipmentInfo,
  
//           transportInfo,
  
//           parties: {
//             exporter,
//             importer,
//             notifyParty
//           },
  
//           documents,
  
//           notifications
  
//         }
  
//       });
  
//     } catch (err) {
  
//       res.status(500).json({
//         status: 0,
//         message: err.message
//       });
  
//     }
//   };

//   exports.addTrackingUpdate = async (req, res) => {
//     try {
  
//       const shipmentId = req.params.id;
  
//       const {
//         status,
//         remarks,
//         location
//       } = req.body;


//     const mappedUserId =
//   req.user.mappedUserId || req.user._id;

// const query =
//   req.user.roleName === "admin"
//     ? { _id: shipmentId }
//     : {
//         _id: shipmentId,
//         userId: mappedUserId
//       };

// const shipment = await Shipment.findOne(query);
  
//       if (!shipment) {
//         return res.status(404).json({
//           status: 0,
//           message: "Shipment not found"
//         });
//       }
//       if (!status) {
//         return res.status(400).json({
//           status: 0,
//           message: "Tracking status is required"
//         });
//       }
//       await ShipmentTracking.updateMany(
//         {
//           shipmentId,
//           current: true
//         },
//         {
//           current: false
//         }
//       );
//       const tracking = await ShipmentTracking.create({
  
//         shipmentId,
  
//         status,
  
//         location: {
//           country: location?.country || "",
//           city: location?.city || "",
//           address: location?.address || "",
//           latitude: location?.latitude || null,
//           longitude: location?.longitude || null
//         },
  
//         remarks,
  
//         updatedBy: req.user._id,
  
//         current: true
  
//       });
// const allowed = canMoveToStatus(
//   shipment.shipmentStatus,
//   status
// );

// if (!allowed) {
//   return res.status(400).json({
//     status: 0,
//     message: `Shipment cannot move from "${shipment.shipmentStatus}" to "${status}"`
//   });
// }
// shipment.shipmentStatus = status;

// shipment.trackingStatus = "Tracking Active";

// shipment.lastStatusUpdatedAt = new Date();
// shipment.currentLocation = {
//   country: location?.country || "",
//   city: location?.city || "",
//   latitude: location?.latitude || null,
//   longitude: location?.longitude || null
// };
// shipment.statusHistory.push({
//   status,
//   updatedBy: req.user._id,
//   remarks,
//   updatedAt: new Date()
// });
// if (status === "Delivered") {
//   shipment.deliveredAt = new Date();
// }
// if (status === "Closed") {
//   shipment.closedAt = new Date();
//   shipment.trackingStatus = "Completed";
// }

// await shipment.save();
//       await Activity.create({
  
//         userId: req.user._id,
  
//         shipmentId: shipment._id,
  
//         type: "TRACKING_UPDATED",
//         message: `Tracking updated to ${status} at ${location?.city || ""}`
  
//       });
  
//       res.status(200).json({
//         status: 1,
//         message: "Tracking updated successfully",
//         data: tracking
//       });
  
//     } catch (err) {
  
//       res.status(500).json({
//         status: 0,
//         message: err.message
//       });
  
//     }
//   };



//   exports.updateShipment = async (req, res) => {
//     try {
//       const mappedUserId = req.user.mappedUserId || req.user._id;

//       const query =
//         req.user.roleName === "admin"
//           ? { _id: req.params.id }
//           : { _id: req.params.id, userId: mappedUserId };

//       const shipment = await Shipment.findOne(query);

//       if (!shipment) {
//         return res.status(404).json({
//           success: false,
//           status: 0,
//           message: "Shipment not found or access denied",
//         });
//       }

//       const body = req.body || {};

//       // -------------------------------------------------
//       // BASIC INFORMATION
//       // -------------------------------------------------
//       if (body.shipmentType !== undefined) {
//         shipment.shipmentType = body.shipmentType;
//       }

//       const requestedMode = body.shipmentMode ?? body.transportMode;

//       if (requestedMode !== undefined) {
//         shipment.shipmentMode = requestedMode;
      
//         if (!shipment.route) shipment.route = {};
      
//         if (["Air", "Sea", "Road"].includes(requestedMode)) {
//           shipment.route.mode = requestedMode;
//         } else if (requestedMode === "") {
//           shipment.route.mode = undefined;
//         }
//       }

//       if (body.incoterm !== undefined) shipment.incoterm = body.incoterm;
//       if (body.priority !== undefined) shipment.priority = body.priority;
//       if (body.bookingNo !== undefined) shipment.bookingNo = body.bookingNo;
//       if (body.etd !== undefined) shipment.etd = body.etd || null;
//       if (body.eta !== undefined) shipment.eta = body.eta || null;

//       // referenceNumber / sbNumber are generated unique identifiers.
//       // They are intentionally not editable through this endpoint.

//       // -------------------------------------------------
//       // ROUTE DETAILS
//       // Only schema-backed route fields are accepted.
//       // -------------------------------------------------
//       if (body.route && typeof body.route === "object") {
//         if (!shipment.route) shipment.route = {};

//         const routeFields = [
//           "originCountry",
//           "originCity",
//           "destinationCountry",
//           "destinationCity",
//           "warehouse",
//           "mode",
//         ];

//         routeFields.forEach((field) => {
//           if (body.route[field] !== undefined) {
//             shipment.route[field] = body.route[field];
//           }
//         });

//         if (body.route.mode !== undefined) {
//           shipment.shipmentMode = body.route.mode;
//         }
//       }

//       // -------------------------------------------------
//       // CARGO DETAILS
//       // Manual HS Code is stored in cargo.hsCodeText.
//       // cargo.hsCode remains reserved for an optional HSCode ObjectId reference.
//       // -------------------------------------------------
//       if (body.cargo && typeof body.cargo === "object") {
//         if (!shipment.cargo) shipment.cargo = {};

//         const cargoFields = [
//           "productName",
//           "productDescription",
//           "category",
//           "cargoType",
//           "hsCodeText", 
//           "quantity",
//           "unit",
//           "weight",
//           "grossWeight",
//           "netWeight",
//           "volumetricWeight",
//           "packages",
//           "packingType",
//           "unNumber",
//           "packageMarks",
//           "isDangerous",
//           "isTemperatureControlled",
//           "isStackable",
//           "isFragile",
//           "hasBattery",
//           "isLithium",
//           "dimensions",
//           "volumeCBM",
//           "value",
//           "currency",
//         ];

//         cargoFields.forEach((field) => {
//           if (body.cargo[field] !== undefined) {
//             shipment.cargo[field] = body.cargo[field];
//           }
//         });

//         if (
//           body.cargo.hsCode !== undefined &&
//           body.cargo.hsCode !== null &&
//           mongoose.Types.ObjectId.isValid(body.cargo.hsCode)
//         ) {
//           shipment.cargo.hsCode = body.cargo.hsCode;
//         }

//         // Keep package count aliases consistent for older screens.
//         if (body.cargo.packages !== undefined && body.cargo.quantity === undefined) {
//           shipment.cargo.quantity = body.cargo.packages;
//         }
//         if (body.cargo.quantity !== undefined && body.cargo.packages === undefined) {
//           shipment.cargo.packages = body.cargo.quantity;
//         }
//       }

//       // -------------------------------------------------
//       // COMPLIANCE / ADDITIONAL INFORMATION
//       // -------------------------------------------------
//       if (
//         body.additionalInformation &&
//         typeof body.additionalInformation === "object"
//       ) {
//         if (!shipment.additionalInformation) {
//           shipment.additionalInformation = {};
//         }

//         const additionalFields = [
//           "packagingType",
//           "packages",
//           "marksNumbers",
//           "inspectionRequired",
//           "dangerousGoods",
//           "specialHandling",
//           "temperatureControl",
//           "remarks",
//         ];

//         additionalFields.forEach((field) => {
//           if (body.additionalInformation[field] !== undefined) {
//             shipment.additionalInformation[field] =
//               body.additionalInformation[field];
//           }
//         });
//       }

//       if (body.notes !== undefined) shipment.notes = body.notes;
//       if (body.insuranceRequired !== undefined) {
//         shipment.insuranceRequired = body.insuranceRequired;
//       }

//       // -------------------------------------------------
//       // PARTY DETAILS
//       // Explicitly allow only fields defined in Shipment schema.
//       // Merge with existing values so partial updates never erase
//       // fields that were not included in the request.
//       // -------------------------------------------------
//       const partyFields = {
//         exporter: [
//           "companyName",
//           "iecNumber",
//           "contactPerson",
//           "email",
//           "mobile",
//         ],
//         importer: [
//           "companyName",
//           "address",
//           "iecNumber",
//           "contactPerson",
//           "email",
//           "mobile",
//         ],
//         notifyParty: [
//           "companyName",
//           "contactPerson",
//           "email",
//           "mobile",
//         ],
//       };

//       Object.entries(partyFields).forEach(([partyKey, allowedFields]) => {
//         const incomingParty = body[partyKey];

//         if (!incomingParty || typeof incomingParty !== "object" || Array.isArray(incomingParty)) {
//           return;
//         }

//         const existingParty =
//           shipment[partyKey]?.toObject?.() || shipment[partyKey] || {};

//         const mergedParty = { ...existingParty };

//         allowedFields.forEach((field) => {
//           if (incomingParty[field] !== undefined) {
//             mergedParty[field] = incomingParty[field];
//           }
//         });

//         shipment[partyKey] = mergedParty;
//       });

//       // Save all cargo changes
// shipment.markModified("cargo");
// await shipment.save();

// // Fetch saved data again directly from MongoDB
// const updatedShipment = await Shipment.findById(shipment._id)
//   .populate("cargo.hsCode")
//   .lean();

// console.log("========== CARGO DATABASE SAVE CHECK ==========");
// console.log(JSON.stringify(updatedShipment?.cargo, null, 2));
// console.log("================================================");

// return res.status(200).json({
//   success: true,
//   status: 1,
//   message: "Shipment updated successfully",
//   data: updatedShipment,
// });

//       return res.status(200).json({
//         success: true,
//         status: 1,
//         message: "Shipment updated successfully",
//         data: updatedShipment,
//       });
//     } catch (error) {
//       console.error("Update shipment error:", error);

//       return res.status(500).json({
//         success: false,
//         status: 0,
//         message: error.message,
//       });
//     }
//   };


// mahima code //
import React, { useState, useEffect, useRef } from "react";
import {
  FiChevronDown,
  FiFileText,
  FiClipboard,
  FiAward,
  FiCreditCard,
  FiShoppingCart,
  FiFolder,
  FiTruck,
  FiZap,
  FiUploadCloud,
  FiEye,
  FiSend,
  FiCheckCircle,
  FiExternalLink,
  FiCalendar,
  FiBookmark,
  FiX,
  FiInfo,
  FiBox,
  FiCheck,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";

import {
  createShipment,
  updateShipmentStep2,
  updateShipmentStep3,
  saveDraft,
  analyzeShipment,
  submitShipment,
  getShipmentFormSettings,
  getDocumentsUploadSettings,
  uploadShipmentDocument,
  updateShipment,
  getShipmentDetails,
  deleteShipmentDocument,
} from "../services/shipmentApi";
import { CloudCog } from "lucide-react";

// Convert stored upload paths into absolute backend URLs.
// VITE_API_URL is expected to contain the API base, e.g. https://api.example.com/api.
const getShipmentDocumentUrl = (fileUrl) => {
  if (!fileUrl) return "";
  if (/^https?:\/\//i.test(fileUrl) || fileUrl.startsWith("data:")) return fileUrl;

  const apiBase = String(import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
  const backendBase = apiBase.replace(/\/api$/i, "");
  const base = backendBase || window.location.origin;
  return new URL(fileUrl.startsWith("/") ? fileUrl : `/${fileUrl}`, base).toString();
};

const normalizeDocumentName = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* ==========================================================================
   REUSABLE FORM ATOMS
   ========================================================================== */

function Label({ children, required = true }) {
  return (
    <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-wide">
      {children}
      {required && <span className="text-rose-500 ml-1 font-bold">*</span>}
    </label>
  );
}

function Input({
  label,
  placeholder,
  value,
  name,
  onChange,
  required = true,
  disabled = false,
}) {
  return (
    <div className="w-full">
      <Label required={required}>{label}</Label>
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all duration-150 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
      />
    </div>
  );
}

function DateInput({ label, value, name, onChange, required = false }) {
  return (
    <div className="w-full">
      <Label required={required}>{label}</Label>
      <div className="relative">
        <input
          type="date"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all duration-150 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
        />
        <FiCalendar
          size={16}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}

function Select({
  label,
  placeholder,
  value,
  name,
  onChange,
  children,
  required = true,
}) {
  return (
    <div className="w-full">
      <Label required={required}>{label}</Label>
      <div className="relative">
        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 transition-all duration-150 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
        >
          <option value="">{placeholder}</option>
          {children}
        </select>
        <FiChevronDown
          size={16}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}

function RadioGroup({ label, name, value, onChange, required = true }) {
  const isYes = value === true || value === "yes";
  const isNo = value === false || value === "no";

  return (
    <div className="w-full">
      <Label required={required}>{label}</Label>
      <div className="flex items-center gap-2 mt-1.5">
        <button
          type="button"
          onClick={() => onChange(name, true)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-150 ${
            isYes
              ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-xs"
              : "bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isYes ? "bg-indigo-600 ring-2 ring-indigo-200" : "bg-slate-300"
            }`}
          />
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(name, false)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-150 ${
            isNo
              ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-xs"
              : "bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isNo ? "bg-indigo-600 ring-2 ring-indigo-200" : "bg-slate-300"
            }`}
          />
          No
        </button>
      </div>
    </div>
  );
}

function Grid2({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function SectionCard({ number, title, subtitle, badge, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.05)] transition-all duration-200 p-5 sm:p-6">
      <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
            {number}
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {badge && (
          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {badge}
          </span>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

/* ==========================================================================
   DOCUMENT UPLOAD COMPONENT
   ========================================================================== */

const DEFAULT_DOCUMENT_FIELDS = [
  { key: "commercial-invoice", label: "Commercial Invoice", enabled: true },
  { key: "packing-list", label: "Packing List", enabled: true },
  { key: "msds", label: "MSDS", enabled: true },
  { key: "coo", label: "COO", enabled: true },
  { key: "iec-gst", label: "IEC/GST", enabled: true },
  { key: "purchase-order", label: "Purchase Order", enabled: true },
  { key: "product-certificate", label: "Product Certificate", enabled: true },
  { key: "other-documents", label: "Other Documents", enabled: true },
];

const DOCUMENT_ICON_STYLES = [
  "text-blue-600 bg-blue-50 border-blue-100",
  "text-amber-600 bg-amber-50 border-amber-100",
  "text-purple-600 bg-purple-50 border-purple-100",
  "text-emerald-600 bg-emerald-50 border-emerald-100",
  "text-indigo-600 bg-indigo-50 border-indigo-100",
  "text-rose-600 bg-rose-50 border-rose-100",
  "text-teal-600 bg-teal-50 border-teal-100",
  "text-slate-600 bg-slate-50 border-slate-200",
];

function DocumentsUpload({
  uploadedDocs,
  handleDocumentUpload,
  fileInputRef,
  config,
  loading = false,
  loadError = false,
  onRetry,
  onPreview,
  onDelete,
  deletingDocumentKey = "",
}) {
  const visibleDocuments = (Array.isArray(config?.fields)
    ? config.fields
    : []
  ).filter((document) => document.enabled !== false);

  return (
    <SectionCard
      number={4}
      title={config?.sectionTitle || "Documents Uploaded"}
      subtitle={config?.sectionDesc || "Upload all relevant documents"}
    >
      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-8 text-center">
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Loading document requirements...
          </p>
        </div>
      ) : loadError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-6 text-center">
          <p className="text-sm font-semibold text-rose-700">
            Unable to load document requirements
          </p>
          <p className="mt-1 text-xs text-rose-600">
            Please try again. The form will use the latest shared settings saved by Admin.
          </p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 border border-rose-200 hover:bg-rose-100"
            >
              Retry
            </button>
          )}
        </div>
      ) : visibleDocuments.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
          {visibleDocuments.map((document, index) => {
            const documentKey =
              document.key ||
              String(document.label || `document-${index}`)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");

            const documentLabel = document.label || "Document";
            const uploadedDocument =
              uploadedDocs[documentKey] ||
              Object.values(uploadedDocs).find(
                (doc) => normalizeDocumentName(doc.documentName || doc.documentLabel || doc.name) === normalizeDocumentName(documentLabel)
              );
            const isUploaded = !!uploadedDocument;
            const documentUrl =
              uploadedDocument?.resolvedFileUrl ||
              getShipmentDocumentUrl(uploadedDocument?.fileUrl || uploadedDocument?.url || uploadedDocument?.documentUrl || uploadedDocument?.path);
            const Icon = index === 1 ? FiClipboard : FiFileText;
            const iconStyle =
              DOCUMENT_ICON_STYLES[index % DOCUMENT_ICON_STYLES.length];

            return (
              <div
                key={documentKey}
                className={`group flex flex-col justify-between rounded-xl border p-3.5 text-center transition-all duration-150 ${
                  isUploaded
                    ? "border-emerald-200 bg-emerald-50/30"
                    : "border-slate-200 bg-slate-50/30 hover:border-indigo-200 hover:bg-indigo-50/20"
                }`}
              >
                <div>
                  <div
                    className={`w-9 h-9 rounded-xl mx-auto flex items-center justify-center border shadow-2xs ${iconStyle}`}
                  >
                    <Icon size={16} />
                  </div>

                  <p className="text-xs font-semibold text-slate-800 mt-2.5 break-words">
                    {documentLabel}
                  </p>
                </div>

                <div className="mt-3">
                  {isUploaded && documentUrl && (
                    <div className="mb-2 grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => onPreview?.(uploadedDocument, documentLabel, documentUrl)}
                        className="inline-flex items-center justify-center gap-1 rounded-lg bg-white border border-indigo-200 px-2 py-1.5 text-[11px] font-semibold text-indigo-700 hover:bg-indigo-50"
                      >
                        <FiEye size={12} /> Preview
                      </button>
                      <a
                        href={documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 rounded-lg bg-white border border-emerald-200 px-2 py-1.5 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50"
                      >
                        Open
                      </a>
                    </div>
                  )}
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                    ref={(element) => {
                      fileInputRef.current[documentKey] = element;
                    }}
                    onChange={(event) => {
                      const file = event.target.files?.[0];

                      if (file) {
                        handleDocumentUpload(
                          documentKey,
                          documentLabel,
                          file
                        );
                      }

                      // Allows selecting the same file again after replacing it.
                      event.target.value = "";
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current[documentKey]?.click()}
                    className={`w-full py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all duration-150 ${
                      isUploaded
                        ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                        : "bg-white border border-slate-200 text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 shadow-2xs"
                    }`}
                  >
                    {isUploaded ? "Replace file" : "+ Upload"}
                  </button>
                  {isUploaded && (
                    <button
                      type="button"
                      disabled={deletingDocumentKey === documentKey}
                      onClick={() => onDelete?.(documentKey, uploadedDocument)}
                      className="mt-1.5 w-full rounded-lg border border-rose-200 bg-rose-50 px-2 py-1.5 text-[11px] font-semibold text-rose-700 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingDocumentKey === documentKey ? "Deleting..." : "Delete"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
          <FiFolder className="mx-auto text-slate-400" size={26} />
          <p className="mt-2 text-sm font-semibold text-slate-700">
            No documents available
          </p>
          <p className="mt-1 text-xs text-slate-500">
            The administrator has not enabled any document upload fields.
          </p>
        </div>
      )}

      <div className="flex items-center gap-2 mt-4 pt-3 text-xs text-slate-500 border-t border-slate-100">
        <FiInfo size={14} className="text-slate-400 shrink-0" />
        <span>
          Accepted formats: PDF, JPG, PNG (Max file size: 10MB per document)
        </span>
      </div>
    </SectionCard>
  );
}


function ShipmentValidationModal({ errors, onClose }) {
  if (!errors?.length) return null;

  const groups = [
    { title: "Basic Shipment Details", items: ["Shipment Type", "Shipment Mode", "Shipment Purpose"] },
    { title: "Origin & Destination", items: ["Origin Country", "Origin City / Port / Airport", "Destination Country", "Destination City / Port / Airport", "Consignee / Buyer Name", "Consignee Address"] },
    { title: "Invoice & Value", items: ["Invoice Value", "Invoice Value must be greater than 0", "Currency", "Payment Terms"] },
    { title: "Product & Cargo Details", items: ["Product Name", "Product Description", "Product Category", "Quantity", "Unit", "Net Weight (Kg)", "Gross Weight (Kg)", "No. of Packages", "Packing Type", "Package Length", "Package Width", "Package Height"] },
  ];

  const known = new Set(groups.flatMap((group) => group.items));
  const sections = groups
    .map((group) => ({ ...group, missing: errors.filter((item) => group.items.includes(item)) }))
    .filter((group) => group.missing.length > 0);
  const otherErrors = errors.filter((item) => !known.has(item));
  if (otherErrors.length) sections.push({ title: "Required Documents / Other Details", missing: otherErrors });

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="shipment-validation-title"
        className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start gap-3 border-b border-amber-100 bg-amber-50 px-5 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <FiInfo size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 id="shipment-validation-title" className="text-base font-bold text-slate-900">Complete your shipment details</h2>
            <p className="mt-1 text-sm text-slate-600">
              Your shipment hasn’t been submitted yet. Please fill in the {errors.length} required {errors.length === 1 ? "field" : "fields"} below.
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-slate-700" aria-label="Close">
            <FiX size={19} />
          </button>
        </div>

        <div className="max-h-[55vh] space-y-4 overflow-y-auto px-5 py-4">
          {sections.map((section) => (
            <section key={section.title}>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">{section.title}</h3>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {section.missing.map((item) => (
                  <li key={item} className="flex items-start gap-2 rounded-lg border border-rose-100 bg-rose-50/70 px-3 py-2 text-sm text-rose-800">
                    <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[10px] font-bold">!</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">Draft saving and document uploads are still available.</p>
          <button type="button" onClick={onClose} className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
            Okay, I’ll complete them
          </button>
        </div>
      </div>
    </div>
  );
}

function DocumentPreviewModal({ document, onClose }) {
  if (!document) return null;
  const url = document.url || "";
  const isImage = /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(
    `${document.fileName || ""} ${url}`
  ) || String(document.mimeType || "").startsWith("image/");
  const isPdf = /\.pdf(\?.*)?$/i.test(`${document.fileName || ""} ${url}`) ||
    document.mimeType === "application/pdf";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 sm:p-6" onClick={onClose}>
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-900">{document.title || "Document Preview"}</h3>
            <p className="truncate text-xs text-slate-500">{document.fileName || "Uploaded file"}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900" aria-label="Close preview">
            <FiX size={18} />
          </button>
        </div>
        <div className="min-h-[260px] flex-1 overflow-auto bg-slate-100 p-3 sm:p-5">
          {isImage ? (
            <img src={url} alt={document.title || "Uploaded document"} className="mx-auto max-h-[72vh] max-w-full rounded-lg object-contain shadow-sm" />
          ) : isPdf ? (
            <iframe title={document.title || "PDF preview"} src={url} className="h-[72vh] w-full rounded-lg border border-slate-200 bg-white" />
          ) : (
            <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
              <FiFileText size={42} className="text-slate-400" />
              <p className="text-sm font-semibold text-slate-700">Preview is not available for this file type.</p>
              <a href={url} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700">Open document</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   AI ANALYSIS CARD
   ========================================================================== */

function AIOutputAnalysis({ analysis }) {
  const aiTopStats = [
    { label: "Suggested HS Code", value: analysis?.hsCode || "--", color: "bg-blue-50/70 border-blue-200/80 text-blue-700" },
    { label: "Required Docs", value: analysis?.requiredDocs ? `${analysis.requiredDocs} Files` : "--", color: "bg-emerald-50/70 border-emerald-200/80 text-emerald-700" },
    { label: "Freight Estimate", value: analysis?.freightEstimate ? `₹${analysis.freightEstimate}` : "--", color: "bg-amber-50/70 border-amber-200/80 text-amber-700" },
    { label: "RoDTEP Incentive", value: analysis?.incentive || "N/A", color: "bg-purple-50/70 border-purple-200/80 text-purple-700" },
  ];

  const aiBottomStats = [
    { label: "Compliance Checklist", value: analysis?.complianceCount || "--", sub: "Requirements" },
    { label: "Risk Score Assessment", value: analysis?.riskScore || "--", sub: analysis?.riskSub || "", green: true },
    { label: "Estimated Transit Time", value: analysis?.timeline || "--" },
    { label: "Recommended Next Step", value: analysis?.recommendation || "--", green: true },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
            <FiZap size={14} />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">5</span>
            <h3 className="text-sm font-bold text-slate-900">AI Output After Analysis</h3>
          </div>
        </div>
        <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/70">
          Smart Engine
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {aiTopStats.map((s) => (
          <div key={s.label} className={`rounded-xl border p-2.5 flex flex-col justify-between ${s.color}`}>
            <p className="text-[11px] font-medium opacity-80">{s.label}</p>
            <p className="text-sm font-bold mt-1 tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-2.5">
        {aiBottomStats.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
            <p className="text-[11px] text-slate-500 font-medium">{s.label}</p>
            <p className={`text-xs font-bold mt-1 ${s.green ? "text-emerald-600" : "text-slate-800"}`}>
              {s.value}
            </p>
            {s.sub && <p className="text-[10px] text-slate-400 mt-0.5">{s.sub}</p>}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="w-full mt-3.5 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-all shadow-2xs"
      >
        <FiExternalLink size={13} />
        View Full Analysis Report
      </button>
    </div>
  );
}

/* ==========================================================================
   FORM STEP SECTIONS
   ========================================================================== */


   function BasicShipmentDetails({
  formData,
  handleDirectChange,
  handleNestedChange,
  referenceNumber,
  config,
}) {
  const fallbackFields = [
    {
      key: "shipmentType",
      label: "Shipment Type",
      useDropdown: true,
      options: ["Export", "Import", "Re-export"],
    },
    {
      key: "shipmentMode",
      label: "Shipment Mode",
      useDropdown: true,
      options: ["Air", "Sea", "Road", "Rail"],
    },
    {
      key: "shipmentPurpose",
      label: "Shipment Purpose",
      useDropdown: true,
      options: ["Commercial", "Sample", "Personal"],
    },
    {
      key: "companyName",
      label: "Customer / Company Name",
      useDropdown: false,
    },
    {
      key: "contactPerson",
      label: "Contact Person",
      useDropdown: false,
    },
  ];

  const configuredFields = Array.isArray(config?.fields) ? config.fields : [];
  const fields = [...configuredFields];

  // Keep the exact five Basic Shipment fields shown in the approved form.
  fallbackFields.forEach((fallback) => {
    if (!fields.some((field) => field.key === fallback.key)) {
      fields.push(fallback);
    }
  });

  const getValue = (key) => {
    switch (key) {
      case "companyName":
        return formData.exporter?.companyName || "";
      case "contactPerson":
        return formData.exporter?.contactPerson || "";
      case "shipmentType":
      case "shipmentMode":
      case "shipmentPurpose":
        return formData[key] || "";
      default:
        return formData.customFields?.[key] ?? "";
    }
  };

  const handleFieldChange = (key, value) => {
    switch (key) {
      case "companyName":
      case "contactPerson":
        handleNestedChange("exporter", key, value);
        break;

      case "shipmentType":
      case "shipmentMode":
      case "shipmentPurpose":
        handleDirectChange({
          target: { name: key, value },
        });
        break;

      default:
        handleNestedChange("customFields", key, value);
        break;
    }
  };

  return (
    <SectionCard
      number={1}
      title={config?.title || "Basic Shipment Details"}
      subtitle={
        config?.description ||
        "General shipment classification and exporter contact"
      }
    >
      <Grid2>
        {fields.map((field) => {
          const value = getValue(field.key);

          return (
            <div key={field.key} className="w-full">
              {field.useDropdown ? (
                <Select
                  label={field.label}
                  placeholder={`Select ${field.label}`}
                  name={field.key}
                  value={value}
                  onChange={(event) =>
                    handleFieldChange(field.key, event.target.value)
                  }
                >
                  {(field.options || []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              ) : (
                <div className="w-full">
                  <Label required={false}>{field.label}</Label>
                  <input
                    type="text"
                    value={value}
                    onChange={(event) =>
                      handleFieldChange(field.key, event.target.value)
                    }
                    placeholder={`Enter ${field.label}`}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              )}
            </div>
          );
        })}

        <Input
          label="Reference No"
          value={referenceNumber || "Auto Generated on Draft/Submit"}
          disabled={true}
          required={false}
        />
      </Grid2>
    </SectionCard>
  );
}

function OriginDestination({ formData, handleDirectChange, handleNestedChange }) {
  return (
    <SectionCard number={2} title="Origin & Destination" subtitle="">
      <Grid2>
        <Select
          label="Origin Country"
          placeholder="Select Country"
          value={formData.route.originCountry}
          onChange={(e) => handleNestedChange("route", "originCountry", e.target.value)}
        >
          <option value="India">India</option>
          <option value="China">China</option>
          <option value="USA">USA</option>
        </Select>
        <Input
          label="Origin City / Port / Airport"
          placeholder="e.g. Mumbai Port (INBOM)"
          value={formData.route.originCity}
          onChange={(e) => handleNestedChange("route", "originCity", e.target.value)}
        />
      </Grid2>
      <Grid2>
        <Select
          label="Destination Country"
          placeholder="Select Country"
          value={formData.route.destinationCountry}
          onChange={(e) => handleNestedChange("route", "destinationCountry", e.target.value)}
        >
          <option value="India">India</option>
          <option value="Singapore">Singapore</option>
          <option value="Dubai">Dubai</option>
        </Select>
        <Input
          label="Destination City / Port / Airport"
          placeholder="e.g. Jebel Ali Port (AEJEA)"
          value={formData.route.destinationCity}
          onChange={(e) => handleNestedChange("route", "destinationCity", e.target.value)}
        />
      </Grid2>
      <Grid2>
        <Input
          label="Consignee / Buyer Name"
          placeholder="Buyer legal company name"
          value={formData.importer.companyName}
          onChange={(e) => handleNestedChange("importer", "companyName", e.target.value)}
        />
        <Input
          label="Consignee Address"
          placeholder="Warehouse or delivery address"
          value={formData.importer.address}
          onChange={(e) => handleNestedChange("importer", "address", e.target.value)}
        />
      </Grid2>
      <Grid2>
        <Select
          label="Incoterm"
          required={false}
          placeholder="Select Incoterm"
          value={formData.incoterm}
          onChange={(e) => handleDirectChange(e)}
          name="incoterm"
        >
          <option value="FOB">FOB - Free on Board</option>
          <option value="CIF">CIF - Cost, Insurance & Freight</option>
          <option value="EXW">EXW - Ex Works</option>
        </Select>
        <DateInput
          label="Expected Shipment Date"
          name="etd"
          value={formData.etd}
          onChange={handleDirectChange}
        />
      </Grid2>
    </SectionCard>
  );
}

function ProductDetails({
  formData,
  handleNestedChange,
  handleRadioChange,
  analysis,
}) {
  return (
    <SectionCard number={6} title="Product Details" subtitle="">
      <Grid2>
        <Input
          label="Product Name"
          placeholder="e.g. High Density Polymer Resins"
          value={formData.cargo.productName}
          onChange={(e) => handleNestedChange("cargo", "productName", e.target.value)}
        />
        <Input
          label="Product Description"
          placeholder="Brief technical or commercial description"
          value={formData.cargo.productDescription}
          onChange={(e) => handleNestedChange("cargo", "productDescription", e.target.value)}
        />
      </Grid2>

      <Grid2>
        <Input
          label="HS Code"
          placeholder="Enter HS Code manually"
          value={formData.cargo.hsCodeText || ""}
          onChange={(e) =>
            handleNestedChange("cargo", "hsCodeText", e.target.value)
          }
        />
        <Select
          label="Product Category"
          placeholder="Select category"
          value={formData.cargo.category}
          onChange={(e) => handleNestedChange("cargo", "category", e.target.value)}
        >
          <option value="Electronics">Electronics</option>
          <option value="Textiles">Textiles</option>
          <option value="General">General Cargo</option>
        </Select>
      </Grid2>

      <Grid2>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Quantity"
            placeholder="e.g. 500"
            value={formData.cargo.quantity}
            onChange={(e) => handleNestedChange("cargo", "quantity", e.target.value)}
          />
          <Select
            label="Unit"
            placeholder="Unit"
            value={formData.cargo.unit}
            onChange={(e) => handleNestedChange("cargo", "unit", e.target.value)}
          >
            <option value="PCS">PCS</option>
            <option value="KG">KG</option>
            <option value="BOX">BOX</option>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Net Weight (Kg)"
            placeholder="Net Wt"
            value={formData.cargo.netWeight || formData.cargo.weight}
            onChange={(e) => handleNestedChange("cargo", "netWeight", e.target.value)}
          />
          <Input
            label="Gross Weight (Kg)"
            placeholder="Gross Wt"
            value={formData.cargo.grossWeight}
            onChange={(e) => handleNestedChange("cargo", "grossWeight", e.target.value)}
          />
        </div>
      </Grid2>

      {/* DIMENSIONS ROW */}
      <div className="rounded-xl border border-slate-200/90 bg-slate-50/40 p-4">
        <div className="flex items-center justify-between mb-2">
          <Label required={true}>Package Dimensions (L × W × H)</Label>
          <span className="text-[11px] font-medium text-slate-400">Unit of measurement</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          <div className="relative">
            <input
              placeholder="Length"
              value={formData.cargo.dimensions?.length || ""}
              onChange={(e) =>
                handleNestedChange("cargo", "dimensions", {
                  ...formData.cargo.dimensions,
                  length: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 pointer-events-none">L</span>
          </div>
          <div className="relative">
            <input
              placeholder="Width"
              value={formData.cargo.dimensions?.width || ""}
              onChange={(e) =>
                handleNestedChange("cargo", "dimensions", {
                  ...formData.cargo.dimensions,
                  width: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 pointer-events-none">W</span>
          </div>
          <div className="relative">
            <input
              placeholder="Height"
              value={formData.cargo.dimensions?.height || ""}
              onChange={(e) =>
                handleNestedChange("cargo", "dimensions", {
                  ...formData.cargo.dimensions,
                  height: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 pointer-events-none">H</span>
          </div>
          <div className="relative">
            <select
              value={formData.cargo.dimensions?.unit || "CM"}
              onChange={(e) =>
                handleNestedChange("cargo", "dimensions", {
                  ...formData.cargo.dimensions,
                  unit: e.target.value,
                })
              }
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
            >
              <option value="CM">CM</option>
              <option value="INCH">INCH</option>
            </select>
            <FiChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <Grid2>
        <Input
          label="Volumetric Weight"
          placeholder="Auto calculated"
          value={formData.cargo.volumetricWeight}
          onChange={(e) => handleNestedChange("cargo", "volumetricWeight", e.target.value)}
        />
        <Input
          label="No. of Packages"
          placeholder="Total cartons or pallets"
          value={formData.cargo.packages}
          onChange={(e) => handleNestedChange("cargo", "packages", e.target.value)}
        />
      </Grid2>

      <Grid2>
        <Select
          label="Packing Type"
          placeholder="Select packing type"
          value={formData.cargo.packingType}
          onChange={(e) => handleNestedChange("cargo", "packingType", e.target.value)}
        >
          <option value="Carton">Standard Carton</option>
          <option value="Pallet">Wooden / Plastic Pallet</option>
          <option value="Wooden Crate">Industrial Wooden Crate</option>
        </Select>
        <Input
          label="UN Number (if DG)"
          placeholder="e.g. UN1993"
          required={false}
          value={formData.cargo.unNumber}
          onChange={(e) => handleNestedChange("cargo", "unNumber", e.target.value)}
        />
      </Grid2>

      <Input
        label="Package Marks & Numbers"
        placeholder="Shipping mark inscriptions on carton"
        required={false}
        value={formData.cargo.packageMarks}
        onChange={(e) => handleNestedChange("cargo", "packageMarks", e.target.value)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        <RadioGroup
          label="Dangerous Goods (DG)"
          name="isDangerous"
          value={formData.cargo.isDangerous}
          onChange={(name, val) => handleNestedChange("cargo", name, val)}
        />
        <RadioGroup
          label="Temperature Controlled"
          name="isTemperatureControlled"
          value={formData.cargo.isTemperatureControlled}
          onChange={(name, val) => handleNestedChange("cargo", name, val)}
        />
        <RadioGroup
          label="Stackable"
          name="isStackable"
          value={formData.cargo.isStackable}
          onChange={(name, val) => handleNestedChange("cargo", name, val)}
        />
        <RadioGroup
          label="Fragile"
          name="isFragile"
          value={formData.cargo.isFragile}
          onChange={(name, val) => handleNestedChange("cargo", name, val)}
        />
        <RadioGroup
          label="Battery Included"
          name="hasBattery"
          value={formData.cargo.hasBattery}
          onChange={(name, val) => handleNestedChange("cargo", name, val)}
        />
        <RadioGroup
          label="Lithium Battery"
          name="isLithium"
          value={formData.cargo.isLithium}
          onChange={(name, val) => handleNestedChange("cargo", name, val)}
        />
      </div>
    </SectionCard>
  );
}

function InvoiceValue({ formData, handleDirectChange, handleRadioChange }) {
  return (
    <SectionCard number={3} title="Invoice & Value" subtitle="">
      <Grid2>
        <Input
          label="Invoice Value"
          placeholder="Total invoice amount"
          name="amount"
          value={formData.amount}
          onChange={handleDirectChange}
        />
        <Select
          label="Currency"
          placeholder="Select currency"
          name="currency"
          value={formData.currency}
          onChange={handleDirectChange}
        >
          <option value="USD">USD ($)</option>
          <option value="INR">INR (₹)</option>
          <option value="EUR">EUR (€)</option>
        </Select>
      </Grid2>
      <Select
        label="Payment Terms"
        placeholder="Select payment terms"
        name="paymentTerms"
        value={formData.paymentTerms}
        onChange={handleDirectChange}
      >
        <option value="Advance">100% Advance Payment</option>
        <option value="LC">Letter of Credit (LC at Sight)</option>
        <option value="Net 30">Net 30 Days Terms</option>
      </Select>
      <Grid2>
        <RadioGroup
          label="Insurance Required"
          name="insuranceRequired"
          value={formData.insuranceRequired}
          onChange={handleRadioChange}
        />
        <RadioGroup
          label="Export Incentive"
          name="exportIncentive"
          value={formData.exportIncentive}
          onChange={handleRadioChange}
        />
      </Grid2>
    </SectionCard>
  );
}

/* ==========================================================================
   SIDEBAR METRIC CARDS
   ========================================================================== */

function DimensionsCard({ calculatedMetrics }) {
  const dimensionRows = [
    { label: "Volume Total (CBM)", value: calculatedMetrics?.cbm ? `${calculatedMetrics.cbm} CBM` : "--" },
    { label: "Volumetric Wt (Air)", value: calculatedMetrics?.volumetricWeight ? `${calculatedMetrics.volumetricWeight} Kg` : "--" },
    { label: "Ocean Volume (CBM)", value: calculatedMetrics?.cbm ? `${calculatedMetrics.cbm} CBM` : "--" },
    { label: "Chargeable Weight", value: calculatedMetrics?.chargeableWeight ? `${calculatedMetrics.chargeableWeight} Kg` : "--" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
            <FiBox size={14} />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Cargo & Weight Metrics</h3>
        </div>
        <span className="text-[10px] text-slate-400">Live Calc</span>
      </div>

      <div className="space-y-2.5">
        {dimensionRows.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-xs py-1">
            <span className="text-slate-500 font-medium">{r.label}</span>
            <span className="font-bold text-slate-800">{r.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between bg-emerald-50/60 -mx-5 -mb-5 p-4 rounded-b-2xl border-emerald-100/60">
        <div>
          <span className="text-[11px] font-semibold text-emerald-800 block">Estimated Freight</span>
          <span className="text-[10px] text-emerald-600">Standard market rate</span>
        </div>
        <span className="text-base font-extrabold text-emerald-700">
          {calculatedMetrics?.estimatedFreight ? `₹ ${calculatedMetrics.estimatedFreight}` : "--"}
        </span>
      </div>
    </div>
  );
}

function StatusFlowCard({ currentStatus = "Draft" }) {
  const statusFlow = [
    { label: "Draft", sub: "Saved as draft", icon: FiFileText },
    { label: "AI Analyzed", sub: "AI compliance check", icon: FiZap },
    { label: "Submitted", sub: "Ready for admin", icon: FiUploadCloud },
    { label: "Admin Review", sub: "Verification", icon: FiEye },
    { label: "Quotation Sent", sub: "Awaiting rate approval", icon: FiSend },
    { label: "Accepted", sub: "Booking confirmed", icon: FiCheckCircle },
    { label: "Shipment Active", sub: "Cargo in transit", icon: FiTruck },
    { label: "Completed", sub: "Customs cleared & delivered", icon: FiCheckCircle },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Workflow Pipeline</h3>
        <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
          {currentStatus}
        </span>
      </div>

      <div className="space-y-3.5">
        {statusFlow.map((s, idx) => {
          const Icon = s.icon;
          const isActive = currentStatus === s.label;

          return (
            <div key={s.label} className="flex items-center gap-3 relative">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-xs ring-4 ring-indigo-500/15"
                    : "bg-slate-100 text-slate-400 border border-slate-200/60"
                }`}
              >
                <Icon size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs font-semibold truncate ${
                    isActive ? "text-indigo-950 font-bold" : "text-slate-700"
                  }`}
                >
                  {s.label}
                </p>
                <p className="text-[11px] text-slate-400 truncate">{s.sub}</p>
              </div>
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const quickTips = [
  "Fill all required fields marked with * for swift processing.",
  "Ensure invoices and packing lists match net/gross weight.",
  "Run 'Analyze Shipment' to verify HS Code validity with AI.",
  "Submit to Admin only after verifying all customs declarations.",
];

function QuickTipsCard() {
  return (
    <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/50 border border-amber-200/60 rounded-2xl p-5 shadow-2xs">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-6 h-6 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
          <FiInfo size={13} />
        </div>
        <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
          Compliance Guidelines
        </h3>
      </div>
      <ul className="space-y-2 text-xs text-amber-900/80">
        {quickTips.map((t, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-amber-500 font-bold mt-0.5">•</span>
            <span className="leading-relaxed">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==========================================================================
   HEADER & FOOTER
   ========================================================================== */

function Header({
  setActiveTab,
  setShipment,
  handleSaveDraft,
  handleAnalyze,
  handleSubmit,
  loading,
  currentTab,
  currentStatus,
}) {
  return (
    <div className="bg-white mt-10 rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] mb-6">
      {/* Breadcrumb */}
      

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              New Shipment Form
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {currentStatus || "Draft"}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Specify origin, destination, cargo dimensions, and trade documents.
            Our logistics intelligence engine will compute HS code compliance, risk evaluation, and estimated freight.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs transition-all disabled:opacity-50"
          >
            <FiBookmark size={14} className="text-slate-500" />
            Save Draft
          </button>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            <FiZap size={14} />
            Analyze Shipment
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-all disabled:opacity-50"
          >
            <FiSend size={14} />
            Submit to Admin
          </button>

          <button
            type="button"
            onClick={() => {
              setShipment("");
              setActiveTab(currentTab);
            }}
            className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50/50 px-3 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-100/70 transition-all"
          >
            <FiX size={14} />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="border-t border-slate-200/80 mt-10 pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
      <p>© 2025 ASC CargoMatrix Logistics Hub. All rights reserved.</p>
      <div className="flex items-center gap-5">
        <span className="hover:text-slate-600 cursor-pointer transition-colors">Privacy Policy</span>
        <span className="hover:text-slate-600 cursor-pointer transition-colors">Terms of Operations</span>
        <span className="hover:text-slate-600 cursor-pointer transition-colors">Customs Support</span>
      </div>
    </div>
  );
}

/* ==========================================================================
   MAIN EXPORT COMPONENT
   ========================================================================== */

export default function Shipment({ setActiveTab, setShipment, currentTab, editShipmentId = null, onSaved }) {
  const [shipmentId, setShipmentId] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [currentStatus, setCurrentStatus] = useState("Draft");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [previewDocument, setPreviewDocument] = useState(null);
  const [deletingDocumentKey, setDeletingDocumentKey] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const fileInputRef = useRef({});

  const [shipmentFormConfig, setShipmentFormConfig] = useState(null);
  const [documentsUploadConfig, setDocumentsUploadConfig] = useState(null);
  const [documentsSettingsLoading, setDocumentsSettingsLoading] = useState(true);
  const [documentsSettingsError, setDocumentsSettingsError] = useState(false);

  const fetchDocumentsSettings = async (isMountedCheck = () => true) => {
    try {
      setDocumentsSettingsLoading(true);
      setDocumentsSettingsError(false);

      const response = await getDocumentsUploadSettings();
      if (!isMountedCheck()) return;

      // Shared endpoint response: { status: 1, data: { sectionTitle, sectionDesc, fields } }
      let data = response?.data;
      data = data?.data ?? data;
      data = data?.data ?? data;
      data = data?.documentsUpload ?? data;

      if (Array.isArray(data?.fields)) {
        setDocumentsUploadConfig({
          sectionTitle: data.sectionTitle || "Documents Uploaded",
          sectionDesc: data.sectionDesc || "Upload all relevant documents",
          fields: data.fields,
        });
      } else {
        setDocumentsUploadConfig({ fields: [] });
      }
    } catch (error) {
      console.error("Shared document settings fetch error:", error);
      if (isMountedCheck()) {
        setDocumentsUploadConfig(null);
        setDocumentsSettingsError(true);
      }
    } finally {
      if (isMountedCheck()) setDocumentsSettingsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchFormSettings = async () => {
      try {
        const shipmentResponse = await getShipmentFormSettings();
        if (!isMounted) return;

        let shipmentData = shipmentResponse?.data;
        shipmentData = shipmentData?.data ?? shipmentData;
        shipmentData = shipmentData?.data ?? shipmentData;

        if (shipmentData?.sections?.length) {
          setShipmentFormConfig(shipmentData.sections[0]);
        }
      } catch (error) {
        console.error("Shipment form settings fetch error:", error);
      }
    };

    fetchFormSettings();
    fetchDocumentsSettings(() => isMounted);

    return () => {
      isMounted = false;
    };
  }, []);


  const [formData, setFormData] = useState({
    // Step 1
    shipmentType: "",
    shipmentMode: "",
    shipmentPurpose: "",
    customerType: "Individual",
    exporter: {
      companyName: "",
      contactPerson: "",
    },
    customFields: {},

    // Step 2
    route: {
      originCountry: "",
      originCity: "",
      destinationCountry: "",
      destinationCity: "",
    },
    importer: {
      companyName: "",
      address: "",
    },
    incoterm: "",
    etd: "",
    eta: "",

    // Step 3
    cargo: {
      productName: "",
      productDescription: "",
      hsCode: "",
      hsCodeText: "",
      category: "",
      quantity: "",
      unit: "",
      weight: "",
      netWeight: "",
      grossWeight: "",
      volumetricWeight: "",
      packages: "",
      packingType: "",
      unNumber: "",
      packageMarks: "",
      isDangerous: false,
      isTemperatureControlled: false,
      isStackable: false,
      isFragile: false,
      hasBattery: false,
      isLithium: false,
      dimensions: {
        length: "",
        width: "",
        height: "",
        unit: "CM",
      },
    },
    amount: "",
    currency: "",
    paymentTerms: "",
    insuranceRequired: false,
    exportIncentive: false,
    additionalInformation: {
      packagingType: "",
      packages: 0,
      marksNumbers: "",
      dangerousGoods: false,
      specialHandling: false,
      temperatureControl: false,
    },
  });

  // Load the selected draft into the existing multi-step form.
  useEffect(() => {
    if (!editShipmentId) return;
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const response = await getShipmentDetails(editShipmentId);
        const data = response?.data?.data || response?.data?.shipment || response?.data;
        const shipment = data?.shipment || data;
        if (!active || !shipment?._id) return;
        setShipmentId(shipment._id);
        setReferenceNumber(shipment.referenceNumber || shipment.sbNumber || "");
        setCurrentStatus(shipment.shipmentStatus || "Draft");
        // Restore previously uploaded files so draft attachments remain visible in edit mode.
        const savedDocuments = Array.isArray(shipment.documents) ? shipment.documents : [];
        setUploadedDocs(savedDocuments.reduce((acc, doc) => {
          const label = doc.documentName || doc.documentLabel || doc.name || "Document";
          const key = normalizeDocumentName(doc.documentKey || label);
          acc[key] = {
            ...doc,
            resolvedFileUrl: getShipmentDocumentUrl(doc.fileUrl || doc.url || doc.documentUrl || doc.path),
          };
          return acc;
        }, {}));
        setFormData((prev) => ({
          ...prev,
          ...shipment,
          exporter: { ...prev.exporter, ...(shipment.exporter || {}) },
          route: { ...prev.route, ...(shipment.route || {}) },
          importer: { ...prev.importer, ...(shipment.importer || {}) },
          cargo: { ...prev.cargo, ...(shipment.cargo || {}), dimensions: { ...prev.cargo.dimensions, ...(shipment.cargo?.dimensions || {}) } },
          additionalInformation: { ...prev.additionalInformation, ...(shipment.additionalInformation || {}) },
          customFields: shipment.customFields || {},
          amount: shipment.amount ?? shipment.cargo?.value ?? "",
          currency: shipment.currency || shipment.cargo?.currency || "",
          etd: shipment.etd ? String(shipment.etd).slice(0, 10) : "",
          eta: shipment.eta ? String(shipment.eta).slice(0, 10) : "",
        }));
      } catch (error) {
        console.error("Load draft for editing failed:", error);
        alert(error?.response?.data?.message || "Unable to load this draft.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [editShipmentId]);

  const handleDirectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (parentKey, childKey, value) => {
    setFormData((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value,
      },
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
const saveAllSteps = async () => {
  let currentId = shipmentId;

  const shipmentPayload = {
    shipmentType: formData.shipmentType,
    shipmentMode: formData.shipmentMode,
    shipmentPurpose: formData.shipmentPurpose,
    customerType: formData.customerType,

    exporter: {
      ...formData.exporter,
    },

    customFields: formData.customFields || {},

    currency: formData.currency || "INR",

    paymentTerms: formData.paymentTerms || "",

    amount: formData.amount === ""
      ? undefined
      : Number(formData.amount),

    insuranceRequired: Boolean(formData.insuranceRequired),
    exportIncentive: Boolean(formData.exportIncentive),
  };

  const step2Payload = {
    route: {
      ...formData.route,
      mode: formData.shipmentMode || "",
    },

    importer: {
      ...formData.importer,
    },

    shipmentMode: formData.shipmentMode,

    etd: formData.etd || null,
    eta: formData.eta || null,
    incoterm: formData.incoterm || "",
  };

  const step3Payload = {
    cargo: {
      ...formData.cargo,

      hsCode: formData.cargo.hsCode || null,
      hsCodeText: formData.cargo.hsCodeText || "",

      quantity: formData.cargo.quantity === ""
        ? undefined
        : Number(formData.cargo.quantity),

      weight: formData.cargo.weight === ""
        ? undefined
        : Number(formData.cargo.weight),

      netWeight: formData.cargo.netWeight === ""
        ? undefined
        : Number(formData.cargo.netWeight),

      grossWeight: formData.cargo.grossWeight === ""
        ? undefined
        : Number(formData.cargo.grossWeight),

      packages: formData.cargo.packages === ""
        ? undefined
        : Number(formData.cargo.packages),

      volumetricWeight: formData.cargo.volumetricWeight === ""
        ? undefined
        : Number(formData.cargo.volumetricWeight),

      dimensions: {
        ...formData.cargo.dimensions,
        length: formData.cargo.dimensions.length === ""
          ? undefined
          : Number(formData.cargo.dimensions.length),
        width: formData.cargo.dimensions.width === ""
          ? undefined
          : Number(formData.cargo.dimensions.width),
        height: formData.cargo.dimensions.height === ""
          ? undefined
          : Number(formData.cargo.dimensions.height),
      },
    },

    paymentTerms: formData.paymentTerms || "",
    insuranceRequired: Boolean(formData.insuranceRequired),
    exportIncentive: Boolean(formData.exportIncentive),
    additionalInformation: {
      ...formData.additionalInformation,
    },
  };

  if (!currentId) {
    const response = await createShipment(shipmentPayload);

    const data = response.data?.data || response.data;

    currentId = data._id;

    if (!currentId) {
      throw new Error("Shipment ID was not returned by server");
    }

    setShipmentId(currentId);

    if (data.referenceNumber) {
      setReferenceNumber(data.referenceNumber);
    }
  } else {
    await updateShipment(currentId, shipmentPayload);
  }

  await updateShipmentStep2(currentId, step2Payload);

  await updateShipmentStep3(currentId, step3Payload);

  return currentId;
};


  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      const id = await saveAllSteps();
      await saveDraft(id);
      setCurrentStatus("Draft");
      alert("Draft saved successfully!");
    } catch (err) {
      console.error("Save Draft Error:", err);
      alert(err.response?.data?.message || "Failed to save draft.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const id = await saveAllSteps();
      const res = await analyzeShipment(id);
      const data = res.data?.data || res.data;
      setAnalysis(data);
      setCurrentStatus("AI Analyzed");
      alert("Shipment analyzed successfully!");
    } catch (err) {
      console.error("Analyze Error:", err);
      alert(err.response?.data?.message || "Failed to analyze shipment.");
    } finally {
      setLoading(false);
    }
  };

  // Validate the complete shipment before allowing final submission.
  // Draft saving and document uploads remain available even when the form is incomplete.
  const validateShipmentBeforeSubmit = () => {
    const missing = [];
    const addRequired = (label, value) => {
      if (value === undefined || value === null || String(value).trim() === "") {
        missing.push(label);
      }
    };

    // Basic shipment details
    addRequired("Shipment Type", formData.shipmentType);
    addRequired("Shipment Mode", formData.shipmentMode);
    addRequired("Shipment Purpose", formData.shipmentPurpose);

    // Origin, destination and consignee
    addRequired("Origin Country", formData.route?.originCountry);
    addRequired("Origin City / Port / Airport", formData.route?.originCity);
    addRequired("Destination Country", formData.route?.destinationCountry);
    addRequired("Destination City / Port / Airport", formData.route?.destinationCity);
    addRequired("Consignee / Buyer Name", formData.importer?.companyName);
    addRequired("Consignee Address", formData.importer?.address);

    // Invoice and payment
    addRequired("Invoice Value", formData.amount);
    addRequired("Currency", formData.currency);
    addRequired("Payment Terms", formData.paymentTerms);
    if (formData.amount !== "" && (!Number.isFinite(Number(formData.amount)) || Number(formData.amount) <= 0)) {
      missing.push("Invoice Value must be greater than 0");
    }

    // Product and cargo details
    addRequired("Product Name", formData.cargo?.productName);
    addRequired("Product Description", formData.cargo?.productDescription);
    addRequired("Product Category", formData.cargo?.category);
    addRequired("Quantity", formData.cargo?.quantity);
    addRequired("Unit", formData.cargo?.unit);
    addRequired("Net Weight (Kg)", formData.cargo?.netWeight || formData.cargo?.weight);
    addRequired("Gross Weight (Kg)", formData.cargo?.grossWeight);
    addRequired("No. of Packages", formData.cargo?.packages);
    addRequired("Packing Type", formData.cargo?.packingType);
    addRequired("Package Length", formData.cargo?.dimensions?.length);
    addRequired("Package Width", formData.cargo?.dimensions?.width);
    addRequired("Package Height", formData.cargo?.dimensions?.height);

    // Only documents explicitly marked required in Admin document settings are mandatory.
    const requiredDocumentFields = (documentsUploadConfig?.fields || []).filter(
      (field) => field.enabled !== false && field.required === true
    );
    requiredDocumentFields.forEach((field, index) => {
      const key = normalizeDocumentName(field.key || field.label || `document-${index}`);
      const label = field.label || "Required document";
      if (!uploadedDocs[key]) {
        const matchingDocument = Object.values(uploadedDocs).some(
          (doc) => normalizeDocumentName(doc.documentName || doc.documentLabel || doc.name) === normalizeDocumentName(label)
        );
        if (!matchingDocument) missing.push(`${label} document`);
      }
    });

    return missing;
  };

  const handleSubmit = async () => {
    const missingFields = validateShipmentBeforeSubmit();
    if (missingFields.length > 0) {
      setValidationErrors(missingFields);
      setShowValidationModal(true);
      return;
    }

    setLoading(true);
    try {
      const id = await saveAllSteps();
      await submitShipment(id);
      setCurrentStatus("Submitted");
      alert("Shipment submitted to admin successfully!");
      if (onSaved) onSaved();
    } catch (err) {
      console.error("Submit Error:", err);
      alert(err.response?.data?.message || "Failed to submit shipment.");
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (documentKey, documentName, file) => {
    try {
      const id = await saveAllSteps();

      const form = new FormData();
      form.append("shipmentId", id);
      // Keep the configured document label as documentType for compatibility
      // with the existing shipment document upload backend.
      form.append("documentType", documentName);
      form.append("documentKey", documentKey);
      form.append("required", true);
      form.append("file", file);

      const res = await uploadShipmentDocument(form);

      setUploadedDocs((prev) => ({
        ...prev,
        [documentKey]: {
          ...res.data.data,
          resolvedFileUrl: getShipmentDocumentUrl(res.data.data?.fileUrl),
        },
      }));

      alert("Uploaded Successfully");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Upload Failed");
    }
  };

  const handleDeleteDocument = async (documentKey, document) => {
    if (!document?._id) {
      alert("Document record ID is missing. Please refresh the shipment and try again.");
      return;
    }
    const confirmed = window.confirm("Are you sure you want to delete this uploaded document?");
    if (!confirmed) return;

    try {
      setDeletingDocumentKey(documentKey);
      await deleteShipmentDocument(shipmentId, document._id);
      setUploadedDocs((prev) => {
        const next = { ...prev };
        delete next[documentKey];
        return next;
      });
      if (previewDocument?._id === document._id) setPreviewDocument(null);
      alert("Document deleted successfully.");
    } catch (error) {
      console.error("Delete shipment document failed:", error);
      alert(error?.response?.data?.message || "Unable to delete document.");
    } finally {
      setDeletingDocumentKey("");
    }
  };

  const handlePreviewDocument = (document, title, url) => {
    setPreviewDocument({
      ...document,
      title,
      url: document.resolvedFileUrl || getShipmentDocumentUrl(
        document.fileUrl || document.url || document.documentUrl || document.path
      ) || url,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/70 p-3 sm:p-6 lg:p-8 text-slate-800">
      <div className="max-w-[1520px] mx-auto">
        {/* TOP HEADER */}
        <Header
          setActiveTab={setActiveTab}
          setShipment={setShipment}
          handleSaveDraft={handleSaveDraft}
          handleAnalyze={handleAnalyze}
          handleSubmit={handleSubmit}
          loading={loading}
          currentTab={currentTab}
          currentStatus={currentStatus}
        />

        {/* FULL-WIDTH SHIPMENT FORM */}
        <div className="w-full">
          <div className="w-full space-y-6">
          <BasicShipmentDetails
  formData={formData}
  handleDirectChange={handleDirectChange}
  handleNestedChange={handleNestedChange}
  referenceNumber={referenceNumber}
  config={shipmentFormConfig}
/>

            <OriginDestination
              formData={formData}
              handleDirectChange={handleDirectChange}
              handleNestedChange={handleNestedChange}
            />

            <InvoiceValue
              formData={formData}
              handleDirectChange={handleDirectChange}
              handleRadioChange={handleRadioChange}
            />

            <DocumentsUpload
              uploadedDocs={uploadedDocs}
              handleDocumentUpload={handleDocumentUpload}
              fileInputRef={fileInputRef}
              config={documentsUploadConfig}
              loading={documentsSettingsLoading}
              loadError={documentsSettingsError}
              onRetry={() => fetchDocumentsSettings()}
              onPreview={handlePreviewDocument}
              onDelete={handleDeleteDocument}
              deletingDocumentKey={deletingDocumentKey}
            />

            <AIOutputAnalysis analysis={analysis} />

            <ProductDetails
              formData={formData}
              handleNestedChange={handleNestedChange}
              handleRadioChange={handleRadioChange}
              analysis={analysis}
            />
          </div>
        </div>

        <ShipmentValidationModal
          errors={showValidationModal ? validationErrors : []}
          onClose={() => setShowValidationModal(false)}
        />

        <DocumentPreviewModal
          document={previewDocument}
          onClose={() => setPreviewDocument(null)}
        />

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}