const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");
const LOGO = path.join(__dirname,"../assets/cargomate-logo.png");
const NAVY="#101D36", TEAL="#0D9488", GREY="#64748B";
function stringify(value) {
  if (value == null) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string" || typeof value === "number") return String(value);
  return JSON.stringify(value);
}
function flatten(value, prefix="", depth=0, out=[]) {
  if (out.length>=140) return out;
  if (value==null || typeof value!=="object" || depth>=4) {
    out.push([prefix || "Result",stringify(value)]);return out;
  }
  if (Array.isArray(value)) {
    value.slice(0,25).forEach((v,i)=>flatten(v,`${prefix} ${i+1}`.trim(),depth+1,out));
    if(value.length>25)out.push(["Additional entries",`${value.length-25} more items`]);
  } else {
    Object.entries(value).filter(([k])=>!/^(_|token|password|secret)/i.test(k)).slice(0,40)
      .forEach(([k,v])=>flatten(v,`${prefix}${prefix?" / ":""}${k.replace(/_/g," ")}`,depth+1,out));
  }
  return out;
}
function renderPdf(res, report, {inline=false}={}) {
  const cleanName=String(report.reportName||"CargoMate-Report").replace(/[^a-z0-9 _.-]/gi,"_").slice(0,85);
  const doc=new PDFDocument({size:"A4",margins:{top:98,bottom:65,left:44,right:44},bufferPages:true,info:{Title:cleanName,Author:"ASD CargoMate"}});
  res.setHeader("Content-Type","application/pdf");
  res.setHeader("Content-Disposition",`${inline?"inline":"attachment"}; filename="${cleanName}.pdf"`);
  doc.pipe(res);
  const width=doc.page.width;
  doc.rect(0,0,width,12).fill(TEAL);
  if(fs.existsSync(LOGO)) { try {doc.image(LOGO,44,29,{fit:[165,49]});}catch(e){console.warn("Report logo:",e.message);} }
  doc.font("Helvetica-Bold").fontSize(10).fillColor(TEAL).text("TRADE INTELLIGENCE REPORT",width-245,37,{width:200,align:"right"});
  doc.moveTo(44,85).lineTo(width-44,85).strokeColor("#D9E7E8").stroke();
  doc.y=112;
  doc.font("Helvetica-Bold").fillColor(NAVY).fontSize(21).text(String(report.reportName||"Saved Report"),{width:width-88});
  doc.moveDown(.45);
  doc.font("Helvetica").fontSize(10).fillColor(GREY).text(`Module: ${report.dataSource||report.module||"CargoMate"}   |   Created: ${new Date(report.createdAt||Date.now()).toLocaleDateString("en-GB")}`);
  if(report.description) {doc.moveDown(.5);doc.fontSize(10).fillColor(NAVY).text(String(report.description).slice(0,700));}
  doc.moveDown(1.1);
  doc.font("Helvetica-Bold").fontSize(13).fillColor(TEAL).text("Analysis & Results");doc.moveDown(.5);
  const data=flatten(report.reportData);
  if(!data.length)doc.fontSize(10).fillColor(GREY).text("No saved analysis results.");
  for(const [label,raw] of data) {
    const val=String(raw).slice(0,1800);
    const rowHeight=Math.max(36,Math.ceil(val.length/100)*14+16);
    if(doc.y+rowHeight>doc.page.height-70)doc.addPage();
    const y=doc.y;
    doc.roundedRect(44,y,width-88,rowHeight,5).fill("#F4F8FA");
    doc.font("Helvetica-Bold").fontSize(9).fillColor(TEAL).text(String(label).slice(0,105),55,y+7,{width:width-110});
    doc.font("Helvetica").fontSize(9).fillColor(NAVY).text(val,55,y+20,{width:width-110,height:rowHeight-23,ellipsis:true});
    doc.y=y+rowHeight+6;
  }
  const pages=doc.bufferedPageRange();
  for(let i=pages.start;i<pages.start+pages.count;i++) {
    doc.switchToPage(i);
    doc.save();doc.translate(130,570).rotate(-35).fillOpacity(.065).fillColor(NAVY).font("Helvetica-Bold").fontSize(48).text("ASD CARGOMATE",0,0,{lineBreak:false});doc.restore();
    doc.moveTo(44,doc.page.height-48).lineTo(width-44,doc.page.height-48).strokeColor("#DEE8EC").stroke();
    doc.font("Helvetica").fontSize(8).fillColor(GREY).text("ASD CargoMate  |  Confidential trade report",44,doc.page.height-39,{width:350});
    doc.text(`Page ${i+1} of ${pages.count}`,width-120,doc.page.height-39,{width:76,align:"right"});
  }
  doc.end();
}
module.exports={renderPdf};
