const Like = require("../models/like");
const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.toggleLike = async (req, res) => {
  let post;
  const { likeableId, type } = req.body;
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
      await likeable.likes.pull(existingLike._id);
      await likeable.save();
      await existingLike.remove();
      deleted = true;
      post = await Post.findById(likeableId)
        .populate("user")
        .populate({
          path: "comments",
          populate: { path: "user" },
        })
        .populate({ path: "likes", populate: { path: "user" } });
    } else {
      let newLike = await Like.create({
        user: user._id,
        likeable: likeableId,
        onModel: type,
      });
      await likeable.likes.push(newLike._id);
      await likeable.save();
      post = await Post.findById(likeableId)
        .populate("user")
        .populate({
          path: "comments",
          populate: { path: "user" },
        })
        .populate({ path: "likes", populate: { path: "user" } });
    }
    return res.status(200).json({
      message: "Request Successfull",
      data: {
        deleted: deleted,
        isPostLiked: !deleted,
        post: post,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error please try again later.",
    });
  }
};
