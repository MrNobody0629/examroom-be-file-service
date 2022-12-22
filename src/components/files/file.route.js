const Router = require("express").Router();
const { fileUpload } = require("../../middlewares/fileUpload");
const fileController = require("./file.controller");

Router.post("/upload", fileUpload, fileController.uploadFile);

Router.get("/get-file", fileController.getFile);

Router.get("/get-files", fileController.getFiles);

module.exports = Router;
