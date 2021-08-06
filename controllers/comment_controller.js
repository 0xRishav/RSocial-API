const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.createComment = async (req, res) => {
  const { postId, comment } = req.body;
  const { user } = req;
  try {
    const commentDoc = await new Comment({
      user: user._id,
      comment,
      post: postId,
    }).save();
    const post = await Post.findById(postId);
    post.comments.push(commentDoc._id);
    post.save();
    const newPost = await Post.findById(postId).populate({
      path: "comments",
      populate: { path: "user" },
    });
    const comments = await Comment.find({ post: postId }).populate("user");
    return res.status(200).json({ data: { comments, newPost } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
module.exports.deleteComment = async (req, res) => {
  const { postId, commentId } = req.body;
  const { user } = req;
  try {
    const commentDoc = await new Comment({
      user: user._id,
      comment,
      post: postId,
    }).save();
    const comments = await Comment.find({ post: postId }).populate("user");
    return res.status(200).json({ data: { comments } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
