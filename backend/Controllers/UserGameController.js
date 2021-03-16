let express = require('express');
let db = require('mongoose');

const UserGame = require('../Schemas/UserGame');
const User= require('../Schemas/User');
const Game = require('../Schemas/Game');


/*const SelectUserGames = (req, res) => {
    try {
        UserGames.find({}).then(r => {
            if (!r[0]) {
                res.send("No userGames currently in the database");
            } else {
                res.send(r);
            }
            ;
        });
    } catch (err) {
        res.send(err);
    }
};*/

/*
const SelectUserGames = (req, res) => {
    try {

        let userGameList = [];

        let gameList = [];
        User.find({username: req.body.username}).then(user => {
            if (user) {
                UserGame.find({userId: user[0]._id}).then(ug => {
                   ug.forEach(function (err, docs)  {
                        userGameList.push(ug);




                        Game.find({_id: ug[0].gameId}).then(games => {
                            games.forEach(function(err, docs) {
                                gameList.push(games)
                            });
                        });

                        res.send(gameList);
                    });

                });

            } else {
                res.send("user not found");
            }
        });

    } catch (err) {
        res.send(err);
    };
};

*/


const SelectUserGames = (req, res) => {
    try {

        let userGameList = [];
        let list = [];
        let gameList = [];
        User.find({username: req.body.username}).then(user => {
            if (user) {
                UserGame.find({userId: user[0]._id}).then(ug => {

                    userGameList.push(ug);

                    // Game.find({_id: ug[0].gameId}).then(game => {
                    //     console.log(game);
                    // });



                    userGameList.forEach(record => {

                        console.log(count)
                        Game.find({_id: record}).then(r => {
                            list.push(r);
                        });

                    });




                });



            } else {
                res.send("user not found");
            }
        });

    } catch (err) {
        res.send(err);
    };
};


const CreateUserGame = (req, res) => {
    try{
        User.find({username: req.body.username}).then(user => {

            if(user[0]){

                Game.find({name: req.body.name, platform: req.body.platform}).then(game => {

                    if(game[0]){

                        let userGame = new UserGame({
                            userId: user[0]._id,
                            gameId: game[0]._id
                        });

                        userGame.save();

                        res.send({userGame});
                    }
                    else{
                        res.send("Game not found");
                    }
                })
            }else {

                res.send("User not found");
            }
        });
    }catch(err)
    {
        res.send({msg: "Error: " + err});
    }
};




const UserGameExists = (req, res) => {
    try {
        User.exists({username: req.body.username}).then(user => {
            Game.exists({name: req.body.name}).then( game => {
                res.send({user: user, game: game});
            });
        });

    } catch (err) {
        res.send(err);
    };
};

exports.SelectUserGames = SelectUserGames;
exports.UserGameExists = UserGameExists;
exports.CreateUserGame= CreateUserGame;


