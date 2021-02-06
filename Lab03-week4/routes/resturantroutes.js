const express = require("express");
const restaurantModel = require("../models/resturantModel.js");
const app = express();

//http://localhost:5000/restaurants
app.get("/restaurants", async (req, res) => {
  const restaurants = await restaurantModel.find({});
  try {
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Search By cuisine - PATH Parameter
//http://localhost:5000/restaurants/cuisine/Japanese
//http://localhost:5000/restaurants/cuisine/Bakery
//http://localhost:5000/restaurants/cuisine/Italian
app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  const cuisine = req.params.cuisine;
  const restaurants = await restaurantModel.find({ cuisine });
  try {
    if (restaurants.length != 0) {
      res.send(restaurants);
    } else {
      res.send(JSON.stringify({ status: false, message: "No data found" }));
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//http://localhost:5000/restaurants?sortBy=ASC
//http://localhost:5000/restaurants?sortBy=DESC
app.get("/employee", async (req, res) => {
  const restaurants = await restaurantModel
    .find({})
    .select("id cuisine name city resturant_id")
    .sort({ salary: req.query.sortBy });
  try {
    res.send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});
// http://localhost:5000/restaurants/Delicatessen
app.get("/restaurants/:search", async (req, res) => {
  const cuisine = req.params.search;
  const restaurants = await restaurantModel
    .find({
      $and: [{ cuisine: { $eq: cuisine } }, { city: { $ne: "Brooklyn" } }],
    })
    .select("cuisine name city")
    .sort({ name: "ASC" });
  try {
    if (restaurants.length != 0) {
      res.send(restaurants);
    } else {
      res.send(JSON.stringify({ status: false, message: "No data found" }));
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
