const express = require('express');
const mongoose = require('mongoose');
const restaurantRouter = require('./routes/restaurantRoutes.js');

const app = express();
app.use(express.json()); // Make sure it comes back as json
mongoose.connect('mongodb+srv://RFabris:chesss@cluster0.vpwwg.mongodb.net/RestaurantsDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(restaurantRouter);

app.listen(3000, () => { console.log('Server is running...') });