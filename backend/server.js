//Declarations
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema Imports
const User = require('../backend/Schemas/User');
const Game = require('../backend/Schemas/Game');

const res = require("express");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//THESE WILL BE MOVED TO A NEW DIRECTORY FOR ROUTES
//User Routes
app.get('/users', (req, res) => {

    let users = User.find().then(r => {
        res.send(r);
    })
});
app.post('/user', (req, res) => {
    let _username = req.body.username;

    let user = new User({
        username: req.query.username,
        password: req.query.password,
        email: req.query.email
    });

    user.save().then(r => {
        console.log(r);
        res.send(r);
    });

});

//Game Routes
app.get('/games', (req, res) => {

    let users = Game.find().then(r => {
        res.send(r);
    })
});
app.post('/game', (req, res) => {
    let _username = req.body.username;

    let game = new Game({
        name: req.query.name
    });

    game.save().then(r => {
        console.log(r);
        res.send(r);
    });

});


//Initialize connection to MongoDb
try {

    const connectDb = () => {
        return mongoose.connect(process.env.ATLAS_URI);
    };

    const db = mongoose.connection;

    connectDb().then(async () => {
        app.listen(process.env.PORT, (err) => {
            if(err)
                console.log('Error:' + err);
            else
                console.log(`Example app listening on port ${process.env.PORT}!`);

        });
    });

} catch (error) {
    console.log("Error:" + error);
}




