const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contactSchema = new Schema ({
    firstName: String,
    lastName: String, 
    email: String, 
    companyName: String,
    managedBy: String,
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);