const express = require('express');
const mongoose = require('mongoose');
const resturantRouter = require('./routes/resturantroutes.js');

const app = express();
app.use(express.json()); 
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(resturantRouter);

app.listen(5000, () => { console.log('Server is running...') });