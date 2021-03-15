//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    userMatchId: {type: Schema.Types.ObjectId, ref: 'User'}
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Match', MatchSchema);