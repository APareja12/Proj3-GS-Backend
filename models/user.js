// Require our dependencies
const mongoose = require('mongoose');

// Create the Schema shortcut variable
const Schema = mongoose.Schema;

// Create a user Schema
// The userSchema will have the following fields

// 1) username - String
// 2) password field - String
// 3) (optional) timestamps 

const userSchema = new Schema({
    username: String,
    password: String,
}, { timestamps: true });


// Export the result of compiling our Schema into a model
module.exports = mongoose.model('User', userSchema);