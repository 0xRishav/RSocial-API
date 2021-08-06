module.exports.Follow = async (req, res) => {
  const { userIdToFollow } = req.body;
  const { user } = body;
  try {
    user.following.push(userIdToFollow);
    await user.save();
    return res.status(200).json({
      message: "Followed successfully",
      data: { user },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

module.exports.removeFollowing = async (req, res) => {
  const { userIdToRemove } = req.body;
  const { user } = body;
  try {
    const index = user.followings.indexOf(userIdToRemove);
    user.following.splice(index, 1);
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
