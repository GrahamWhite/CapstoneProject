let express = require('express');
let db = require('mongoose');

const UserGame = require('../Schemas/UserGame');


const SelectUserGames = (req, res) => {

    try{
        UserGame.find({username: req.query.username}).then(r => {
            if(r === []){
                res.send("No games associated with this user");
            }else{
                res.send(r);
            };
        });
    }catch (err){
        res.send(err);
    }
};



const CreateUserGame = (req, res) => {
    try{
        if(!UserGameExists(req, res)) {

            let userGame = new UserGame({
                username: req.query.username,
                name: req.query.name
            });

            userGame.save();

            res.send({msg: "User Game Saved"});
        }
    }catch (err){
        res.send({msg: err})
    }
};

const UserGameExists = (req, res) => {
    try{
        UserGame.exists({username: req.query.username}).then(r => {
            UserGame.exists({name: req.query.name}).then(x => {

                return false;

            });
        });
    }catch (err) {
        res.send({msg: err})
    };
};


/*const SelectUserGame = (req, res) => {

    try{

        UserGame.find({name:req.query.name}).then(r => {
            if(r === []){
                res.send("Game: " + req.query.name + " not found in the database");
            }else {
                res.send(r);
            }
        });
    }
    catch (err){
        res.send({err});
    }
};

const CreateUserGame = (req, res) => {
    try{
        UserGame.find({name: req.body.name}, (a, b) => {


            if(b.length === 0){


                    let game = new Game({
                        name: req.body.name,
                        platform: req.body.platform
                    });

                    game.save();

                    res.send({msg: "Game Saved", name: game.name});
            }
            else {
                res.send({msg: "Game already exists"});
            }
        });


    }catch (err)
    {
        res.send({msg: "Error: " + err});
    }
};

const UserGameExists = (req, res) => {
    try {
        Game.exists({name: req.query.name}).then( r => {
            res.send({msg: r});
        });
    } catch (err) {
        res.send({msg: err});
    };
};



exports.SelectUserGame = SelectGame;
exports.CreateUserGame = CreateUserGame;
exports.UserGameExists = UserGameExists;*/
exports.SelectUserGames = SelectUserGames;
exports.UserGameExists = UserGameExists;
exports.CreateUserGame = CreateUserGame;

