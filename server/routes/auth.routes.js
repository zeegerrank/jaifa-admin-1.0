const router = require("express").Router();const User = require("../models/User");
const Profile = require("../models/Profile");

/**middle ware */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  /**check if username, password and email is prompted */
  if (!username || !email || password) {
    return res.status(400).send({ message: "Fill the requirement" });
  }

  /**check if username is already used */
  const foundUser = await User.findOne({ username });
  if (username === foundUser.username) {
    return res.status(400).send({ message: "Username is already used" });
  }

  /**check if email is already used */
  if (email === foundUser.username) {
    return res.status(400).send({ message: "Email is already used" });
  }

  /**hash password */
  const saltRound = 10;
  const hashedPassword = await bcrypt.hashSync(password, saltRound);

  /**pre-save new user */
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });
  await newUser.save();

  return res.status(201).send({ message: "New user is created", newUser });
});

router.post("login", async (req, res) => {
  /**deconstruct request body */
  const { username, password } = req.body;

  /**check if username and password is prompted */
  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Username and password are required" });
  }

  /**find user using username */
  const user = User.findOne({ username });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  /**check if password is valid */
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).send({ message: "Password is invalid" });
  }

  //**check if user is currently logged in */
  //**which could be hacked */
  const userLoggedIn = user.refreshToken;
  if (userLoggedIn) {
    user.updateOne({ refreshToken: null });
    return res.status(401).send({ message: "Please login again" });
  }

  /**create access token */
  const JWT_SECRET = process.env.JWT_SECRET;
  const accessToken = jwt.sign({ user: username }, JWT_SECRET, {
    expiresIn: "1m",
  });

  /**create refresh token */
  const randomNumbers = (Math.random() + 1).toString(4);
  const refreshToken = jwt.sign({ id: user._id }, randomNumbers, JWT_SECRET);

  /**add new refresh token to user db document */
  await user.updateOne({ refreshToken });

  /**send refresh token as cookies to client */
  res.cookie("token", refreshToken);

  /**send access token attached to header  */
  return res.status(200).send({ message: "Login success", token: accessToken });
});

module.exports = router;
