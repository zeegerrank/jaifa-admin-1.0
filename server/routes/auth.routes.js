const router = require("express").Router();const User = require("../models/User");
const Profile = require("../models/Profile");

/**middle ware */
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  /**check if username, password and email is prompt */
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

module.exports = router;
