const Like = require("../models/like");
const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.toggleLike = async (req, res) => {
  const { likeableId, type } = req.query;
  console.log("TYPE", type, likeableId);
  const { user } = req;
  let deleted = false;
  let likeable;
  try {
    if (type === "Post") {
      likeable = await Post.findById(likeableId).populate("likes");
    } else {
      likeable = await Comment.findById(likeableId).populate("likes");
    }

    // Check if already liked

    const existingLike = await Like.findOne({
      onModel: type,
      likeable: likeableId,
      user: user._id,
    });

    // Delete if exists

    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      likeable.save();
      existingLike.remove();
      deleted = true;
    } else {
      let newLike = await Like.create({
        user: user._id,
        likeable: likeableId,
        onModel: type,
      });
      likeable.likes.push(newLike._id);
      likeable.save();
    }
    return res.status(200).json({
      message: "Request Successfull",
      data: {
        deleted: deleted,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error please try again later.",
    });
  }
};
