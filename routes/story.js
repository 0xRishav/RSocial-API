const express = require("express");
const router = express.Router();

const StoryController = require("../controllers/story_controller");

const UploadController = require("../controllers/upload_controller");

const middlewares = require("../middlewares");

const { multerUploads } = require("../config/multer");

router.get(
  "/all-stories",
  middlewares.checkAuth,
  StoryController.fetchAllStories
);
router.post(
  "/upload-story",
  middlewares.checkAuth,
  multerUploads,
  UploadController.createStory
);

module.exports = router;
