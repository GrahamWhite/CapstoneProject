let express = require('express');
let db = require('mongoose');


const Game = require('../backend/Schemas/Game');


async function FindAllGames(name) {
    let game = Game.find().then(r => {
        return r;
    });
};