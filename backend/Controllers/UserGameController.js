let express = require('express');
let db = require('mongoose');

const UserGame = require('../Schemas/UserGame');
const User= require('../Schemas/User');
const Game = require('../Schemas/Game');

//GET
//Gets a list of userGames with a [username]
const SelectUserGames = async (req, res) => {
    if(req.query.username){
        let user = await User.findOne({username: req.query.username});

        if(user){
            let userGame = await UserGame.find({userId: user._id});
    
            if(userGame){
                let gameList = [];
    
                for(let x = 0; x < userGame.length; x++){
                    let game = await Game.findOne({_id: userGame[x].gameId});
        
                    let record = {
                        name: game.name,
                        platform: game.platform,
                        isFavorite: userGame[x].isFavorite
                    }
        
                    gameList.push(record);
                }
                res.send(gameList);
            }
            res.send('Error: userGame not found');
        }
        res.send('Error: user not found');
    }
    res.send('Error: user must be defined');
}

//POST
//Deletes a userGame using [username, game, platform]
const DeleteUserGame = async (req, res) => {
    if(req.body.username && req.body.game && req.body.platform){
        
        let user = await User.findOne({username: req.body.username});
        let game = await Game.findOne({name: req.body.game, platform: req.body.platform});

        if(game){
            let userGame = await UserGame.findOne({userId: user._id, gameId: game._id});

            if (user && userGame){
                let deleteUserGame = await UserGame.deleteOne({userId: user._id, gameId: game._id});
    
                console.log(deleteUserGame);
    
                if (deleteUserGame){
                    res.send('UserGame deleted');
                }
                res.send('Error: Could not delete userGame');
            }
            res.send('Error: User and userGame must be valid');
        }
        res.send('Error: Could not find game');  
    }
    res.send('Error: username, game and platform must be defined');
}

//POST
//Create User game using [username, game, platform]
const CreateUserGame = async (req, res) => {
    if(req.body.username && req.body.game && req.body.platform){
        let user = await User.findOne({username: req.body.username});

        if(user){
            let game = await Game.findOne({name: req.body.game, platform: req.body.platform});
            let userGame = await UserGame.findOne({userId: user._id, gameId: game._id});

            if(game && !userGame){
                let createUserGame = new UserGame({
                    userId: user._id,
                    gameId: game._id,
                    isFavorite: false
                });

                try{
                    createUserGame.save();
                    res.send(req.body);
                }catch (e){
                    res.send("Error: could not save record");
                }
                res.send("Record Saved");
            }
            res.send("Error: game record not found");
        }
        res.send("Error: user not found");
    }
    res.send("Error: username, platform, and game must be defined");
};

//GET
//Compare userGame lists and display same games using [username, matchedUsername]
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

//POST
//Change if a game can be favorited using [username, game, platform, isFavorite]
const UpdateFavorite = async (req, res) => {
    if(req.body.username && req.body.game && req.body.platform && req.body.isFavorite){
        let user = await User.findOne({username: req.body.username});

        if (user){
           
            let game = await Game.findOne({name: req.body.game, platform: req.body.platform});
            let userGame = await UserGame.findOne({userId: user._id, gameId: game._id});

            if (game && userGame){
                let updateUserGame = await UserGame.findOne({userId: user._id}).updateOne({isFavorite: req.body.isFavorite});

                if(updateUserGame){
                    res.send("UserGame favorite has been toggled");
                }
                res.send("could not favorite game");
            }
            res.send("Error: game or userGame not found");
        }
        res.send("Error: user not found");
    }
    res.send("Error: username, platform, and game must be defined");
};

//Internal function
//Check if a usergame exists
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
exports.DeleteUsergame = DeleteUserGame;
exports.UpdateFavorite = UpdateFavorite;


