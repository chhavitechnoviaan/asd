require('dotenv').config();
const fs=require('fs'); const path=require('path'); const storage=require('../utils/storage');
const source=path.resolve(__dirname,'../uploads');
function copy(src,dst){if(!fs.existsSync(src))return;fs.mkdirSync(dst,{recursive:true});for(const e of fs.readdirSync(src,{withFileTypes:true})){const a=path.join(src,e.name),b=path.join(dst,e.name);if(e.isDirectory())copy(a,b);else if(e.isFile()){try{fs.copyFileSync(a,b,fs.constants.COPYFILE_EXCL);console.log('Copied',e.name);}catch(err){if(err.code!=='EEXIST')throw err;}}}}
if(source!==storage.root)copy(source,storage.root);storage.seedEmailAssets();
