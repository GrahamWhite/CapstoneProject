//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const PlatformSchema = new Schema({
    name: String
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Platform', PlatformSchema );