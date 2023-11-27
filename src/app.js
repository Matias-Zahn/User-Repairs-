const express = require("express");
const usersRoutes = require("./users/users.routes");
const repairRoutes = require("./repairs/repairs.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", usersRoutes);

app.use("/api/v1", repairRoutes);

module.exports = app;
