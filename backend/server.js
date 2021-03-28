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
const Platform = require('../backend/Schemas/Game');



const UserController = require("./Controllers/UserController");
const GameController = require("./Controllers/GameController");
const PlatformController = require("./Controllers/PlatformController");
const UserGameController = require("./Controllers/UserGameController");


require('dotenv').config();

app.use(cors());
app.use(express.json());

//User Routes
app.get('/select_users', (req, res) => {
    UserController.SelectUsers(req, res);
});
app.get('/search_users', (req, res) => {
    UserController.SearchUsers(req, res);
});



app.get('/select_user', (req, res) => {
    UserController.SelectUser(req, res);
});

app.post('/create_user', (req, res) => {
    UserController.CreateUser(req, res);
});

app.post('/get_user_id', (req, res) => {
    UserController.GetUserId(req, res);
});

app.post('/login', (req, res) => {
    UserController.Login(req, res);
});

app.post('/update_user', (req, res) => {
    UserController.UpdateUser(req, res);
});


//User Routes
app.get('/select_games', (req, res) => {
    GameController.SelectGames(req, res);
});

app.post('/select_game', (req, res) => {
    GameController.SelectGame(req, res);
});

app.post('/create_game', (req, res) => {
    GameController.CreateGame(req, res);
});

app.post('/get_game_id', (req, res) => {
    GameController.GetGameId(req, res);
});

app.get('/search_games', (req, res) => {
    GameController.SearchGamesByName(req, res);
});


app.get('/select_usergames', (req, res) => {
    UserGameController.SelectUserGames(req, res);
})
app.post('/create_usergame', (req, res) => {
    UserGameController.CreateUserGame(req, res);
})


app.get('/user_game_match', (req, res) => {
    UserGameController.UserGameMatch(req, res);
})


//Platform Routes
app.get('/select_platforms', (req, res) => {
    PlatformController.SelectPlatforms(req, res);
})

app.get('/select_platform', (req, res) => {
    PlatformController.SelectPlatform(req, res);
})

app.post('/delete_platform', (req, res) => {
    PlatformController.DeletePlatform(req, res);
})

app.post('/create_platform', (req, res) => {
    PlatformController.CreatePlatform(req, res);
})




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




