/*
File: UserController.js
Version: 1.0

Revision History:
    March 12 2020: Graham white
 */

const User = require('../Schemas/User');
const ePwd = require("encrypt-password");


//GET
//Selects all records in the collection
const SelectUsers = async (req, res) => {

    try {
        let users = await User.find({});

        if(users[0]){
            res.send(users);
        }

        res.send("Error: No users found")
    } catch (err) {
        res.send(err);
    }
};

//POST
//Update the user given the lookup [username] and modify [email, bio]
const UpdateUser = async (req, res) => {
    if(req.body.username && req.body.email && req.body.bio){
        let user = await User.findOne({username: req.body.username});

        if(user){

            if(req.body.email){
                if(!validateEmail(req.body.email)){
                    res.send("Error: email not valid")
                }
            }

            let updateUser = await User.findOne({username: req.body.username}).updateOne({email: req.body.email, bio: req.body.bio});

            if(updateUser){
                res.send("user updated");
            }

            res.send("Error: User is not defined");
        }
    }
    res.send("Error: username, bio and email must be defined")
}

//GET
//Searches for similar records with parameters [username]
const SearchUsers = async (req, res) => {

    if(req.query.username){

            let RegExUsername = RegExp(req.query.username);

            let users = await User.find({username: {$regex: RegExUsername, $options: 'i'}});

            if(users[0]){
                res.send(users);
            }else {
                res.send("No users found with username " + req.query.username);
            }
    }

    res.send("Error: username must be defined");

}

//POST
//Sends valid login
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

//GET
//Searches for a record matching exact properties of [username]
const SelectUser = async (req, res) => {
    try {
        if(req.query.username){
            let user = await User.findOne({username: req.query.username});

            if(user){
                res.send(user);
            }

            res.send("Error: user not found");
        }

        res.send("Error: username must be defined");

    } catch (err) {
        res.send({err});
    }
};

const GetUserId = (req, res) => {
    try {
        User.find({username: req.body.username}).then(r => {
            res.send(r[0]._id);
        });
    } catch (err) {
        res.send(err);
    }
};

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const CreateUser = async (req, res) => {
    try {

        if(req.body.username){
            if(req.body.password){
                if(req.body.email && validateEmail(req.body.email)){
                    let check = await User.findOne({username: req.body.username});

                    if(!check){
                        try{
                            const encryptedPwd = ePwd(req.body.password, process.env.SECRET);



                            let user = new User({
                                username: req.body.username,
                                password: encryptedPwd,
                                email: req.body.email,
                                isAdmin: false,
                                bio: ""
                            });
                            user.save();
                            res.send({msg: "User Saved", username: user.username});
                        } catch (e){
                            res.send(e.toString());
                        }
                }

                    res.send("Error: valid email required");


                }

                res.send("Error: user already exists with username: " + req.body.username);



            }

            res.send("Error: password must be defined");
        }

        res.send("Error: username must be defined");
        let user = User.findOne({username: req.body.username})


    } catch (err) {
        res.send(err);
    }
};

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


exports.SelectUsers = SelectUsers;
exports.SelectUser = SelectUser;
exports.CreateUser = CreateUser;
exports.Login = Login;
exports.UserExists = UserExists;
exports.SearchUsers = SearchUsers;
exports.GetUserId = GetUserId;
exports.UpdateUser= UpdateUser;

