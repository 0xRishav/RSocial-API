const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/rsocial_db");

const db = mongoose.connection;

db.on("error", console.error.bind("error connecting to db"));

db.once("open", () => console.log("successfully connected to db"));

