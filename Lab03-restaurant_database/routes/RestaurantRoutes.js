const express = require("express");
const restaurantModel = require("../models/restaurant");
const app = express();

//http://localhost:3000/restaurants/cuisine/Japanese
app.get("/restaurants/cuisine/:name", async (req, res) => {
  const name = req.params.name;
  const restaurants = await restaurantModel.find({ cuisine: name });
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

//http://localhost:3000/restaurants?sortBy=ASC
app.get("/restaurants", async (req, res) => {
  if (Object.keys(req.query).length == 0) {
    const restaurants = await restaurantModel.find({});
    try {
      console.log(restaurants[0].surname);
      res.status(200).send(restaurants);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    const sortBy = req.query.sortBy;
    const restaurants = await restaurantModel
      .find({})
      .select("id cuisines name city resturant_id")
      .sort({ resturant_id: sortBy });
    try {
      res.status(200).send(restaurants);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

//http://localhost:3000/restaurants/Delicatessen
app.get("/restaurants/restaurants/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const restaurants = restaurantModel
      .find({ cuisine: name }, { _id: 0, cuisines: 1, name: 1, city: 1 })
      .where("city")
      .ne("Brooklyn")
      .sort("name")
      .exec((err, data) => {
        if (err) {
          res.send(JSON.stringify({ status: false, message: "No data found" }));
        } else {
          res.send(data);
        }
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

//http://localhost:3000/restaurant
app.post("/restaurant", async (req, res) => {
  console.log(req.body);

  try {
    await restaurantModel.insertMany(req.body, (err) => {
      if (err) res.send(err);
      else res.send("records inserted");
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
