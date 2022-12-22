const config = require("../../config");
const { AppError } = require("../../utils/errorHandler");
const fs = require("fs");

if (!("serverConfig" in config)) {
  throw new AppError("uploadFile", "serverConfig Required", "custom", 404);
}
const { serverConfig } = config;

if (!("fileConfig" in config)) {
  throw new AppError("uploadFile", "fileConfig Required", "custom", 404);
}
const { fileConfig } = config;

const getFile = async (data) => {
  const { fileName } = data;
  if (!fileName) {
    throw new AppError("getFile", "File name required", "custom", 422);
  }
  const fileNames = fs
    .readdirSync(fileConfig.directoryPath, { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => item.name);
  if (!fileNames.includes(fileName)) {
    throw new AppError("getFile", "File not found", "custom", 404);
  }
  return `${fileConfig.directoryPath}${fileName}`;
};

const getFiles = async (data) => {
  return new Promise((resolve, reject) => {
    fs.readdir(fileConfig.directoryPath, async function (err, files) {
      if (err) {
        throw new AppError("getFiles", "Unable to scan files!", "custom", 500);
      }
      let fileInfos = [];
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: `${serverConfig.url}${fileConfig.fileUrl}` + file,
        });
      });
      resolve(fileInfos);
    });
  });
};

module.exports = {
  getFile,
  getFiles,
};
