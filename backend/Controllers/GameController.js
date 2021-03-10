let express = require('express');
let db = require('mongoose');


const Game = require('../Schemas/Game');

const SelectGames = (req, res) => {

    try{
        Game.find({}).then(r => {
            if(r === []){
                res.send("No Games currently in the database");
            }else{
                res.send(r);
            };

        });
    }catch (err){
        res.send(err);
    }
};

const SelectGame = (req, res) => {

    try{

        Game.find({name:req.query.name}).then(r => {
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

const CreateGame = (req, res) => {
    try{
        Game.find({name: req.body.name}, (a, b) => {


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

const GameExists = (req, res) => {
    try {
        Game.exists({name: req.query.name}).then( r => {
            res.send({msg: r});
        });
    } catch (err) {
        res.send({msg: err});
    };
};


exports.SelectGames = SelectGames;
exports.SelectGame = SelectGame;
exports.CreateGame = CreateGame;
exports.GameExists = GameExists;

