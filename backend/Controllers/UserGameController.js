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
        }else{
            res.send("User not found");
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

const UserGameMatch = (req, res) => {
    try{
    if(!req.query.username || !req.query.matchedUsername){
        res.send("username and matchedUsername are required");
    }

    User.findOne({username: req.query.username}).then(u1 => {


            if(!u1){
                res.send("username not found");
            }

            User.findOne({username: req.query.matchedUsername}).then(u2 => {
                if(!u2){
                    res.send("matchedUsername not found");
                }

                //both names have been found!

                console.log({user1: u1._id, user2: u2._id});

                UserGame.find({userId: u1._id}).then(async r => {
                    //console.log(r);

                    await UserGame.find({userId: u2._id}).then(async h => {
                        //console.log(h);

                        let matches = [];

                        for(let x = 0; x < r.length; x++){
                            for(let y = 0; y < h.length; y++){
                                if(r[x].gameId.toString() === h[y].gameId.toString()){
                                    await Game.findOne({_id: r[x].gameId}).then(async g=>{
                                        console.log(g);
                                        matches.push(g);
                                    })
                                }
                            }
                        }

                        await res.send(matches);
                    });
                })

            });


    });

    }catch (err){
        res.send(err);
    }
}

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
exports.UserGameMatch = UserGameMatch;


