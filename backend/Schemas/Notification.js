//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const  Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    message: String,
    isRead: Boolean
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Notification', UserSchema );