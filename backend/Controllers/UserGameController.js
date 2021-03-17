let express = require('express');
let db = require('mongoose');

const UserGame = require('../Schemas/UserGame');
const User= require('../Schemas/User');
const Game = require('../Schemas/Game');


const SelectUserGames = (req, res) => {
    let gameList = [];
    User.findOne({username: req.query.username}).then(user => {
        if(user){
            UserGame.find({userId: user._id}).then(async userGames => {
                for(let userGame of userGames){
                    let game = await Game.findById(userGame.gameId);

                    gameList.push(game)
                }

                console.log(gameList.join(','));
                res.send(gameList);
            })
        }
    })
}

const CreateUserGame = (req, res) => {
    try{
        User.find({username: req.body.username}).then(user => {

            if(user[0]){

                Game.find({name: req.body.name, platform: req.body.platform}).then(game => {

                    if(game[0]){

                        let userGame = new UserGame({
                            userId: user[0]._id,
                            gameId: game[0]._id,
                            isFavorite: false
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


