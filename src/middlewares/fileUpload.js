var multer = require("multer");
exports.fileUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      const extension = file.originalname.split(".").reverse()[0];
      const stamp = new Date().valueOf();
      const fileName = `${stamp}.${extension}`;
      cb(null, fileName);
    },
  }),
}).single("file");
