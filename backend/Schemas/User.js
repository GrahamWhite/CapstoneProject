//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const  Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    games: [],
    isAdmin: false,
    steamKey: null

});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('User', UserSchema );