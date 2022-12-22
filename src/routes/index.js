const fileRoute = require("../components/files/file.route");
module.exports = (app) => {
  app.use("/api/v1/file", fileRoute);
};
