const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user_controller");
const UploadController = require("../controllers/upload_controller");
const middlewares = require("../middlewares");
const FollowController = require("../controllers/follow_controller");
const LikeController = require("../controllers/like_controller");
const { multerUploads } = require("../config/multer");

router.post("/signup", UserController.signUp);
router.post("/login", UserController.logIn);
router.post("/logout", UserController.logOut);
router.post("/generate-access-tokens", UserController.generateAccessTokens);
router.post(
  "/upload-cover-picture",
  multerUploads,
  UploadController.uploadCoverPhoto
);
router.post(
  "/upload-profile-picture",
  multerUploads,
  UploadController.uploadProfilePhoto
);

router.post("/follow", middlewares.checkAuth, FollowController.Follow);

router.post(
  "/remove-follower",
  middlewares.checkAuth,
  FollowController.removeFollower
);

router.post(
  "/remove-following",
  middlewares.checkAuth,
  FollowController.removeFollowing
);

module.exports = router;
