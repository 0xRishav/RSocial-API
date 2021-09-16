const User = require("../models/user");

module.exports.Follow = async (req, res) => {
  const { userIdToFollow } = req.body;
  const { user } = req;
  try {
    user.followings.push(userIdToFollow);
    await user.save();
    const newUser = await User.findById(user._id).populate("posts");
    return res.status(200).json({
      message: "Followed successfully",
      data: { newUser },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

module.exports.unfollow = async (req, res) => {
  const { userIdToUnfollow } = req.body;
  const { user } = req;
  try {
    const index = user.followings.indexOf(userIdToUnfollow);
    user.followings.splice(index, 1);
    await user.save();

    const newUser = await User.findById(user._id).populate("posts");

    return res.status(200).json({
      message: "Unfollowed successfully",
      data: { newUser },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

module.exports.removeFollower = async (req, res) => {
  const { userIdToRemove } = req.body;
  const { user } = body;
  try {
    const index = user.followers.indexOf(userIdToRemove);
    user.followers.splice(index, 1);
    await user.save();
    return res.status(200).json({
      message: "Follow deleted successfully",
      data: { user },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};
