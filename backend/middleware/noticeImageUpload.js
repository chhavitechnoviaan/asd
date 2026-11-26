const multer=require('multer'); const storage=require('../utils/storage');
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:10*1024*1024,files:1}}).single('image');
module.exports=(req,res,next)=>upload(req,res,err=>{if(err)return res.status(400).json({message:err.message}); if(!req.file)return next(); storage.saveImage('notices',req.file.buffer).then(r=>{req.file.filename=r.name;next();}).catch(e=>res.status(400).json({message:e.message}));});
