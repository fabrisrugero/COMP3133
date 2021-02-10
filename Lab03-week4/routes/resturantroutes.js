const express = require("express");
const restaurantModel = require("../models/resturantModel.js");
const app = express();

http://localhost:5000/restaurants
app.get("/restaurants", async (req, res) => {
  console.log("Question 1");
  const restaurants = await restaurantModel.find({});
  results(res, restaurants);
});

//Search By cuisine - PATH Parameter
//http://localhost:5000/restaurants/cuisine/Japanese
//http://localhost:5000/restaurants/cuisine/Bakery
//http://localhost:5000/restaurants/cuisine/Italian
app.get("/restaurants/cuisine/:search", async (req, res) => {
  console.log("Question 2");
  const restaurants = await restaurantModel.find({
    cuisine: { $eq: req.params.search },
  });
  results(res, restaurants);
});

//http://localhost:5000/restaurants?sortBy=ASC
//http://localhost:5000/restaurants?sortBy=DESC
app.get("/restaurants", async (req, res) => {
  console.log("Question 3");
  const restaurants = await restaurantModel
    .find({})
    .select("-_id cuisine name city restaurant_id")
    .sort({ city: req.query.sortBy });
  results(res, restaurants);
});
// http://localhost:5000/restaurants/Delicatessen
app.get("/restaurants/:search", async (req, res) => {
  console.log(req.params);
  const cuisine = req.params.search;
  const restaurants = await restaurantModel
    .find({
      $and: [{ cuisine: { $eq: cuisine } }, { city: { $ne: "Brooklyn" } }],
    })
    .select("cuisine name city")
    .sort({ name: "ASC" });
  results(res, restaurants);
});

const results = (res, restaurants) => {
  try {
    if (restaurants.length != 0) {
      res.send(restaurants);
    } else {
      res.send(
        JSON.stringify({
          status: false,
          message: "No data found",
          data: restaurants,
        })
      );
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = app;
