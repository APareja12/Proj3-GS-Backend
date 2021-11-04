const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const session = require("express-session")
const admin = require('firebase-admin')
const usersController = require('./controllers/users');
const filmsController = require('./controllers/films')
const contactsController = require('./controllers/contacts')


const app = express()
require('dotenv').config();

const PORT = process.env.PORT;
const { 
 CLIENT_ID,
  DATABASE_URL,
  PRIVATE_KEY,
  PRIVATE_KEY_ID} = process.env;

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('connected', () => {
    console.log(`Connected to MongoDB`)
});
db.on('disconnected', () => console.log('Disconnected to MongoDB'));
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
    credential: admin.credential.cert({
      "type": "service_account",
      "project_id": "golden-silence-75a09",
      "private_key_id": PRIVATE_KEY_ID,
      "private_key": PRIVATE_KEY.replace(/\\n/g, '\n'),
      "client_email": "firebase-adminsdk-t32m3@golden-silence-75a09.iam.gserviceaccount.com",
      "client_id": CLIENT_ID,
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-t32m3%40golden-silence-75a09.iam.gserviceaccount.com"
    })
  });
  
app.use( async function(req, res, next) {
    const token = req.get('Authorization');
    if (token) 
    {const authUser = await admin.auth().verifyIdToken(token.replace('Bearer ', ''))
    req.user = authUser; 
  }
     next();
  });

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
app.use('/users', usersController);
app.use('/films', filmsController);

app.get('/api/*', (req, res) => {
  res.status(404).json({message: 'That route was not found'})
});
app.listen(PORT, () => {
    console.log(`Sweet dreams are made of these:${PORT}`)
});