require("dotenv").config();
const express = require("express");
const { errorHandler } = require("./src/utils/errorHandler");
const app = express();
global.__basedir = __dirname;
const config = require("./src/config");

if (!("serverConfig" in config)) {
  throw new AppError("server.js", "Please provide serverConfig", "custom", 404);
}
const { serverConfig } = config;

const PORT = serverConfig.port ? serverConfig.port : 3000;

app.use(express.json());
require("./src/routes")(app);
app.get("/", function (req, res) {
  res.json({ message: "ExamRoom File Service is running" });
});

app.use((error, req, res, next) => {
  return errorHandler(error, res);
});

app.listen(PORT, function () {
  console.log(`ExamRoom File Service is running on http://localhost:${PORT}`);
});
