const Story = require("../models/story");
const moment = require("moment");

module.exports.fetchAllStories = async (req, res) => {
  const { user } = req;
  try {
    if (user) {
      var date = moment().subtract(24, "hours").utc().format();
      const activeStories = await Story.find({
        createdAt: { $gt: date },
      }).populate("user");
      return res.status(200).json({ data: { activeStories } });
    } else {
      return res.status(403).json({ message: "User does not exist" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
