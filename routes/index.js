const express = require("express");
const { cloudinary } = require("cloudinary");
const User = require("./user");
require("../models/post");
require("../models/comment");
const StoryController = require("../controllers/story_controller");
const UploadController = require("../controllers/upload_controller");
const middlewares = require("../middlewares");
const { multerUploads } = require("../config/multer");

const router = express.Router();
const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);
router.use("/user", require("./user"));
router.use("/post", require("./post"));
router.use("/comment", require("./comment"));
router.use("/story", require("./story"));



router.get(
  "/stories/create",
  middlewares.checkAuth,
  multerUploads,
  StoryController.fetchAllStories
);

module.exports = router;
