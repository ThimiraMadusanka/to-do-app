const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const taskRoutes = require('./src/routes/tasks.route');

// Use Routes
app.use("/api/tasks", taskRoutes);

module.exports = app;
