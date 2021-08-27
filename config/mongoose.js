const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/rsocial-demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoose connection successful"))
  .catch((err) => console.log("mongoose connection failed", err));

const db = mongoose.connection;

// mongoose.connect('mongodb://localhost/myapp');
// process.env.MONGOOSE_URI
