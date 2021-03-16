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



const {SelectUser} = require("./Controllers/UserController");
const {SelectUsers} = require("./Controllers/UserController");
const {CreateUser} = require("./Controllers/UserController");
const {UserExists} = require("./Controllers/UserController");
const {Login} = require("./Controllers/UserController");



const {SelectGames} = require("./Controllers/GameController");
const {SelectGame} = require("./Controllers/GameController");
const {CreateGame} = require("./Controllers/GameController");
const {GameExists} = require("./Controllers/GameController");


const {SelectUserGames} = require("./Controllers/UserGameController");
const {UserGameExists} = require("./Controllers/UserGameController");
const {CreateUserGame} = require("./Controllers/UserGameController");


const {SelectFriendships} = require("./Controllers/FriendshipController");



const {GetUserId} = require("./Controllers/UserController");


require('dotenv').config();

app.use(cors());
app.use(express.json());

//User Routes
app.get('/users', (req, res) => {
    SelectUsers(req, res);
});

app.get('/user', (req, res) => {
    SelectUser(req, res);
});

app.post('/user', (req, res) => {
    CreateUser(req, res);
});

app.post('/login', (req, res) => {
    Login(req, res);
});

app.post('/user_id', (req, res) => {
    GetUserId(req, res);
});

app.post('/user_exists', (req, res)  => {
    UserExists(req, res);
});

app.post('/get_user_id', (req, res) => {
    GetUserId(req, res);
});

//GAME Routes
app.get('/games', (req, res) => {
    SelectGames(req, res);
});

app.get('/game', (req, res) => {
    SelectGame(req, res);
});

app.post('/game', (req, res) => {
    CreateGame(req, res);
});

app.post('/game_id', (req, res) => {
    GetGameId(req, res);
});

app.post('/game_exists', (req, res)  => {
    GameExists(req, res);
});

app.post('/get_game_id', (req, res) => {
    GetGameId(req, res);
});


//UserGame routes
app.get('/user_games', (req, res) => {
   SelectUserGames(req, res);
});

app.get('/user_game', (req, res) => {
    SelectUserGame(req, res);
});

app.post('/user_game', (req, res) => {
    CreateUserGame(req, res);
});
//UserGame routes
app.get('/user_game_exists', (req, res) => {
    UserGameExists(req, res);
});







app.get('/friends', (req, res) => {
    SelectFriendships(req, res);
});





/*
app.post('/user_game', (req, res) => {
    CreateUserGame(req, res);
});
*/




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




