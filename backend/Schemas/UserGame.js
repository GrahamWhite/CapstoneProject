//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const UserGameSchema = new Schema({
    gameId: {type: Schema.Types.ObjectId, ref: 'Game'},
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    platformId: {type: Schema.Types.ObjectId, ref: 'User'},
    isFavorite: Boolean
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('UserGame', UserGameSchema);