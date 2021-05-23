const express = require("express");
const config = require("config");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("./register");

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or passWord");

  const passWord = await bcrypt.compare(req.body.passWord, user.passWord);
  if (!passWord) return res.status(400).send("Invalid email or passWord");
  const token = user.generateToken();
  res.send(token);
});
module.exports = router;
