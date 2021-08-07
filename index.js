const express = require("express");
const { cloudinary } = require("./config/cloudinary");
require("dotenv").config();

const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000;
const db = require("./config/mongoose");
const { cloudinaryConfig } = require("./config/cloudinary");
const { urlencoded } = require("express");
var cors = require("cors");

app.use(cors());
// app.use(express.json({ limit: "5mb" }));

app.use("*", cloudinaryConfig);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use("/", require("./routes/index"));

app.listen(PORT, (err) => {
  err
    ? console.log(`Error in running server: ${err}`)
    : console.log(`Server is up and running on port: ${PORT}`);
});

module.exports = db;
