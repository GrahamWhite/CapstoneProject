let express = require('express');
let db = require('mongoose');
const ePwd = require("encrypt-password");

const User = require('../Schemas/User');

const FindAllUsers = (req, res) => {

    try{
        User.find({}).then(r => {
            if(r === []){
                res.send("No users currently in the database");
            }else{
                res.send(r)
            }

        });
    }catch (err){
        res.send(err);
    }

};

const UserLogin = (req, res) => {
    try{
        User.find({username: req.body.username}).then(r => {
            console.log(r[0].password);
            if(r[0].password === ePwd(req.body.password, process.env.SECRET)){
                res.send({msg: "Valid Login for " + r[0].username});
            }else{
                res.send({msg: "Invalid Login"});
            }
        });


    }catch (err){
        res.send({msg: err});
    }
}

const FindUserByUsername = (req, res) => {

    try{

        User.find({username:req.query.username}).then(r => {
            if(r === []){
                res.send("User: " + req.query.username + " not found in the database");
            }else {
                res.send(r);
            }
        });
    }
    catch (err){
        res.send(err);
    }
};

const UserExists = (username) =>{
    //Test for existing username
    User.find({username: username}).then(r => {
        if(r === []){
            return false;
        }else {
            return true;
        }
    });
}

const CreateNewUser = (req, res) => {
    try{
        if(!UserExists(req.body.username)){
            const encryptedPwd = ePwd(req.body.password, process.env.SECRET);

            let user = new User({
                username: req.body.username,
                password: encryptedPwd,
                email: req.body.email,
                isAdmin: false,
                steamKey: ""
            });

            user.save();

            res.send({msg: "User Saved", username: user.username});
        }
        else{
            res.send({msg: "Error: User " + req.body.username + " already exists."});
        }
    }catch (err)
    {
        res.send({msg: "Error: " + err});
    }
}


exports.FindAllUsers = FindAllUsers;
exports.FindUserByUsername = FindUserByUsername;
exports.CreateNewUser = CreateNewUser;
exports.UserLogin = UserLogin;

