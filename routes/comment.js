const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comment_controller");
const middlewares = require("../middlewares");

router.post(
  "/create-comment",
  middlewares.checkAuth,
  CommentController.createComment
);

router.post(
  "/delete-comment",
  middlewares.checkAuth,
  CommentController.deleteComment
);

module.exports = router;
