let express = require('express');
let db = require('mongoose');
const ePwd = require("encrypt-password");

const UserGame = require('../Schemas/UserGame');
const Game = require('../Schemas/Game');
const User = require('../Schemas/User');


//In Progress - does not work
const UserGameExists = (username, gameName) =>{
   User.find({username: username}).then(u => {
       Game.find({name: gameName}).then(g => {
            let userId = u[0]._id;
            let gameId = g[0]._id;

            UserGame.find({username: userId, name: gameId}).then(ug => {
                if(ug === []){
                    return false;
                }else{
                    return true;
                }
            })
       })
   })
}

const GetUserGames = (req, res) => {
    try{
        //No implementation yet
    }catch (err){
        console.log("Error: " + err);
    }
}

const InsertUserGame = (req, res) => {

    try{
        if(!UserGameExists(req.body.username, req.body.name)){
            res.send("Error: " + req.body.username + " already has " + req.body.name + " associated with their account.");
        }else{
            User.find({username: req.body.username}).then(r => {
                Game.find({name: req.body.name}).then(b => {
                    let userGame = new UserGame({
                        gameId: b[0]._id,
                        userId: r[0]._id
                    });

                    console.log(userGame);

                    userGame.save();

                    res.send(req.body.name + " added to " + req.body.username + "'s account")
                })
            });
        }
    }catch(err) {
        res.send("Error: " + err);
    }

}

exports.InsertUserGame = InsertUserGame;