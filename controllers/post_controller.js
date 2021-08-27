const User = require("../models/user");
const Post = require("../models/post");

module.exports.createPost = async (req, res) => {
  const { caption, url, public_id } = req.body;
  const { user } = req;
  try {
    const post = await new Post({
      caption,
      user: user._id,
      photoUrl: url,
      photoPublicId: public_id,
    }).save();
    user.posts.push(post._id);
    await user.save();
    return res.status(200).json({ message: "Post created successfully", post });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.fetchUserPosts = async (req, res) => {
  const { user } = req;
  console.log(user._id);
  try {
    const posts = await Post.find({ user: user._id })
      .populate({ path: "likes", populate: { path: "user" } })
      .populate({ path: "comments", populate: { path: "user" } });

    console.log(posts);
    return res.status(200).json({ data: { posts } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user").populate({ path: "likes", populate: { path: "user" } });
    return res.status(200).json({ data: { posts } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
module.exports.deletePost = async (req, res) => {
  const { postId } = req.body;
  const { user } = req;
  try {
    const post = await Post.find({ _id: postId });
    if (post.user === user._id) {
      await Post.findByIdAndDelete(postId);
      return res.status(200).json({ message: "Post deleted successfully" });
    } else {
      return res
        .status(401)
        .json({ message: "User not autherized to delete this post." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.fetchPost = async (req, res) => {
  const { postId } = req.body;
  const { user } = req;
  try {
    const post = await Post.findById(postId);
    const populatedPost = await Post.findById(postId)
      .populate("user")
      .populate({
        path: "comments",
        populate: { path: "user" },
      })
      .populate({ path: "likes", populate: { path: "user" } });
    const isPostLiked = post.likes.includes(user._id);
    return res.status(200).json({ data: { populatedPost, isPostLiked } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.fetchPostLikes = async (req, res) => {
  const { postId } = req.body;
  try {
    const post = await Post.findById(postId).populate({
      path: "likes",
      populate: { path: "user" },
    });
    return res.status(200).json({ data: { post } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
