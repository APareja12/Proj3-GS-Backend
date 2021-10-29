const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const session = require("express-session")
const admin = require('firebase-admin')
const serviceAccount = require('./golden-silence-75a09-firebase-adminsdk-t32m3-9a70623378.json')
const indexController = require('./controllers/index');
const usersController = require('./controllers/users');
const filmsController = require('./controllers/films')
const contactsController = require('./controllers/contacts')


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
app.use(cors());
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  )

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
app.use( async function(req, res, next) {
    const token = req.get('Authorization');
    if (token) {const authUser = await admin.auth().verifyIdToken(token.replace('Bearer ', ''))
    req.user = authUser }
     next();
  })

function isAuthenticated(req, res, next) {
  if(req.user) return next();
  else res.status(401).json({message: 'unauthorized'})
} 
  
///////////////////////////////
// ROUTES
////////////////////////////////
app.get('/api', (req, res) => {
  res.json({message: 'Welcome to the Golden Silence'})
});


app.use('/api/contacts', isAuthenticated, contactsController);
app.use('/index', indexController);
app.use('/users', usersController);
app.use('/films', filmsController);

app.get('/api/*', (req, res) => {
  res.status(404).json({message: 'That route was not found'})
});
app.listen(PORT, () => {
    console.log(`Sweet dreams are made of these:${PORT}`)
});