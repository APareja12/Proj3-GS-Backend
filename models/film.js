const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
	title: String,
	year: String,
    director: String,
    country: String,
}, {timestamps: true });

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;