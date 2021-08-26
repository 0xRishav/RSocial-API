const mongoose = require("mongoose");
const { Schema } = mongoose;

const TokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Token = mongoose.model("Token", TokenSchema);

module.exports = Token;
