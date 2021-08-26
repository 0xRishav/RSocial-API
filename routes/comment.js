const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comment_controller");
const middlewares = require("../middlewares");


router.post(
  "/delete-comment",
  middlewares.checkAuth,
  CommentController.deleteComment
);

module.exports = router;
