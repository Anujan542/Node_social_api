const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
} = require("../controller/userController");
const router = express.Router();

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/:id/follow").put(followUser);
router.route("/:id/unfollow").put(unfollowUser);

module.exports = router;
