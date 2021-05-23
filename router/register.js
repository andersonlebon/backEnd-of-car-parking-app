const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const _ = require("lodash");
const { response } = require("express");
const router = express.Router();
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  passWord: String,
  isAdmin: Boolean,
});
userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("Users", userSchema);

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});
router.get("/:id", async (req, res) => {
  const user = await User.find({ _id: req.params.id });
  if (user.length === 0)
    return res.status(400).send("sorry the user was not found");
  res.send(user);
});
router.post("/", async (req, res) => {
  const checkuser = await User.findOne({ email: req.body.email });
  if (checkuser) return res.status(400).send("this user existe already");
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    passWord: req.body.passWord,
    isAdmin: req.body.isAdmin,
  });
  const salt = await bcrypt.genSalt(10);
  user.passWord = await bcrypt.hash(user.passWord, salt);
  await user.save();
  const token = user.generateToken();
  res.header("x-auth-token", token).send(_.pick(user, ["_id", "name"]));
});
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, passWord } = req.body;
  const user = await User.findByIdAndUpdate(id, {
    $set: {
      name,
      email,
      passWord,
    },
  });
  if (user.length === 0)
    return res.status(400).send("sorry the user was not found");
  res.send(user);
});
router.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  const user = await User.findByIdAndRemove({ _id });
  if (user.length === 0)
    return res.status(400).send("sorry the user was not found");
  res.send(user);
});
module.exports = {
  register: router,
  User,
};
