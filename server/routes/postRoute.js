const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  likeORdislikePost,
  getPost,
  timelinePost,
} = require("../controller/postCOntroller");
const router = express.Router();

router.route("/").post(createPost);
router.route("/timeline").get(timelinePost);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);
router.route("/:id/likes").put(likeORdislikePost);

module.exports = router;
