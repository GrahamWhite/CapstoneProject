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

const DeleteUserGame = async (req, res) => {
    if(req.query.username){
        if(req.query.game){

           let check = UserGame.findOneAndRemove({username: req.query.username, game: req.query.game});

           if(check){
                res.send("Record removed");
           }
           res.send("Error: record not found");
        }
        res.send('Error: game must be defined');
    }
    res.send('Error: username must be defined');
}

const CreateUserGame = async (req, res) => {
    if(req.body.username && req.body.game && req.body.platform){
        let user = await User.findOne({username: req.body.username});

        if(user){
            let game = await Game.findOne({name: req.body.game, platform: req.body.platform});

            if(game){
                    let userGame = new UserGame({
                        userId: user._id,
                        gameId: game._id
                    });

                    let existCheck = await UserGame.find(userGame);

                    if(!existCheck){
                        try{
                            userGame.save();
                        }catch (e){
                            res.send("Error: could not save record");
                        }

                        res.send("Record Saved");
                    }
                   res.send("Error: record already exists");
            }
            res.send("Error: game record not found");
        }
        res.send("Error: user not found");
    }
    res.send("Error: username, platform, and game must be defined");
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
exports.DeleteUsergame = DeleteUserGame


