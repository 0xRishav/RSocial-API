const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = 8000;
const db = require("./config/mongoose");
const { urlencoded } = require("express");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", require("./routes/index"));

app.listen(PORT, (err) => {
  err
    ? console.log(`Error in running server: ${err}`)
    : console.log(`Server is up and running on port: ${PORT}`);
});

module.exports = db;
