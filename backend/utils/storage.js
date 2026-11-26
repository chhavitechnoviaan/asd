const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(process.env.UPLOAD_DIR || path.join(__dirname, '../uploads'));
function directory(category) { if (!/^[a-z-]+$/.test(category)) throw new Error('Invalid storage category'); const dir = path.join(root, category); fs.mkdirSync(dir,{recursive:true}); return dir; }
function publicUrl(category, name) { return '/uploads/' + category + '/' + encodeURIComponent(name); }
function imageExtension(bytes) { if(bytes.subarray(0,8).toString('hex')==='89504e470d0a1a0a') return 'png'; if(bytes.subarray(0,3).toString('hex')==='ffd8ff') return 'jpg'; if(bytes.toString('ascii',0,4)==='RIFF' && bytes.toString('ascii',8,12)==='WEBP') return 'webp'; if(['GIF87a','GIF89a'].includes(bytes.toString('ascii',0,6))) return 'gif'; return null; }
async function saveImage(category, bytes) { const ext=imageExtension(bytes); if(!ext) throw new Error('Invalid image content'); const name=crypto.randomUUID()+'.'+ext; await fs.promises.writeFile(path.join(directory(category),name),bytes,{flag:'wx'}); return {name,url:publicUrl(category,name)}; }
function seedEmailAssets(){ const dir=directory('logos'); for(const [source,target] of [['notification-logo.png','email-logo.png'],['notification-accreditation.png','accreditation.png']]) { try { fs.copyFileSync(path.join(__dirname,'../assets',source),path.join(dir,target),fs.constants.COPYFILE_EXCL); } catch(e){if(e.code!=='EEXIST') throw e;} } }
module.exports={root,directory,publicUrl,imageExtension,saveImage,seedEmailAssets};
