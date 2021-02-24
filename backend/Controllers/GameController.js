let express = require('express');
let db = require('mongoose');


const Game = require('../Schemas/Game');


const SelectAllGames = (req, res) => {
    let game = Game.find().then(r => {
        if(r === []) {
            res.send("No games in the database");
        } else{
            res.send(r);
        }

    });
};

exports.SelectAllGames = SelectAllGames;