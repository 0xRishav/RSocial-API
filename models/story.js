const mongoose = require("mongoose");
const { Schema } = mongoose;

const StorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    photoUrl: String,
    photoPublicId: String,
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model("Story", StorySchema);

module.exports = Story;
