const multer = require("multer");

const storage = multer.diskStorage({
  destination: require("./storage").directory("modules"),
  filename: (req, file, cb) => {
    cb(null, require("crypto").randomUUID() + require("path").extname(file.originalname).toLowerCase());
  }
});

const upload = multer({ storage });

module.exports = upload;