//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: String,
    platform: String
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Game', GameSchema );