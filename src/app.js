const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");

const app = express();
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);

app.get("/api/hello", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
