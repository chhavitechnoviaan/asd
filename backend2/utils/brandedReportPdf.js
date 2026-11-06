const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const LOGO = path.join(__dirname, '../assets/cargomate-logo.png');
const C = { navy:'#12264C', blue:'#1854AF', teal:'#0D9488', light:'#F1F7F9', muted:'#64748B', border:'#D7E5EB', white:'#FFFFFF' };
const human = k => String(k||'Result').replace(/([a-z])([A-Z])/g,'$1 $2').replace(/[_-]/g,' ').replace(/\s+/g,' ').trim().replace(/\b\w/g,c=>c.toUpperCase());
const compact = x => {
  if(x == null || x==='')return '—';
  if(typeof x==='boolean')return x?'Yes':'No';
  if(typeof x==='number')return new Intl.NumberFormat('en-IN',{maximumFractionDigits:2}).format(x);
  if(typeof x==='string')return x;
  return JSON.stringify(x);
};
function flattenRows(value, section='', depth=0, out=[]){
 if(out.length>=180)return out;
 if(value==null || typeof value!=='object' || depth>=4){out.push([human(section)||'Result',compact(value)]);return out;}
 if(Array.isArray(value)){
   if(!value.length)return out;
   value.slice(0,35).forEach((v,i)=>{
     if(v && typeof v==='object' && !Array.isArray(v)) {
       Object.entries(v).slice(0,8).forEach(([k,x])=>flattenRows(x,`${human(section)} ${i+1} - ${human(k)}`,depth+1,out));
     } else flattenRows(v,`${human(section)} ${i+1}`,depth+1,out);
   });
   return out;
 }
 Object.entries(value).filter(([k])=>!/(^_|token|password|secret|credential|authorization)/i.test(k)).slice(0,35)
  .forEach(([k,v])=>flattenRows(v, section?`${human(section)} - ${human(k)}`:human(k),depth+1,out));
 return out;
}
function renderPdf(res,report,{inline=false}={}){
 const reportName=String(report.reportName||'Saved Trade Report');
 const fileName=reportName.replace(/[^a-z0-9 _.-]/gi,'_').slice(0,75)||'CargoMate-Report';
 const doc=new PDFDocument({size:'A4',margins:{left:45,right:45,top:100,bottom:65},bufferPages:true,info:{Title:reportName,Author:'ASD CargoMate',Subject:'Saved trade analysis'}});
 res.setHeader('Content-Type','application/pdf');
 res.setHeader('Content-Disposition',`${inline?'inline':'attachment'}; filename="${fileName}.pdf"`);
 doc.pipe(res);
 const pageWidth=doc.page.width, left=45, right=pageWidth-45, contentWidth=pageWidth-90;
 function header(){
   doc.rect(0,0,pageWidth,13).fill(C.teal);
   if(fs.existsSync(LOGO)){try{doc.image(LOGO,left,28,{fit:[156,55]});}catch(e){console.warn('Report logo issue:',e.message);}}
   doc.font('Helvetica-Bold').fontSize(9).fillColor(C.teal).text('TRADE INTELLIGENCE REPORT',right-205,47,{width:205,align:'right'});
   doc.moveTo(left,91).lineTo(right,91).strokeColor(C.border).stroke();
 }
 function nextPage(){doc.addPage();header();doc.y=110;}
 header();
 doc.y=119;
 doc.font('Helvetica-Bold').fontSize(20).fillColor(C.navy).text(reportName,left,doc.y,{width:contentWidth,align:'left'});
 doc.moveDown(.55);
 const created=report.createdAt?new Date(report.createdAt):new Date();
 const mod=String(report.dataSource||report.module||'CargoMate');
 doc.font('Helvetica').fontSize(9).fillColor(C.muted).text(`MODULE: ${mod}    |    CREATED: ${created.toLocaleDateString('en-GB')}    |    REPORT ID: ${String(report._id||'').slice(-8).toUpperCase()}`,left,doc.y,{width:contentWidth});
 if(report.description){doc.moveDown(.55);doc.font('Helvetica').fontSize(9).fillColor(C.navy).text(String(report.description).slice(0,500),left,doc.y,{width:contentWidth});}
 doc.moveDown(1.1);
 doc.font('Helvetica-Bold').fontSize(13).fillColor(C.teal).text('Analysis & Results',left,doc.y,{width:contentWidth});
 doc.moveDown(.6);
 let rows=flattenRows(report.reportData);if(!rows.length)rows=[['Result','No saved analysis data available']];
 function tableHeader(){const y=doc.y;doc.rect(left,y,contentWidth,26).fill(C.navy);doc.fillColor(C.white).font('Helvetica-Bold').fontSize(9).text('METRIC / FIELD',left+11,y+8,{width:contentWidth*.59-12});doc.text('RESULT / VALUE',left+contentWidth*.6+8,y+8,{width:contentWidth*.4-15});doc.y=y+26;}
 tableHeader();
 rows.forEach(([label,raw],index)=>{
  const val=String(raw).slice(0,1800);
  doc.font('Helvetica').fontSize(8.7);
  const column1=contentWidth*.60-23, column2=contentWidth*.40-24;
  const lh=doc.heightOfString(String(label),{width:column1,lineGap:2});
  const vh=doc.heightOfString(val,{width:column2,lineGap:2});
  const rowHeight=Math.min(165,Math.max(32,Math.max(lh,vh)+16));
  if(doc.y+rowHeight>doc.page.height-74){nextPage();tableHeader();}
  const y=doc.y;
  doc.rect(left,y,contentWidth,rowHeight).fill(index%2===0?C.light:C.white);
  doc.rect(left,y,contentWidth,rowHeight).strokeColor(C.border).lineWidth(.35).stroke();
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(C.navy).text(String(label),left+11,y+8,{width:column1,height:rowHeight-13,ellipsis:true});
  doc.font('Helvetica').fontSize(8.7).fillColor(C.navy).text(val,left+contentWidth*.60+8,y+8,{width:column2,height:rowHeight-13,ellipsis:true});
  doc.y=y+rowHeight;
 });
 const range=doc.bufferedPageRange();
 for(let i=range.start;i<range.start+range.count;i++){
   doc.switchToPage(i);
   doc.save();doc.translate(155,550).rotate(-35).fillOpacity(.045).font('Helvetica-Bold').fontSize(43).fillColor(C.navy).text('ASD CARGOMATE',0,0,{lineBreak:false});doc.restore();
   const y=doc.page.height-48;
   doc.moveTo(left,y).lineTo(right,y).strokeColor(C.border).stroke();
   doc.font('Helvetica').fontSize(8).fillColor(C.muted).text('ASD CargoMate  |  Confidential trade intelligence',left,y+8,{width:390});
   doc.text(`Page ${i+1} of ${range.count}`,right-95,y+8,{width:95,align:'right'});
 }
 doc.end();
}
module.exports={renderPdf};
