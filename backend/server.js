/*
SUMMARY
 */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const app = express();
const port = process.env.PORT || 5000;


//Schema Imports
const User = require('../backend/Schemas/User');
const Game = require('../backend/Schemas/Game');
const UserGame = require('./Schemas/UserGame');


const {FindUserByUsername} = require("./Controllers/UserController");
const {FindAllUsers} = require("./Controllers/UserController");
const {CreateNewUser} = require("./Controllers/UserController");
const {UserLogin} = require("./Controllers/UserController");


const {SelectAllGames} = require("./Controllers/GameController");

const {InsertUserGame} = require("./Controllers/UserGameController");


require('dotenv').config();

app.use(cors());
app.use(express.json());



//User Routes
app.get('/users', (req, res) => {
    FindAllUsers(req, res);
});
app.get('/user', (req, res) => {
    FindUserByUsername(req, res);
});
app.post('/user', (req, res) => {
    CreateNewUser(req, res);
});
app.post('/login', (req, res) => {
    UserLogin(req, res);
});
//Game Routes
app.get('/games', (req, res) => {
    SelectAllGames(req,res);
});
//UserGame Routes
app.post('/userGame', (req, res) => {
    InsertUserGame(req, res);
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




