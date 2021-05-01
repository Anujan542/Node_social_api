const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

//update user
exports.updateUser = asyncHandler(async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      const slat = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, slat);
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    res.status(201).json("Account has been updated");
  } else {
    return res.status(400).json("You can update only your account");
  }
});

//delete user
exports.deleteUser = asyncHandler(async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json("your account has been deleted");
  } else {
    return res.status(400).json("you can delete only your account");
  }
});

//get user
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  const { password, updatedAt, ...other } = user._doc;

  if (other) {
    res.status(200).json({ other });
  } else {
    res.status(400).json("Not found");
  }
});

// follow a user
exports.followUser = asyncHandler(async (req, res) => {
  if (req.body.userId !== req.params.id) {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if (!user.followers.includes(req.body.userId)) {
      await user.updateOne({ $push: { followers: req.body.userId } });
      await currentUser.updateOne({ $push: { following: req.params.id } });

      res.status(200).json("user has been followed");
    } else {
      res.status(400).json("you already follow this user");
    }
  } else {
    return res.status(400).json("you can not follow");
  }
});

// unfollow a user
exports.unfollowUser = asyncHandler(async (req, res) => {
  if (req.body.userId !== req.params.id) {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if (user.followers.includes(req.body.userId)) {
      await user.updateOne({ $pull: { followers: req.body.userId } });
      await currentUser.updateOne({ $pull: { following: req.params.id } });

      res.status(200).json("user has been unfollowed");
    } else {
      res.status(400).json("you dont follow this user");
    }
  } else {
    return res.status(400).json("you can not unfollow yourself");
  }
});
