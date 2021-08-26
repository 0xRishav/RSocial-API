const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    comment: {
      type: "String",
      required: true,
    },
    like: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
