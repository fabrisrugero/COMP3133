const express = require("express");
const mongoose = require("mongoose");
const restaurantRouter = require("./routes/resturantroutes.js");

const app = express();
app.use(express.json());
mongoose.connect(
  "mongodb://localhost:27017/COMP3123",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

app.use(restaurantRouter);

app.listen(5000, () => {
  console.log("Server is running...");
});
