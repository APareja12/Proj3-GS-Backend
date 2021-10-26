const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const session = require("express-session")
const methodOverride = require('method-override')
const indexController = require('./controllers/index');
const usersController = require('./controllers/users');
const filmsController = require('./controllers/films')


const app = express()
require('dotenv').config();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('connected', () => {
    console.log(`Connected to MongoDB`)
});
db.on('error', (error) => {
    console.log(`An Error Occurred with MongoDB ${error.message}`)
});

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(methodOverride())
app.use(cors());
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  )

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
// app.get("/", (req, res) => {
//   res.send("hello world");
// });

app.use('/index', indexController);
app.use('/users', usersController);
app.use('/films', filmsController);

app.listen(PORT, () => {
    console.log(`Sweet dreams are made of these:${PORT}`)
});