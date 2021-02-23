//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const  Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    games: [String],
    isAdmin: Boolean,
    steamKey: String

});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('User', UserSchema );