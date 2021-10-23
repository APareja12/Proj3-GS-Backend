const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const skillsController = require('./controllers/skills');
const cors = require('cors');

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

app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`)
});