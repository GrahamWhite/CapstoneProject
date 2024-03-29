let express = require('express');
let db = require('mongoose');

const User= require('../Schemas/User');
const Friend = require('../Schemas/Friend');

//POST
//Create a new friend [username, friendUsername]
const CreateFriend = async (req, res) => {
    if(req.body.username && req.body.friendUsername){
        if (req.body.username !== req.body.friendUsername){
            let user = await User.findOne({username: req.body.username});
            let friend = await User.findOne({username: req.body.friendUsername});

            //If user and friend exist and are not the same person
            if(user && friend){

            //Check if users are already friends
            let friendship = await Friend.findOne({userId: user._id, friendId: friend._id});

                if(!friendship){
                    let record = new Friend({
                    userId: user._id,
                    friendId: friend._id
                    });

                    try{
                        record.save();

                        res.send("Friend added");
                    }catch (e){
                        res.send("Error: could not save record");
                    }
                }
                res.send("Error: Friend already added")
            }
            res.send("Error: User(s) are not valid")
        }
        res.send("Error: You cannot be friends with yourself ;)");
    }
    res.send("Error: username and friendUsername must be defined");
}

//GET
//Selects a list of a user's friends
const SelectUserFriends = async (req, res) => {

    if(req.query.username) {
        let user = await User.findOne({username: req.query.username});

        if(user){
            let friends = await Friend.find({userId: user._id});

            let updatedFriendsList = [];

            for(let x = 0; x < friends.length; x++){

                let fr = await User.findOne({_id: friends[x].friendId});

                updatedFriendsList.push(fr);
            }

            if(updatedFriendsList[0]){


                res.send(updatedFriendsList);//Needs to send back friend usernames not ids - get usernames for each id
            }
            res.send("Error: no friends");
        }
        res.send("Error: user not found");
    }
    res.send("Error: username must be defined");
}

//POST
// Delete a friendship 
const DeleteFriend = async (req, res) => {
    if(req.body.username && req.body.friendUsername) {
    
          let user = await User.findOne({username: req.body.username});
          let friend = await User.findOne({username: req.body.friendUsername});

          if(user && friend){
                //Check if users are already friends
                let friendship = await Friend.findOne({userId: user._id, friendId: friend._id});

                if(friendship){
                    let deleteFriend = await Friend.deleteOne({userId: user._id, friendId: friend._id});

                    console.log(deleteFriend);

                    if(deleteFriend){
                        res.send("friend deleted");
                    }
                    res.send("error: could not delete record");
                }
                res.send("user or friend not found");
            }
          res.send("user or friend not found");
    }
    res.send("Error: username must be defined")
}

exports.SelectUserFriends = SelectUserFriends;
exports.CreateFriend = CreateFriend;
exports.DeleteFriend = DeleteFriend;