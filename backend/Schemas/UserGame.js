//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const UserGameSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    gameId: {type: Schema.Types.ObjectId, ref: 'Game'},
    platformId: {type: Schema.Types.ObjectId, ref: 'Platform'},
    isFavorite: Boolean
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('UserGame', UserGameSchema);