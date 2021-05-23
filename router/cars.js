const auth = require("../midleware/auth");
const admin = require("../midleware/admin");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const http = "/";
const httpWithId = "/:id";

const carShema = mongoose.Schema({
  driver: {
    type: String,
    // required: "true",
    // minlength = 3
  },
  email: {
    type: String,
    // required: true,
  },
  type: String,
  plaque: String,
  phoneNumber: String,
});
const Car = mongoose.model("Car", carShema);

router.post(http, auth, async (req, res) => {
  const { driver, email, plaque, phoneNumber, type } = req.body;
  const car = new Car({
    driver,
    plaque,
    email,
    phoneNumber,
    type,
  });
  const result = await car.save();
  res.send(result);
});
router.get(http, async (req, res) => {
  const cars = await Car.find();
  res.send(cars);
});
router.get(httpWithId, async (req, res) => {
  const id = req.params.id;
  const car = await Car.find({ _id: id });
  if (car.length === 0)
    return res.status(400).send("sorry the car wa not found");
  res.send(car);
});
router.put(httpWithId, auth, async (req, res) => {
  const id = req.params.id;
  const { driver, email, plaque, phoneNumber, type } = req.body;
  const car = await Car.findByIdAndUpdate(
    id,
    {
      $set: {
        driver: driver,
        plaque: plaque,
        email: email,
        phoneNumber: phoneNumber,
        type: type,
      },
    },
    { new: true }
  );
  CarNotFound(car, res);
  res.send(car);
});
router.delete(httpWithId, [auth, admin], async (req, res) => {
  const id = req.params.id;
  const car = await Car.findByIdAndRemove({ _id: id });
  CarNotFound(car, res);
  res.send(car);
});
const CarNotFound = async (Car, res) => {
  if (!Car) {
    return res.status(400).send("sorry the car wa not found");
  }
};
module.exports = router;
