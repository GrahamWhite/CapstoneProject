let express = require('express');
let db = require('mongoose');


const User= require('../Schemas/User');
const Friend = require('../Schemas/Friend');

const CreateFriend = async (req, res) => {
    if(req.body.username && req.body.friendUsername){

        let user = await User.findOne({username: req.body.username});
        let friend = await User.findOne({username: req.body.friendUsername});

        if(user && friend){
            let record = new Friend({
               userId: user._id,
               friendId: friend._id
            });

            try{
                record.save();

                res.send("Friend added");
            }catch (e){
                res.send("Error: could not save record")
            }
        }

    }

    res.send("Error: username and friendUsername must be defined")
}


const SelectUserFriends = async (req, res) => {

    if(req.query.username) {
        let user = await User.findOne({username: req.query.username});

        if(user){
            let friends = await Friend.find({userId: user._id});

            if(friends[0]){
                res.send(friends);
            }

            res.send("you have no friends :(");
        }

        res.send("Error: user not found");

    }

    res.send("Error: username must be defined");
}

const DeleteFriend = async (req, res) => {
    if(req.query.username) {
      if(req.query.friendUsername){
          let username = await User.findOne({username: req.query.username});
          let friendUsername = await User.findOne({username: req.query.friendUsername});

          if(username && friendUsername){
                let friend = Friend.findOneAndRemove({userId: username._id, friendId: friendUsername._id});

                if(friend){
                    res.send("friend deleted");
                }

                res.send("error: could not delete record");
          }
          res.send("user or friend not found");
      }
    }

    res.send("Error: username must be defined")
}

exports.SelectUserFriends = SelectUserFriends;
exports.CreateFriend = CreateFriend;
exports.DeleteFriend = DeleteFriend;