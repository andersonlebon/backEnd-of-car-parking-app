const express = require("express");
const auth = require("../router/auth");
const cars = require("../router/cars");
const { register } = require("../router/register");
module.exports = function (app) {
  app.use(express.json());
  app.use("/car-parking.com/api/cars", cars);
  app.use("/car-parking.com/api/users", register);
  app.use("/car-parking.com/api/auth", auth);
};
