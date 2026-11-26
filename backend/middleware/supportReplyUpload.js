const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const folder = require("../utils/storage").directory("support-replies");
fs.mkdirSync(folder, {recursive:true});
const types = {".pdf":"application/pdf",".doc":"application/msword",".docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document",".jpg":"image/jpeg",".jpeg":"image/jpeg",".png":"image/png"};
module.exports = multer({
 storage:multer.diskStorage({destination:(_req,_file,cb)=>cb(null,folder),filename:(_req,file,cb)=>cb(null,crypto.randomUUID()+path.extname(file.originalname).toLowerCase())}),
 limits:{fileSize:10*1024*1024},
 fileFilter:(_req,file,cb)=>{const ext=path.extname(file.originalname).toLowerCase();cb(types[ext] && file.mimetype===types[ext] ? null : new Error("Only PDF, DOC, DOCX, JPG, JPEG and PNG allowed"),Boolean(types[ext] && file.mimetype===types[ext]));}
});
