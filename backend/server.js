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

async function GetGameId(game) {
    Game.find(game).then(res => {
        return res[0]._id;
    });
}

//THESE WILL BE MOVED TO A NEW DIRECTORY FOR ROUTES
//User Routes
app.get('/users', (req, res) => {

    User.find().then(r => {
        res.send(r);
    })
});
app.post('/userId', (req, res) => {

    let userName = req.query.name;

    Game.findOne({username: userName}).then(r => {
        res.send(r.id);
    });

});


function LogGames(gameArr)
{
    let games = [];
    for(let x = 0; x < gameArr.length; x++)
    {
       let game = gameArr[x];
       Game.find({"name": game.name}).then(res => console.log(res));
    }


}

app.get('/user', (req, res) => {
    let userReq = req.body.username;

    User.find({username: userReq}).then(r => {
        res.send(r);
    });

});

app.post('/user', (req, res) => {


    let example = {
        name: "crysis"
    }

    let user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        isAdmin: false,
        steamKey: "",
        games: [],
        friends: []
    });



    user.save();

    res.send(user);
});

app.get('/games', (req, res) => {

    Game.find().then(r => {
        res.send(r);
    });
});
app.get('/gameId', (req, res) => {

    let gameName = req.body.name;

    Game.findOne({name: gameName}).then(r => {
        res.send(r.id);
    });
});
app.post('/game', (req, res) => {

    let game = new Game({
        name: req.body.name,
        platform: req.body.platform
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




