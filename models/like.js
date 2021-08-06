const mongoose = require("mongoose");

const { Schema } = mongoose;

const LikeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likeable: {
      type: Schema.Types.ObjectId,
      refPath: "onModel",
    },
    // Dynamic refrence
    onModel: {
      type: String,
      required: true,
      enum: ["Post", "Comment"],
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
