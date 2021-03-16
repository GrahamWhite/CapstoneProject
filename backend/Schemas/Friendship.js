//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const FriendshipSchema = new Schema({
    username1: {type: Schema.Types.ObjectId, ref: 'User'},
    username2: {type: Schema.Types.ObjectId, ref: 'User'}
});



//Export function to create "SomeModel" model class
module.exports = mongoose.model('Friendship', FriendshipSchema);