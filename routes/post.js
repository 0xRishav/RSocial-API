const express = require("express");
const router = express.Router();

const { multerUploads } = require("../config/multer");

const PostController = require("../controllers/post_controller");

const UploadController = require("../controllers/upload_controller");
const LikeController = require("../controllers/like_controller");

const middlewares = require("../middlewares");

router.post(
  "/upload-photo",
  middlewares.checkAuth,
  multerUploads,
  UploadController.uploadPostPhoto
);

router.post("/create-post", middlewares.checkAuth, PostController.createPost);

router.post(
  "/get-user-post",
  middlewares.checkAuth,
  PostController.fetchUserPosts
);

router.get(
  "/fetch-all-posts",
  middlewares.checkAuth,
  PostController.fetchAllPosts
);

router.post("/delete-post", middlewares.checkAuth, PostController.deletePost);

router.post(
  "/fetch-post-comments",
  middlewares.checkAuth,
  PostController.fetchPostComments
);

router.post(
  "/post/fetch-post-likes",
  middlewares.checkAuth,
  PostController.fetchPostLikes
);

router.post("/like/toggle", middlewares.checkAuth, LikeController.toggleLike);

module.exports = router;
