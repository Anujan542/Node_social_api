const User = require("../model/User");
const asynHandler = require("express-async-handler");

exports.userRegister = asynHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400).json({ msg: "This user already exist" });
  }

  const newUser = await User.create({
    username,
    email,
    password,
  });

  if (newUser) {
    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
    });
  } else {
    res.status(400).json({
      msg: "Invalid User",
    });
  }
});

exports.userLogin = asynHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ msg: "Invalid Email" });
  }

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400).json({ msg: "Invalid Credentials" });
  }
});
