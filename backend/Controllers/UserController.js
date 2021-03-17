/*
File: UserController.js
Version: 1.0

Revision History:
    March 12 2020: Graham white
 */

const User = require('../Schemas/User');
const ePwd = require("encrypt-password");

//GET a list of users
const SelectUsers = (req, res) => {

    try {
        User.find({}).then(r => {
            if (!r[0]) {
                res.send("No users currently in the database");
            } else {
                res.send(r);
            }
        });
    } catch (err) {
        res.send(err);
    }
};

//POST select a user
const SelectUser = (req, res) => {
    try {
        User.findOne({username: req.body.username}).then(r => {
            if (!r) {
                res.send("User: " + req.body.username + " not found in the database");
            } else {
                res.send(r);
            }
        });
    } catch (err) {
        res.send({err});
    }
};

//POST Create a user
const CreateUser = (req, res) => {
    try {
        User.find({username: req.body.username}).then(u => {
            if (!u[0]) {

                if(!req.body.username || !req.body.password){
                    res.send("username and password required");
                }

                if(!validateEmail(req.body.email)){
                    res.send("invalid email");
                }

                //?? Does this try catch need to exist if above if statement checks for blank input
                try{
                    const encryptedPwd = ePwd(req.body.password, process.env.SECRET);
                } catch (err){
                    res.send("username and password required");
                }

                //!! remove extra fields (and in schema)
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
                res.send("User already exists");
            }
        });
    } catch (err) {
        res.send({msg: "Error: " + err});
    }
};

//POST login a user
const Login = (req, res) => {
    try {
        User.find({username: req.body.username}).then(u => {

            if (!u[0]) {
                res.send("User does not exist");
            }

            let pwd = ePwd(req.body.password, process.env.SECRET);

            if (u[0].password === pwd) {
                res.send({msg: "Valid Login for " + u[0].username, user: u[0]});
            } else {
                res.send("Invalid Login");
            }
        });
    } catch (err) {
        res.send(err);
    }
};

//POST get a user id based on username
const GetUserId = (req, res) => {
    try {
        User.find({username: req.body.username}).then(r => {
            res.send(r[0]._id);
        });
    } catch (err) {
        res.send(err);
    }
};

//POST check if user exists
const UserExists = (req, res) => {
    try {
        User.exists({username: req.body.username}).then(r => {
            res.send(r);
        });
    } catch (err) {
        res.send(err);
    }
    ;
};

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

exports.SelectUsers = SelectUsers;
exports.SelectUser = SelectUser;
exports.CreateUser = CreateUser;
exports.Login = Login;
exports.UserExists = UserExists;
exports.GetUserId = GetUserId;

