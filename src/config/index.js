module.exports = {
  serverConfig: {
    port: process.env.FILE_SERVER_PORT,
    url: process.env.FILE_SERVER_URL,
  },
  fileConfig: {
    directoryPath: __basedir + "/uploads/",
    fileUrl: "/api/v1/file/get-file?fileName=",
  },
};
