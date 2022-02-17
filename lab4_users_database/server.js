const express = require('express');
const mongoose = require('mongoose');
const userModel = require("./models/User");

const app = express();
app.use(express.json()); // Make sure it comes back as json

mongoose.connect(
  "mongodb+srv://RFabris:chesss@cluster0.vpwwg.mongodb.net/RestaurantsDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//http://localhost:8081/user
app.post("/user", async (req, res) => {
  const user = new userModel(req.body);
  try {
    await user.save((err) => {
      if (err) res.send(err);
      else res.send(user);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(8081, () => { console.log('Server is running...') });