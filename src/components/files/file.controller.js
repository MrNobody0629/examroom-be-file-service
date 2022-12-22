const config = require("../../config");
const { AppError } = require("../../utils/errorHandler");
const { successResponse } = require("../../utils/responseHandler");
const fileService = require("./file.service");
if (!("serverConfig" in config)) {
  throw new AppError("uploadFile", "serverConfig Required", "custom", 404);
}
const { serverConfig } = config;

if (!("fileConfig" in config)) {
  throw new AppError("uploadFile", "fileConfig Required", "custom", 404);
}
const { fileConfig } = config;

const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError("file-upload", "Files not found", "custom", 404);
    }
    const fileUrl = `${serverConfig.url}${fileConfig.fileUrl}${req.file.filename}`;
    // const data = await fileService.uploadFile(file);
    successResponse(res, { url: fileUrl });
  } catch (err) {
    next(err);
  }
};

const getFile = async (req, res, next) => {
  try {
    const fileLocation = await fileService.getFile(req.query);
    res.sendFile(fileLocation);
  } catch (err) {
    next(err);
  }
};

const getFiles = async (req, res, next) => {
  try {
    const filesLocation = await fileService.getFiles();
    res.send(filesLocation);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadFile,
  getFile,
  getFiles,
};
