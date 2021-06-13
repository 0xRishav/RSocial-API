const express = require("express");
const app = express();
const PORT = 8000;

app.use("/", (req, res) => {
  res.send("<h1>RSocial api</h1>");
});

app.listen(PORT, (err) => {
  err
    ? console.log(`Error in running server: ${err}`)
    : console.log(`Server is up and running on port: ${PORT}`);
});
