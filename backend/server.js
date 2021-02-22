/*
SUMMARY
 */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const res = require("express");


const Schema = mongoose.Schema;
const app = express();
const port = process.env.PORT || 5000;


//Schema Imports
const User = require('../backend/Schemas/User');
const Game = require('../backend/Schemas/Game');




require('dotenv').config();

app.use(cors());
app.use(express.json());

//THESE WILL BE MOVED TO A NEW DIRECTORY FOR ROUTES
//User Routes
app.get('/users', (req, res) => {

    User.find().then(r => {
        res.send(r);
    })
});
app.post('/user', (req, res) => {

    let user = new User({
        username: req.query.username,
        password: req.query.password,
        email: req.query.email,
        games: {}
    });

    user.save().then(r => {
        console.log(r);
        res.send(r);
    });

});

app.get('/games', (req, res) => {

    Game.find().then(r => {
        res.send(r);
    });
});
app.get('/gameId', (req, res) => {

    let gameName = req.query.name;

    Game.findOne({name: gameName}).then(r => {
        res.send(r.id);
    });
});

app.post('/game', (req, res) => {

    let game = new Game({
        name: req.query.name,
        platform: req.query.platform
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




