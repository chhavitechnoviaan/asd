const crypto=require("crypto");
const prefix="enc:v1:";
function getKey(){const raw=process.env.SETTINGS_ENCRYPTION_KEY;if(!raw)throw Object.assign(Error("SETTINGS_ENCRYPTION_KEY is required for secrets"),{status:503});const key=/^[a-f0-9]{64}$/i.test(raw)?Buffer.from(raw,"hex"):Buffer.from(raw,"base64");if(key.length!==32)throw Object.assign(Error("SETTINGS_ENCRYPTION_KEY must be 32 bytes"),{status:503});return key;}
function encrypt(value){if(!value)return "";const iv=crypto.randomBytes(12);const cipher=crypto.createCipheriv("aes-256-gcm",getKey(),iv);const ciphertext=Buffer.concat([cipher.update(value,"utf8"),cipher.final()]);return prefix+Buffer.concat([iv,cipher.getAuthTag(),ciphertext]).toString("base64");}
function decrypt(value){if(!value)return "";if(!value.startsWith(prefix))return value;const bytes=Buffer.from(value.slice(prefix.length),"base64");const decipher=crypto.createDecipheriv("aes-256-gcm",getKey(),bytes.subarray(0,12));decipher.setAuthTag(bytes.subarray(12,28));return Buffer.concat([decipher.update(bytes.subarray(28)),decipher.final()]).toString("utf8");}
module.exports={encrypt,decrypt};
