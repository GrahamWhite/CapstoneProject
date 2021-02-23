//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const  Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    games: [{type: Schema.Types.ObjectId, ref: 'Game'}],
    isAdmin: Boolean,
    steamKey: String,
    friends:  [{type: Schema.Types.ObjectId, ref: 'Friend'}],
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('User', UserSchema );