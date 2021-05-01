const asyncHandler = require("express-async-handler");
const Post = require("../model/Post");
const User = require("../model/User");

//create post
exports.createPost = asyncHandler(async (req, res) => {
  const newPost = new Post(req.body);

  const savedPOst = await newPost.save();

  if (savedPOst) {
    res.status(201).json(savedPOst);
  } else {
    res.status(400).json("not found");
  }
});

//update post
exports.updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.userId === req.body.userId) {
    await Post.updateOne({ $set: req.body });
    res.status(201).json("post has been updated");
  } else {
    res.status(401).json("you can update only your post");
  }
});

// delete post
exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.userId === req.body.userId) {
    await Post.deleteOne();
    res.status(201).json("post has been deleted");
  } else {
    res.status(401).json("you can delete only your post");
  }
});

//like or dislike post
exports.likeORdislikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post.likes.includes(req.body.userId)) {
    await Post.updateOne({ $push: { likes: req.body.userId } });

    res.status(201).json("The post has been liked");
  } else {
    await Post.updateOne({ $pull: { likes: req.body.userId } });
    res.status(201).json("The post has been disliked");
  }
});

//get post
exports.getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(400).json("Not Found");
  }
});

//timeline post
exports.timelinePost = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.body.userId);
  const userPosts = await Post.find({ userId: currentUser._id });

  const friendPosts = await Promise.all(
    currentUser.following.map((friendId) => {
      return Post.find({ userId: friendId });
    })
  );
  res.status(201).json(userPosts.concat(...friendPosts));
});
