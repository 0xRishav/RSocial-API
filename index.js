const express = require("express");
const app = express();
const PORT = 8000;

app.use("/", require("./routes/index"));

app.listen(PORT, (err) => {
  err
    ? console.log(`Error in running server: ${err}`)
    : console.log(`Server is up and running on port: ${PORT}`);
});
