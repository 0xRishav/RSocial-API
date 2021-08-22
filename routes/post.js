const express = require("express");
const router = express.Router();

const { multerUploads } = require("../config/multer");

const PostController = require("../controllers/post_controller");

const UploadController = require("../controllers/upload_controller");
const LikeController = require("../controllers/like_controller");

const middlewares = require("../middlewares");
const CommentController = require("../controllers/comment_controller");

router.post(
  "/create-comment",
  middlewares.checkAuth,
  CommentController.createComment
);

router.post("/fetch-post", middlewares.checkAuth, PostController.fetchPost);

router.post(
  "/upload-photo",
  middlewares.checkAuth,
  multerUploads,
  UploadController.uploadPostPhoto
);

router.post("/create-post", middlewares.checkAuth, PostController.createPost);

router.get(
  "/fetch-user-posts",
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
  "/create-comment",
  middlewares.checkAuth,
  CommentController.createComment
);

router.post(
  "/post/fetch-post-likes",
  middlewares.checkAuth,
  PostController.fetchPostLikes
);

router.post("/like/toggle", middlewares.checkAuth, LikeController.toggleLike);

module.exports = router;
