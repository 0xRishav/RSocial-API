const User = require("../models/user");
const Story = require("../models/story");
const { uploader } = require("../config/cloudinary");
const DatauriParser = require("datauri/parser");
const { dataUri } = require("../config/multer");

const parser = new DatauriParser();

module.exports.uploadCoverPhoto = async (req, res) => {
  const { user } = req;
  try {
    if (user) {
      if (req.file) {
        const file = dataUri(req).content;
        const result = await uploader.upload(file);
        const { url, public_id } = result;
        user.coverPicture = url;
        user.coverPicturePublicId = public_id;
        await user.save();
        return res.status(200).json({
          message: "Image uploaded successfully.",
          data: { user },
        });
      } else {
        return res.status(403).json({ message: "File upload failed" });
      }
    } else {
      return res.status(404).json({ message: "User does not exist" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.uploadProfilePhoto = async (req, res) => {
  let { user } = req;
  try {
    if (user) {
      if (req.file) {
        const file = dataUri(req).content;
        const result = await uploader.upload(file);
        const { url, public_id } = result;
        user.profilePicture = url;
        user.profilePicturePublicId = public_id;
        await user.save();
        return res.status(200).json({
          message: "Image uploaded successfully.",
          data: { user },
        });
      } else {
        return res.status(403).json({ message: "File upload failed" });
      }
    } else {
      return res.status(404).json({ message: "User does not exist" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.uploadPostPhoto = async (req, res) => {
  const user = req.user;
  try {
    if (user) {
      if (req.file) {
        const file = dataUri(req).content;
        const result = await uploader.upload(file);
        const { url, public_id } = result;
        return res.status(200).json({
          message: "File uploaded successfully",
          data: { url, public_id },
        });
      }
    } else {
      return res.status(404).json({ message: "User does not exist" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.createStory = async (req, res) => {
  const user = req.user;
  try {
    if (user) {
      if (req.file) {
        const file = dataUri(req).content;
        const result = await uploader.upload(file);
        const { url, public_id } = result;
        const story = await new Story({
          user: user._id,
          photoUrl: url,
          photoPublicId: public_id,
        }).save();

        return res.status(200).json({
          message: "Story created successfully",
        });
      }
    } else {
      return res.status(404).json({ message: "User does not exist" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
