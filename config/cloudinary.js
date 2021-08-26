require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { uploader } = require("cloudinary").v2;
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

const cloudinaryConfig = (req, res, next) => {
  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  next();
};

module.exports = { cloudinaryConfig, uploader };
